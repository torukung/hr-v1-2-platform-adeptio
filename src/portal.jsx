/* Staff Portal — single file with 5 phone screens + wiring panel */

function I({ name, size = 16, c = "currentColor", s = 1.7 }) {
  const P = {
    bell: <><path d="M6 9.5a6 6 0 0 1 12 0V14l1.5 2.5h-15L6 14V9.5z" /><path d="M9.5 19a2.5 2.5 0 0 0 5 0" /></>,
    home: <><path d="M3 11l9-7 9 7M5 10v10h14V10" /></>,
    clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
    pay: <><rect x="3.5" y="6" width="17" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /></>,
    inbox: <><path d="M4 13l3-9h10l3 9M4 13v6h16v-6M4 13h5l1 2h4l1-2h5" /></>,
    user: <><circle cx="12" cy="9" r="3.6" /><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chev: <><path d="M9 6l6 6-6 6" /></>,
    chevD: <><path d="M6 9l6 6 6-6" /></>,
    check: <><path d="M5 12l5 5L20 7" /></>,
    x: <><path d="M6 6l12 12M6 18L18 6" /></>,
    leave: <><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3.5v3M16 3.5v3M8 13l2 2 4-4" /></>,
    mc: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M12 8v6M9 11h6" /></>,
    ot: <><circle cx="12" cy="12" r="8.5" /><path d="M12 8v4l3 1.5M16.5 5L19 7.5" /></>,
    swap: <><path d="M4 8h13l-3-3M20 16H7l3 3" /></>,
    expense: <><rect x="3.5" y="6" width="17" height="13" rx="2" /><path d="M3.5 10h17M7 14h3M7 16.5h5" /></>,
    loan: <><path d="M4 7h12a4 4 0 0 1 4 4v9H4z" /><path d="M8 11h6M8 14h4" /></>,
    benefit: <><path d="M7 8a5 5 0 1 1 10 0c0 3-2 5-5 7-3-2-5-4-5-7z" /></>,
    travel: <><path d="M2 17l9-3 9-9 1 1-9 9-3 9-2-2-2 2-3-7z" /></>,
    chat: <><path d="M4 5h16v11H8l-4 4z" /></>,
    grievance: <><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 16.5h.01" /></>,
    pulse: <><path d="M3 12h4l3-7 4 14 3-7h4" /></>,
    cert: <><circle cx="12" cy="9" r="4" /><path d="M9 12l-2 8 5-3 5 3-2-8" /></>,
    visa: <><rect x="4" y="3" width="14" height="18" rx="1.5" /><circle cx="11" cy="10" r="2.5" /><path d="M7 16h8" /></>,
    book: <><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z" /></>,
    vault: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><circle cx="14" cy="12" r="2.6" /><path d="M14 9.5v-1M7 10v4" /></>,
    profile: <><circle cx="12" cy="9" r="3.6" /><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" /></>,
    addr: <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>,
    bank: <><path d="M3 10l9-5 9 5M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18" /></>,
    photo: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M21 16l-5-4-8 7" /></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></>,
    flag: <><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></>,
    cam: <><path d="M4 8h4l2-2h4l2 2h4v10H4z" /><circle cx="12" cy="13" r="3.4" /></>,
    fp: <><path d="M5 11a7 7 0 0 1 14 0v3M8 12a4 4 0 0 1 8 0v4M11 12v6" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    download: <><path d="M12 4v11M7 11l5 5 5-5M5 19h14" /></>,
    file: <><path d="M14 3H6v18h12V7zM14 3v4h4" /></>,
    geo: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 3 2.5 14 0 17M12 3.5c-2.5 3-2.5 14 0 17" /></>,
    wifi: <><path d="M2 9a15 15 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 15a7 7 0 0 1 8 0" /><circle cx="12" cy="19" r="1.4" /></>,
    qr: <><rect x="3.5" y="3.5" width="6" height="6" /><rect x="14.5" y="3.5" width="6" height="6" /><rect x="3.5" y="14.5" width="6" height="6" /><path d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3" /></>,
    workflow: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="3" width="6" height="6" rx="1.5" /><rect x="9" y="15" width="6" height="6" rx="1.5" /><path d="M9 6h6M12 9v6" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">{P[name]}</svg>;
}

/* ---------- Header used in all phone screens ---------- */
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
function Home() {
  return (
    <div className="ess">
      <IOSStatusBar />
      <Header greet="Wednesday · 13 May" lo="ວິໄລສອນ" />
      <div className="scroll">

        {/* Priority alert from HR */}
        <div className="alert">
          <div className="tag">HR · Action required</div>
          <div className="ttl">Confirm bank account before 18 May</div>
          <div className="sub">May payroll lands on 25 May. People Ops needs your updated BCEL account number to release LAK 8,420,000.</div>
          <div className="row">
            <div className="b pri">Update now</div>
            <div className="b sec">Remind later</div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="qgrid">
          <div className="qbtn">
            <div className="ic" style={{ background: "color-mix(in oklab, var(--c-C) 14%, white)", color: "var(--c-C)" }}>
              <I name="clock" size={18} />
            </div>
            <div className="l">Clock in</div>
            <div className="lo">ລົງເວລາ</div>
          </div>
          <div className="qbtn">
            <div className="ic" style={{ background: "color-mix(in oklab, var(--c-C) 14%, white)", color: "var(--c-C)" }}>
              <I name="leave" size={18} />
            </div>
            <div className="l">Apply leave</div>
            <div className="lo">ລາພັກ</div>
          </div>
          <div className="qbtn">
            <div className="ic" style={{ background: "color-mix(in oklab, var(--c-D) 14%, white)", color: "var(--c-D)" }}>
              <I name="expense" size={18} />
            </div>
            <div className="l">Expense</div>
            <div className="lo">ເບີກຄ່າໃຊ້ຈ່າຍ</div>
          </div>
          <div className="qbtn">
            <div className="ic" style={{ background: "color-mix(in oklab, var(--c-E) 14%, white)", color: "var(--c-E)" }}>
              <I name="chat" size={18} />
            </div>
            <div className="l">Ask HR</div>
            <div className="lo">ຖາມ HR</div>
          </div>
        </div>

        {/* My open requests (status from HR system) */}
        <div className="sec-h">
          <span className="t">Your open requests</span>
          <span className="a">View all</span>
        </div>
        <div className="lst">
          <div className="row-i">
            <div className="ic C"><I name="leave" size={16} /></div>
            <div className="body">
              <div className="ttl">Annual leave · 3 days</div>
              <div className="sub">13–15 May · with mgr P. Inthavong</div>
            </div>
            <div className="end"><span className="pill warning">Step 1/2</span></div>
          </div>
          <div className="row-i">
            <div className="ic D"><I name="expense" size={16} /></div>
            <div className="body">
              <div className="ttl">Per-diem · Pakse trip</div>
              <div className="sub">LAK 1,240,000 · OCR receipts ×4</div>
            </div>
            <div className="end"><span className="pill positive">Approved</span></div>
          </div>
          <div className="row-i">
            <div className="ic A"><I name="bank" size={16} /></div>
            <div className="body">
              <div className="ttl">Bank account update</div>
              <div className="sub">BCEL · last 4 ··· 8821</div>
            </div>
            <div className="end"><span className="pill outline">Draft</span></div>
          </div>
        </div>

        {/* Today's status */}
        <div className="sec-h">
          <span className="t">Today</span>
        </div>
        <div className="ktiles">
          <div className="ktile">
            <div className="l">Clocked in</div>
            <div className="v num">08:14</div>
            <div className="s">HQ Vientiane · Wi-Fi</div>
          </div>
          <div className="ktile">
            <div className="l">Annual left</div>
            <div className="v num">11.5</div>
            <div className="s">of 18 days · 2026</div>
          </div>
          <div className="ktile">
            <div className="l">Next payday</div>
            <div className="v num">25</div>
            <div className="s">May · 12 days</div>
          </div>
        </div>

        {/* Announcements */}
        <div className="sec-h">
          <span className="t">From the company</span>
          <span className="a">All</span>
        </div>
        <div className="lst">
          <div className="row-i">
            <div className="ic" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}><I name="flag" size={16} /></div>
            <div className="body">
              <div className="ttl">Wellness leave — 5 paid days/yr</div>
              <div className="lo">ປັບປຸງນະໂຍບາຍລາພັກສຸຂະພາບຈິດ</div>
            </div>
            <div className="end">04 May</div>
          </div>
          <div className="row-i">
            <div className="ic" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}><I name="pay" size={16} /></div>
            <div className="body">
              <div className="ttl">May payslip release</div>
              <div className="lo">ໃບເງິນເດືອນເດືອນພຶດສະພາ</div>
            </div>
            <div className="end">25 May</div>
          </div>
        </div>
      </div>
      <TabBar active="home" />
    </div>
  );
}

/* ---------- Screen 2: Apply leave (cluster C) ---------- */
function LeaveApply() {
  const days = [
    { d: 27, dim: true }, { d: 28, dim: true }, { d: 29, dim: true }, { d: 30, dim: true }, { d: 1 }, { d: 2 }, { d: 3 },
    { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 }, { d: 8 }, { d: 9 }, { d: 10 },
    { d: 11 }, { d: 12 }, { d: 13, lv: true, sel: true }, { d: 14, lv: true }, { d: 15, lv: true }, { d: 16 }, { d: 17 },
    { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22 }, { d: 23 }, { d: 24 },
    { d: 25 }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29 }, { d: 30 }, { d: 31 },
  ];
  return (
    <div className="ess">
      <IOSStatusBar />
      <div style={{ padding: "6px 18px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <I name="x" size={18} c="var(--muted)" />
        <div style={{ fontSize: 15, fontWeight: 600, flex: 1, textAlign: "center" }}>Apply for leave</div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>Step 1/3</div>
      </div>
      <div className="scroll" style={{ paddingTop: 6 }}>

        {/* Balance bar */}
        <div className="leave-bar">
          <div className="row1">
            <div style={{ flex: 1 }}>
              <div className="l" style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Annual balance</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <div className="v">11.5</div>
                <div className="u">of 18 days</div>
              </div>
            </div>
            <span className="pill primary">2026</span>
          </div>
          <div className="track">
            <div className="seg" style={{ width: "36%", background: "var(--primary)" }}></div>
            <div className="seg" style={{ width: "20%", background: "var(--accent)" }}></div>
            <div className="seg" style={{ width: "8%",  background: "var(--positive)" }}></div>
          </div>
          <div className="legend">
            <span><span className="dot" style={{ background: "var(--primary)" }}></span>Used 6.5</span>
            <span><span className="dot" style={{ background: "var(--accent)" }}></span>Pending 3</span>
            <span><span className="dot" style={{ background: "var(--positive)" }}></span>Carried 1.5</span>
          </div>
        </div>

        {/* Form */}
        <div style={{ marginTop: 12 }}>
          <div className="form-row">
            <div className="l">Type</div>
            <div className="v">Annual leave</div>
            <I name="chev" size={14} c="var(--muted)" />
          </div>
          <div className="form-row" style={{ alignItems: "flex-start" }}>
            <div className="l" style={{ paddingTop: 2 }}>Dates</div>
            <div style={{ flex: 1 }}>
              <div className="v">13 May → 15 May 2026</div>
              <div className="v sub" style={{ marginTop: 2 }}>3 working days · skips 11 May (public)</div>
              <div className="cal">
                {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} style={{ fontSize: 10, color: "var(--muted)", textAlign: "center" }}>{d}</div>)}
                {days.map((d, i) =>
                  <div key={i} className={`d ${d.dim ? "dim" : ""} ${d.lv ? "lv" : ""} ${d.sel ? "sel" : ""}`}>{d.d}</div>
                )}
                <div className="d hol" style={{ gridColumn: "span 7", aspectRatio: "auto", padding: "4px 0", fontSize: 10.5 }}>
                  ★ 11 May · Boun Visakha Puja (Lao public holiday)
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="l">Cover</div>
            <div className="v">Manilay K. <span style={{ color: "var(--muted)", fontWeight: 400 }}>· auto-suggested</span></div>
            <I name="chev" size={14} c="var(--muted)" />
          </div>
          <div className="form-row">
            <div className="l">Reason</div>
            <div className="v sub">Family · home in Pakse</div>
          </div>
        </div>

        {/* Workflow preview */}
        <div className="sec-h">
          <span className="t">Approval workflow</span>
        </div>
        <div className="lst">
          <div className="row-i">
            <div className="ic pos"><I name="check" size={14} /></div>
            <div className="body"><div className="ttl">You · submit</div><div className="sub">Now</div></div>
            <div className="end"><span className="pill positive">Ready</span></div>
          </div>
          <div className="row-i">
            <div className="ic" style={{ background: "var(--primary-soft)", color: "var(--primary)" }}>1</div>
            <div className="body"><div className="ttl">P. Inthavong · line manager</div><div className="sub">SLA 24h</div></div>
            <div className="end"><span className="pill outline">Pending</span></div>
          </div>
          <div className="row-i">
            <div className="ic" style={{ background: "var(--bg-deep)", color: "var(--muted)" }}>2</div>
            <div className="body"><div className="ttl">HR · auto-validate</div><div className="sub">Balance + conflict check</div></div>
            <div className="end"><span className="pill outline">Auto</span></div>
          </div>
        </div>

        <div className="row" style={{ display: "flex", gap: 8, margin: "14px 2px 0" }}>
          <div style={{ flex: 1, padding: "12px", background: "#fff", border: "1px solid var(--hairline-strong)", borderRadius: 12, textAlign: "center", fontWeight: 600, fontSize: 13.5 }}>Save draft</div>
          <div style={{ flex: 2, padding: "12px", background: "var(--primary)", color: "#fff", borderRadius: 12, textAlign: "center", fontWeight: 600, fontSize: 13.5 }}>Submit request</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Screen 3: Pay & statutory (cluster B) ---------- */
function Pay() {
  return (
    <div className="ess">
      <IOSStatusBar />
      <Header greet="Pay & statutory" lo="ເງິນເດືອນ" />
      <div className="scroll">

        {/* Hero payslip */}
        <div className="payslip">
          <div className="lab">Apr 2026 · net</div>
          <div className="big mono">₭ 8,420,000</div>
          <div className="grid">
            <div className="k">Gross</div><div className="v">9,200,000</div>
            <div className="k">PIT</div>   <div className="v">−420,000</div>
            <div className="k">NSSF (5.5%)</div><div className="v">−290,000</div>
            <div className="k">Provident Fund (5%)</div><div className="v">−460,000</div>
            <div className="k">Bank · BCEL</div><div className="v">···· 8821</div>
          </div>
          <div className="actions">
            <div className="b pri"><I name="download" size={12} c="#15295C" /> Payslip PDF</div>
            <div className="b sec">Tax view</div>
          </div>
        </div>

        {/* Annual income summary card (TH benchmark: 50 Tawi · Kor.Tor.20) */}
        <div className="sec-h"><span className="t">Statutory documents</span><span className="a">Library</span></div>
        <div className="lst">
          <div className="row-i">
            <div className="ic B"><I name="file" size={16} /></div>
            <div className="body">
              <div className="ttl">2025 annual income summary</div>
              <div className="sub">Tax Department · PDF · password-protected</div>
            </div>
            <I name="download" size={14} c="var(--muted)" />
          </div>
          <div className="row-i">
            <div className="ic B"><I name="file" size={16} /></div>
            <div className="body">
              <div className="ttl">NSSF contribution statement</div>
              <div className="sub">Apr 2026 · employee + employer</div>
            </div>
            <I name="download" size={14} c="var(--muted)" />
          </div>
          <div className="row-i">
            <div className="ic B"><I name="file" size={16} /></div>
            <div className="body">
              <div className="ttl">Provident Fund balance</div>
              <div className="sub">Match 5% · LAK 18.4M YTD</div>
            </div>
            <span className="pill outline">View</span>
          </div>
        </div>

        {/* Personal tax estimator */}
        <div className="sec-h"><span className="t">Tools</span></div>
        <div className="lst">
          <div className="row-i">
            <div className="ic" style={{ background: "color-mix(in oklab, var(--c-B) 14%, white)", color: "var(--c-B)" }}><I name="sparkle" size={16} /></div>
            <div className="body">
              <div className="ttl">Personal tax estimator</div>
              <div className="sub">FBP declaration · what-if calculator</div>
            </div>
            <I name="chev" size={14} c="var(--muted)" />
          </div>
          <div className="row-i">
            <div className="ic" style={{ background: "color-mix(in oklab, var(--c-B) 14%, white)", color: "var(--c-B)" }}><I name="loan" size={16} /></div>
            <div className="body">
              <div className="ttl">Salary advance</div>
              <div className="sub">Up to 30% · auto-deducted next cycle</div>
            </div>
            <I name="chev" size={14} c="var(--muted)" />
          </div>
        </div>

        {/* History */}
        <div className="sec-h"><span className="t">12-month history</span></div>
        <div className="lst">
          {[
            ["Apr 2026", "8,420,000", "Released"],
            ["Mar 2026", "8,310,000", "Released"],
            ["Feb 2026", "8,420,000", "Released"],
            ["Jan 2026", "8,420,000", "+ bonus 4.2M"],
          ].map(([m, a, s]) => (
            <div key={m} className="row-i">
              <div className="body">
                <div className="ttl mono">{m}</div>
                <div className="sub">{s}</div>
              </div>
              <div className="mono" style={{ fontSize: 13 }}>₭ {a}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="pay" />
    </div>
  );
}

/* ---------- Screen 4: Helpdesk + AI chatbot (cluster E) ---------- */
function Helpdesk() {
  return (
    <div className="ess">
      <IOSStatusBar />
      <div style={{ padding: "6px 18px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <I name="chev" size={18} c="var(--muted)" style={{ transform: "scaleX(-1)" }} />
        <div className="av" style={{ background: "color-mix(in oklab, var(--c-E) 18%, white)", color: "var(--c-E)" }}>HR</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.1 }}>HR Assist · ຜູ້ຊ່ວຍ HR</div>
          <div style={{ fontSize: 11, color: "var(--positive)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--positive)" }}></span>
            AI · routes to People Ops if needed
          </div>
        </div>
        <span className="pill outline">EN · LO</span>
      </div>

      <div className="scroll" style={{ paddingBottom: 100 }}>

        <div className="chat">
          <div className="bub bot">
            Hi Vilaysone — how can I help today?
            <span className="lo">ສະບາຍດີ ວິໄລສອນ — ມີຫຍັງໃຫ້ຊ່ວຍບໍ?</span>
          </div>

          <div className="chat-suggest">
            <span className="c">Leave balance</span>
            <span className="c">Payslip Apr</span>
            <span className="c">Visa renewal</span>
            <span className="c">Salary cert</span>
          </div>

          <div className="bub you">
            How much annual leave do I have left?
          </div>

          <div className="bub bot">
            You have <b>11.5 days</b> annual + <b>1.5 days</b> carried from 2025. You also have a pending request for 13–15 May that will deduct 3 days once your manager approves.
            <span className="lo">ທ່ານມີວັນລາພັກ 11.5 ວັນ ແລະ ຍົກຍອດອີກ 1.5 ວັນ.</span>
          </div>

          <div className="chat-suggest">
            <span className="c">Apply more leave</span>
            <span className="c">View calendar</span>
            <span className="c">Talk to a person</span>
          </div>

          <div className="bub you">Can you generate my employment certificate?</div>

          <div className="bub bot" style={{ background: "color-mix(in oklab, var(--c-E) 6%, white)", border: "1px solid color-mix(in oklab, var(--c-E) 16%, white)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "var(--c-E)", fontWeight: 600, marginBottom: 4 }}>
              <I name="cert" size={13} c="var(--c-E)" /> Letter draft ready
            </div>
            Employment certificate · English + Lao · e-signed by HR Director.
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <span className="pill primary">Preview PDF</span>
              <span className="pill positive">Send to email</span>
            </div>
          </div>

          <div className="bub bot" style={{ background: "var(--paper)", border: "1px dashed var(--hairline-strong)" }}>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Ticket auto-created</div>
            <b>HR-2026-0418</b> · SLA 4h · routed to People Ops
            <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>You can also reach HR via LINE OA or Telegram (Thai + Lao).</div>
          </div>
        </div>

        <div className="composer">
          <I name="sparkle" size={16} c="var(--c-E)" />
          <input placeholder="Ask anything in EN or ລາວ…" />
          <I name="cam" size={16} c="var(--muted)" />
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "grid", placeItems: "center" }}>
            <I name="arrow" size={14} c="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Screen 5: All services (the 6 clusters) ---------- */
function Services() {
  const C = [
    { k: "A", c: "var(--c-A)", n: "Personal Data & Profile", lo: "ຂໍ້ມູນສ່ວນຕົວ", li: ["Address · phone · email", "Emergency · dependents", "Bank · KYC · profile photo"] },
    { k: "B", c: "var(--c-B)", n: "Pay & Statutory", lo: "ເງິນເດືອນ ແລະ ພາສີ", li: ["Payslip current + history", "Annual income (50 Tawi · KT.20)", "Tax estimator · FBP · PF balance"] },
    { k: "C", c: "var(--c-C)", n: "Time, Attendance & Leave", lo: "ເວລາ ແລະ ການລາພັກ", li: ["Clock-in: selfie · GPS · QR · Wi-Fi", "Punch correction · MC upload", "Leave · shift swap · OT · team cal"] },
    { k: "D", c: "var(--c-D)", n: "Claims, Loans & Benefits", lo: "ຄ່າໃຊ້ຈ່າຍ ແລະ ສະຫວັດດີການ", li: ["OCR receipt expense claim", "Salary advance · loan", "Benefits enrollment · per-diem"] },
    { k: "E", c: "var(--c-E)", n: "HR Helpdesk & Comms", lo: "ບໍລິການ HR ແລະ ຂ່າວສານ", li: ["SLA-tracked HR ticket inbox", "LINE OA · Telegram chatbot", "Announcements · pulse · grievance"] },
    { k: "F", c: "var(--c-F)", n: "Documents, Letters, Policy", lo: "ເອກະສານ ແລະ ນະໂຍບາຍ", li: ["Self-generate cert · salary letter", "Visa / WP request with e-sign", "Policy hub · personal vault"] },
  ];
  return (
    <div className="ess">
      <IOSStatusBar />
      <div style={{ padding: "6px 18px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <I name="x" size={18} c="var(--muted)" />
        <div style={{ fontSize: 15, fontWeight: 600 }}>All services</div>
        <div style={{ flex: 1 }}></div>
        <span className="pill outline">EN · ລາວ</span>
      </div>

      <div className="scroll">
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 14, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <I name="sparkle" size={14} c="var(--c-E)" />
          <span style={{ fontSize: 12.5, color: "var(--muted)", flex: 1 }}>Search a service or ask in your own words…</span>
          <span className="pill outline">⌘K</span>
        </div>

        <div className="grid6">
          {C.map(c => (
            <div key={c.k} className="cluster">
              <div className="head">
                <div className="ic" style={{ background: c.c }}>{c.k}</div>
                <div>
                  <div className="nm">{c.n}</div>
                  <div className="lo">{c.lo}</div>
                </div>
              </div>
              <ul>{c.li.map((l, i) => <li key={i}>{l}</li>)}</ul>
            </div>
          ))}
        </div>

        {/* Baseline reminders */}
        <div className="sec-h"><span className="t">Baseline · every screen</span></div>
        <div className="lst">
          <div className="row-i">
            <div className="ic" style={{ background: "var(--bg-deep)", color: "var(--muted)" }}><I name="wifi" size={14} /></div>
            <div className="body"><div className="ttl">Mobile-first · offline sync</div><div className="sub">Field workers, kiosks, low-bandwidth sites</div></div>
          </div>
          <div className="row-i">
            <div className="ic" style={{ background: "var(--bg-deep)", color: "var(--muted)" }}><I name="geo" size={14} /></div>
            <div className="body"><div className="ttl">Multilingual · Lao · Thai · EN</div><div className="sub">User-pinned per device · auto-translate</div></div>
          </div>
          <div className="row-i">
            <div className="ic" style={{ background: "var(--bg-deep)", color: "var(--muted)" }}><I name="fp" size={14} /></div>
            <div className="body"><div className="ttl">SSO + biometric login</div><div className="sub">WCAG 2.1 AA · audit trail every action</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Wiring matrix ---------- */
function Wiring() {
  const W = [
    { k: "A", n: "Personal Data & Profile", lo: "ຂໍ້ມູນສ່ວນຕົວ", from: "Address change · bank · KYC docs · profile photo · dependents · house-book OCR", to: "Staff Records · Documents Vault → People Ops review queue", target: "P1 · Staff Records" },
    { k: "B", n: "Pay & Statutory",         lo: "ເງິນເດືອນ",         from: "Payslip view · annual income · tax estimator · PF balance · salary advance", to: "Payroll module · Statutory library (Lao PIT + NSSF + PF / TH benchmark)", target: "P4 · Payroll" },
    { k: "C", n: "Time, Attendance & Leave", lo: "ເວລາ ແລະ ການລາພັກ", from: "Clock-in (selfie · GPS · QR · Wi-Fi · biometric) · punch correction · MC upload · leave · OT · shift swap", to: "Time & Attendance live board · Leave & ESS approvals · Approvals queue", target: "P2 · Leave & ESS · P3 · T&A" },
    { k: "D", n: "Claims, Loans & Benefits", lo: "ຄ່າໃຊ້ຈ່າຍ",         from: "OCR receipt expense · salary advance · loan · benefit enrollment · per-diem · life-event change", to: "Approvals queue → Payroll cycle linkage · Documents Vault", target: "P4 · Payroll" },
    { k: "E", n: "HR Helpdesk & Comms",     lo: "ບໍລິການ HR",         from: "SLA-tracked ticket · LINE OA · Telegram bot · grievance · pulse · kudos · directory · birthdays", to: "CMS · Communications inbox · new Staff Portal Inbox group", target: "CMS · Comms / Admin" },
    { k: "F", n: "Documents, Letters, Policy", lo: "ເອກະສານ",         from: "Self-generate employment / salary cert · visa & WP letter (e-sign) · policy hub · personal vault", to: "Documents Vault · Policies · Workflow Builder (e-sign chain)", target: "P1 · Documents · CMS · Policies" },
  ];
  return (
    <div className="wiring">
      <h2>Wiring — Staff Portal → HR System v1.0</h2>
      <div className="sub">Every action a staff member takes lands in a specific module of the HR console. Below is the contract.</div>
      <div className="wmatrix">
        <div className="h-cell">Cluster</div>
        <div className="h-cell">Capability</div>
        <div className="h-cell">Inbound from staff</div>
        <div className="h-cell">Lands in HR System</div>

        {W.map(w => (
          <React.Fragment key={w.k}>
            <div className={`key ${w.k}`}>{w.k}</div>
            <div>
              <div className="nm">{w.n}</div>
              <div className="lo">{w.lo}</div>
            </div>
            <div style={{ color: "var(--ink-2)", fontSize: 12.5 }}>{w.from}</div>
            <div>
              <div style={{ fontSize: 12.5 }}>{w.to}</div>
              <div style={{ marginTop: 6 }}>
                <span className="pill primary">{w.target}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------- Sidebar nav additions ---------- */
function NavAdditions() {
  return (
    <div className="nav-add">
      <div>
        <div style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-A)", fontWeight: 600 }}>+ NEW IN v1.0 HR Console</div>
        <h3 style={{ marginTop: 4 }}>Staff Portal Inbox</h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.55, margin: "6px 0 0" }}>
          A new group sits between <b>Workspace</b> and <b>People</b>. It absorbs the inbound flow from the portal — tickets, profile-change requests, document e-sign queues, and grievance escalations — without burying them inside individual modules.
        </p>
        <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, margin: "10px 0 0" }}>
          The dashboard front page also gains a <b>Staff requests</b> ribbon at the top, ahead of timeframe filters, so HR sees urgent SLA-breaching items before drilling into KPIs.
        </p>
      </div>
      <div className="panel">
        <div className="group">WORKSPACE</div>
        <div className="item"><I name="home" size={14} c="var(--muted)" /> Dashboard</div>
        <div className="item"><I name="leave" size={14} c="var(--muted)" /> Approvals <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--muted)" }}>23</span></div>

        <div className="group new">+ STAFF PORTAL INBOX</div>
        <div className="item new"><I name="chat" size={14} /> Helpdesk tickets <span className="badge">12 SLA</span></div>
        <div className="item new"><I name="profile" size={14} /> Profile change requests <span className="badge">7</span></div>
        <div className="item new"><I name="cert" size={14} /> Letter / e-sign queue <span className="badge">5</span></div>
        <div className="item new"><I name="grievance" size={14} /> Grievance · pulse <span className="badge">2 anon</span></div>
        <div className="item new"><I name="pulse" size={14} /> Engagement & kudos </div>

        <div className="group">PEOPLE — P1 / P2</div>
        <div className="item"><I name="profile" size={14} c="var(--muted)" /> Staff Records</div>
        <div className="item"><I name="leave" size={14} c="var(--muted)" /> Leave & ESS</div>
        <div className="item"><I name="vault" size={14} c="var(--muted)" /> Documents & Vault</div>

        <div className="group">WORKFORCE · TRUST · CMS</div>
        <div className="item"><I name="clock" size={14} c="var(--muted)" /> Time & Attendance</div>
        <div className="item"><I name="pay" size={14} c="var(--muted)" /> Payroll</div>
      </div>
    </div>
  );
}

/* ---------- App composition ---------- */
function App() {
  const W = 320, H = 700; // shorter phones to fit 5-up
  const FRAMES = [
    { id: "home",   label: "Home",          meta: "Priority feed · alerts · quick actions",  el: <Home /> },
    { id: "leave",  label: "Apply Leave",   meta: "Cluster C · routes to manager → HR",       el: <LeaveApply /> },
    { id: "pay",    label: "Pay & Tax",     meta: "Cluster B · payslip · 50 Tawi · KT.20",   el: <Pay /> },
    { id: "help",   label: "HR Helpdesk",   meta: "Cluster E · AI · LINE / Telegram",        el: <Helpdesk /> },
    { id: "all",    label: "All Services",  meta: "Six clusters A–F",                         el: <Services /> },
  ];
  return (
    <div className="canvas">
      <div className="canvas-head">
        <div>
          <div className="eyebrow">v1.0 · Staff Portal · ESS</div>
          <h1 className="h1">Staff self-service — without ever calling HR.</h1>
          <div className="lede">Mobile-first, conversational by default, bilingual English + Lao on every screen. Every action wires straight into the v1.0 HR Console — leave to the Approvals queue, payslips to Payroll, helpdesk tickets to a new <i>Staff Portal Inbox</i> group in the sidebar.</div>
        </div>
        <a className="home-link" href="v1.0 HR System.html">Open HR Console <I name="arrow" size={12} /></a>
      </div>

      <div className="strip">
        {FRAMES.map(f => (
          <div key={f.id} className="frame-card">
            <div className="phone-wrap">
              <IOSDevice width={W} height={H}>
                {f.el}
              </IOSDevice>
            </div>
            <div className="frame-label">{f.label}</div>
            <div className="frame-meta">{f.meta}</div>
          </div>
        ))}
      </div>

      <NavAdditions />
      <Wiring />

      <div className="baseline">
        <div className="lab">Baseline · every screen</div>
        <div className="item"><I name="wifi" size={14} c="#fff" /> Mobile-first · offline sync</div>
        <div className="sep"></div>
        <div className="item"><I name="geo" size={14} c="#fff" /> Multilingual · Lao · Thai · EN</div>
        <div className="sep"></div>
        <div className="item">WCAG 2.1 AA</div>
        <div className="sep"></div>
        <div className="item"><I name="fp" size={14} c="#fff" /> SSO + biometric login</div>
        <div className="sep"></div>
        <div className="item"><I name="check" size={14} c="#fff" /> Audit trail on every action</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
