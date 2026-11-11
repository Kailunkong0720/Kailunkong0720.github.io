/* 介面互動：游標、導覽列、捲動進場、首頁打字、跑馬燈、時間軸進度。 */
(function () {
  var A = window.App, S = window.SITE, root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var frames = []; // 每一格動畫要做的事，集中在同一個 requestAnimationFrame
  A.frame = function (fn) { frames.push(fn); };
  A.fine = fine;

  /* ---------- 自訂游標 ---------- */
  var mouse = A.mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  if (fine && !A.reduced) {
    root.classList.add("has-cursor");
    var cur = $("cursor"), label = $("cursorLabel"), cx = mouse.x, cy = mouse.y, hot = null;
    var setHot = function (el) {
      hot = el;
      var mode = el ? (el.dataset.cursor || "grow") : "";
      cur.classList.toggle("is-grow", mode === "grow");
      cur.classList.toggle("is-label", mode === "label");
      label.textContent = mode === "label" ? A.t(el.dataset.cursorKey || "cursor.click") : "";
    };
    document.addEventListener("pointermove", function (ev) {
      if (ev.pointerType === "touch") return;
      mouse.x = ev.clientX; mouse.y = ev.clientY; cur.classList.add("is-on");
      var el = ev.target.closest ? ev.target.closest("[data-cursor], a, button, .shape") : null;
      if (el && el.classList.contains("shape")) el = null;
      if (el !== hot) setHot(el);
    }, { passive: true });
    document.addEventListener("pointerdown", function () { cur.classList.add("is-down"); });
    document.addEventListener("pointerup", function () { cur.classList.remove("is-down"); });
    document.documentElement.addEventListener("pointerleave", function () { cur.classList.remove("is-on"); });
    A.on("cursor-refresh", function (el) { if (el === hot) setHot(el); });
    A.on("lang", function () { if (hot) setHot(hot); });
    A.frame(function () {
      cx += (mouse.x - cx) * 0.22; cy += (mouse.y - cy) * 0.22;
      cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0)";
    });
  }

  /* ---------- 導覽列、進度條、目前所在區塊 ---------- */
  var nav = $("nav"), progress = $("progress"), tl = $("timeline"), lastY = scrollY, vel = 0;
  var secs = ["about", "experience", "publications", "projects", "skills", "contact"].map($);
  var navLinks = {};
  document.querySelectorAll("[data-nav]").forEach(function (a) { navLinks[a.dataset.nav] = a; });
  function onScroll() {
    var y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0).toFixed(4) + ")";
    nav.classList.toggle("is-scrolled", y > 30);
    if (Math.abs(y - lastY) > 6) nav.classList.toggle("is-hidden", y > lastY && y > 400);
    vel += (y - lastY) * 0.35; lastY = y;
    var mid = innerHeight * 0.4, cur = "";
    secs.forEach(function (s) { if (s && !s.hidden && s.getBoundingClientRect().top <= mid) cur = s.id; });
    for (var k in navLinks) navLinks[k].classList.toggle("is-active", k === cur);
    if (tl) { // 時間軸的線隨捲動畫出來
      var r = tl.getBoundingClientRect();
      tl.style.setProperty("--p", Math.max(0, Math.min(1, (innerHeight * 0.62 - r.top) / Math.max(1, r.height))).toFixed(3));
    }
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* ---------- 捲動進場 ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }) : null;
  function splitTitles() {
    document.querySelectorAll(".sec__title").forEach(function (h) {
      var txt = h.textContent, parts = A.lang === "zh" ? txt.split("") : txt.split(" ");
      h.innerHTML = parts.map(function (w, i) { return '<span class="w" style="--i:' + i + '">' + A.esc(w) + "</span>"; }).join(A.lang === "zh" ? "" : " ");
      h.setAttribute("aria-label", txt);
    });
  }
  function observe() {
    splitTitles();
    document.querySelectorAll(".rv:not(.is-in), .sec__title:not(.is-in)").forEach(function (el) {
      if (io) io.observe(el); else el.classList.add("is-in");
    });
    onScroll();
  }
  A.on("render", observe);

  /* ---------- 首頁：Hello 輪播與身分打字 ---------- */
  var hello = $("hello"), greets = ["Hello,", "你好，", "Hi there,", "哈囉，"], gi = 0;
  function setHello(txt) {
    hello.innerHTML = txt.split("").map(function (c, i) {
      return '<span class="ch" style="--i:' + i + '">' + (c === " " ? "&nbsp;" : A.esc(c)) + "</span>";
    }).join("");
    hello.setAttribute("aria-label", txt);
  }
  function startHello() { gi = A.lang === "zh" ? 1 : 0; setHello(greets[gi]); }
  startHello();
  A.on("lang", startHello);
  if (!A.reduced) setInterval(function () { if (!document.hidden && scrollY < innerHeight) { gi = (gi + 1) % greets.length; setHello(greets[gi]); } }, 3600);

  var roleEl = $("role"), ri = 0, pos = 0, dir = 1, wait = 0, typeTimer;
  function typeLoop() {
    var word = A.tr(S.profile.roles[ri % S.profile.roles.length]);
    if (A.reduced) { roleEl.textContent = word; return; }
    if (wait > 0) { wait--; }
    else {
      pos += dir;
      roleEl.textContent = word.slice(0, pos);
      if (dir > 0 && pos >= word.length) { dir = -1; wait = 22; }
      else if (dir < 0 && pos <= 0) { dir = 1; ri++; wait = 4; }
    }
    typeTimer = setTimeout(typeLoop, dir > 0 ? 85 : 40);
  }
  A.on("lang", function () { clearTimeout(typeTimer); pos = 0; dir = 1; wait = 0; typeLoop(); });
  typeLoop();

  /* ---------- 跑馬燈：捲動越快跑越快 ---------- */
  var track = $("marqueeTrack"), mx = 0;
  if (track && !A.reduced) A.frame(function () {
    var third = track.scrollWidth / 3;
    if (!third) return;
    vel *= 0.9;
    mx -= 0.7 + Math.min(18, Math.abs(vel)) * 0.5;
    if (mx <= -third) mx += third;
    track.style.transform = "translate3d(" + mx.toFixed(1) + "px,0,0) skewX(" + Math.max(-10, Math.min(10, vel * -0.35)).toFixed(2) + "deg)";
  });

  /* ---------- 語言、主題按鈕 ---------- */
  $("langBtn").addEventListener("click", A.toggleLang);
  $("themeBtn").addEventListener("click", A.toggleTheme);
  if (/Mac|iPhone|iPad/.test(navigator.platform || "")) $("kbdMod").textContent = "⌘";

  /* ---------- 共用動畫迴圈 ---------- */
  (function loop() {
    if (!document.hidden) for (var i = 0; i < frames.length; i++) frames[i]();
    requestAnimationFrame(loop);
  })();

  observe();
})();
