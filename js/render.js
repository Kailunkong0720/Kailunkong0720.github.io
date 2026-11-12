/* 把 content.js 的資料畫到頁面上；切換語言時會重畫並保留展開／篩選狀態。 */
(function () {
  var S = window.SITE, A = window.App, e = A.esc, tr = A.tr;
  var $ = function (id) { return document.getElementById(id); };
  var first = true;
  var state = A.state = {
    tlFilter: "all",
    projFilter: "all",
    openTl: {},
    openProj: {},
  };
  if (S.projects[0]) state.openProj[S.projects[0].id] = true;

  // 經歷依開始時間排序（新的在上面）；預設展開最新一筆有內容的項目
  function startOf(t) { var m = String(tr(t.period)).match(/(\d{4})\D?(\d{1,2})?/); return m ? +m[1] * 100 + (+m[2] || 0) : 0; }
  function hasBody(t) { return !!(tr(t.summary) || (t.bullets || []).length || (t.stack || []).length); }
  var tlOrder = S.timeline.map(function (t, i) { return i; }).sort(function (a, b) {
    return startOf(S.timeline[b]) - startOf(S.timeline[a]) || a - b;
  });
  for (var oi = 0; oi < tlOrder.length; oi++) if (hasBody(S.timeline[tlOrder[oi]])) { state.openTl[tlOrder[oi]] = true; break; }

  /* ---------- 小工具 ---------- */
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { return function () { seed = (seed + 0x6d2b79f5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function textOn(hex) {
    var n = parseInt(hex.replace("#", ""), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? "#111111" : "#f4f1ea";
  }
  var rvc = function () { return first ? " rv" : ""; };

  /* ---------- 作品封面：沒有截圖時，用作品的顏色自動產生幾何構圖 ---------- */
  A.cover = function (p) {
    if (p.image) return '<img src="' + e(p.image) + '" alt="' + e(tr(p.title)) + '" loading="lazy">';
    var c = p.colors || ["#f4a300", "#111111"], r = rng(hash(p.id + tr(p.title)));
    var pal = [c[1], "#ff3b1f", "#7fd6d9", "#f4f1ea", "#f4a300", "#111111"].filter(function (x, i, a) {
      return x.toLowerCase() !== c[0].toLowerCase() && a.indexOf(x) === i;
    });
    var pick = function (i) { return pal[i % pal.length]; };
    var cx = 90 + r() * 110, cy = 90 + r() * 90, rad = 62 + r() * 40;
    var sx = 220 + r() * 70, sy = 120 + r() * 70, ss = 80 + r() * 40, rot = Math.round(r() * 50 - 25);
    var hx = 250 + r() * 80, hy = 40 + r() * 60, hr = 36 + r() * 22;
    var dots = "", dx = 30 + r() * 40, dy = 200 + r() * 30;
    for (var i = 0; i < 4; i++) for (var j = 0; j < 3; j++) dots += '<circle cx="' + (dx + i * 18) + '" cy="' + (dy + j * 18) + '" r="3.2"/>';
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + e(tr(p.title)) + '">' +
      '<rect width="400" height="300" fill="' + c[0] + '"/>' +
      '<rect x="' + sx.toFixed(0) + '" y="' + sy.toFixed(0) + '" width="' + ss.toFixed(0) + '" height="' + ss.toFixed(0) + '" rx="14" fill="' + pick(1) + '" transform="rotate(' + rot + " " + (sx + ss / 2).toFixed(0) + " " + (sy + ss / 2).toFixed(0) + ')"/>' +
      '<circle cx="' + cx.toFixed(0) + '" cy="' + cy.toFixed(0) + '" r="' + rad.toFixed(0) + '" fill="' + pick(0) + '"/>' +
      '<path d="M' + (hx - hr).toFixed(0) + " " + hy.toFixed(0) + " a" + hr.toFixed(0) + " " + hr.toFixed(0) + " 0 0 0 " + (hr * 2).toFixed(0) + ' 0z" fill="' + pick(2) + '"/>' +
      '<circle cx="' + (cx + rad * 0.55).toFixed(0) + '" cy="' + (cy + rad * 0.6).toFixed(0) + '" r="' + (rad * 0.42).toFixed(0) + '" fill="none" stroke="' + pick(3) + '" stroke-width="9"/>' +
      '<g fill="' + pick(0) + '">' + dots + "</g></svg>";
  };

  /* ---------- 基本資料 ---------- */
  function renderBasics() {
    var p = S.profile, map = { name: p.name, status: p.status, location: p.location, intro: p.intro };
    document.querySelectorAll("[data-bind]").forEach(function (el) { el.textContent = tr(map[el.dataset.bind]); });
    document.title = tr(p.name) + " — " + tr(p.roles[0]);
    $("emailText").textContent = S.meta.email;
    $("resumeLink").href = S.meta.resume || "#";
    $("resumeLink").hidden = !S.meta.resume;
    $("footYear").textContent = new Date().getFullYear();
    var shape = $("portraitShape");
    if (p.photo) { shape.style.backgroundImage = 'url("' + p.photo + '")'; shape.classList.add("has-photo"); }
    else shape.dataset.initial = (tr(p.name) || "?").trim().charAt(0).toUpperCase();
    $("aboutText").innerHTML = p.about.map(function (x, i) { return '<p class="' + rvc().trim() + '" style="--d:' + i * 0.08 + 's">' + e(tr(x)) + "</p>"; }).join("");
    $("facts").innerHTML = p.facts.map(function (f) { return "<div><dt>" + e(tr(f.k)) + "</dt><dd>" + e(tr(f.v)) + "</dd></div>"; }).join("");
    var links = [["GitHub", S.meta.github], ["LinkedIn", S.meta.linkedin], [A.t("contact.resume"), S.meta.resume]];
    $("contactLinks").innerHTML = links.filter(function (l) { return l[1]; }).map(function (l) {
      return '<a class="linkbtn" href="' + e(l[1]) + '" target="_blank" rel="noopener" data-magnet>' + e(l[0]) + "</a>";
    }).join("");
  }

  /* ---------- 經歷時間軸 ---------- */
  function renderTimeline() {
    $("timeline").innerHTML = tlOrder.map(function (i) {
      var t = S.timeline[i], body = hasBody(t), open = body && !!state.openTl[i], out = state.tlFilter !== "all" && state.tlFilter !== t.type;
      var head = '<span class="tl__title">' + e(tr(t.title)) + '<span class="tl__type">' + A.t(t.type === "edu" ? "exp.eduOne" : "exp.workOne") + "</span></span>" +
        '<span class="tl__org">' + e(tr(t.org)) + "</span>";
      var sum = tr(t.summary), bullets = t.bullets || [], stack = t.stack || [];
      return '<li class="tl__item' + rvc() + (open ? " is-open" : "") + (out ? " is-out" : "") + '" data-type="' + t.type + '" data-i="' + i + '">' +
        '<span class="tl__period">' + e(tr(t.period)) + '</span><span class="tl__dot"></span>' +
        '<div class="tl__main' + (open ? " is-open" : "") + '">' +
        (body
          ? '<button class="tl__head" type="button" aria-expanded="' + open + '" data-toggle="tl" data-cursor="label" data-cursor-key="' + (open ? "cursor.close" : "cursor.open") + '">' +
            head + '<span class="plus" aria-hidden="true"></span></button>' +
            '<div class="fold"><div><div class="tl__body">' +
            (sum ? "<p>" + e(sum) + "</p>" : "") +
            (bullets.length ? "<ul>" + bullets.map(function (b) { return "<li>" + e(tr(b)) + "</li>"; }).join("") + "</ul>" : "") +
            (stack.length ? '<div class="tags">' + stack.map(function (s) { return '<span class="tag">' + e(s) + "</span>"; }).join("") + "</div>" : "") +
            "</div></div></div>"
          : '<div class="tl__head tl__head--static">' + head + "</div>") +
        "</div></li>";
    }).join("");
    document.querySelectorAll("#tlTabs .tab").forEach(function (b) {
      var on = b.dataset.filter === state.tlFilter;
      b.classList.toggle("is-on", on); b.setAttribute("aria-selected", on);
    });
  }

  /* ---------- 研討會發表 ---------- */
  function renderPubs() {
    var list = S.publications || [];
    $("pubList").innerHTML = list.map(function (p, i) {
      return '<li class="pub' + rvc() + '" style="--c:' + e(p.color || "#f4a300") + ";--d:" + i * 0.1 + 's">' +
        '<div class="pub__card" data-tilt>' +
        '<div class="pub__top"><span class="pub__kind">' + e(tr(p.kind)) + '</span><span class="pub__date">' + e(p.date) + "</span></div>" +
        '<h3 class="pub__title">' + e(p.title) + "</h3>" +
        '<p class="pub__venue">' + e(tr(p.venue)) + "</p>" + (tr(p.place) ? '<p class="pub__place">' + e(tr(p.place)) + "</p>" : "") +
        '<div class="tags">' + (p.tags || []).map(function (t) { return '<span class="tag">' + e(t) + "</span>"; }).join("") + "</div>" +
        (p.cert ? '<a class="linkbtn pub__cert" href="' + e(p.cert) + '" target="_blank" rel="noopener">' + A.t("pub.cert") + "</a>" : "") +
        "</div></li>";
    }).join("");
  }

  /* ---------- 作品 ---------- */
  function stackCounts() {
    var m = {};
    S.projects.forEach(function (p) { (p.stack || []).forEach(function (s) { m[s] = (m[s] || 0) + 1; }); });
    return m;
  }
  function renderProjects() {
    var counts = stackCounts(), f = state.projFilter;
    var names = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); });
    $("projFilters").innerHTML = '<button class="chip' + (f === "all" ? " is-on" : "") + '" type="button" data-pf="all">' + A.t("proj.all") + "<sup>" + S.projects.length + "</sup></button>" +
      names.map(function (n) { return '<button class="chip' + (f === n ? " is-on" : "") + '" type="button" data-pf="' + e(n) + '">' + e(n) + "<sup>" + counts[n] + "</sup></button>"; }).join("");
    var shown = 0;
    $("projectList").innerHTML = S.projects.map(function (p, i) {
      var open = !!state.openProj[p.id], out = f !== "all" && (p.stack || []).indexOf(f) < 0, c = (p.colors || ["#f4a300"])[0];
      if (!out) shown++;
      var links = "";
      if (p.links && p.links.demo) links += '<a class="linkbtn" href="' + e(p.links.demo) + '" target="_blank" rel="noopener">' + A.t("proj.demo") + "</a>";
      if (p.links && p.links.repo) links += '<a class="linkbtn" href="' + e(p.links.repo) + '" target="_blank" rel="noopener">' + A.t("proj.repo") + "</a>";
      return '<li class="proj' + (open ? " is-open" : "") + (out ? " is-out" : "") + '" data-id="' + e(p.id) + '" style="--c:' + c + ";--tc:" + textOn(c) + ";animation-delay:" + i * 0.06 + 's">' +
        '<button class="proj__head" type="button" aria-expanded="' + open + '" data-toggle="proj">' +
        '<span class="proj__num">' + ("0" + (i + 1)).slice(-2) + "</span>" +
        '<span><span class="proj__title">' + e(tr(p.title)) + '</span><span class="proj__tagline">' + e(tr(p.tagline)) + "</span></span>" +
        '<span class="proj__year">' + e(p.year) + '</span><span class="plus" aria-hidden="true"></span></button>' +
        '<div class="fold"><div><div class="proj__body"><div class="cover" data-tilt>' + A.cover(p) + "</div><div>" +
        '<p class="proj__role">' + e(tr(p.role)) + '</p><p class="proj__desc">' + e(tr(p.description)) + '</p><ul class="proj__hl">' +
        (p.highlights || []).map(function (h) { return "<li>" + e(tr(h)) + "</li>"; }).join("") + '</ul><div class="tags">' +
        (p.stack || []).map(function (s) { return '<span class="tag">' + e(s) + "</span>"; }).join("") + '</div><div class="proj__links">' + links +
        "</div></div></div></div></div></li>";
    }).join("");
    $("projEmpty").hidden = shown > 0;
    $("projFilters").hidden = S.projects.length < 2; // 只有一個作品時不需要篩選
  }

  /* ---------- 技能（點了會篩選作品，或跳到用到它的經歷） ---------- */
  function tlUsing(skill) {
    return tlOrder.filter(function (i) { return (S.timeline[i].stack || []).indexOf(skill) >= 0; });
  }
  function renderSkills() {
    var counts = stackCounts();
    $("skillsGrid").innerHTML = S.skills.map(function (g, gi) {
      return '<div class="sgroup' + rvc() + '" style="--d:' + gi * 0.07 + 's"><h3>' + e(tr(g.group)) + "</h3><ul>" + g.items.map(function (s) {
        var n = counts[s] || 0, exp = n ? 0 : tlUsing(s).length;
        return '<li><button class="skill' + (state.projFilter === s ? " is-on" : "") + '" type="button" data-skill="' + e(s) + '"' + (exp ? ' data-exp="1"' : "") + (n || exp ? "" : " disabled") + ">" + e(s) +
          (n ? "<sup>" + n + "</sup>" : exp ? '<sup class="skill__exp">' + A.t("skills.exp") + "</sup>" : "") + "</button></li>";
      }).join("") + "</ul></div>";
    }).join("");
    // 跑馬燈：有 marquee 清單就用它，否則用全部技能
    var all = (S.marquee || []).slice();
    if (!all.length) S.skills.forEach(function (g) { all = all.concat(g.items); });
    while (all.length && all.length < 12) all = all.concat(all); // 技能少時重複，跑馬燈才不會出現空白
    var one = all.map(function (s) { return "<span>" + e(s) + "<b></b></span>"; }).join("");
    $("marqueeTrack").innerHTML = one + one + one;
  }

  /* ---------- 沒有內容的區塊（作品、技能）自動隱藏，編號跟著調整 ---------- */
  function applyVisibility() {
    var hasProj = S.projects.length > 0;
    var hasSkills = S.skills.some(function (g) { return (g.items || []).length > 0; });
    var show = { projects: hasProj, skills: hasSkills, publications: (S.publications || []).length > 0 };
    Object.keys(show).forEach(function (id) {
      $(id).hidden = !show[id];
      var link = document.querySelector('[data-nav="' + id + '"]');
      if (link) link.hidden = !show[id];
    });
    $("marquee").hidden = !((S.marquee || []).length || hasSkills);
    var cta = document.querySelector(".hero__cta .btn--solid");
    if (cta) { cta.setAttribute("href", hasProj ? "#projects" : "#experience"); cta.dataset.i18n = hasProj ? "hero.cta1" : "hero.cta1b"; }
    var n = 0;
    document.querySelectorAll(".sec").forEach(function (s) {
      if (!s.hidden) s.querySelector(".sec__num").textContent = ("0" + ++n).slice(-2);
    });
  }

  function renderAll() {
    renderBasics(); renderTimeline(); renderPubs(); renderProjects(); renderSkills();
    applyVisibility();
    A.applyI18n();
    first = false;
    A.emit("render");
  }

  /* ---------- 互動：展開、分頁、篩選 ---------- */
  A.setProjFilter = function (f, scroll) {
    state.projFilter = state.projFilter === f && f !== "all" && !scroll ? "all" : f;
    renderProjects(); renderSkills(); A.emit("render");
    if (scroll) {
      document.getElementById("projects").scrollIntoView({ behavior: A.reduced ? "auto" : "smooth", block: "start" });
      if (f !== "all") A.toast(A.t("toast.filter") + f);
    }
  };
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("[data-toggle],[data-filter],[data-pf],[data-skill]");
    if (!t) return;
    if (t.dataset.toggle === "tl") {
      var li = t.closest(".tl__item"), i = li.dataset.i, open = !state.openTl[i];
      state.openTl[i] = open;
      li.classList.toggle("is-open", open); t.parentNode.classList.toggle("is-open", open);
      t.setAttribute("aria-expanded", open); t.dataset.cursorKey = open ? "cursor.close" : "cursor.open";
      A.emit("cursor-refresh", t);
    } else if (t.dataset.toggle === "proj") {
      var pj = t.closest(".proj"), id = pj.dataset.id, o = !state.openProj[id];
      state.openProj[id] = o;
      pj.classList.toggle("is-open", o); t.setAttribute("aria-expanded", o);
      A.emit("proj-toggle", pj);
    } else if (t.dataset.filter) {
      state.tlFilter = t.dataset.filter; renderTimeline(); A.emit("render");
    } else if (t.dataset.pf) {
      A.setProjFilter(t.dataset.pf, false);
    } else if (t.dataset.skill && t.dataset.exp) {
      // 只出現在經歷裡的技能：展開那段經歷並捲過去
      var idx = tlUsing(t.dataset.skill);
      idx.forEach(function (i) { state.openTl[i] = true; });
      state.tlFilter = "all"; renderTimeline(); A.emit("render");
      var li = document.querySelector('.tl__item[data-i="' + idx[0] + '"]');
      if (li) li.scrollIntoView({ behavior: A.reduced ? "auto" : "smooth", block: "center" });
      A.toast(A.t("toast.exp") + t.dataset.skill);
    } else if (t.dataset.skill && !t.disabled) {
      A.setProjFilter(t.dataset.skill, true);
    }
  });

  A.on("lang", renderAll);
  renderAll();

  // 履歷 PDF 還沒放進 assets/ 時，先隱藏「下載履歷」相關按鈕；放進去之後會自動出現
  if (S.meta.resume && location.protocol !== "file:" && window.fetch) {
    fetch(S.meta.resume, { method: "HEAD", cache: "no-cache" }).then(function (r) {
      if (!r.ok) { S.meta.resume = ""; renderBasics(); A.emit("render"); }
    }, function () {});
  }
})();
