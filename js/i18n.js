/* 介面文字（按鈕、標題等）與語言／主題切換。個人內容請改 content.js。 */
window.App = (function () {
  var UI = {
    zh: {
      "a11y.skip": "跳到主要內容",
      "nav.about": "關於", "nav.experience": "經歷", "nav.projects": "作品", "nav.skills": "技能", "nav.contact": "聯絡", "nav.search": "指令",
      "hero.iam": "我是", "hero.cta1": "看我的作品", "hero.cta2": "下載履歷", "hero.hint": "這些圖形可以拖曳，也可以用力丟出去",
      "about.title": "關於我",
      "exp.title": "經歷", "exp.all": "全部", "exp.work": "實習", "exp.edu": "學歷",
      "proj.title": "作品", "proj.all": "全部", "proj.empty": "// 沒有符合的作品", "proj.demo": "線上 Demo", "proj.repo": "原始碼",
      "skills.title": "技能", "skills.note": "點一個技能，看我用它做過哪些作品。",
      "contact.title": "聯絡我", "contact.big": "我正在找軟體工程師的全職機會。有適合的職缺，或只是想聊聊，都歡迎來信。",
      "contact.copy": "點一下複製信箱", "contact.resume": "履歷 PDF",
      "toast.copied": "信箱已複製 ✓", "toast.filter": "篩選作品：", "toast.egg": "你找到彩蛋了 🎉", "toast.lang": "已切換為中文",
      "toast.dark": "深色模式", "toast.light": "淺色模式", "toast.reset": "圖形已重新排列",
      "foot.made": "親手設計與開發 ©", "foot.egg": "psst… 試著在鍵盤上輸入 hello", "foot.top": "回到頂端",
      "pal.placeholder": "輸入指令，或想去的地方…", "pal.move": "移動", "pal.run": "執行", "pal.close": "關閉", "pal.none": "// 找不到符合的指令",
      "pal.gNav": "前往", "pal.gAct": "動作", "pal.lang": "切換成 English", "pal.theme": "切換深色 / 淺色", "pal.copy": "複製 Email",
      "pal.resume": "下載履歷", "pal.github": "打開 GitHub", "pal.linkedin": "打開 LinkedIn", "pal.party": "放彩帶", "pal.reset": "重新排列首頁圖形", "pal.top": "回到頂端",
      "cursor.click": "點我", "cursor.copy": "複製", "cursor.open": "展開", "cursor.close": "收合",
    },
    en: {
      "a11y.skip": "Skip to content",
      "nav.about": "About", "nav.experience": "Experience", "nav.projects": "Projects", "nav.skills": "Skills", "nav.contact": "Contact", "nav.search": "Commands",
      "hero.iam": "I'm", "hero.cta1": "See my work", "hero.cta2": "Résumé", "hero.hint": "Drag the shapes. Throw them, too.",
      "about.title": "About me",
      "exp.title": "Experience", "exp.all": "All", "exp.work": "Internships", "exp.edu": "Education",
      "proj.title": "Projects", "proj.all": "All", "proj.empty": "// no projects match", "proj.demo": "Live demo", "proj.repo": "Source code",
      "skills.title": "Skills", "skills.note": "Click a skill to see what I've built with it.",
      "contact.title": "Get in touch", "contact.big": "I'm looking for a full-time software engineering role. If you have an opening, or just want to chat, drop me a line.",
      "contact.copy": "Click to copy", "contact.resume": "Résumé PDF",
      "toast.copied": "Email copied ✓", "toast.filter": "Projects using: ", "toast.egg": "You found the easter egg 🎉", "toast.lang": "Switched to English",
      "toast.dark": "Dark mode", "toast.light": "Light mode", "toast.reset": "Shapes reset",
      "foot.made": "Designed & coded by hand ©", "foot.egg": "psst… try typing \"hello\"", "foot.top": "Back to top",
      "pal.placeholder": "Type a command, or where to go…", "pal.move": "navigate", "pal.run": "run", "pal.close": "close", "pal.none": "// no matching command",
      "pal.gNav": "Go to", "pal.gAct": "Action", "pal.lang": "切換成中文", "pal.theme": "Toggle dark / light", "pal.copy": "Copy email",
      "pal.resume": "Download résumé", "pal.github": "Open GitHub", "pal.linkedin": "Open LinkedIn", "pal.party": "Throw confetti", "pal.reset": "Reset hero shapes", "pal.top": "Back to top",
      "cursor.click": "Click", "cursor.copy": "Copy", "cursor.open": "Open", "cursor.close": "Close",
    },
  };

  var root = document.documentElement;
  var listeners = {};
  var toastTimer;

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var app = {
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
    get lang() { return root.dataset.lang === "en" ? "en" : "zh"; },
    get theme() { return root.dataset.theme === "dark" ? "dark" : "light"; },

    // 介面文字
    t: function (key) {
      var v = UI[app.lang][key];
      return v != null ? v : (UI.en[key] != null ? UI.en[key] : key);
    },
    // 內容物件 {zh, en} → 目前語言的字串
    tr: function (o) {
      if (o == null) return "";
      if (typeof o === "string") return o;
      return o[app.lang] != null ? o[app.lang] : (o.en || o.zh || "");
    },
    esc: function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    },

    on: function (ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); },
    emit: function (ev, data) { (listeners[ev] || []).forEach(function (fn) { fn(data); }); },

    applyI18n: function (scope) {
      (scope || document).querySelectorAll("[data-i18n]").forEach(function (el) {
        el.textContent = app.t(el.dataset.i18n);
      });
    },
    setLang: function (l, silent) {
      root.dataset.lang = l;
      root.lang = l === "zh" ? "zh-Hant" : "en";
      store("lang", l);
      app.applyI18n();
      app.emit("lang", l);
      if (!silent) app.toast(app.t("toast.lang"));
    },
    toggleLang: function () { app.setLang(app.lang === "zh" ? "en" : "zh"); },
    setTheme: function (t, silent) {
      root.dataset.theme = t;
      store("theme", t);
      app.emit("theme", t);
      if (!silent) app.toast(app.t(t === "dark" ? "toast.dark" : "toast.light"));
    },
    toggleTheme: function () { app.setTheme(app.theme === "dark" ? "light" : "dark"); },

    toast: function (msg) {
      var el = document.getElementById("toast");
      if (!el) return;
      el.textContent = msg;
      el.classList.add("is-on");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 2200);
    },
  };
  return app;
})();
