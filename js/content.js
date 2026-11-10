/* =====================================================================
   網站內容都在這個檔案。改這裡就好，不需要動其他程式。
   每段文字都有 zh（中文）與 en（英文）兩個版本，右上角可切換。
   目前全部是「示意內容」，請換成你自己的資料。
   ===================================================================== */
window.SITE = {
  meta: {
    email: "your.name@example.com",
    github: "https://github.com/your-id",
    linkedin: "https://www.linkedin.com/in/your-id",
    resume: "assets/resume.pdf", // 把履歷 PDF 放到 assets/ 資料夾
    updated: "2026-11",
  },

  profile: {
    name: { zh: "你的名字", en: "Your Name" },
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
        zh: "（示意）我是資訊相關科系畢業的新鮮人，在學期間做過三份實習，從前端畫面一路寫到後端服務與部署。",
        en: "(Sample) I'm a recent CS graduate. Across three internships I've worked from frontend screens down to backend services and deployment.",
      },
      {
        zh: "（示意）我習慣先理解「為什麼要做」，再決定「怎麼做」。寫程式之外，我也喜歡寫文件、做 code review，讓團隊更好合作。",
        en: "(Sample) I start with why before how. Beyond coding, I enjoy writing docs and doing code reviews so the team works better together.",
      },
    ],
    facts: [
      { k: { zh: "所在地", en: "Based in" }, v: { zh: "台北", en: "Taipei" } },
      { k: { zh: "專長", en: "Focus" }, v: { zh: "Web 全端開發", en: "Full-stack web" } },
      { k: { zh: "語言", en: "Languages" }, v: { zh: "中文、英文", en: "Mandarin, English" } },
      { k: { zh: "最近在學", en: "Learning" }, v: { zh: "系統設計", en: "System design" } },
    ],
    photo: "", // 放照片路徑，例如 "assets/me.jpg"；留空會顯示幾何圖形
  },

  // type: "work"（實習／工作） 或 "edu"（學歷）
  timeline: [
    {
      type: "work",
      period: "2026.02 — 2026.08",
      title: { zh: "後端工程實習生", en: "Backend Engineering Intern" },
      org: { zh: "公司名稱 A", en: "Company A" },
      summary: {
        zh: "（示意）負責訂單服務的 API 開發與效能調校。",
        en: "(Sample) Built and tuned APIs for the order service.",
      },
      bullets: [
        { zh: "重構查詢與加入快取，將 API 平均回應時間由 480ms 降到 120ms。", en: "Refactored queries and added caching, cutting average API latency from 480ms to 120ms." },
        { zh: "撰寫整合測試，測試覆蓋率由 45% 提升到 78%。", en: "Wrote integration tests, raising coverage from 45% to 78%." },
        { zh: "與前端、PM 協作，完成 3 個功能上線。", en: "Shipped 3 features together with frontend and PM." },
      ],
      stack: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    },
    {
      type: "work",
      period: "2025.07 — 2025.12",
      title: { zh: "前端工程實習生", en: "Frontend Engineering Intern" },
      org: { zh: "公司名稱 B", en: "Company B" },
      summary: {
        zh: "（示意）開發內部營運後台與共用元件庫。",
        en: "(Sample) Built an internal ops dashboard and a shared component library.",
      },
      bullets: [
        { zh: "建立 20+ 個可重用元件，新頁面開發時間減少約 30%。", en: "Created 20+ reusable components, reducing new-page build time by ~30%." },
        { zh: "導入效能監測，首頁 LCP 由 3.2s 改善到 1.6s。", en: "Introduced performance monitoring; improved homepage LCP from 3.2s to 1.6s." },
      ],
      stack: ["React", "TypeScript", "Vite"],
    },
    {
      type: "work",
      period: "2024.07 — 2024.09",
      title: { zh: "軟體開發實習生", en: "Software Development Intern" },
      org: { zh: "公司名稱 C", en: "Company C" },
      summary: {
        zh: "（示意）協助開發資料處理的自動化工具。",
        en: "(Sample) Helped build automation tools for data processing.",
      },
      bullets: [
        { zh: "用 Python 撰寫排程腳本，每週省下約 6 小時人工作業。", en: "Wrote scheduled Python scripts, saving ~6 hours of manual work per week." },
      ],
      stack: ["Python", "SQL", "Git"],
    },
    {
      type: "edu",
      period: "2024.09 — 2026.06",
      title: { zh: "資訊工程 碩士", en: "M.S. in Computer Science" },
      org: { zh: "學校名稱", en: "University Name" },
      summary: {
        zh: "（示意）研究主題：分散式系統。GPA 4.0 / 4.3。",
        en: "(Sample) Research topic: distributed systems. GPA 4.0 / 4.3.",
      },
      bullets: [
        { zh: "修課：演算法、作業系統、資料庫系統、雲端運算。", en: "Coursework: Algorithms, Operating Systems, Database Systems, Cloud Computing." },
      ],
      stack: [],
    },
    {
      type: "edu",
      period: "2020.09 — 2024.06",
      title: { zh: "資訊工程 學士", en: "B.S. in Computer Science" },
      org: { zh: "學校名稱", en: "University Name" },
      summary: {
        zh: "（示意）畢業專題獲系上第一名；擔任程式設計課助教。",
        en: "(Sample) Capstone ranked 1st in the department; TA for Intro to Programming.",
      },
      bullets: [
        { zh: "社團：程式設計研究社 社長。", en: "Club: President of the Programming Club." },
      ],
      stack: [],
    },
  ],

  // colors 用來產生封面圖形；有截圖的話填 image，例如 "assets/project-1.png"
  projects: [
    {
      id: "p1",
      year: "2026",
      title: { zh: "即時協作白板", en: "Realtime Whiteboard" },
      tagline: { zh: "多人同步繪圖的 Web 應用", en: "A multiplayer drawing web app" },
      description: {
        zh: "（示意）支援多人同時編輯的線上白板。自行實作同步機制與斷線重連，在 50 人同時在線下維持流暢。",
        en: "(Sample) An online whiteboard with multi-user editing. Implemented sync and reconnection myself; stays smooth with 50 concurrent users.",
      },
      highlights: [
        { zh: "以 WebSocket 實作操作同步與衝突處理", en: "Operation sync and conflict handling over WebSocket" },
        { zh: "Canvas 分層渲染，維持 60fps", en: "Layered canvas rendering at 60fps" },
      ],
      role: { zh: "個人專案 · 全端", en: "Solo project · Full-stack" },
      stack: ["TypeScript", "React", "Node.js", "WebSocket", "Redis"],
      links: { demo: "#", repo: "#" },
      colors: ["#F4A300", "#111111"],
      image: "",
    },
    {
      id: "p2",
      year: "2025",
      title: { zh: "記帳 API 服務", en: "Expense Tracker API" },
      tagline: { zh: "有完整測試與文件的 REST API", en: "A REST API with full tests and docs" },
      description: {
        zh: "（示意）提供記帳、分類、報表的後端服務。包含身分驗證、分頁、速率限制，並以 CI 自動測試與部署。",
        en: "(Sample) Backend for expenses, categories and reports. Includes auth, pagination, rate limiting, with CI for tests and deploys.",
      },
      highlights: [
        { zh: "OpenAPI 文件自動產生", en: "Auto-generated OpenAPI docs" },
        { zh: "GitHub Actions 自動測試與部署", en: "Automated tests and deploys with GitHub Actions" },
      ],
      role: { zh: "個人專案 · 後端", en: "Solo project · Backend" },
      stack: ["Python", "FastAPI", "PostgreSQL", "Docker"],
      links: { demo: "", repo: "#" },
      colors: ["#FF3B1F", "#F4F1EA"],
      image: "",
    },
    {
      id: "p3",
      year: "2025",
      title: { zh: "校園二手交易平台", en: "Campus Marketplace" },
      tagline: { zh: "四人團隊的畢業專題", en: "A four-person capstone project" },
      description: {
        zh: "（示意）讓學生刊登與搜尋二手物品的平台。我負責前端架構與搜尋功能，上線後一個月累積 800+ 使用者。",
        en: "(Sample) A platform for students to list and search second-hand items. I owned the frontend architecture and search; 800+ users in the first month.",
      },
      highlights: [
        { zh: "關鍵字與分類的即時搜尋", en: "Instant search by keyword and category" },
        { zh: "RWD 與無障礙設計", en: "Responsive and accessible UI" },
      ],
      role: { zh: "團隊專案 · 前端負責人", en: "Team project · Frontend lead" },
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      links: { demo: "#", repo: "#" },
      colors: ["#7FD6D9", "#111111"],
      image: "",
    },
    {
      id: "p4",
      year: "2024",
      title: { zh: "命令列待辦工具", en: "CLI Todo Tool" },
      tagline: { zh: "給開發者用的終端機小工具", en: "A tiny terminal tool for developers" },
      description: {
        zh: "（示意）用 Go 寫的命令列待辦清單，支援標籤、到期日與本機儲存。",
        en: "(Sample) A command-line todo list in Go with tags, due dates and local storage.",
      },
      highlights: [
        { zh: "單一執行檔，跨平台", en: "Single binary, cross-platform" },
      ],
      role: { zh: "個人專案", en: "Solo project" },
      stack: ["Go", "Git"],
      links: { demo: "", repo: "#" },
      colors: ["#111111", "#F4A300"],
      image: "",
    },
  ],

  skills: [
    { group: { zh: "語言", en: "Languages" }, items: ["TypeScript", "Python", "Go", "SQL"] },
    { group: { zh: "前端", en: "Frontend" }, items: ["React", "Vite", "HTML / CSS"] },
    { group: { zh: "後端", en: "Backend" }, items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "WebSocket"] },
    { group: { zh: "工具", en: "Tooling" }, items: ["Git", "Docker", "GitHub Actions"] },
  ],
};
