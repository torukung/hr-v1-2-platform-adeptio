/* Reusable UI primitives — kept inline-styled-ish via classes defined here. */

const uiCSS = `
/* ---------- A11y primitives ---------- */
.visually-hidden {
  position: absolute !important;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
.skip-link {
  position: absolute; top: -40px; left: 12px;
  background: var(--ink); color: var(--paper);
  padding: 8px 14px; border-radius: var(--r-md);
  font-size: 13px; font-weight: 600;
  text-decoration: none; z-index: 100;
  transition: top 120ms ease;
}
.skip-link:focus { top: 12px; outline: 2px solid var(--accent); outline-offset: 2px; }

/* Global focus-visible — applies to every interactive element */
:focus { outline: none; }
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible,
[role="button"]:focus-visible,
[role="tab"]:focus-visible {
  outline: 2px solid var(--ink-2);
  outline-offset: 2px;
  border-radius: 4px;
}
.nav-item:focus-visible { outline-offset: -2px; border-radius: var(--r-md); }
.nav-item.active:focus-visible { outline-color: var(--paper); }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

/* ---------- Layout shell ---------- */
.app {
  display: grid;
  grid-template-columns: 248px 1fr;
  min-height: 100vh;
}

/* ---------- Sidebar ---------- */
.sidebar {
  background: var(--paper);
  border-right: 1px solid var(--hairline);
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh;
}
.sidebar-brand {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--hairline);
}
.sidebar-brand .mark {
  width: 30px; height: 30px; border-radius: 8px;
  background: var(--primary); color: var(--paper);
  display: grid; place-items: center;
  font-family: var(--font-display); font-style: italic; font-size: 19px;
  letter-spacing: -0.04em;
}
.sidebar-brand .name { font-weight: 600; letter-spacing: -0.005em; line-height: 1.1; }
.sidebar-brand .tenant { color: var(--muted); font-size: 11.5px; line-height: 1.2; }
.sidebar-section {
  padding: 14px 14px 4px;
  font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--muted); font-weight: 600;
}
.nav-item {
  display: flex; align-items: center; gap: 10px;
  margin: 1px 8px; padding: 9px 10px;
  border-radius: var(--r-md); color: var(--ink-2);
  cursor: pointer; user-select: none;
  font-size: 13.5px; font-weight: 500;
  position: relative;
  width: calc(100% - 16px);
  text-align: left;
  background: transparent;
  border: 0;
  font-family: inherit;
  min-height: 36px;
}
.nav-item:hover { background: var(--bg-deep); }
.nav-item.active { background: var(--primary); color: var(--paper); }
.nav-item.active .ico { color: var(--paper); }
.nav-item .ico { color: var(--muted); width: 16px; height: 16px; flex: 0 0 16px; }
.nav-item .count {
  margin-left: auto;
  background: var(--bg-deep); color: var(--muted);
  border-radius: 999px; padding: 1px 7px; font-size: 11px; font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.nav-item.active .count { background: rgba(255,255,255,0.16); color: var(--paper); }
.sidebar-footer {
  margin-top: auto; padding: 12px 14px;
  border-top: 1px solid var(--hairline);
  display: flex; align-items: center; gap: 10px;
}
.avatar {
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--primary-soft); color: var(--primary);
  display: grid; place-items: center; font-weight: 600; font-size: 12px;
  flex: 0 0 30px;
}
.user-meta { line-height: 1.15; min-width: 0; }
.user-meta .role { color: var(--muted); font-size: 11px; }

/* ---------- Topbar ---------- */
.topbar {
  display: flex; align-items: center; gap: 14px;
  padding: 12px 26px;
  background: var(--paper);
  border-bottom: 1px solid var(--hairline);
  position: sticky; top: 0; z-index: 20;
}
.crumbs { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 13px; }
.crumbs .sep { color: var(--muted-2); }
.crumbs .here { color: var(--ink); font-weight: 500; }

.search {
  margin-left: 14px; flex: 1;
  display: flex; align-items: center; gap: 8px;
  max-width: 460px;
  background: var(--bg-deep);
  border: 1px solid transparent;
  border-radius: var(--r-md);
  padding: 6px 10px;
}
.search input {
  background: transparent; border: 0; flex: 1; font-size: 13px;
  outline: none;
}
.search:focus-within {
  background: var(--surface);
  border-color: var(--ink-2);
  box-shadow: 0 0 0 2px var(--ink-2);
}
.search .kbd {
  font-family: var(--font-mono); font-size: 11px; color: var(--muted);
  background: var(--surface); border: 1px solid var(--hairline);
  border-radius: 4px; padding: 1px 5px;
}

.lang-switch {
  display: inline-flex; padding: 3px;
  background: var(--bg-deep); border-radius: 999px;
}
.lang-switch button {
  border: 0; background: transparent;
  padding: 7px 14px; min-height: 32px; border-radius: 999px;
  font-size: 12.5px; font-weight: 600; color: var(--muted);
  cursor: pointer; letter-spacing: 0.04em;
}
.lang-switch button.on { background: var(--surface); color: var(--ink); box-shadow: var(--shadow-sm); }

.icon-btn {
  width: 36px; height: 36px; border-radius: var(--r-md);
  border: 1px solid transparent;
  background: transparent; color: var(--ink-2);
  display: grid; place-items: center; cursor: pointer;
  position: relative;
}
.icon-btn:hover { background: var(--bg-deep); }
.icon-btn .dot {
  position: absolute; top: 7px; right: 7px;
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--accent); border: 2px solid var(--paper);
}

/* ---------- Page chrome ---------- */
.page { padding: 22px 26px 60px; max-width: 1400px; }
.page-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 16px; }
.page-title {
  font-family: var(--font-display); font-style: italic;
  font-size: 36px; line-height: 1.05; letter-spacing: -0.01em;
  color: var(--ink); margin: 0;
}
.page-sub { color: var(--muted); margin-top: 4px; font-size: 13.5px; max-width: 720px; }

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 12px; border-radius: var(--r-md);
  font-size: 13px; font-weight: 500;
  border: 1px solid var(--hairline-strong);
  background: var(--surface); color: var(--ink-2);
  cursor: pointer;
}
.btn:hover { background: var(--paper); }
.btn.primary { background: var(--primary); color: var(--paper); border-color: var(--primary); }
.btn.primary:hover { background: #131F44; }
.btn.ghost { border-color: transparent; background: transparent; }
.btn.ghost:hover { background: var(--bg-deep); }
.btn.sm { padding: 4px 8px; font-size: 12px; }

/* ---------- Card ---------- */
.card {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--r-lg);
  padding: 18px;
}
.card.flat { box-shadow: none; }

.card-h {
  display: flex; align-items: baseline; justify-content: space-between; gap: 10px;
  margin-bottom: 12px;
}
.card-title {
  font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--muted);
  margin: 0;
}
h2.card-title, h3.card-title { font-family: inherit; }
.card-sub { color: var(--muted); font-size: 12px; }

/* ---------- KPI ---------- */
.kpi-grid {
  display: grid; grid-template-columns: repeat(6, 1fr);
  gap: 1px; background: var(--hairline);
  border: 1px solid var(--hairline);
  border-radius: var(--r-lg); overflow: hidden;
  margin-bottom: 18px;
}
.kpi {
  background: var(--surface); padding: 16px 18px;
  display: flex; flex-direction: column; gap: 4px;
}
.kpi-label {
  font-size: 11.5px; font-weight: 600; letter-spacing: 0.07em;
  text-transform: uppercase; color: var(--muted);
}
.kpi-value {
  font-family: var(--font-display); font-style: italic;
  font-size: 36px; line-height: 1; letter-spacing: -0.01em;
  margin-top: 6px;
}
.kpi-foot { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted); margin-top: 6px; }
.delta { font-weight: 600; font-size: 12px; }
.delta.pos { color: var(--positive); }
.delta.neg { color: var(--danger); }
.delta.muted { color: var(--muted); }

/* ---------- Filter chips ---------- */
.filterbar {
  display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
  margin-bottom: 16px;
}
.seg {
  display: inline-flex; padding: 3px;
  background: var(--surface); border: 1px solid var(--hairline);
  border-radius: 999px;
}
.seg button {
  border: 0; background: transparent;
  padding: 8px 14px; min-height: 32px; border-radius: 999px;
  font-size: 12.5px; font-weight: 500; color: var(--muted);
  cursor: pointer;
}
.seg button.on { background: var(--ink); color: var(--paper); }
.chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 11px; background: var(--surface);
  border: 1px solid var(--hairline); border-radius: 999px;
  font-size: 12.5px; color: var(--ink-2); cursor: pointer;
}
.chip .swatch { width: 8px; height: 8px; border-radius: 2px; background: var(--primary); }
.chip .x { color: var(--muted); margin-left: 2px; }
.chip:hover { border-color: var(--hairline-strong); }
.chip.on { background: var(--primary); border-color: var(--primary); color: var(--paper); }
.chip.on .swatch { background: rgba(255,255,255,0.7); }

/* ---------- Tables ---------- */
.table { width: 100%; border-collapse: collapse; font-size: 13px; }
.table th {
  text-align: left; font-weight: 600; color: var(--muted);
  font-size: 11px; letter-spacing: 0.07em; text-transform: uppercase;
  padding: 10px var(--row-pad); border-bottom: 1px solid var(--hairline);
}
.table td {
  padding: var(--row-pad); border-bottom: 1px solid var(--hairline);
  vertical-align: middle;
}
.table tr:hover td { background: var(--paper); }
.table .id { font-family: var(--font-mono); color: var(--muted); font-size: 12px; }

/* ---------- Pills/Badges ---------- */
.pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 2px 8px; border-radius: 999px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.02em;
  background: var(--bg-deep); color: var(--ink-2);
  white-space: nowrap;
}
.pill .d { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.8; }
.pill.primary { background: var(--primary-soft); color: var(--primary); }
.pill.positive { background: var(--positive-soft); color: var(--positive); }
.pill.warning { background: var(--warning-soft); color: var(--warning); }
.pill.danger { background: var(--danger-soft); color: var(--danger); }
.pill.accent { background: var(--accent-soft); color: var(--accent); }
.pill.outline { background: transparent; border: 1px solid var(--hairline-strong); color: var(--muted); }

/* ---------- Misc ---------- */
.row { display: flex; align-items: center; gap: 8px; }
.col { display: flex; flex-direction: column; gap: 8px; }
.spacer { flex: 1; }
.divider { height: 1px; background: var(--hairline); margin: 14px 0; }

.empl {
  display: flex; align-items: center; gap: 10px;
}
.empl .avatar { width: 28px; height: 28px; font-size: 11px; }
.empl .nm { font-weight: 500; line-height: 1.15; }
.empl .nm .lo { color: var(--muted); font-size: 11.5px; font-weight: 400; }
`;

const styleEl = document.createElement("style");
styleEl.textContent = uiCSS;
document.head.appendChild(styleEl);

/* ---------- Icons (compact stroke icons) ---------- */
function Icon({ name, size = 16, stroke = 1.6, ...rest }) {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="11" width="7" height="10" rx="1.5" /><rect x="3" y="15" width="7" height="6" rx="1.5" /></>,
    users: <><circle cx="9" cy="8" r="3.4" /><path d="M3.5 19c.6-3 3-4.6 5.5-4.6S14 16 14.6 19" /><path d="M16 4.5a3.4 3.4 0 0 1 0 7" /><path d="M17 14.4c2.3.4 3.9 2 4.5 4.6" /></>,
    leave: <><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3.5v3M16 3.5v3" /><path d="M8 13l2 2 4-4" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
    payroll: <><rect x="3.5" y="6" width="17" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6.5 9.5h.01M17.5 14.5h.01" /></>,
    biometric: <><path d="M5 11a7 7 0 0 1 14 0v3" /><path d="M8 12a4 4 0 0 1 8 0v4M11 12v6" /><path d="M5 18.5c1-2 2-3.5 2-7" /><path d="M19 18.5c-1-2-2-3.5-2-7" /></>,
    chart: <><path d="M4 20V4M4 20h16" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="14" width="3" height="4" /></>,
    cms: <><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M3.5 8.5h17M7 12.5h7M7 16h10" /></>,
    settings: <><circle cx="12" cy="12" r="2.8" /><path d="M19 12c0 .6-.06 1.2-.18 1.8l1.7 1.3-1.6 2.8-2-.7c-.9.7-1.9 1.3-3 1.6l-.3 2.1h-3.2l-.3-2.1c-1.1-.3-2.1-.9-3-1.6l-2 .7-1.6-2.8 1.7-1.3A8 8 0 0 1 5 12c0-.6.06-1.2.18-1.8l-1.7-1.3 1.6-2.8 2 .7c.9-.7 1.9-1.3 3-1.6l.3-2.1h3.2l.3 2.1c1.1.3 2.1.9 3 1.6l2-.7 1.6 2.8-1.7 1.3c.12.6.18 1.2.18 1.8z" /></>,
    bell: <><path d="M6 9.5a6 6 0 0 1 12 0V14l1.5 2.5h-15L6 14V9.5z" /><path d="M9.5 19a2.5 2.5 0 0 0 5 0" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    download: <><path d="M12 4v11M7 11l5 5 5-5M5 19h14" /></>,
    filter: <><path d="M4 5h16l-6 8v6l-4-2v-4z" /></>,
    chevron: <><path d="M9 6l6 6-6 6" /></>,
    chevronDown: <><path d="M6 9l6 6 6-6" /></>,
    check: <><path d="M5 12l5 5L20 7" /></>,
    x: <><path d="M6 6l12 12M6 18L18 6" /></>,
    flag: <><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></>,
    home: <><path d="M3 11l9-7 9 7M5 10v10h14V10" /></>,
    file: <><path d="M14 3H6v18h12V7zM14 3v4h4" /></>,
    book: <><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z" /><path d="M5 16a4 4 0 0 1 4-4h10" /></>,
    activity: <><path d="M3 12h4l3-7 4 14 3-7h4" /></>,
    location: <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>,
    chat: <><path d="M4 5h16v11H8l-4 4z" /></>,
    workflow: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="3" width="6" height="6" rx="1.5" /><rect x="9" y="15" width="6" height="6" rx="1.5" /><path d="M9 6h6M12 9v6" /></>,
    badge: <><path d="M7 8a5 5 0 1 1 10 0c0 3-2 4.5-5 7-3-2.5-5-4-5-7z" /><circle cx="12" cy="8" r="2" /></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></>,
    globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 3 2.5 14 0 17M12 3.5c-2.5 3-2.5 14 0 17" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name]}
    </svg>
  );
}

function Pill({ children, tone = "default" }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

function Avatar({ name, lao, size }) {
  const initials = (name || "").split(" ").slice(0, 2).map(s => s[0]).join("").toUpperCase();
  const style = size ? { width: size, height: size, fontSize: size * 0.38 } : null;
  return <div className="avatar" style={style}>{initials}</div>;
}

function Empl({ s, lang = "en" }) {
  return (
    <div className="empl">
      <Avatar name={s.name} />
      <div className="nm">
        <div>{s.name}</div>
        <div className="lo lao">{s.lao}</div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Pill, Avatar, Empl });
