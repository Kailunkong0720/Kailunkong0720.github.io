/* 細節效果：磁吸按鈕、封面傾斜、作品預覽、頭像變形、複製信箱、彩帶、彩蛋。 */
(function () {
  var A = window.App, S = window.SITE;
  var $ = function (id) { return document.getElementById(id); };
  var COLORS = ["#f4a300", "#ff3b1f", "#7fd6d9", "#111111"];

  /* ---------- 彩帶 ---------- */
  A.party = function (x, y, n) {
    if (A.reduced) return;
    x = x == null ? innerWidth / 2 : x; y = y == null ? innerHeight / 2 : y;
    for (var i = 0; i < (n || 40); i++) {
      var b = document.createElement("i"), kind = i % 3, ang = Math.random() * 6.283, dist = 90 + Math.random() * 260;
      b.className = "bit";
      b.style.background = COLORS[i % COLORS.length];
      b.style.borderRadius = kind === 0 ? "50%" : kind === 1 ? "3px" : "50% 50% 0 0";
      var s = 0.5 + Math.random() * 0.9, dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 80;
      document.body.appendChild(b);
      b.animate([
        { transform: "translate(" + x + "px," + y + "px) scale(" + s + ") rotate(0deg)", opacity: 1 },
        { transform: "translate(" + (x + dx) + "px," + (y + dy) + "px) scale(" + s + ") rotate(" + (Math.random() * 540 - 270) + "deg)", opacity: 1, offset: 0.55 },
        { transform: "translate(" + (x + dx * 1.15) + "px," + (y + dy + 260) + "px) scale(" + s * 0.6 + ") rotate(" + (Math.random() * 900 - 450) + "deg)", opacity: 0 },
      ], { duration: 1100 + Math.random() * 700, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = (function (el) { return function () { el.remove(); }; })(b);
    }
  };

  /* ---------- 複製信箱 ---------- */
  A.copyEmail = function (ev) {
    var mail = S.meta.email, done = function () {
      A.toast(A.t("toast.copied"));
      A.party(ev && ev.clientX ? ev.clientX : null, ev && ev.clientY ? ev.clientY : null, 24);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(mail).then(done, fallback);
    else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = mail; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { location.href = "mailto:" + mail; }
      ta.remove();
    }
  };
  $("copyEmail").addEventListener("click", A.copyEmail);

  /* ---------- 頭像：點一下換形狀 ---------- */
  var portrait = $("portrait"), ps = 0;
  portrait.addEventListener("click", function () { ps = (ps + 1) % 4; portrait.dataset.s = ps; });

  /* ---------- 滑鼠專屬效果 ---------- */
  var pf = $("pfloat"), pfId = null, fx = 0, fy = 0, frot = 0;
  function hideFloat() { pfId = null; pf.classList.remove("is-on"); }
  A.on("proj-toggle", hideFloat);
  A.on("render", hideFloat);

  if (A.fine && !A.reduced) {
    var mag = null, tilt = null;
    document.addEventListener("pointermove", function (ev) {
      if (ev.pointerType === "touch" || !ev.target.closest) return;
      // 磁吸按鈕
      var m = ev.target.closest("[data-magnet]");
      if (mag && mag !== m) { mag.style.transform = ""; mag = null; }
      if (m) {
        var r = m.getBoundingClientRect();
        m.style.transform = "translate(" + ((ev.clientX - r.left - r.width / 2) * 0.28).toFixed(1) + "px," + ((ev.clientY - r.top - r.height / 2) * 0.38).toFixed(1) + "px)";
        mag = m;
      }
      // 封面 3D 傾斜
      var t = ev.target.closest("[data-tilt]");
      if (tilt && tilt !== t) { tilt.style.transform = ""; tilt = null; }
      if (t) {
        var q = t.getBoundingClientRect(), px = (ev.clientX - q.left) / q.width - 0.5, py = (ev.clientY - q.top) / q.height - 0.5;
        t.style.transform = "perspective(800px) rotateY(" + (px * 12).toFixed(2) + "deg) rotateX(" + (-py * 12).toFixed(2) + "deg) scale(1.02)";
        tilt = t;
      }
      // 作品列的浮動預覽
      var head = ev.target.closest(".proj__head"), proj = head && head.parentNode;
      if (proj && !proj.classList.contains("is-open")) {
        if (pfId !== proj.dataset.id) {
          pfId = proj.dataset.id;
          var data = S.projects.filter(function (p) { return p.id === pfId; })[0];
          if (data) { pf.innerHTML = A.cover(data); if (!pf.classList.contains("is-on")) { fx = ev.clientX + 28; fy = ev.clientY - 250; } pf.classList.add("is-on"); }
        }
      } else if (pfId) hideFloat();
    }, { passive: true });

    A.frame(function () {
      if (!pfId) return;
      var tx = Math.min(innerWidth - 320, A.mouse.x + 28), ty = Math.max(12, A.mouse.y - 250);
      var px = fx; fx += (tx - fx) * 0.16; fy += (ty - fy) * 0.16;
      frot += (Math.max(-9, Math.min(9, (fx - px) * 0.8)) - frot) * 0.2;
      pf.style.transform = "translate3d(" + fx.toFixed(1) + "px," + fy.toFixed(1) + "px,0) rotate(" + frot.toFixed(2) + "deg)";
    });
  }

  /* ---------- 彩蛋：在鍵盤上輸入 hello ---------- */
  var buf = "";
  A.egg = function () {
    A.toast(A.t("toast.egg"));
    A.party(innerWidth * 0.3, innerHeight * 0.45, 36);
    A.party(innerWidth * 0.7, innerHeight * 0.45, 36);
    if (A.stage) A.stage.burst();
  };
  document.addEventListener("keydown", function (ev) {
    if (ev.ctrlKey || ev.metaKey || ev.altKey || /INPUT|TEXTAREA/.test(ev.target.tagName) || ev.key.length !== 1) return;
    buf = (buf + ev.key.toLowerCase()).slice(-5);
    if (buf === "hello") { buf = ""; A.egg(); }
  });

  /* ---------- 給打開開發者工具的人 ---------- */
  try {
    console.log("%c Hello! %c 這個網站是用純 HTML / CSS / JavaScript 手寫的，沒有框架。\n 試試 Ctrl/⌘ + K，或直接在頁面上輸入 hello。",
      "background:#f4a300;color:#111;font-weight:800;font-size:14px;padding:4px 8px;border-radius:999px", "color:inherit;font-size:12px");
  } catch (e) {}
})();
