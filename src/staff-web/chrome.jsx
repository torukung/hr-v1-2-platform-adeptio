/* Web Staff Portal — chrome (split from staff-web.jsx) */

/* ---------- Top bar ---------- */
function TopBar({ lang, setLang, route, setRoute }) {
  const t = (en, lo) => lang === "lo" ? lo : en;
  return (
    <header className="topbar" role="banner">
      <div className="topbar-left">
        <button type="button" className="search" aria-label={t("Search people, requests, policies", "ຄົ້ນຫາ")} aria-keyshortcuts="Meta+K">
          <I n="search" s={15} c="#8B8E99" />
          <span>{t("Search people, requests, policies…", "ຄົ້ນຫາ…")}</span>
          <kbd>⌘&nbsp;K</kbd>
        </button>
      </div>
      <div className="topbar-right">
        <button type="button" className="tb-btn" aria-label={t("What's new", "ມີຫຍັງໃໝ່")}>
          <I n="sparkle" s={15} />
          <span>{t("What's new", "ໃໝ່")}</span>
        </button>
        <div className="lang-switch" role="group" aria-label="Language">
          <button aria-pressed={lang === "en"} className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          <button aria-pressed={lang === "lo"} className={lang === "lo" ? "on lao" : "lao"} onClick={() => setLang("lo")}>ລາວ</button>
        </div>
        <button type="button" className="tb-icon" aria-label={t("Notifications, unread", "ການແຈ້ງເຕືອນ")}>
          <I n="bell" s={17} />
          <i className="dot" aria-hidden="true" />
        </button>
        <button type="button" className="tb-me" aria-label={t(`Open profile menu — ${ME.nameEn}`, `ເປີດເມນູ ${ME.nameLo || ME.nameEn}`)} aria-haspopup="menu" onClick={() => setRoute("profile")}>
          <span className="av" aria-hidden="true">{ME.avatar}</span>
          <span className="tb-me-meta">
            <span className="nm">{ME.nameEn.split(" ")[0]}</span>
            <span className="rl">{ME.title.split(" ").slice(0, 2).join(" ")}</span>
          </span>
          <I n="chevD" s={14} c="#8B8E99" />
        </button>
      </div>
    </header>
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
  const t = (en, lo) => lang === "lo" ? lo : en;
  const badgeFor = id => (id === "helpdesk" ? 2 : id === "leave" ? 1 : 0);
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <span className="serif">L</span>
        </div>
        <div className="brand-meta">
          <div className="brand-t">Lao Beverage Co.</div>
          <div className="brand-s">Workplace · ESS</div>
        </div>
      </div>

      <div className="me-card">
        <div className="me-av" aria-hidden="true">{ME.avatar}</div>
        <div className="me-meta">
          <div className="me-nm">{lang === "en" ? ME.nameEn : ME.nameLo}</div>
          <div className="me-rl">{lang === "en" ? ME.title : ME.titleLo}</div>
          <div className="me-id mono">{ME.id}</div>
        </div>
      </div>

      <nav className="nav" aria-label={t("Primary", "ເມນູຫຼັກ")}>
        {NAV.map(n => {
          const b = badgeFor(n.id);
          const labelText = lang === "en" ? n.label : n.lo;
          return (
            <button
              key={n.id}
              className={"nv" + (route === n.id ? " on" : "")}
              aria-current={route === n.id ? "page" : undefined}
              aria-label={b ? `${labelText} — ${b} ${t("pending", "ຄ້າງ")}` : undefined}
              onClick={() => setRoute(n.id)}
            >
              <I n={n.icon} s={16} />
              <span>{labelText}</span>
              {n.id === "helpdesk" && <span className="badge" aria-hidden="true">2</span>}
              {n.id === "leave" && <span className="badge sm" aria-hidden="true">1</span>}
            </button>
          );
        })}
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
