/* App shell — sidebar nav + topbar + screen router */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "default",
  "accent": "#1A2A57"
}/*EDITMODE-END*/;

const ACCENTS = {
  "#1A2A57": { primarySoft: "#E5E8F2" },
  "#1F4D38": { primarySoft: "#DDEAD8" },
  "#6E2A2A": { primarySoft: "#F2D7CD" },
  "#14182A": { primarySoft: "#E1E2E8" },
};

const NAV = [
  { section: "WORKSPACE" },
  { id: "dashboard", label: "Dashboard", lao: "ໜ້າຫຼັກ", icon: "dashboard" },
  { id: "approvals", label: "Approvals", lao: "ຄຳຮ້ອງ", icon: "leave", count: 23 },

  { section: "PEOPLE — P1 / P2" },
  { id: "staff", label: "Staff Records", lao: "ຂໍ້ມູນພະນັກງານ", icon: "users", count: 1248 },
  { id: "leave", label: "Leave & ESS", lao: "ການລາພັກ & ESS", icon: "leave" },
  { id: "documents", label: "Documents & Vault", lao: "ເອກະສານ", icon: "file" },

  { section: "WORKFORCE — P3 / P4" },
  { id: "time", label: "Time & Attendance", lao: "ເວລາ & ການປະຈຳການ", icon: "clock" },
  { id: "payroll", label: "Payroll", lao: "ເງິນເດືອນ", icon: "payroll" },

  { section: "TRUST & INTELLIGENCE — P5 / P6" },
  { id: "biometric", label: "Biometric & SSO", lao: "ຊີວະພາບ & SSO", icon: "biometric" },
  { id: "analytics", label: "Analytics", lao: "ການວິເຄາະ", icon: "chart" },

  { section: "CMS · COMMUNICATIONS" },
  { id: "cms", label: "Comms (EN · LO)", lao: "ຂ່າວສານ", icon: "cms" },
  { id: "policies", label: "Policies", lao: "ນະໂຍບາຍ", icon: "book" },

  { section: "ADMIN" },
  { id: "workflows", label: "Workflow Builder", lao: "ການອອກແບບຂັ້ນຕອນ", icon: "workflow" },
  { id: "settings", label: "Settings", lao: "ຕັ້ງຄ່າ", icon: "settings" },
];

const SCREEN_TITLES = {
  dashboard: { en: "HR Pulse", lo: "ໜ້າຫຼັກ HR", sub: "Statistical overview by timeframe and division — your first look every morning." },
  approvals: { en: "Approvals", lo: "ຄຳຮ້ອງລໍຖ້າ", sub: "Cross-module queue — leave, OT, document corrections, contract changes." },
  staff:     { en: "Staff Records", lo: "ຂໍ້ມູນພະນັກງານ", sub: "Master data, contracts, lifecycle states — the source of truth." },
  leave:     { en: "Leave & ESS", lo: "ລະບົບລາພັກ & ESS", sub: "Configurable accrual, N-step approval, conflict heatmap." },
  documents: { en: "Documents & Vault", lo: "ເອກະສານ", sub: "NRIC, passport, contracts — encrypted vault with expiry alerts." },
  time:      { en: "Time & Attendance", lo: "ເວລາ & ການປະຈຳການ", sub: "Live attendance board · web · mobile · kiosk · biometric · offline sync." },
  payroll:   { en: "Payroll", lo: "ເງິນເດືອນ", sub: "Configurable pay codes · Lao PIT + NSSF · TH benchmark library." },
  biometric: { en: "Biometric & SSO", lo: "ຊີວະພາບ & SSO", sub: "Multi-modal capture · liveness · federated SSO with revocation." },
  analytics: { en: "Analytics", lo: "ການວິເຄາະ", sub: "Time-policy compliance · top offenders · 12-week trend · scheduled exports." },
  cms:       { en: "Communications", lo: "ຂ່າວສານພະນັກງານ", sub: "Bilingual EN · LO authoring for every staff-facing message." },
  policies:  { en: "Policies & Documents", lo: "ນະໂຍບາຍ", sub: "Versioned, bilingual, role-aware policy library." },
  workflows: { en: "Workflow Builder", lo: "ການອອກແບບຂັ້ນຕອນ", sub: "No-code drag-and-drop · approval chains · escalation rules." },
  settings:  { en: "Settings", lo: "ຕັ້ງຄ່າ", sub: "Tenant configuration · custom fields · audit log · data residency." },
};

function Sidebar({ active, setActive }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="mark">H</div>
        <div style={{ minWidth: 0 }}>
          <div className="name">HR System <span style={{ color: "var(--muted)", fontSize: 11, fontWeight: 400 }}>v1.0</span></div>
          <div className="tenant">Lao Beverage Co., Ltd.</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 12 }}>
        {NAV.map((n, i) =>
          n.section
            ? <div key={i} className="sidebar-section">{n.section}</div>
            : (
              <div key={n.id}
                className={`nav-item ${active === n.id ? "active" : ""}`}
                onClick={() => setActive(n.id)}>
                <Icon name={n.icon} className="ico" />
                <span>{n.label}</span>
                {n.count != null && <span className="count num">{n.count.toLocaleString()}</span>}
              </div>
            )
        )}
      </div>
      <div className="sidebar-footer">
        <Avatar name="Khamphet Vannasing" />
        <div className="user-meta" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>K. Vannasing</div>
          <div className="role">HR Director · Vientiane</div>
        </div>
        <button className="icon-btn" title="Sign out" style={{ width: 28, height: 28 }}>
          <Icon name="chevron" size={14} />
        </button>
      </div>
    </aside>
  );
}

function Topbar({ active, lang, setLang }) {
  const here = SCREEN_TITLES[active] || SCREEN_TITLES.dashboard;
  return (
    <>
      <div className="topbar">
        <div className="crumbs">
          <Icon name="home" size={14} />
          <span>HR Console</span>
          <span className="sep">/</span>
          <span className="here">{lang === "lo" ? here.lo : here.en}</span>
        </div>
        <div className="search">
          <Icon name="search" size={14} />
          <input placeholder="Search staff, requests, policies, payroll runs…" />
          <span className="kbd">⌘K</span>
        </div>
        <div className="lang-switch">
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          <button className={lang === "lo" ? "on" : ""} onClick={() => setLang("lo")}>ລາວ</button>
        </div>
        <button className="icon-btn" title="Notifications">
          <Icon name="bell" size={16} />
          <span className="dot"></span>
        </button>
        <button className="icon-btn" title="AI HR chatbot">
          <Icon name="sparkle" size={16} />
        </button>
      </div>
      <div style={{ padding: "22px 26px 0", maxWidth: 1400 }}>
        <div className="page-head">
          <div>
            <h1 className="page-title">{lang === "lo" ? here.lo : here.en}</h1>
            <div className="page-sub">{here.sub}</div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <Pill tone="outline"><Icon name="globe" size={11} /> EN · ລາວ</Pill>
            <Pill tone="positive"><span className="d"></span> All systems operational</Pill>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  const [t, setT] = useTweaks ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [active, setActive] = React.useState("dashboard");
  const [lang, setLang] = React.useState("en");
  const [timeframe, setTimeframe] = React.useState("mtd");
  const [division, setDivision] = React.useState("all");

  React.useEffect(() => {
    document.body.dataset.density = t.density || "default";
    const a = ACCENTS[t.accent] || ACCENTS["#1A2A57"];
    document.documentElement.style.setProperty("--primary", t.accent);
    document.documentElement.style.setProperty("--primary-soft", a.primarySoft);
  }, [t]);

  let body = null;
  switch (active) {
    case "dashboard": body = <Dashboard lang={lang} timeframe={timeframe} setTimeframe={setTimeframe} division={division} setDivision={setDivision} />; break;
    case "approvals": body = <LeaveApprovals lang={lang} />; break;
    case "staff":     body = <StaffRecords lang={lang} />; break;
    case "leave":     body = <LeaveApprovals lang={lang} />; break;
    case "time":      body = <TimeAttendance />; break;
    case "payroll":   body = <Payroll />; break;
    case "biometric": body = <Biometric />; break;
    case "analytics": body = <Analytics />; break;
    case "cms":       body = <CMS lang={lang} />; break;
    case "policies":  body = <CMS lang={lang} />; break;
    case "documents": body = <Stub icon="file" title="Documents & Vault" lines={["Encrypted vault for NRIC · passport · certificates · contracts","Visa & work-permit expiry alerts (foundation)","AI ID-document parsing (NRIC / passport OCR)"]} />; break;
    case "workflows": body = <Settings />; break;
    case "settings":  body = <Settings />; break;
    default:          body = <Dashboard lang={lang} timeframe={timeframe} setTimeframe={setTimeframe} division={division} setDivision={setDivision} />;
  }

  return (
    <div className="app">
      <Sidebar active={active} setActive={setActive} />
      <main>
        <Topbar active={active} lang={lang} setLang={setLang} />
        {body}
      </main>
      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Theme" />
          <TweakColor label="Accent" value={t.accent}
            options={["#1A2A57", "#1F4D38", "#6E2A2A", "#14182A"]}
            onChange={v => setT("accent", v)} />
          <TweakSection label="Density" />
          <TweakRadio label="Density" value={t.density}
            options={["compact", "default", "comfy"]}
            onChange={v => setT("density", v)} />
        </TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
