/* =====================================================================
   網站內容都在這個檔案。改這裡就好，不需要動其他程式。
   每段文字都有 zh（中文）與 en（英文）兩個版本，右上角可切換。
   新增或修改內容後，執行 git add -A、git commit、git push 即可更新網站。
   ===================================================================== */
window.SITE = {
  meta: {
    email: "kailun20010720@gmail.com",
    github: "https://github.com/Kailunkong0720",
    linkedin: "", // 有 LinkedIn 的話貼上網址，例如 "https://www.linkedin.com/in/xxx"；留空就不顯示
    resume: "assets/resume.pdf", // 把履歷 PDF 放到 assets/ 資料夾
    updated: "2026-11",
  },

  profile: {
    name: { zh: "江凱倫", en: "Conan Kong" },
    // 首頁會輪播的身分描述
    roles: [
      { zh: "軟體工程師", en: "Software Engineer" },
      { zh: "前端開發者", en: "Frontend Developer" },
      { zh: "後端開發者", en: "Backend Developer" },
      { zh: "問題解決者", en: "Problem Solver" },
    ],
    status: { zh: "正在找全職工作", en: "Open to full-time roles" },
    location: { zh: "台北，台灣", en: "Taipei, Taiwan" },
    intro: {
      zh: "我喜歡把複雜的問題拆成乾淨、好維護的程式。從畫面到 API，我在意的是使用者真的用得順。",
      en: "I like turning messy problems into clean, maintainable code. From UI to API, I care that it actually feels good to use.",
    },
    about: [
      {
        zh: "我是江凱倫，目前就讀國立政治大學資訊科學系碩士班，預計 2027 年 1 月畢業，同時在永豐銀行實習，負責資料庫維運與內部網站開發；大學畢業於國立臺灣海洋大學資訊工程學系。",
        en: "I'm Conan Kong, a master's student in Computer Science at National Chengchi University (graduating January 2027). I'm currently an intern at Bank SinoPac, where I maintain databases and build internal web tools. I hold a bachelor's degree in Computer Science and Engineering from National Taiwan Ocean University.",
      },
      {
        zh: "研究所期間，我以深度學習分析腦部訊號，已在 IVPAI 2026 與 APSIPA ASC 2026 兩場國際研討會發表論文；實務上則累積了 .NET、MSSQL 與資料視覺化的開發經驗。",
        en: "In grad school I apply deep learning to brain signals, and have presented papers at two international conferences, IVPAI 2026 and APSIPA ASC 2026. On the industry side, I build with .NET, MSSQL and data visualization.",
      },
    ],
    facts: [
      { k: { zh: "所在地", en: "Based in" }, v: { zh: "台北", en: "Taipei" } },
      { k: { zh: "學歷", en: "Education" }, v: { zh: "政大資科碩士（預計 2027.01 畢業）", en: "M.S. CS, NCCU (exp. Jan 2027)" } },
      { k: { zh: "研究方向", en: "Research" }, v: { zh: "深度學習 · 腦訊號分析", en: "Deep learning · Brain signals" } },      { k: { zh: "語言", en: "Languages" }, v: { zh: "中文、英文", en: "Mandarin, English" } },
    ],
    photo: "assets/me.jpg", // 留空會顯示幾何圖形
  },

  // type: "work"（實習／工作） 或 "edu"（學歷）
  // 網頁上會自動依開始時間排序（新的在上面），這裡的順序不重要。
  // summary、bullets、stack 都可以留空；全部空白時，該項目就不會出現展開按鈕。
  timeline: [
    {
      type: "work",
      period: { zh: "2026.02 — 至今", en: "2026.02 — Present" },
      title: { zh: "實習生", en: "Intern" }, // 換成實際職稱，例如「資訊處 軟體開發實習生」
      org: { zh: "永豐銀行", en: "Bank SinoPac" },
      summary: {
        zh: "負責部門資料庫維運，並開發部門內部使用的控管網站。",
        en: "I maintain the department's databases and build an internal management website for the team.",
      },
      bullets: [
        { zh: "定期維護與管理部門資料庫（MSSQL）。", en: "Perform routine maintenance and administration of the department's MSSQL databases." },
        { zh: "開發部門內部的控管網站，以 .NET 建置後端並串接資料庫。", en: "Develop an internal management website with a .NET backend connected to the database." },
        { zh: "在前端以圖表儀表板（Dashboard）視覺化呈現資料。", en: "Build a frontend dashboard that visualizes the data with charts." },
      ],
      stack: [".NET", "Node.js", "MSSQL"],
    },
    {
      type: "edu",
      period: "2025.09 — 2027.01",
      title: { zh: "資訊科學系 碩士", en: "M.S. in Computer Science" },
      org: { zh: "國立政治大學", en: "National Chengchi University (NCCU)" },
      summary: { zh: "就讀中，預計 2027 年 1 月畢業。", en: "In progress, expected to graduate in January 2027." },
      // 想補充的話可以加研究室、研究主題、修課、助教經歷，例如：
      // bullets: [{ zh: "研究主題：……", en: "Research: ..." }],
      bullets: [],
      stack: [],
    },
    {
      type: "edu",
      period: "2021.09 — 2025.06",
      title: { zh: "資訊工程學系 學士", en: "B.S. in Computer Science and Engineering" },
      org: { zh: "國立臺灣海洋大學", en: "National Taiwan Ocean University (NTOU)" },
      summary: { zh: "", en: "" },
      bullets: [],
      stack: [],
    },
  ],

  // 研討會發表：論文標題一律使用英文原文
  publications: [
    {
      id: "apsipa2026",
      date: "2026.11",
      title: "EEG-Based Classification of Voter Political Preference: A Multi-Stage Comparative Study",
      venue: { zh: "第 18 屆 APSIPA 年會暨研討會（APSIPA ASC 2026）", en: "18th APSIPA Annual Summit and Conference (APSIPA ASC 2026)" },
      place: { zh: "泰國曼谷 · 2026 年 11 月 9–12 日", en: "Bangkok, Thailand · Nov 9–12, 2026" },
      kind: { zh: "論文發表", en: "Paper presentation" },
      tags: ["EEG", "Machine Learning", "Classification"],
      cert: "assets/cert-apsipa-asc-2026.pdf",
      color: "#7FD6D9",
    },
    {
      id: "ivpai2026",
      date: "2026.05",
      title: "Deep Learning-Based Classification of Brain Activation Images for Pain Type Recognition During Social and Decision-Making Activities",
      venue: { zh: "第 8 屆影像、視訊處理與人工智慧國際研討會（IVPAI 2026）", en: "8th International Conference on Image, Video Processing and Artificial Intelligence (IVPAI 2026)" },
      place: { zh: "斯里蘭卡可倫坡 · 2026 年 5 月 7–9 日", en: "Colombo, Sri Lanka · May 7–9, 2026" },
      kind: { zh: "口頭報告", en: "Oral presentation" },
      tags: ["Deep Learning", "Brain Imaging", "Classification"],
      cert: "assets/cert-ivpai-2026.pdf",
      color: "#F4A300",
    },
  ],

  // colors 用來產生封面圖形；有截圖的話填 image，例如 "assets/project-1.png"
  projects: [
    {
      id: "tw-housing-migration",
      year: "2026",
      title: { zh: "島內移動：台灣房市 × 人口遷徙", en: "Taiwan Housing × Migration Dashboard" },
      tagline: {
        zh: "把台灣的房價和人口搬遷放在同一張地圖上：房子貴到哪裡，人就往哪裡搬",
        en: "Housing prices and domestic migration in Taiwan on one map: see where homes get expensive and where people move",
      },
      description: {
        zh: "北部房價太貴，大家真的都搬走了嗎？搬去哪？這個儀表板用 2020 年至今的官方資料回答：內政部實價登錄 175 萬筆住宅交易、戶政司每月戶籍遷入遷出，加上國泰房地產指數的開價與議價率。全部是公開資料，沒有估計或模擬值；來源、處理方式與限制都寫在網站上，資料處理程式也全部公開。",
        en: "Northern Taiwan is expensive, but are people really leaving? Where do they go? This dashboard answers with official data since 2020: 1.75 million housing transactions from the actual-price registry, monthly household-registration moves, and listing prices and negotiation margins from the Cathay housing index. All data is public, with no estimates or simulations; sources, methods and limitations are documented on the site, and the data pipeline is open source.",
      },
      highlights: [
        { zh: "同時比較開價、成交價與兩者之間的議價空間，不只看成交價", en: "Compares listing prices, actual prices and the negotiation gap between them, not just sale prices" },
        { zh: "遷徙流向地圖：點任一縣市，箭頭畫出人往哪去、從哪來，箭頭越粗人越多，還能逐年播放", en: "Migration flow map: click any county to see where people go and come from; thicker arrows mean more people, with a year-by-year playback" },
        { zh: "直接算出結論並隨資料自動更新，例如：台北市 2020 年以來淨遷出 19.6 萬人，七成去了新北", en: "Computes conclusions that update with the data, e.g. Taipei has lost a net 196,000 residents since 2020, 70% of them to New Taipei" },
        { zh: "發現人口是一圈圈往外推（台北 → 新北 → 桃園 → 新竹），北部整體並未減少；拿掉台北市後，房價越高的縣市反而越吸人", en: "Shows people moving outward in rings (Taipei → New Taipei → Taoyuan → Hsinchu) while the north as a whole doesn't shrink; excluding Taipei, pricier counties actually attract more people" },
        { zh: "以 Python 處理資料，前端使用 ECharts 繪製圖表、Leaflet 繪製互動地圖，部署於 GitHub Pages", en: "Data processed with Python; charts with ECharts and interactive maps with Leaflet, deployed on GitHub Pages" },
      ],
      role: { zh: "個人專案 · 發想、資料與設計", en: "Solo project · Concept, data & design" },
      stack: ["HTML / CSS", "JavaScript", "ECharts", "Leaflet", "Python", "Git", "GitHub Pages"],
      links: {
        demo: "https://kailunkong0720.github.io/tw-housing-migration-dashboard/",
        repo: "https://github.com/Kailunkong0720/tw-housing-migration-dashboard",
      },
      colors: ["#7FD6D9", "#111111"],
      image: "assets/project-housing-dashboard.jpg",
    },
  ],

  // 技能名稱要和作品或經歷的 stack 寫法完全一樣：對到作品會篩選作品，只對到經歷會跳到該段經歷
  skills: [
    { group: { zh: "前端", en: "Frontend" }, items: ["HTML / CSS", "JavaScript"] },
    { group: { zh: "後端與資料庫", en: "Backend & database" }, items: [".NET", "Node.js", "MSSQL"] },
    { group: { zh: "資料視覺化", en: "Data visualization" }, items: ["ECharts", "Leaflet"] },
    { group: { zh: "工具與部署", en: "Tools & deployment" }, items: ["Git", "GitHub Pages"] },
  ],
};
