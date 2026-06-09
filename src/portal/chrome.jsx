/* Mobile Staff Portal — chrome (split from portal.jsx) */

function Header({ greet, sub, lo, dark = false }) {
  return (
    <div className="ess-h">
      <div className="av">VK</div>
      <div>
        <div className="greet">{greet}</div>
        <div className="name">Vilaysone <span className="lo">{lo}</span></div>
      </div>
      <div className="bell"><I name="bell" size={15} /><span className="dot"></span></div>
    </div>
  );
}

/* ---------- Tab bar ---------- */

function TabBar({ active }) {
  const tabs = [
    { id: "home", l: "Home", ic: "home" },
    { id: "time", l: "Time", ic: "clock" },
    { id: "pay",  l: "Pay",  ic: "pay" },
    { id: "inbox", l: "Inbox", ic: "inbox" },
    { id: "me",   l: "Me",   ic: "user" },
  ];
  return (
    <div className="tabbar">
      {tabs.map(t => (
        <div key={t.id} className={`t ${active === t.id ? "on" : ""}`}>
          <I name={t.ic} size={18} c={active === t.id ? "#fff" : "var(--muted)"} />
          <span className="l">{t.l}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Screen 1: Home (priority feed) ---------- */
