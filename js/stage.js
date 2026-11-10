/* 首頁的幾何圖形：可以拖曳、拋出、互相碰撞，游標靠近時會被輕輕推開。 */
(function () {
  var A = window.App, stage = document.getElementById("stage"), hero = document.getElementById("top");
  if (!stage) return;

  // x, y 是在首頁區塊中的相對位置 (0~1)，size 是相對大小
  var DEFS = [
    // mx, my：手機版的位置（排在文字上方與下方的空白處）
    { type: "circle", c: "var(--orange)", size: 0.30, x: 0.74, y: 0.33, mx: 0.80, my: 0.205 },
    { type: "half",   c: "var(--red)",    size: 0.22, x: 0.90, y: 0.62, mx: 0.80, my: 0.87 },
    { type: "square", c: "var(--teal)",   size: 0.17, x: 0.63, y: 0.72, mx: 0.50, my: 0.215 },
    { type: "ring",   c: "var(--ink)",    size: 0.13, x: 0.91, y: 0.22, mx: 0.58, my: 0.84 },
    { type: "tri",    c: "var(--red)",    size: 0.11, x: 0.58, y: 0.19, mx: 0.33, my: 0.165 },
    { type: "plus",   c: "var(--ink)",    size: 0.075, x: 0.80, y: 0.84 },
    { type: "circle", c: "var(--teal)",   size: 0.06, x: 0.50, y: 0.86 },
  ];

  var W = 0, H = 0, items = [], running = false, visible = true, raf = 0, last = 0;
  var pointer = { x: -999, y: -999, on: false };

  function measure() { var r = stage.getBoundingClientRect(); W = r.width; H = r.height; }
  function base() { return W < 760 ? W * 0.95 : Math.max(420, Math.min(W * 0.62, H * 1.05)); }

  var builtMobile = null;
  function build(animate) {
    measure();
    stage.innerHTML = "";
    var b = base(), mobile = W < 760;
    builtMobile = mobile;
    items = DEFS.slice(0, mobile ? 5 : DEFS.length).map(function (d, i) {
      var size = Math.round(d.size * b * (mobile ? 0.8 : 1));
      var el = document.createElement("div");
      el.className = "shape shape--" + d.type;
      el.style.width = el.style.height = size + "px";
      el.style.setProperty("--c", d.c);
      el.innerHTML = '<i style="background:' + d.c + '"></i>';
      stage.appendChild(el);
      var it = {
        el: el, size: size, r: size * 0.46, m: size * size,
        x: (mobile ? d.mx : d.x) * W, y: (mobile ? d.my : d.y) * H,
        vx: 0, vy: 0, rot: (i * 37) % 30 - 15, vr: 0, drag: false, hist: [],
      };
      bind(it);
      return it;
    });
    // 進場：一個一個彈出來
    if (animate !== false && !A.reduced) items.forEach(function (it, i) {
      it.el.animate([{ opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1 }], { duration: 700, delay: 250 + i * 70, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "backwards" });
      it.vx = (Math.random() - 0.5) * 1.6; it.vy = (Math.random() - 0.5) * 1.6;
    });
    draw(); wake();
  }

  function bind(it) {
    var el = it.el;
    el.addEventListener("pointerdown", function (ev) {
      ev.preventDefault();
      el.setPointerCapture(ev.pointerId);
      var r = stage.getBoundingClientRect();
      it.drag = true; it.ox = ev.clientX - r.left - it.x; it.oy = ev.clientY - r.top - it.y;
      it.hist = [{ x: it.x, y: it.y, t: performance.now() }];
      el.classList.add("is-drag");
      var hint = document.querySelector(".hero__hint"); if (hint) hint.classList.add("is-gone");
      wake();
    });
    el.addEventListener("pointermove", function (ev) {
      if (!it.drag) return;
      var r = stage.getBoundingClientRect();
      it.x = Math.max(it.r, Math.min(W - it.r, ev.clientX - r.left - it.ox));
      it.y = Math.max(it.r, Math.min(H - it.r, ev.clientY - r.top - it.oy));
      it.hist.push({ x: it.x, y: it.y, t: performance.now() });
      if (it.hist.length > 6) it.hist.shift();
      if (A.reduced) draw();
    });
    function up() {
      if (!it.drag) return;
      it.drag = false; el.classList.remove("is-drag");
      var h = it.hist, a = h[0], b = h[h.length - 1], dt = Math.max(16, b.t - a.t);
      if (!A.reduced && h.length > 1) {
        it.vx = ((b.x - a.x) / dt) * 16; it.vy = ((b.y - a.y) / dt) * 16;
        it.vr = it.vx * 0.25;
      }
      wake();
    }
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  }

  function step(dt) {
    var k = Math.min(2, dt / 16.67), n = items.length, i, j, a, b;
    for (i = 0; i < n; i++) {
      a = items[i];
      if (a.drag) continue;
      // 游標靠近時推開
      if (pointer.on) {
        var px = a.x - pointer.x, py = a.y - pointer.y, pd = Math.sqrt(px * px + py * py), reach = a.r + 60;
        if (pd < reach && pd > 0.01) { var f = ((reach - pd) / reach) * 0.55 * k; a.vx += (px / pd) * f; a.vy += (py / pd) * f; }
      }
      a.x += a.vx * k; a.y += a.vy * k; a.rot += a.vr * k;
      var damp = Math.pow(0.985, k);
      a.vx *= damp; a.vy *= damp; a.vr *= Math.pow(0.97, k);
      if (a.x < a.r) { a.x = a.r; a.vx = Math.abs(a.vx) * 0.8; }
      if (a.x > W - a.r) { a.x = W - a.r; a.vx = -Math.abs(a.vx) * 0.8; }
      if (a.y < a.r) { a.y = a.r; a.vy = Math.abs(a.vy) * 0.8; }
      if (a.y > H - a.r) { a.y = H - a.r; a.vy = -Math.abs(a.vy) * 0.8; }
    }
    // 圓形碰撞
    for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) {
      a = items[i]; b = items[j];
      var dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy), min = a.r + b.r;
      if (d >= min || d < 0.01) continue;
      var nx = dx / d, ny = dy / d, over = min - d;
      var ma = a.drag ? 1e9 : a.m, mb = b.drag ? 1e9 : b.m, tot = ma + mb;
      if (!a.drag) { a.x -= nx * over * (mb / tot); a.y -= ny * over * (mb / tot); }
      if (!b.drag) { b.x += nx * over * (ma / tot); b.y += ny * over * (ma / tot); }
      var rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (rel > 0) continue;
      var imp = (-(1 + 0.85) * rel) / (1 / ma + 1 / mb);
      if (!a.drag) { a.vx -= (imp / ma) * nx; a.vy -= (imp / ma) * ny; a.vr -= rel * 0.05; }
      if (!b.drag) { b.vx += (imp / mb) * nx; b.vy += (imp / mb) * ny; b.vr += rel * 0.05; }
    }
  }

  function draw() {
    for (var i = 0; i < items.length; i++) {
      var a = items[i];
      a.el.style.transform = "translate3d(" + (a.x - a.size / 2).toFixed(1) + "px," + (a.y - a.size / 2).toFixed(1) + "px,0) rotate(" + a.rot.toFixed(1) + "deg)";
    }
  }

  function busy() {
    if (pointer.on) return true;
    for (var i = 0; i < items.length; i++) { var a = items[i]; if (a.drag || Math.abs(a.vx) + Math.abs(a.vy) + Math.abs(a.vr) > 0.03) return true; }
    return false;
  }
  function tick(t) {
    var dt = last ? t - last : 16.67; last = t;
    step(dt); draw();
    if (visible && busy()) raf = requestAnimationFrame(tick); else { running = false; last = 0; }
  }
  function wake() { if (running || !visible || A.reduced) { if (A.reduced) draw(); return; } running = true; last = 0; raf = requestAnimationFrame(tick); }

  hero.addEventListener("pointermove", function (ev) {
    if (ev.pointerType === "touch") return;
    var r = stage.getBoundingClientRect();
    pointer.x = ev.clientX - r.left; pointer.y = ev.clientY - r.top; pointer.on = true; wake();
  });
  hero.addEventListener("pointerleave", function () { pointer.on = false; });

  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) wake(); }).observe(hero);

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(relayout, 120);
  });
  // 視窗大小改變：圖形留在相對位置，只調整大小（跨過手機／桌機斷點才重排）
  function relayout() {
    var ow = W, oh = H;
    measure();
    if (!ow || !oh || (W < 760) !== builtMobile) { build(false); return; }
    if (Math.abs(ow - W) < 2 && Math.abs(oh - H) < 2) return;
    var b = base();
    items.forEach(function (it, i) {
      var size = Math.round(DEFS[i].size * b * (builtMobile ? 0.8 : 1));
      it.size = size; it.r = size * 0.46; it.m = size * size;
      it.el.style.width = it.el.style.height = size + "px";
      it.x = Math.max(it.r, Math.min(W - it.r, (it.x / ow) * W));
      it.y = Math.max(it.r, Math.min(H - it.r, (it.y / oh) * H));
    });
    draw(); wake();
  }

  A.stage = {
    reset: function () { build(true); },
    burst: function () {
      items.forEach(function (it) { var ang = Math.random() * 6.283, sp = 14 + Math.random() * 14; it.vx = Math.cos(ang) * sp; it.vy = Math.sin(ang) * sp; it.vr = (Math.random() - 0.5) * 16; });
      wake();
    },
  };
  build();
})();
