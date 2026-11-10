/* 指令面板：Ctrl/⌘ + K 或 "/" 開啟。手機上同時是選單。 */
(function () {
  var A = window.App, S = window.SITE;
  var $ = function (id) { return document.getElementById(id); };
  var box = $("palette"), input = $("paletteInput"), list = $("paletteList");
  var items = [], sel = 0, lastFocus = null;

  function go(id) {
    return function () {
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: A.reduced ? "auto" : "smooth", block: "start" });
    };
  }
  function open(url) { return function () { if (url && url !== "#") window.open(url, "_blank", "noopener"); }; }

  // keys：額外的搜尋關鍵字（中英文都能找到）
  function commands() {
    var nav = [["about", "about 關於 me"], ["experience", "experience 經歷 實習 學歷 education intern"], ["projects", "projects 作品 work"], ["skills", "skills 技能"], ["contact", "contact 聯絡 email"]];
    var out = nav.map(function (n) { return { label: A.t("nav." + n[0]), hint: A.t("pal.gNav"), keys: n[1], run: go(n[0]) }; });
    out.push({ label: A.t("pal.top"), hint: A.t("pal.gNav"), keys: "top home 頂端 首頁", run: go("top") });
    var act = A.t("pal.gAct");
    out.push({ label: A.t("pal.lang"), hint: act, keys: "language 語言 english 中文 chinese lang", run: A.toggleLang });
    out.push({ label: A.t("pal.theme"), hint: act, keys: "theme dark light 深色 淺色 主題 mode", run: A.toggleTheme });
    out.push({ label: A.t("pal.copy"), hint: act, keys: "copy email mail 信箱 複製", run: function () { A.copyEmail(); } });
    if (S.meta.resume) out.push({ label: A.t("pal.resume"), hint: act, keys: "resume cv 履歷 pdf download 下載", run: open(S.meta.resume) });
    if (S.meta.github) out.push({ label: A.t("pal.github"), hint: act, keys: "github code 原始碼", run: open(S.meta.github) });
    if (S.meta.linkedin) out.push({ label: A.t("pal.linkedin"), hint: act, keys: "linkedin", run: open(S.meta.linkedin) });
    out.push({ label: A.t("pal.reset"), hint: act, keys: "reset shapes 圖形 重新", run: function () { go("top")(); if (A.stage) A.stage.reset(); A.toast(A.t("toast.reset")); } });
    out.push({ label: A.t("pal.party"), hint: act, keys: "party confetti 彩帶 hello fun", run: function () { A.egg(); } });
    return out;
  }

  function render() {
    var q = input.value.trim().toLowerCase();
    items = commands().filter(function (c) { return !q || (c.label + " " + c.keys).toLowerCase().indexOf(q) >= 0; });
    if (sel >= items.length) sel = Math.max(0, items.length - 1);
    list.innerHTML = items.length ? items.map(function (c, i) {
      return '<li class="palette__item' + (i === sel ? " is-sel" : "") + '" role="option" aria-selected="' + (i === sel) + '" data-i="' + i + '"><i></i><span>' + A.esc(c.label) + "</span><small>" + A.esc(c.hint) + "</small></li>";
    }).join("") : '<li class="palette__none">' + A.t("pal.none") + "</li>";
    var cur = list.querySelector(".is-sel");
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: "nearest" });
  }

  function show() {
    if (!box.hidden) return;
    lastFocus = document.activeElement;
    box.hidden = false; sel = 0; input.value = "";
    input.placeholder = A.t("pal.placeholder");
    render(); input.focus();
    document.documentElement.style.overflow = "hidden";
  }
  function hide() {
    if (box.hidden) return;
    box.hidden = true;
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function run(i) { var c = items[i]; if (!c) return; hide(); setTimeout(c.run, 60); }

  $("paletteBtn").addEventListener("click", show);
  box.addEventListener("pointerdown", function (ev) { if (ev.target === box) hide(); });
  list.addEventListener("click", function (ev) { var li = ev.target.closest("[data-i]"); if (li) run(+li.dataset.i); });
  list.addEventListener("pointermove", function (ev) {
    var li = ev.target.closest("[data-i]");
    if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; render(); }
  });
  input.addEventListener("input", function () { sel = 0; render(); });
  input.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowDown") { ev.preventDefault(); sel = (sel + 1) % Math.max(1, items.length); render(); }
    else if (ev.key === "ArrowUp") { ev.preventDefault(); sel = (sel - 1 + items.length) % Math.max(1, items.length); render(); }
    else if (ev.key === "Enter") { ev.preventDefault(); run(sel); }
    else if (ev.key === "Tab") { ev.preventDefault(); }
  });
  document.addEventListener("keydown", function (ev) {
    var typing = /INPUT|TEXTAREA/.test(ev.target.tagName);
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "k") { ev.preventDefault(); box.hidden ? show() : hide(); }
    else if (ev.key === "/" && !typing) { ev.preventDefault(); show(); }
    else if (ev.key === "Escape") hide();
  });
  A.on("lang", function () { if (!box.hidden) { input.placeholder = A.t("pal.placeholder"); render(); } });
  A.palette = { show: show, hide: hide };
})();
