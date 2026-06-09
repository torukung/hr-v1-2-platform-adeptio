/* Web Staff Portal — desktop self-service ESS
   Single-tenant, EN/LO bilingual, deep-navy + cream paper aesthetic
   Loaded by Web Staff Portal.html
*/

const SW = (() => {
  /* ---------- Icon set (stroke 1.7) ---------- */
  const ICONS = {
    home:    <><path d="M3 11l9-7 9 7M5 10v10h14V10" /></>,
    user:    <><circle cx="12" cy="9" r="3.6" /><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" /></>,
    pay:     <><rect x="3.5" y="6" width="17" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /></>,
    leave:   <><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3.5v3M16 3.5v3M8 13l2 2 4-4" /></>,
    claim:   <><rect x="3.5" y="6" width="17" height="13" rx="2" /><path d="M3.5 10h17M7 14h3M7 16.5h5" /></>,
    vault:   <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><circle cx="14" cy="12" r="2.6" /><path d="M14 9.5v-1M7 10v4" /></>,
    chat:    <><path d="M4 5h16v11H8l-4 4z" /></>,
    book:    <><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z" /></>,
    bell:    <><path d="M6 9.5a6 6 0 0 1 12 0V14l1.5 2.5h-15L6 14V9.5z" /><path d="M9.5 19a2.5 2.5 0 0 0 5 0" /></>,
    search:  <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></>,
    plus:    <><path d="M12 5v14M5 12h14" /></>,
    chev:    <><path d="M9 6l6 6-6 6" /></>,
    chevD:   <><path d="M6 9l6 6 6-6" /></>,
    chevR:   <><path d="M9 6l6 6-6 6" /></>,
    check:   <><path d="M5 12l5 5L20 7" /></>,
    x:       <><path d="M6 6l12 12M6 18L18 6" /></>,
    clock:   <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
    flag:    <><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></>,
    download:<><path d="M12 4v11M7 11l5 5 5-5M5 19h14" /></>,
    file:    <><path d="M14 3H6v18h12V7zM14 3v4h4" /></>,
    upload:  <><path d="M12 19V8M7 12l5-5 5 5M5 4h14" /></>,
    arrow:   <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></>,
    dot:     <><circle cx="12" cy="12" r="3" /></>,
    target:  <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /></>,
    pin:     <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>,
    bank:    <><path d="M3 10l9-5 9 5M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18" /></>,
    cog:     <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
    grid:    <><rect x="3.5" y="3.5" width="7" height="7" /><rect x="13.5" y="3.5" width="7" height="7" /><rect x="3.5" y="13.5" width="7" height="7" /><rect x="13.5" y="13.5" width="7" height="7" /></>,
    cal:     <><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3.5v3M16 3.5v3" /></>,
    phone:   <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 19h2" /></>,
    logout:  <><path d="M14 4h5v16h-5M14 12H4M8 8l-4 4 4 4" /></>,
    edit:    <><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" /></>,
    chip:    <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 8h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16" /></>,
    flow:    <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="3" width="6" height="6" rx="1.5" /><rect x="9" y="15" width="6" height="6" rx="1.5" /><path d="M9 6h6M12 9v6" /></>,
    book2:   <><path d="M4 5h7a3 3 0 0 1 3 3v12H7a3 3 0 0 1-3-3z" /><path d="M14 8a3 3 0 0 1 3-3h3v15h-3a3 3 0 0 0-3 3" /></>,
  };
  const I = ({ n, s = 16, c = "currentColor", w = 1.7 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{ICONS[n]}</svg>
  );

  /* ---------- Mock identity + data ---------- */
  const ME = {
    id: "EMP-00427",
    nameEn: "Souksavanh Phommachanh",
    nameLo: "ສຸກສະຫວັນ ພົມມະຈັນ",
    title: "Senior Production Supervisor",
    titleLo: "ຫົວໜ້າຝ່າຍຜະລິດອາວຸໂສ",
    division: "Savannakhet Plant",
    divisionLo: "ໂຮງງານ ສະຫວັນນະເຂດ",
    department: "Bottling Line A",
    manager: "Khamla Chanthavong",
    joined: "2017-03-14",
    email: "souksavanh.p@laobev.la",
    phone: "+856 20 5544 0127",
    bank: "BCEL · ····8821",
    nssf: "12-04-1985-0427",
    pit: "TIN 5500-04-0427",
    avatar: "SP",
  };

  const REQUESTS = [
    { id: "LV-2025-0814", kind: "Annual Leave", lo: "ລາພັກ", date: "Aug 14–16", days: 3, status: "approved",  step: "All approvers signed", t: "Aug 02" },
    { id: "OT-2025-0801", kind: "Overtime",     lo: "ລ່ວງເວລາ", date: "Aug 01 · 4h", days: null, status: "approved", step: "Posted to payroll", t: "Aug 01" },
    { id: "EX-2025-0734", kind: "Travel claim", lo: "ຂໍອະນຸມັດເບີກ", date: "Vientiane site visit", days: null, status: "review", step: "Finance · Sengthong", t: "Jul 30" },
    { id: "MC-2025-0720", kind: "Sick leave",   lo: "ລາປ່ວຍ", date: "Jul 18 (1d)", days: 1, status: "approved", step: "MC verified by clinic", t: "Jul 19" },
    { id: "LT-2025-0701", kind: "Letter request", lo: "ໜັງສືຮັບຮອງ", date: "Salary cert · embassy", days: null, status: "draft", step: "Awaiting your e-signature", t: "Jul 29" },
  ];

  const PAY_HISTORY = [
    { m: "Jul 2025", gross: 9_650_000, net: 8_124_500, pit: 824_500, nssf: 451_000, pf: 250_000, ot: 320_000 },
    { m: "Jun 2025", gross: 9_330_000, net: 7_896_400, pit: 786_600, nssf: 451_000, pf: 250_000, ot: 0 },
    { m: "May 2025", gross: 9_330_000, net: 7_896_400, pit: 786_600, nssf: 451_000, pf: 250_000, ot: 0 },
    { m: "Apr 2025", gross: 9_510_000, net: 8_038_200, pit: 802_800, nssf: 451_000, pf: 250_000, ot: 180_000 },
    { m: "Mar 2025", gross: 9_330_000, net: 7_896_400, pit: 786_600, nssf: 451_000, pf: 250_000, ot: 0 },
    { m: "Feb 2025", gross: 9_330_000, net: 7_896_400, pit: 786_600, nssf: 451_000, pf: 250_000, ot: 0 },
  ];

  const ANNOUNCEMENTS = [
    { tag: "Policy",    en: "Updated overtime policy effective Sept 1, 2025", lo: "ນະໂຍບາຍລ່ວງເວລາສະບັບປັບປຸງມີຜົນວັນທີ 1 ກັນຍາ 2025", date: "Aug 03", divisionTag: "All divisions" },
    { tag: "Holiday",   en: "Boun Haw Khao Padap Dinh — Sept 6 (paid holiday)", lo: "ບຸນຫໍ່ເຂົ້າປະດັບດິນ — ວັນທີ 6 ກັນຍາ (ມື້ພັກລັດຖະການ)", date: "Aug 02", divisionTag: "Lao operations" },
    { tag: "Recognition", en: "Q2 Safety Champions announced — Bottling Line A", lo: "ປະກາດແຊ້ມຄວາມປອດໄພໄຕມາດ 2 — ສາຍບັນຈຸຂວດ A", date: "Aug 01", divisionTag: "Savannakhet" },
    { tag: "Training",  en: "GMP refresher for production staff — Aug 22", lo: "ຝຶກອົບຮົມ GMP ສຳລັບພະນັກງານຜະລິດ — 22 ສິງຫາ", date: "Jul 30", divisionTag: "Production" },
  ];

  const HOLIDAYS_LAO = {
    8:  [], // Aug
    9:  [{ d: 6, en: "Boun Haw Khao Padap Dinh", lo: "ບຸນຫໍ່ເຂົ້າປະດັບດິນ" }, { d: 20, en: "Boun Haw Khao Salak", lo: "ບຸນຫໍ່ເຂົ້າສະຫຼາກ" }],
    10: [{ d: 7, en: "Boun Awk Phansa", lo: "ບຸນອອກພັນສາ" }, { d: 8, en: "Boun Suang Heua", lo: "ບຸນຊ່ວງເຮືອ" }],
    12: [{ d: 2, en: "Lao National Day", lo: "ວັນຊາດລາວ" }],
  };

  const TICKETS = [
    { id: "HD-3142", subj: "Provident fund balance not visible", subjLo: "ຍອດກອງທຶນສຳຮອງລ້ຽງຊີບບໍ່ສະແດງ", cat: "Pay & Statutory", status: "open",     sla: "4h 12m", agent: "Phetdara V.", t: "2h ago" },
    { id: "HD-3128", subj: "Update emergency contact", subjLo: "ປັບປຸງຜູ້ຕິດຕໍ່ສຸກເສີນ", cat: "Profile", status: "resolved", sla: "—", agent: "Auto-routed", t: "Yesterday" },
    { id: "HD-3097", subj: "Salary certificate for housing loan", subjLo: "ໜັງສືຮັບຮອງເງິນເດືອນສຳລັບກູ້ຢືມບ້ານ", cat: "Documents", status: "resolved", sla: "—", agent: "HR Front Desk",  t: "Jul 21" },
  ];

  const COURSES = [
    { id: "L-201", t: "GMP Refresher 2025", lo: "ຝຶກອົບຮົມ GMP 2025", due: "Aug 22", progress: 64, mins: 45 },
    { id: "L-184", t: "Forklift Recertification", lo: "ຕໍ່ໃບອະນຸຍາດຂັບລົດຍົກ", due: "Sept 10", progress: 0, mins: 90 },
    { id: "L-152", t: "Cybersecurity Essentials", lo: "ພື້ນຖານຄວາມປອດໄພໄຊເບີ", due: "Completed", progress: 100, mins: 30 },
    { id: "L-120", t: "Anti-Bribery Annual Attest", lo: "ການຢັ້ງຢືນຕ້ານການຕິດສິນບົນ", due: "Dec 31", progress: 0, mins: 20 },
  ];

  const PERFORMANCE = {
    cycle: "H2 2025",
    selfDue: "Sept 30",
    objectives: [
      { t: "Reduce line A downtime to <3.5%", lo: "ຫຼຸດເວລາຢຸດສາຍ A ໃຫ້ <3.5%", weight: 30, progress: 78 },
      { t: "Train 6 new operators on SOP-12", lo: "ຝຶກພະນັກງານໃໝ່ 6 ຄົນ SOP-12", weight: 25, progress: 50 },
      { t: "Zero recordable safety incidents", lo: "ບໍ່ມີເຫດການຄວາມປອດໄພ", weight: 25, progress: 100 },
      { t: "Implement OEE dashboard for shift leads", lo: "ຕິດຕັ້ງ Dashboard OEE", weight: 20, progress: 30 },
    ],
  };

  const CLAIM_HISTORY = [
    { id: "EX-0734", t: "Vientiane site visit",   lo: "ໄປສະຖານທີ່ ວຽງຈັນ", amt: 1_240_000, status: "review",  date: "Jul 30" },
    { id: "EX-0712", t: "Client dinner — partner", lo: "ຄ່າຮັບຮອງລູກຄ້າ", amt: 680_000,   status: "approved", date: "Jul 22" },
    { id: "EX-0701", t: "Mobile data top-up Q3",   lo: "ຄ່າອິນເຕີເນັດ ໄຕມາດ 3", amt: 360_000, status: "approved", date: "Jul 14" },
    { id: "EX-0688", t: "Stationery — line office", lo: "ເຄື່ອງຂຽນ ຫ້ອງສາຍຜະລິດ", amt: 180_000,  status: "approved", date: "Jul 02" },
  ];

  const fmtLAK = (n) => "₭ " + n.toLocaleString("en-US");

  /* ---------- Top bar ---------- */
  function TopBar({ lang, setLang, route, setRoute }) {
    return (
      <div className="topbar">
        <div className="topbar-left">
          <button className="search">
            <I n="search" s={15} c="#8B8E99" />
            <span>Search people, requests, policies…</span>
            <kbd>⌘K</kbd>
          </button>
        </div>
        <div className="topbar-right">
          <button className="tb-btn" title="What's new">
            <I n="sparkle" s={15} />
            <span>What's new</span>
          </button>
          <div className="lang-switch">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={lang === "lo" ? "on lao" : "lao"} onClick={() => setLang("lo")}>ລາວ</button>
          </div>
          <button className="tb-icon" title="Notifications">
            <I n="bell" s={17} />
            <i className="dot" />
          </button>
          <div className="tb-me" onClick={() => setRoute("profile")}>
            <div className="av">{ME.avatar}</div>
            <div className="tb-me-meta">
              <div className="nm">{ME.nameEn.split(" ")[0]}</div>
              <div className="rl">{ME.title.split(" ").slice(0, 2).join(" ")}</div>
            </div>
            <I n="chevD" s={14} c="#8B8E99" />
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Sidebar ---------- */
  const NAV = [
    { id: "home",     label: "Home",            lo: "ໜ້າຫຼັກ",         icon: "home" },
    { id: "profile",  label: "My Profile",      lo: "ຂໍ້ມູນສ່ວນຕົວ",     icon: "user" },
    { id: "pay",      label: "Pay & Tax",       lo: "ເງິນເດືອນ & ພາສີ",  icon: "pay" },
    { id: "leave",    label: "Time & Leave",    lo: "ເວລາ & ການລາ",     icon: "leave" },
    { id: "claims",   label: "Claims",          lo: "ການເບີກຈ່າຍ",      icon: "claim" },
    { id: "docs",     label: "Documents",       lo: "ເອກະສານ",         icon: "vault" },
    { id: "helpdesk", label: "HR Helpdesk",     lo: "ຊ່ວຍເຫຼືອ HR",     icon: "chat" },
    { id: "learn",    label: "Learning",        lo: "ການຮຽນຮູ້",        icon: "book2" },
    { id: "perf",     label: "Performance",     lo: "ການປະເມີນ",       icon: "target" },
  ];

  function Sidebar({ route, setRoute, lang }) {
    return (
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <span className="serif">L</span>
          </div>
          <div className="brand-meta">
            <div className="brand-t">Lao Beverage Co.</div>
            <div className="brand-s">Workplace · ESS</div>
          </div>
        </div>

        <div className="me-card">
          <div className="me-av">{ME.avatar}</div>
          <div className="me-meta">
            <div className="me-nm">{lang === "en" ? ME.nameEn : ME.nameLo}</div>
            <div className="me-rl">{lang === "en" ? ME.title : ME.titleLo}</div>
            <div className="me-id mono">{ME.id}</div>
          </div>
        </div>

        <nav className="nav">
          {NAV.map(n => (
            <button key={n.id} className={"nv" + (route === n.id ? " on" : "")} onClick={() => setRoute(n.id)}>
              <I n={n.icon} s={16} />
              <span>{lang === "en" ? n.label : n.lo}</span>
              {n.id === "helpdesk" && <span className="badge">2</span>}
              {n.id === "leave" && <span className="badge sm">1</span>}
            </button>
          ))}
        </nav>

        <div className="side-foot">
          <button className="nv soft" onClick={() => setRoute("settings")}>
            <I n="cog" s={16} /><span>{lang === "en" ? "Settings" : "ການຕັ້ງຄ່າ"}</span>
          </button>
          <button className="nv soft">
            <I n="logout" s={16} /><span>{lang === "en" ? "Sign out" : "ອອກລະບົບ"}</span>
          </button>
          <div className="side-tag">
            <I n="phone" s={11} c="#8B8E99" />
            <span>Mobile app: scan from <a href="#">QR</a></span>
          </div>
        </div>
      </aside>
    );
  }

  /* ---------- Tiny components ---------- */
  const Pill = ({ tone = "default", children }) => <span className={"pill " + tone}>{children}</span>;
  const StatusPill = ({ s }) => {
    const map = {
      approved: ["positive", "Approved"],
      review:   ["warning",  "In review"],
      draft:    ["accent",   "Draft"],
      open:     ["warning",  "Open"],
      resolved: ["positive", "Resolved"],
    };
    const [tone, label] = map[s] || ["default", s];
    return <Pill tone={tone}>{label}</Pill>;
  };

  /* ---------- Pages ---------- */
  function PageHeader({ eyebrow, title, sub, right }) {
    return (
      <div className="page-h">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="page-t">{title}</h1>
          {sub && <div className="page-s">{sub}</div>}
        </div>
        {right && <div className="page-r">{right}</div>}
      </div>
    );
  }

  /* ---------- HOME ---------- */
  function HomePage({ lang, setRoute }) {
    const today = new Date();
    const greet = today.getHours() < 12 ? "Good morning" : today.getHours() < 17 ? "Good afternoon" : "Good evening";
    const greetLo = today.getHours() < 12 ? "ສະບາຍດີຕອນເຊົ້າ" : today.getHours() < 17 ? "ສະບາຍດີຕອນບ່າຍ" : "ສະບາຍດີຕອນແລງ";
    const [clockedIn, setClockedIn] = React.useState(true);

    return (
      <div className="page">
        {/* Hero band */}
        <div className="hero">
          <div className="hero-l">
            <div className="hero-eyebrow">{today.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
            <h1 className="hero-greet">
              <span className="serif italic">{lang === "en" ? greet : greetLo},</span>{" "}
              <span className="serif italic accent">{lang === "en" ? ME.nameEn.split(" ")[0] : ME.nameLo.split(" ")[0]}</span>
            </h1>
            <div className="hero-sub">
              {lang === "en"
                ? `You have 2 items needing attention · ${REQUESTS.filter(r => r.status === "review" || r.status === "draft").length} pending requests`
                : `ມີ 2 ລາຍການທີ່ຕ້ອງການຄວາມສົນໃຈ · ${REQUESTS.filter(r => r.status === "review" || r.status === "draft").length} ການຮ້ອງຂໍຄ້າງຢູ່`}
            </div>
          </div>

          <div className="hero-r">
            <div className="clock-card">
              <div className="cc-l">
                <div className="cc-eyebrow">{lang === "en" ? "Today's shift" : "ວຽງເຮັດວຽກມື້ນີ້"}</div>
                <div className="cc-time mono">07:48 → 16:30</div>
                <div className="cc-meta">{lang === "en" ? "Bottling Line A · Shift 1" : "ສາຍບັນຈຸ A · ກະທີ 1"}</div>
              </div>
              <button className={"cc-btn " + (clockedIn ? "on" : "")} onClick={() => setClockedIn(!clockedIn)}>
                <span className="cc-dot" />
                <span>{clockedIn ? (lang === "en" ? "Clocked in 07:46" : "ເຂົ້າວຽກ 07:46") : (lang === "en" ? "Clock in" : "ເຂົ້າວຽກ")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action banner row */}
        <div className="alerts">
          <div className="alert">
            <div className="al-mark warning"><I n="flag" s={14} /></div>
            <div className="al-body">
              <div className="al-t">{lang === "en" ? "Sign salary certificate draft" : "ເຊັນເອກະສານໃບຮັບຮອງເງິນເດືອນ"}</div>
              <div className="al-s">{lang === "en" ? "Letter LT-2025-0701 awaits your e-signature for embassy." : "ໜັງສື LT-2025-0701 ຕ້ອງການລາຍເຊັນເອເລັກໂທຣນິກຂອງທ່ານ."}</div>
            </div>
            <button className="al-btn">{lang === "en" ? "Open" : "ເປີດ"} <I n="arrow" s={13} /></button>
          </div>
          <div className="alert">
            <div className="al-mark positive"><I n="check" s={14} /></div>
            <div className="al-body">
              <div className="al-t">{lang === "en" ? "Annual leave Aug 14–16 approved" : "ລາພັກ 14–16 ສິງຫາ ໄດ້ຮັບອະນຸມັດແລ້ວ"}</div>
              <div className="al-s">{lang === "en" ? "Cover assigned: Bounmy Vongphachanh." : "ຜູ້ຮັບແທນ: ບຸນມີ ວົງພະຈັນ."}</div>
            </div>
            <button className="al-btn ghost">{lang === "en" ? "Details" : "ລາຍລະອຽດ"}</button>
          </div>
        </div>

        {/* Big grid */}
        <div className="home-grid">
          {/* Row 1 — KPI tiles */}
          <div className="ktile col-3">
            <div className="kt-l">{lang === "en" ? "Net pay · July" : "ເງິນສຸດທິ · ກໍລະກົດ"}</div>
            <div className="kt-v serif italic">₭ 8,124,500</div>
            <div className="kt-s">+₭ 228,100 vs Jun · <a onClick={() => setRoute("pay")}>View payslip →</a></div>
          </div>
          <div className="ktile col-3">
            <div className="kt-l">{lang === "en" ? "Annual leave balance" : "ຍອດລາພັກປະຈຳປີ"}</div>
            <div className="kt-v serif italic">12.5 <span className="kt-u">/ 18 days</span></div>
            <div className="kt-bar"><div className="kt-bar-fill" style={{ width: "69%" }} /></div>
          </div>
          <div className="ktile col-3">
            <div className="kt-l">{lang === "en" ? "Tenure" : "ໄລຍະເວລາເຮັດວຽກ"}</div>
            <div className="kt-v serif italic">8y 5m</div>
            <div className="kt-s">{lang === "en" ? "Joined Mar 2017 · Senior tier" : "ເຂົ້າມີນາ 2017 · ລະດັບອາວຸໂສ"}</div>
          </div>
          <div className="ktile col-3">
            <div className="kt-l">{lang === "en" ? "Performance · H1" : "ການປະເມີນ · ໄລຍະ 1"}</div>
            <div className="kt-v serif italic">4.2<span className="kt-u">/5</span></div>
            <div className="kt-s">{lang === "en" ? "H2 self-review opens Sept 1" : "ປະເມີນຕົວເອງ ໄລຍະ 2 ເປີດ 1 ກັນຍາ"}</div>
          </div>

          {/* Row 2 — Quick actions */}
          <div className="card col-8">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Quick actions" : "ການກະທຳດ່ວນ"}</div>
              <div className="card-s">{lang === "en" ? "Most common self-service tasks" : "ການບໍລິການຕົວເອງທີ່ໃຊ້ບໍ່ຍຸດ"}</div>
            </div>
            <div className="qa-grid">
              {[
                { ic: "leave", t: "Apply leave",       lo: "ຍື່ນລາ",        c: "C", to: "leave" },
                { ic: "clock", t: "Log overtime",      lo: "ບັນທຶກ OT",      c: "C", to: "leave" },
                { ic: "claim", t: "Submit expense",    lo: "ຂໍເບີກຄ່າໃຊ້ຈ່າຍ", c: "D", to: "claims" },
                { ic: "pay",   t: "Salary advance",    lo: "ຂໍເງິນລ່ວງໜ້າ",   c: "B", to: "pay" },
                { ic: "file",  t: "Request letter",    lo: "ຂໍໜັງສືຮັບຮອງ",   c: "F", to: "docs" },
                { ic: "user",  t: "Update profile",    lo: "ປັບຂໍ້ມູນ",      c: "A", to: "profile" },
                { ic: "chat",  t: "Open ticket",       lo: "ຂໍຊ່ວຍເຫຼືອ",     c: "E", to: "helpdesk" },
                { ic: "book2", t: "Browse training",   lo: "ຄອສຮຽນ",        c: "B", to: "learn" },
              ].map((q, i) => (
                <button key={i} className="qa" onClick={() => setRoute(q.to)}>
                  <div className={"qa-ic c-" + q.c}><I n={q.ic} s={18} /></div>
                  <div className="qa-t">{lang === "en" ? q.t : q.lo}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2b — Today */}
          <div className="card col-4">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "On your team today" : "ທີມງານມື້ນີ້"}</div>
              <div className="card-s">{lang === "en" ? "Bottling Line A · 14 people" : "ສາຍ A · 14 ຄົນ"}</div>
            </div>
            <div className="team-strip">
              {[
                { i: "BV", n: "Bounmy V.",   s: "Working" },
                { i: "PT", n: "Phetdara T.", s: "Working" },
                { i: "KC", n: "Khamla C.",   s: "Working" },
                { i: "SH", n: "Sengthong H.", s: "On leave" },
                { i: "VL", n: "Vilakhone L.", s: "On leave" },
                { i: "AS", n: "Aphone S.", s: "Working" },
                { i: "+8", n: "8 more", s: "" },
              ].map((p, i) => (
                <div key={i} className={"tp " + (p.s === "On leave" ? "off" : "")}>
                  <div className="tp-av">{p.i}</div>
                  <div className="tp-n">{p.n}</div>
                  {p.s && <div className="tp-s">{p.s}</div>}
                </div>
              ))}
            </div>
            <div className="card-foot">
              <div className="row-tag">
                <span className="dot pos" />
                <span>{lang === "en" ? "12 working" : "ກຳລັງເຮັດວຽກ 12"}</span>
              </div>
              <div className="row-tag">
                <span className="dot warn" />
                <span>{lang === "en" ? "2 on leave" : "ລາ 2"}</span>
              </div>
            </div>
          </div>

          {/* Row 3 — My requests */}
          <div className="card col-8">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "My requests" : "ການຮ້ອງຂໍຂອງຂ້ອຍ"}</div>
              <a className="card-act">{lang === "en" ? "View all" : "ເບິ່ງທັງໝົດ"}</a>
            </div>
            <table className="tbl">
              <thead>
                <tr>
                  <th style={{ width: 130 }}>ID</th>
                  <th>{lang === "en" ? "Request" : "ປະເພດ"}</th>
                  <th>{lang === "en" ? "When" : "ເມື່ອໃດ"}</th>
                  <th>{lang === "en" ? "Step" : "ຂັ້ນຕອນ"}</th>
                  <th>{lang === "en" ? "Status" : "ສະຖານະ"}</th>
                </tr>
              </thead>
              <tbody>
                {REQUESTS.map(r => (
                  <tr key={r.id}>
                    <td><span className="mono small">{r.id}</span></td>
                    <td>
                      <div className="cell-stack">
                        <span>{r.kind}</span>
                        <span className="lao muted">{r.lo}</span>
                      </div>
                    </td>
                    <td>{r.date}</td>
                    <td className="muted">{r.step}</td>
                    <td><StatusPill s={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Row 3b — Statutory */}
          <div className="card col-4 statu">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Your statutory" : "ສະຖານະຕາມກົດໝາຍ"}</div>
              <div className="card-s">{lang === "en" ? "PIT, NSSF, Provident Fund" : "ພາສີລາຍໄດ້, ປະກັນສັງຄົມ, ກອງທຶນ"}</div>
            </div>
            <div className="kv">
              <span className="k">{lang === "en" ? "PIT YTD withheld" : "ພາສີຫັກຮອດ"}</span>
              <span className="v mono">₭ 5,773,800</span>
            </div>
            <div className="kv">
              <span className="k">{lang === "en" ? "NSSF YTD" : "NSSF ຮອດ"}</span>
              <span className="v mono">₭ 3,157,000</span>
            </div>
            <div className="kv">
              <span className="k">{lang === "en" ? "Provident Fund balance" : "ກອງທຶນສຳຮອງ"}</span>
              <span className="v mono">₭ 18,420,300</span>
            </div>
            <div className="kv">
              <span className="k">{lang === "en" ? "TIN" : "ເລກຜູ້ເສຍພາສີ"}</span>
              <span className="v mono">{ME.pit.replace("TIN ", "")}</span>
            </div>
            <div className="kv">
              <span className="k">{lang === "en" ? "NSSF #" : "NSSF #"}</span>
              <span className="v mono">{ME.nssf}</span>
            </div>
            <div className="card-foot end">
              <a className="lk">50 Tawi {lang === "en" ? "summary" : "ສະຫຼຸບ"} <I n="arrow" s={13} /></a>
            </div>
          </div>

          {/* Row 4 — Announcements */}
          <div className="card col-8">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Announcements" : "ປະກາດ"}</div>
              <a className="card-act">{lang === "en" ? "Open communications" : "ເບິ່ງການແຈ້ງເຕືອນ"}</a>
            </div>
            <ul className="ann">
              {ANNOUNCEMENTS.map((a, i) => (
                <li key={i} className="ann-i">
                  <Pill tone={a.tag === "Policy" ? "primary" : a.tag === "Holiday" ? "accent" : a.tag === "Recognition" ? "positive" : "default"}>{a.tag}</Pill>
                  <div className="ann-body">
                    <div className="ann-t">{a.en}</div>
                    <div className="ann-lo lao">{a.lo}</div>
                  </div>
                  <div className="ann-meta">
                    <div>{a.divisionTag}</div>
                    <div className="muted">{a.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Row 4b — Learning teaser */}
          <div className="card col-4">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Learning due" : "ຄອສທີ່ໃກ້ກຳນົດ"}</div>
              <a className="card-act" onClick={() => setRoute("learn")}>{lang === "en" ? "All courses" : "ທຸກຄອສ"}</a>
            </div>
            <ul className="lrn">
              {COURSES.slice(0, 3).map(c => (
                <li key={c.id} className="lrn-i">
                  <div className="lrn-t">
                    <div>{c.t}</div>
                    <div className="lao muted">{c.lo}</div>
                  </div>
                  <div className="lrn-bar"><div className="lrn-fill" style={{ width: c.progress + "%" }} /></div>
                  <div className="lrn-meta">
                    <span className="muted">{c.due}</span>
                    <span className="mono">{c.progress}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- PROFILE ---------- */
  function ProfilePage({ lang }) {
    return (
      <div className="page">
        <PageHeader
          eyebrow={lang === "en" ? "Personal · Cluster A" : "ສ່ວນຕົວ · ກຸ່ມ A"}
          title={lang === "en" ? "My Profile" : "ຂໍ້ມູນສ່ວນຕົວ"}
          sub={lang === "en" ? "Personal data, addresses, contacts, banking, emergency, ID documents." : "ຂໍ້ມູນສ່ວນຕົວ, ທີ່ຢູ່, ຜູ້ຕິດຕໍ່, ທະນາຄານ, ສຸກເສີນ, ເອກະສານຢັ້ງຢືນ."}
          right={<button className="btn primary"><I n="edit" s={14} /> {lang === "en" ? "Request change" : "ຂໍແກ້ໄຂ"}</button>}
        />

        <div className="grid-2">
          {/* Left: identity card */}
          <div className="card">
            <div className="profile-head">
              <div className="profile-av">{ME.avatar}</div>
              <div>
                <div className="profile-nm">{lang === "en" ? ME.nameEn : ME.nameLo}</div>
                <div className="profile-rl">{lang === "en" ? ME.title : ME.titleLo}</div>
                <div className="profile-id">
                  <span className="mono">{ME.id}</span>
                  <span className="sep" />
                  <span>{lang === "en" ? ME.division : ME.divisionLo}</span>
                </div>
              </div>
            </div>

            <div className="dl">
              <div className="dl-grp">
                <div className="dl-h">{lang === "en" ? "Personal" : "ສ່ວນຕົວ"}</div>
                <div className="dl-r"><span>{lang === "en" ? "Full name (EN)" : "ຊື່ເຕັມ (EN)"}</span><span>{ME.nameEn}</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Full name (LO)" : "ຊື່ເຕັມ (LO)"}</span><span className="lao">{ME.nameLo}</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Date of birth" : "ວັນເດືອນປີເກີດ"}</span><span>14 Mar 1985</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Nationality" : "ສັນຊາດ"}</span><span>Lao PDR</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Gender" : "ເພດ"}</span><span>Male</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Marital" : "ສະຖານະຄອບຄົວ"}</span><span>Married · 2 children</span></div>
              </div>

              <div className="dl-grp">
                <div className="dl-h">{lang === "en" ? "Contact" : "ຕິດຕໍ່"}</div>
                <div className="dl-r"><span>{lang === "en" ? "Email" : "ອີເມວ"}</span><span>{ME.email}</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Mobile" : "ມືຖື"}</span><span className="mono">{ME.phone}</span></div>
                <div className="dl-r"><span>WhatsApp / LINE</span><span>+856 20 5544 0127</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Address" : "ທີ່ຢູ່"}</span><span>Ban Nongbouathong, Kaysone Phomvihane, Savannakhet</span></div>
              </div>

              <div className="dl-grp">
                <div className="dl-h">{lang === "en" ? "Emergency" : "ສຸກເສີນ"}</div>
                <div className="dl-r"><span>{lang === "en" ? "Contact" : "ຜູ້ຕິດຕໍ່"}</span><span>Vilayphone Phommachanh (spouse)</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Phone" : "ໂທ"}</span><span className="mono">+856 20 9990 1188</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Blood type" : "ກຸ່ມເລືອດ"}</span><span>O+</span></div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="grid-stack">
            <div className="card">
              <div className="card-h">
                <div className="card-t">{lang === "en" ? "Employment" : "ການຈ້າງງານ"}</div>
              </div>
              <div className="dl">
                <div className="dl-r"><span>{lang === "en" ? "Employee ID" : "ID ພະນັກງານ"}</span><span className="mono">{ME.id}</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Joined" : "ເຂົ້າວຽກ"}</span><span>{ME.joined}</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Employment type" : "ປະເພດການຈ້າງ"}</span><span>Permanent · Full-time</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Manager" : "ຫົວໜ້າ"}</span><span>{ME.manager}</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Cost center" : "ສູນຄ່າໃຊ້ຈ່າຍ"}</span><span className="mono">CC-SVK-PROD-A</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Work location" : "ສະຖານທີ່"}</span><span>Savannakhet Plant</span></div>
              </div>
            </div>

            <div className="card">
              <div className="card-h">
                <div className="card-t">{lang === "en" ? "Banking & statutory" : "ທະນາຄານ & ກົດໝາຍ"}</div>
              </div>
              <div className="dl">
                <div className="dl-r"><span>{lang === "en" ? "Salary bank" : "ທະນາຄານ"}</span><span>{ME.bank}</span></div>
                <div className="dl-r"><span>NSSF</span><span className="mono">{ME.nssf}</span></div>
                <div className="dl-r"><span>{lang === "en" ? "PIT (TIN)" : "ພາສີ (TIN)"}</span><span className="mono">{ME.pit.replace("TIN ", "")}</span></div>
                <div className="dl-r"><span>{lang === "en" ? "Provident Fund" : "ກອງທຶນສຳຮອງ"}</span><span>5% employer · 5% employee</span></div>
              </div>
            </div>

            <div className="card">
              <div className="card-h">
                <div className="card-t">{lang === "en" ? "Documents on file" : "ເອກະສານ"}</div>
                <a className="card-act">{lang === "en" ? "Manage" : "ຈັດການ"}</a>
              </div>
              <ul className="doc-l">
                {[
                  { t: "National ID", lo: "ບັດປະຈຳຕົວ", st: "Verified" },
                  { t: "Family book", lo: "ປຶ້ມສຳມະໂນຄົວ", st: "Verified" },
                  { t: "Education certificate", lo: "ໃບປະກາສະນີຍະບັດ", st: "Verified" },
                  { t: "Driving license", lo: "ໃບຂັບຂີ່", st: "Expires Feb 2026" },
                ].map((d, i) => (
                  <li key={i}>
                    <I n="file" s={14} c="#8B8E99" />
                    <div>
                      <div>{d.t}</div>
                      <div className="lao muted small">{d.lo}</div>
                    </div>
                    <span className="muted small">{d.st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- PAY & TAX ---------- */
  function PayPage({ lang }) {
    const latest = PAY_HISTORY[0];
    return (
      <div className="page">
        <PageHeader
          eyebrow={lang === "en" ? "Pay · Cluster B" : "ເງິນເດືອນ · ກຸ່ມ B"}
          title={lang === "en" ? "Pay & Tax" : "ເງິນເດືອນ & ພາສີ"}
          sub={lang === "en" ? "Payslips, NSSF, Provident Fund, salary advance, annual income (50 Tawi · Kor.Tor.20)." : "ໃບເງິນເດືອນ, NSSF, ກອງທຶນ, ເງິນລ່ວງໜ້າ, ລາຍໄດ້ປະຈຳປີ."}
          right={<>
            <button className="btn ghost"><I n="download" s={13} /> {lang === "en" ? "Latest payslip" : "ຮັບໃບເງິນເດືອນລ່າສຸດ"}</button>
            <button className="btn primary">{lang === "en" ? "Annual summary" : "ສະຫຼຸບປະຈຳປີ"}</button>
          </>}
        />

        <div className="grid-2">
          {/* Big payslip card */}
          <div className="payslip-big">
            <div className="ps-eyebrow">{lang === "en" ? "Latest payslip · July 2025" : "ໃບເງິນເດືອນລ່າສຸດ · ກໍລະກົດ 2025"}</div>
            <div className="ps-net">
              <span className="ps-lbl">{lang === "en" ? "Net pay" : "ເງິນສຸດທິ"}</span>
              <span className="ps-amt serif italic">₭ {latest.net.toLocaleString()}</span>
            </div>
            <div className="ps-grid">
              <div><span className="k">{lang === "en" ? "Gross" : "ລາຍຮັບລວມ"}</span><span className="v mono">₭ {latest.gross.toLocaleString()}</span></div>
              <div><span className="k">{lang === "en" ? "Overtime" : "ລ່ວງເວລາ"}</span><span className="v mono">₭ {latest.ot.toLocaleString()}</span></div>
              <div><span className="k">PIT</span><span className="v mono neg">−₭ {latest.pit.toLocaleString()}</span></div>
              <div><span className="k">NSSF</span><span className="v mono neg">−₭ {latest.nssf.toLocaleString()}</span></div>
              <div><span className="k">{lang === "en" ? "Provident Fund" : "ກອງທຶນ"}</span><span className="v mono neg">−₭ {latest.pf.toLocaleString()}</span></div>
              <div><span className="k">{lang === "en" ? "Bank · BCEL" : "ທະນາຄານ · BCEL"}</span><span className="v mono">····8821</span></div>
            </div>
            <div className="ps-band">
              <div className="ps-band-bar">
                {(() => {
                  const segs = [
                    { c: "#FFFFFF",          v: latest.net },
                    { c: "rgba(255,255,255,0.55)", v: latest.pit },
                    { c: "rgba(255,255,255,0.40)", v: latest.nssf },
                    { c: "rgba(255,255,255,0.28)", v: latest.pf },
                  ];
                  const total = segs.reduce((a, x) => a + x.v, 0);
                  return segs.map((s, i) => <div key={i} style={{ width: `${(s.v / total) * 100}%`, background: s.c }} />);
                })()}
              </div>
              <div className="ps-band-leg">
                <span><i className="sw" style={{ background: "#FFFFFF" }} />Net</span>
                <span><i className="sw" style={{ background: "rgba(255,255,255,0.55)" }} />PIT</span>
                <span><i className="sw" style={{ background: "rgba(255,255,255,0.40)" }} />NSSF</span>
                <span><i className="sw" style={{ background: "rgba(255,255,255,0.28)" }} />PF</span>
              </div>
            </div>
            <div className="ps-actions">
              <button className="btn light"><I n="download" s={13} /> PDF</button>
              <button className="btn ghost-light">{lang === "en" ? "Email me a copy" : "ສົ່ງໃຫ້ອີເມວ"}</button>
              <button className="btn ghost-light">{lang === "en" ? "Bank statement letter" : "ໜັງສືຮັບຮອງ"}</button>
            </div>
          </div>

          {/* Right column tools */}
          <div className="grid-stack">
            <div className="card">
              <div className="card-h"><div className="card-t">{lang === "en" ? "Annual income (Kor.Tor.20)" : "ລາຍຮັບປະຈຳປີ (50 Tawi)"}</div></div>
              <div className="ann-stat">
                <div className="ann-stat-r"><span className="k">{lang === "en" ? "Gross YTD" : "ຍອດລວມ"}</span><span className="v mono">₭ 65,800,000</span></div>
                <div className="ann-stat-r"><span className="k">{lang === "en" ? "PIT YTD" : "ພາສີລວມ"}</span><span className="v mono">₭ 5,773,800</span></div>
                <div className="ann-stat-r"><span className="k">{lang === "en" ? "Effective tax rate" : "ອັດຕາພາສີ"}</span><span className="v mono">8.77%</span></div>
                <div className="ann-stat-r"><span className="k">{lang === "en" ? "Tax bracket" : "ຂັ້ນພາສີ"}</span><span className="v">9% (5–15M)</span></div>
              </div>
            </div>

            <div className="card">
              <div className="card-h"><div className="card-t">{lang === "en" ? "Salary advance" : "ເງິນເດືອນລ່ວງໜ້າ"}</div></div>
              <div className="sa-row">
                <div className="sa-l">
                  <div className="kt-l small">{lang === "en" ? "Available this cycle" : "ຍອດທີ່ຮັບໄດ້"}</div>
                  <div className="sa-amt serif italic">₭ 2,400,000</div>
                  <div className="kt-s small">{lang === "en" ? "Up to 30% of net · subject to manager approval" : "ສູງສຸດ 30% ຂອງເງິນສຸດທິ"}</div>
                </div>
                <button className="btn primary">{lang === "en" ? "Request advance" : "ຂໍລ່ວງໜ້າ"}</button>
              </div>
            </div>
          </div>

          {/* Pay history table */}
          <div className="card col-2">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "12-month history" : "ປະຫວັດ 12 ເດືອນ"}</div>
              <a className="card-act">{lang === "en" ? "Export CSV" : "ສົ່ງອອກ CSV"}</a>
            </div>
            <table className="tbl">
              <thead>
                <tr>
                  <th>{lang === "en" ? "Period" : "ຮອບ"}</th>
                  <th className="r">{lang === "en" ? "Gross" : "ລວມ"}</th>
                  <th className="r">{lang === "en" ? "Overtime" : "OT"}</th>
                  <th className="r">PIT</th>
                  <th className="r">NSSF</th>
                  <th className="r">PF</th>
                  <th className="r">{lang === "en" ? "Net" : "ສຸດທິ"}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {PAY_HISTORY.map(p => (
                  <tr key={p.m}>
                    <td>{p.m}</td>
                    <td className="r mono">{p.gross.toLocaleString()}</td>
                    <td className="r mono muted">{p.ot ? p.ot.toLocaleString() : "—"}</td>
                    <td className="r mono">{p.pit.toLocaleString()}</td>
                    <td className="r mono">{p.nssf.toLocaleString()}</td>
                    <td className="r mono">{p.pf.toLocaleString()}</td>
                    <td className="r mono strong">{p.net.toLocaleString()}</td>
                    <td className="r"><a className="lk"><I n="download" s={13} /></a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- TIME & LEAVE ---------- */
  function LeavePage({ lang }) {
    const [month, setMonth] = React.useState(8); // August
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (
      <div className="page">
        <PageHeader
          eyebrow={lang === "en" ? "Time · Cluster C" : "ເວລາ · ກຸ່ມ C"}
          title={lang === "en" ? "Time & Leave" : "ເວລາ & ການລາ"}
          sub={lang === "en" ? "Apply leave, log overtime, swap shifts. Calendar shows Lao public holidays." : "ຍື່ນລາ, ບັນທຶກລ່ວງເວລາ, ສັບປ່ຽນກະ."}
          right={<>
            <button className="btn ghost">{lang === "en" ? "Log overtime" : "ບັນທຶກ OT"}</button>
            <button className="btn primary"><I n="plus" s={13} /> {lang === "en" ? "Apply leave" : "ຍື່ນລາ"}</button>
          </>}
        />

        {/* Balances row */}
        <div className="bal-row">
          {[
            { t: "Annual",    lo: "ປີ", used: 5.5, total: 18, c: "#1A2A57" },
            { t: "Sick",      lo: "ປ່ວຍ", used: 1, total: 30, c: "#A8392E" },
            { t: "Personal",  lo: "ສ່ວນຕົວ", used: 0, total: 3, c: "#6B3A86" },
            { t: "Compensatory", lo: "ຊົດເຊີຍ", used: 0, total: 4, c: "#2E6F47" },
            { t: "Bereavement", lo: "ສະນຸເຊີຍ", used: 0, total: 5, c: "#8B6E2C" },
          ].map((b, i) => (
            <div key={i} className="bal">
              <div className="bal-h">
                <div className="bal-t">{lang === "en" ? b.t : b.lo}</div>
                <div className="bal-tot mono">{(b.total - b.used).toFixed(1)}<span>/{b.total}d</span></div>
              </div>
              <div className="bal-bar"><div style={{ width: `${(b.used / b.total) * 100}%`, background: b.c }} /></div>
              <div className="bal-s">{b.used}d {lang === "en" ? "used" : "ໃຊ້ແລ້ວ"}</div>
            </div>
          ))}
        </div>

        <div className="grid-2">
          {/* Calendar */}
          <div className="card">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Calendar" : "ປະຕິທິນ"}</div>
              <div className="cal-nav">
                <button className="ic-btn" onClick={() => setMonth(Math.max(1, month - 1))}><I n="chev" s={14} c="currentColor" /></button>
                <span className="cal-m">{monthNames[month - 1]} 2025</span>
                <button className="ic-btn" onClick={() => setMonth(Math.min(12, month + 1))}><I n="chev" s={14} c="currentColor" /></button>
              </div>
            </div>
            {(() => {
              const firstDow = (new Date(2025, month - 1, 1).getDay() + 6) % 7; // Mon-first
              const days = new Date(2025, month, 0).getDate();
              const cells = [];
              for (let i = 0; i < firstDow; i++) cells.push(null);
              for (let d = 1; d <= days; d++) cells.push(d);
              const hol = HOLIDAYS_LAO[month] || [];
              const myLeave = month === 8 ? [14, 15, 16] : [];
              return (
                <div className="cal">
                  <div className="cal-row dow">
                    {(lang === "en" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["ຈ", "ອ", "ພ", "ພຫ", "ສ", "ສ", "ອາ"]).map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className="cal-grid">
                    {cells.map((c, i) => {
                      if (!c) return <div key={i} className="cal-c em" />;
                      const isHol = hol.find(h => h.d === c);
                      const isLv = myLeave.includes(c);
                      const isWk = ((firstDow + c - 1) % 7) >= 5;
                      return (
                        <div key={i} className={"cal-c" + (isHol ? " hol" : "") + (isLv ? " lv" : "") + (isWk ? " wk" : "")}>
                          <span className="cal-d">{c}</span>
                          {isHol && <span className="cal-tag accent lao">{isHol.lo.split(" ")[0]}</span>}
                          {isLv && <span className="cal-tag primary">{lang === "en" ? "AL" : "ລາ"}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            <div className="cal-leg">
              <span><i className="sw" style={{ background: "#1A2A57" }} />{lang === "en" ? "My leave" : "ການລາ"}</span>
              <span><i className="sw" style={{ background: "#F4E7CE", border: "1px solid #C4843A" }} />{lang === "en" ? "Lao holiday" : "ມື້ພັກລາວ"}</span>
              <span><i className="sw" style={{ background: "#ECE4D2" }} />{lang === "en" ? "Weekend" : "ວັນພັກ"}</span>
            </div>
          </div>

          {/* Apply form preview */}
          <div className="card">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Apply leave" : "ຍື່ນລາ"}</div>
              <div className="card-s">{lang === "en" ? "Live preview · approval workflow" : "ສະແດງຕົວຢ່າງ · ຂັ້ນຕອນອະນຸມັດ"}</div>
            </div>
            <div className="form">
              <div className="fld">
                <label>{lang === "en" ? "Leave type" : "ປະເພດ"}</label>
                <div className="seg">
                  {["Annual", "Sick", "Personal", "Comp"].map((s, i) => <button key={s} className={"seg-b" + (i === 0 ? " on" : "")}>{s}</button>)}
                </div>
              </div>
              <div className="fld-row">
                <div className="fld">
                  <label>{lang === "en" ? "From" : "ຈາກ"}</label>
                  <input className="inp" defaultValue="2025-08-14" />
                </div>
                <div className="fld">
                  <label>{lang === "en" ? "To" : "ຫາ"}</label>
                  <input className="inp" defaultValue="2025-08-16" />
                </div>
                <div className="fld" style={{ flex: 0, minWidth: 90 }}>
                  <label>{lang === "en" ? "Days" : "ມື້"}</label>
                  <div className="inp ro mono">3</div>
                </div>
              </div>
              <div className="fld">
                <label>{lang === "en" ? "Cover (suggested)" : "ຜູ້ຮັບແທນ"}</label>
                <div className="inp inp-pers">
                  <span className="av sm">BV</span>
                  <span>Bounmy Vongphachanh</span>
                  <span className="muted small">· same shift · 92% match</span>
                </div>
              </div>
              <div className="fld">
                <label>{lang === "en" ? "Reason" : "ເຫດຜົນ"}</label>
                <textarea className="inp ta" rows={2} defaultValue="Family obligations." />
              </div>

              <div className="flow">
                <div className="flow-h">{lang === "en" ? "Approval flow" : "ຂັ້ນຕອນ"}</div>
                <div className="flow-row">
                  {[
                    { who: "Manager", n: "K. Chanthavong", on: true },
                    { who: "Plant Director", n: "T. Soulivong" },
                    { who: "HR Records", n: "Auto-post" },
                  ].map((s, i) => (
                    <React.Fragment key={i}>
                      <div className={"flow-step" + (s.on ? " on" : "")}>
                        <div className="fs-c">{i + 1}</div>
                        <div>
                          <div className="fs-w">{s.who}</div>
                          <div className="fs-n muted small">{s.n}</div>
                        </div>
                      </div>
                      {i < 2 && <div className="flow-arr"><I n="chevR" s={14} c="#8B8E99" /></div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button className="btn ghost">{lang === "en" ? "Save draft" : "ບັນທຶກຊົ່ວຄາວ"}</button>
                <button className="btn primary">{lang === "en" ? "Submit" : "ສົ່ງ"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- CLAIMS ---------- */
  function ClaimsPage({ lang }) {
    return (
      <div className="page">
        <PageHeader
          eyebrow={lang === "en" ? "Claims · Cluster D" : "ການເບີກ · ກຸ່ມ D"}
          title={lang === "en" ? "Claims & Benefits" : "ການເບີກ & ສະຫວັດດີການ"}
          sub={lang === "en" ? "Expense, travel, mobile, medical, and benefit claims with receipt OCR." : "ເບີກຄ່າໃຊ້ຈ່າຍ, ເດີນທາງ, ມືຖື, ການແພດ ແລະ ສະຫວັດດີການ."}
          right={<button className="btn primary"><I n="plus" s={13} /> {lang === "en" ? "New claim" : "ຮ້ອງຂໍໃໝ່"}</button>}
        />

        <div className="claim-row">
          {[
            { t: "Travel & site",  lo: "ເດີນທາງ", c: "D", v: "₭ 1,240,000", s: "1 in review", icon: "pin" },
            { t: "Mobile/data",    lo: "ມືຖື/ອິນເຕີເນັດ", c: "B", v: "₭ 360,000", s: "Quarterly cap ₭ 720k", icon: "phone" },
            { t: "Medical",        lo: "ການແພດ", c: "E", v: "₭ 0", s: "Annual cap ₭ 6M", icon: "claim" },
            { t: "Per-diem",       lo: "ຄ່າປະຈຳວັນ", c: "F", v: "₭ 0", s: "₭ 240k/day field", icon: "claim" },
          ].map((b, i) => (
            <div key={i} className="claim-card">
              <div className={"claim-ic c-" + b.c}><I n={b.icon} s={18} /></div>
              <div className="claim-body">
                <div className="claim-t">{lang === "en" ? b.t : b.lo}</div>
                <div className="claim-v serif italic">{b.v}</div>
                <div className="claim-s muted small">{b.s}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid-2">
          <div className="card col-2">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Recent claims" : "ການເບີກລ່າສຸດ"}</div>
              <div className="seg sm">
                {["All", "Pending", "Approved", "Rejected"].map((s, i) => <button key={s} className={"seg-b" + (i === 0 ? " on" : "")}>{s}</button>)}
              </div>
            </div>
            <table className="tbl">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>{lang === "en" ? "Description" : "ລາຍລະອຽດ"}</th>
                  <th>{lang === "en" ? "Date" : "ວັນທີ"}</th>
                  <th className="r">{lang === "en" ? "Amount" : "ຈຳນວນ"}</th>
                  <th>{lang === "en" ? "Status" : "ສະຖານະ"}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {CLAIM_HISTORY.map(c => (
                  <tr key={c.id}>
                    <td className="mono small">{c.id}</td>
                    <td>
                      <div className="cell-stack">
                        <span>{c.t}</span>
                        <span className="lao muted small">{c.lo}</span>
                      </div>
                    </td>
                    <td>{c.date}</td>
                    <td className="r mono">{c.amt.toLocaleString()}</td>
                    <td><StatusPill s={c.status} /></td>
                    <td className="r"><a className="lk">{lang === "en" ? "View" : "ເບິ່ງ"}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- DOCUMENTS ---------- */
  function DocsPage({ lang }) {
    const FOLDERS = [
      { t: "Payslips", lo: "ໃບເງິນເດືອນ", n: 28, ic: "pay", c: "B" },
      { t: "Letters & e-sign", lo: "ໜັງສື & ລາຍເຊັນ", n: 12, ic: "file", c: "F" },
      { t: "Contracts", lo: "ສັນຍາ", n: 4, ic: "file", c: "C" },
      { t: "Tax (50 Tawi)", lo: "ໃບພາສີ", n: 6, ic: "file", c: "D" },
      { t: "Training certificates", lo: "ໃບຢັ້ງຢືນ", n: 9, ic: "book2", c: "A" },
      { t: "Personal docs", lo: "ເອກະສານສ່ວນຕົວ", n: 11, ic: "vault", c: "E" },
    ];
    return (
      <div className="page">
        <PageHeader
          eyebrow={lang === "en" ? "Documents · Cluster F" : "ເອກະສານ · ກຸ່ມ F"}
          title={lang === "en" ? "Documents Vault" : "ຄັງເອກະສານ"}
          sub={lang === "en" ? "Personal documents, letters, contracts, certificates and tax forms." : "ເອກະສານສ່ວນຕົວ, ໜັງສື, ສັນຍາ, ໃບຢັ້ງຢືນ."}
          right={<>
            <button className="btn ghost"><I n="upload" s={13} /> {lang === "en" ? "Upload" : "ອັບໂຫຼດ"}</button>
            <button className="btn primary">{lang === "en" ? "Request letter" : "ຂໍໜັງສືຮັບຮອງ"}</button>
          </>}
        />
        <div className="folder-grid">
          {FOLDERS.map((f, i) => (
            <div key={i} className="fold">
              <div className={"fold-ic c-" + f.c}><I n={f.ic} s={20} /></div>
              <div className="fold-t">{lang === "en" ? f.t : f.lo}</div>
              <div className="fold-s muted small">{f.n} {lang === "en" ? "files" : "ໄຟລ໌"}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Recently issued" : "ອອກໃໝ່ລ່າສຸດ"}</div>
          </div>
          <ul className="doc-l lg">
            {[
              { t: "Payslip — July 2025",                  lo: "ໃບເງິນເດືອນ — ກໍລະກົດ 2025", st: "PDF · signed", date: "Aug 02" },
              { t: "Salary certificate (Khampheng visa)",  lo: "ໜັງສືຮັບຮອງ — ວີຊາ",         st: "Awaiting signature", date: "Jul 29" },
              { t: "Annual income — Kor.Tor.20 (50 Tawi)", lo: "ໃບລາຍຮັບປະຈຳປີ",            st: "Issued by Finance", date: "Jan 31" },
              { t: "Contract — renewed",                   lo: "ສັນຍາ — ຕໍ່ໃໝ່",            st: "Active", date: "Mar 14" },
              { t: "GMP Certificate — 2024",               lo: "ໃບຢັ້ງຢືນ GMP — 2024",     st: "Verified", date: "Nov 12 2024" },
            ].map((d, i) => (
              <li key={i}>
                <I n="file" s={16} c="#8B8E99" />
                <div>
                  <div>{d.t}</div>
                  <div className="lao muted small">{d.lo}</div>
                </div>
                <div className="muted small">{d.st}</div>
                <div className="muted small">{d.date}</div>
                <a className="lk small"><I n="download" s={13} /></a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  /* ---------- HELPDESK ---------- */
  function HelpPage({ lang }) {
    return (
      <div className="page">
        <PageHeader
          eyebrow={lang === "en" ? "Helpdesk · Cluster E" : "ຊ່ວຍເຫຼືອ · ກຸ່ມ E"}
          title={lang === "en" ? "HR Helpdesk" : "ຊ່ວຍເຫຼືອ HR"}
          sub={lang === "en" ? "Bilingual AI assistant + ticket queue routing to LINE OA / Telegram." : "ຜູ້ຊ່ວຍ AI ສອງພາສາ + ສົ່ງເຂົ້າຄິວເຈົ້າໜ້າທີ່."}
        />
        <div className="grid-2">
          <div className="card help-card">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Ask HR" : "ຖາມ HR"}</div>
              <div className="seg sm">
                <button className="seg-b on">EN</button>
                <button className="seg-b lao">ລາວ</button>
              </div>
            </div>
            <div className="chat">
              <div className="bub bot">
                {lang === "en" ? "Hi Souksavanh — what can I help with today?" : "ສະບາຍດີ ສຸກສະຫວັນ — ວັນນີ້ຊ່ວຍຫຍັງໄດ້ບໍ່?"}
              </div>
              <div className="bub you">{lang === "en" ? "I need a salary certificate for my child's school." : "ຕ້ອງການໜັງສືຮັບຮອງເງິນເດືອນສຳລັບລູກໄປໂຮງຮຽນ."}</div>
              <div className="bub bot">
                {lang === "en"
                  ? "I can draft that. School name? I'll auto-fill your latest payslip."
                  : "ສາມາດຮ່າງໃຫ້ໄດ້. ຂໍຊື່ໂຮງຮຽນ. ຈະດຶງໃບເງິນເດືອນລ່າສຸດໃຫ້ອັດຕະໂນມັດ."}
                <div className="suggest">
                  <button>Sengsavanh Bilingual School</button>
                  <button>Vientiane International</button>
                  <button>{lang === "en" ? "Type custom" : "ພິມເອງ"}</button>
                </div>
              </div>
              <div className="bub you">Sengsavanh Bilingual School</div>
              <div className="bub bot">
                <div className="draft-box">
                  <div className="draft-h">
                    <span className="pill primary small">Draft · Letter LT-2025-0701</span>
                    <span className="muted small">Auto-routed to HR Records</span>
                  </div>
                  <div className="draft-l">
                    <p>To: Principal, Sengsavanh Bilingual School</p>
                    <p>This is to certify that <strong>Souksavanh Phommachanh</strong> (EMP-00427) has been employed since 14 March 2017 as <strong>Senior Production Supervisor</strong> at Lao Beverage Co., Ltd., Savannakhet Plant, with a current monthly gross of ₭ 9,650,000…</p>
                  </div>
                  <div className="draft-actions">
                    <button className="btn primary sm">{lang === "en" ? "Send for HR e-sign" : "ສົ່ງໃຫ້ HR ເຊັນ"}</button>
                    <button className="btn ghost sm">{lang === "en" ? "Edit" : "ແກ້ໄຂ"}</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="composer">
              <input placeholder={lang === "en" ? "Type a question…" : "ພິມຄຳຖາມ…"} />
              <button className="btn primary sm">{lang === "en" ? "Send" : "ສົ່ງ"}</button>
            </div>
          </div>

          <div className="grid-stack">
            <div className="card">
              <div className="card-h">
                <div className="card-t">{lang === "en" ? "My tickets" : "ຄຳຮ້ອງຂອງຂ້ອຍ"}</div>
                <a className="card-act">{lang === "en" ? "All" : "ທັງໝົດ"}</a>
              </div>
              <ul className="tk-l">
                {TICKETS.map(t => (
                  <li key={t.id}>
                    <div className="tk-h">
                      <span className="mono small">{t.id}</span>
                      <StatusPill s={t.status} />
                    </div>
                    <div className="tk-t">{t.subj}</div>
                    <div className="tk-lo lao muted small">{t.subjLo}</div>
                    <div className="tk-meta">
                      <span className="muted small">{t.cat} · {t.agent}</span>
                      <span className="muted small">{t.t} {t.status === "open" && `· SLA ${t.sla}`}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="card-h"><div className="card-t">{lang === "en" ? "Channels" : "ຊ່ອງທາງ"}</div></div>
              <ul className="ch-l">
                <li><span className="ch-n">Web Portal</span><Pill tone="positive">Active</Pill></li>
                <li><span className="ch-n">Mobile (iOS / Android)</span><Pill tone="positive">Active</Pill></li>
                <li><span className="ch-n">LINE Official Account</span><Pill tone="positive">@laobev-hr</Pill></li>
                <li><span className="ch-n">Telegram bot</span><Pill tone="positive">@laobev_hr_bot</Pill></li>
                <li><span className="ch-n">Email</span><Pill>hr@laobev.la</Pill></li>
                <li><span className="ch-n">Plant kiosk</span><Pill>SVK · LPB · Pakse</Pill></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- LEARNING ---------- */
  function LearnPage({ lang }) {
    return (
      <div className="page">
        <PageHeader
          eyebrow={lang === "en" ? "Learning" : "ການຮຽນຮູ້"}
          title={lang === "en" ? "My Learning" : "ການຮຽນຮູ້ຂອງຂ້ອຍ"}
          sub={lang === "en" ? "Mandatory compliance, role-specific upskilling, and elective courses." : "ການປະຕິບັດຕາມກົດໝາຍ, ການພັດທະນາທັກສະ, ຄອສທາງເລືອກ."}
          right={<button className="btn primary">{lang === "en" ? "Browse catalog" : "ເບິ່ງລາຍການຄອສ"}</button>}
        />
        <div className="course-grid">
          {COURSES.map(c => (
            <div key={c.id} className="course">
              <div className="course-h">
                <Pill tone={c.progress === 100 ? "positive" : c.progress > 0 ? "primary" : "default"}>
                  {c.progress === 100 ? (lang === "en" ? "Completed" : "ສຳເລັດ") : c.progress > 0 ? (lang === "en" ? "In progress" : "ກຳລັງຮຽນ") : (lang === "en" ? "Not started" : "ຍັງບໍ່ເລີ່ມ")}
                </Pill>
                <span className="mono small muted">{c.mins} min</span>
              </div>
              <div className="course-t">{c.t}</div>
              <div className="course-lo lao muted small">{c.lo}</div>
              <div className="course-bar"><div className="course-fill" style={{ width: c.progress + "%" }} /></div>
              <div className="course-meta">
                <span className="muted small">{lang === "en" ? "Due" : "ກຳນົດ"} {c.due}</span>
                <button className="btn sm ghost">{c.progress === 100 ? (lang === "en" ? "Certificate" : "ໃບຢັ້ງຢືນ") : (lang === "en" ? "Open" : "ເປີດ")}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- PERFORMANCE ---------- */
  function PerfPage({ lang }) {
    return (
      <div className="page">
        <PageHeader
          eyebrow={lang === "en" ? "Performance" : "ການປະເມີນ"}
          title={lang === "en" ? "My Performance" : "ການປະເມີນຂອງຂ້ອຍ"}
          sub={`${PERFORMANCE.cycle} · ${lang === "en" ? "Self-review opens" : "ປະເມີນຕົວເອງເປີດ"} ${PERFORMANCE.selfDue}`}
          right={<button className="btn primary">{lang === "en" ? "Start self-review" : "ເລີ່ມປະເມີນ"}</button>}
        />
        <div className="card">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Objectives & key results" : "ເປົ້າໝາຍ ແລະ ຜົນສຳເລັດ"}</div>
          </div>
          <ul className="obj-l">
            {PERFORMANCE.objectives.map((o, i) => (
              <li key={i}>
                <div className="obj-h">
                  <div className="obj-t">{o.t}</div>
                  <div className="lao muted small">{o.lo}</div>
                </div>
                <div className="obj-bar"><div className="obj-fill" style={{ width: o.progress + "%" }} /></div>
                <div className="obj-meta">
                  <span className="muted small">{o.weight}% {lang === "en" ? "weight" : "ນ້ຳໜັກ"}</span>
                  <span className="mono small">{o.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  /* ---------- ROUTER ---------- */
  function App() {
    const [route, setRoute] = React.useState("home");
    const [lang, setLang] = React.useState("en");

    const Page = {
      home: HomePage, profile: ProfilePage, pay: PayPage,
      leave: LeavePage, claims: ClaimsPage, docs: DocsPage,
      helpdesk: HelpPage, learn: LearnPage, perf: PerfPage,
    }[route] || HomePage;

    React.useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, [route]);

    return (
      <div className={"shell " + (lang === "lo" ? "lao-mode" : "")}>
        <Sidebar route={route} setRoute={setRoute} lang={lang} />
        <div className="main">
          <TopBar lang={lang} setLang={setLang} route={route} setRoute={setRoute} />
          <div className="content">
            <Page lang={lang} setRoute={setRoute} />
          </div>
        </div>
      </div>
    );
  }

  return { App };
})();

ReactDOM.createRoot(document.getElementById("root")).render(<SW.App />);
