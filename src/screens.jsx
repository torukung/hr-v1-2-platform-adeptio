/* Other screens — Staff, Leave, Time & Attendance, Payroll, Biometric, Analytics, Settings */

function StaffRecords({ lang }) {
  const [q, setQ] = React.useState("");
  const [div, setDiv] = React.useState("all");
  const filtered = STAFF.filter(s =>
    (div === "all" || DIVISIONS.find(d => d.id === div)?.name === s.division)
    && (q === "" || s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div className="page">
      <div className="filterbar">
        <div className="search" style={{ marginLeft: 0, maxWidth: 320 }}>
          <Icon name="search" size={14} />
          <input placeholder="Search by name, ID, role…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {DIVISIONS.map(d => (
            <button key={d.id} className={`chip ${div === d.id ? "on" : ""}`} onClick={() => setDiv(d.id)}>
              {d.name}
            </button>
          ))}
        </div>
        <div className="spacer"></div>
        <button className="btn"><Icon name="download" /> Export CSV</button>
        <button className="btn primary"><Icon name="plus" /> New staff</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>ID</th>
              <th>Role / Division</th>
              <th>Site</th>
              <th>Manager</th>
              <th>Contract</th>
              <th>Joined</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td><Empl s={s} /></td>
                <td className="id">{s.id}</td>
                <td>
                  <div>{s.role}</div>
                  <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{s.division}</div>
                </td>
                <td><span className="row" style={{ color: "var(--muted)" }}><Icon name="location" size={12} /> {s.site}</span></td>
                <td style={{ color: "var(--muted)" }}>{s.manager}</td>
                <td><Pill tone={s.contract === "Probation" ? "warning" : s.contract.startsWith("Fixed") ? "accent" : "outline"}>{s.contract}</Pill></td>
                <td className="mono" style={{ color: "var(--muted)" }}>{s.joined}</td>
                <td>
                  {s.status === "active" && <Pill tone="positive"><span className="d"></span> Active</Pill>}
                  {s.status === "on-leave" && <Pill tone="primary"><span className="d"></span> On leave</Pill>}
                  {s.status === "parental" && <Pill tone="accent"><span className="d"></span> Parental</Pill>}
                </td>
                <td><button className="btn sm ghost"><Icon name="chevron" size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 16px", color: "var(--muted)", fontSize: 12 }}>
          <span>Showing {filtered.length} of 1,248 · Page 1 of 105</span>
          <span className="spacer"></span>
          <button className="btn sm ghost">Prev</button>{" "}
          <button className="btn sm">1</button>{" "}
          <button className="btn sm ghost">2</button>{" "}
          <button className="btn sm ghost">3</button>{" "}
          <button className="btn sm ghost">Next</button>
        </div>
      </div>
    </div>
  );
}

function LeaveApprovals({ lang }) {
  const [tab, setTab] = React.useState("pending");
  return (
    <div className="page">
      <div className="filterbar">
        <div className="seg">
          {[
            { id: "pending", label: "Pending · 23" },
            { id: "today", label: "Today" },
            { id: "delegated", label: "Delegated" },
            { id: "history", label: "History" },
          ].map(t => (
            <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="spacer"></div>
        <button className="btn ghost"><Icon name="filter" /> Filter</button>
        <button className="btn"><Icon name="download" /> Bank file (BCEL · LDB · JDB)</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 18 }}>
        <div className="card" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr><th>Request</th><th>Type</th><th>Dates</th><th>Balance after</th><th>Workflow</th><th></th></tr>
            </thead>
            <tbody>
              {APPROVALS.map(a => (
                <tr key={a.id}>
                  <td>
                    <Empl s={{ name: a.name, lao: a.lao }} />
                    <div className="id" style={{ marginLeft: 38, marginTop: 2 }}>{a.staffId} · {a.division}</div>
                  </td>
                  <td>{a.type}</td>
                  <td className="mono">{a.dates}</td>
                  <td>
                    <div className="mono" style={{ fontSize: 12 }}>{a.days ? `${a.days}d used` : "—"}</div>
                    <div style={{ height: 4, background: "var(--bg-deep)", borderRadius: 4, marginTop: 4 }}>
                      <div style={{ height: 4, width: `${(a.days || 0) * 6}%`, background: "var(--primary)", borderRadius: 4 }} />
                    </div>
                  </td>
                  <td>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: "var(--muted)" }}>
                      <span className="pill positive" style={{ padding: "1px 6px" }}>Mgr</span>
                      <Icon name="chevron" size={11} />
                      <span className="pill primary" style={{ padding: "1px 6px" }}>HR</span>
                      <Icon name="chevron" size={11} />
                      <span className="pill outline" style={{ padding: "1px 6px" }}>Pay</span>
                    </span>
                  </td>
                  <td><button className="btn sm primary"><Icon name="check" size={13} /> Approve</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-h">
            <div className="card-title">Quick rules</div>
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>
            <p style={{ margin: "0 0 10px" }}>Configurable accrual, carry-forward and encashment per leave type. N-step approval with delegation when manager is away.</p>
            <ul style={{ paddingLeft: 18, margin: 0, color: "var(--muted)" }}>
              <li>MC ≥ 3 days → MC upload required</li>
              <li>Annual on Mon/Fri → flagged for review</li>
              <li>Wellness → up to 2d no doc, then approval</li>
              <li>Public holidays auto-loaded for LA / TH</li>
            </ul>
          </div>
          <div className="divider"></div>
          <div className="card-title" style={{ marginBottom: 8 }}>Conflict heatmap · this week</div>
          <Heatmap grid={ATTENDANCE_HEAT.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
}

function TimeAttendance() {
  const sites = [
    { id: "vte-hq", name: "HQ Vientiane", channel: "Web + Mobile + Kiosk", present: 392, expected: 412, ot: 28, late: 4 },
    { id: "savan-plant", name: "Savannakhet Plant", channel: "Biometric · 4 devices", present: 268, expected: 286, ot: 142, late: 12 },
    { id: "pakse-dist", name: "Pakse Distribution", channel: "Biometric · 3 devices · NEW", present: 209, expected: 218, ot: 88, late: 6 },
    { id: "lpb-branch", name: "Luang Prabang", channel: "Web + Mobile", channelExtra: "Offline sync 24h", present: 124, expected: 134, ot: 12, late: 2 },
    { id: "field", name: "Field Sales", channel: "Mobile geo check-in", present: 184, expected: 198, ot: 42, late: 8 },
  ];
  return (
    <div className="page">
      <div className="filterbar">
        <div className="seg">
          {["Live", "Today", "This week", "This pay period"].map((l, i) => (
            <button key={l} className={i === 0 ? "on" : ""}>{l}</button>
          ))}
        </div>
        <Pill tone="positive"><span className="d"></span> Synced 12s ago</Pill>
        <div className="spacer"></div>
        <button className="btn ghost"><Icon name="filter" /> Anomalies</button>
        <button className="btn"><Icon name="download" /> Timesheet</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Site</th><th>Punch channel</th><th>Present</th><th>Roster</th><th>Coverage</th><th>OT (hrs)</th><th>Anomalies</th><th></th>
            </tr>
          </thead>
          <tbody>
            {sites.map(s => {
              const pct = (s.present / s.expected) * 100;
              return (
                <tr key={s.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{s.name}</div>
                    <div className="id">{s.id}</div>
                  </td>
                  <td>
                    <div>{s.channel}</div>
                    {s.channelExtra && <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{s.channelExtra}</div>}
                  </td>
                  <td className="num"><b>{s.present}</b><span style={{ color: "var(--muted)" }}> / {s.expected}</span></td>
                  <td className="num" style={{ color: "var(--muted)" }}>{s.expected}</td>
                  <td>
                    <div className="row" style={{ gap: 8 }}>
                      <div style={{ width: 120, height: 6, background: "var(--bg-deep)", borderRadius: 4 }}>
                        <div style={{ height: 6, width: `${pct}%`, background: pct > 95 ? "var(--positive)" : pct > 90 ? "var(--primary)" : "var(--warning)", borderRadius: 4 }} />
                      </div>
                      <span className="num" style={{ fontSize: 12, color: "var(--ink-2)" }}>{pct.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="num">{s.ot}</td>
                  <td>
                    {s.late > 8 && <Pill tone="danger">{s.late} late</Pill>}
                    {s.late >= 4 && s.late <= 8 && <Pill tone="warning">{s.late} late</Pill>}
                    {s.late < 4 && <Pill tone="outline">{s.late} late</Pill>}
                  </td>
                  <td><button className="btn sm ghost"><Icon name="chevron" size={14} /></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 18 }}>
        <div className="card">
          <div className="card-h">
            <div><div className="card-title">Attendance density</div><div className="card-sub">Last 5 weeks</div></div>
          </div>
          <Heatmap grid={ATTENDANCE_HEAT} />
        </div>
        <div className="card">
          <div className="card-h">
            <div><div className="card-title">Shift coverage</div><div className="card-sub">Today · 06:00–22:00</div></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
            {[
              { l: "Morning · 06:00–14:00", v: 96 },
              { l: "Afternoon · 14:00–22:00", v: 91 },
              { l: "Night · 22:00–06:00", v: 84 },
              { l: "Field rotation", v: 88 },
            ].map(s => (
              <div key={s.l}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                  <span>{s.l}</span><span className="num" style={{ color: "var(--muted)" }}>{s.v}%</span>
                </div>
                <div style={{ height: 6, background: "var(--bg-deep)", borderRadius: 4, marginTop: 4 }}>
                  <div style={{ height: 6, width: `${s.v}%`, background: "var(--primary)", borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Payroll() {
  return (
    <div className="page">
      <div className="filterbar">
        <div className="seg">
          {["Runs", "Pay codes", "Statutory", "Bank files", "Variance"].map((l, i) => (
            <button key={l} className={i === 0 ? "on" : ""}>{l}</button>
          ))}
        </div>
        <div className="spacer"></div>
        <Pill tone="warning">May draft · variance review pending</Pill>
        <button className="btn primary"><Icon name="plus" /> New off-cycle run</button>
      </div>

      <div className="card" style={{ padding: 0, marginBottom: 18 }}>
        <table className="table">
          <thead>
            <tr><th>Run</th><th>Period</th><th>Staff</th><th>Gross (LAK)</th><th>PIT</th><th>NSSF</th><th>Net</th><th>Status</th><th>Posted</th><th></th></tr>
          </thead>
          <tbody>
            {PAYROLL_RUNS.map(r => (
              <tr key={r.id}>
                <td className="id">{r.id}</td>
                <td><b>{r.period}</b></td>
                <td className="num">{r.staff.toLocaleString()}</td>
                <td className="num">₭{formatLAK(r.gross)}</td>
                <td className="num">₭{formatLAK(r.pit)}</td>
                <td className="num">₭{formatLAK(r.nssf)}</td>
                <td className="num">₭{formatLAK(r.net)}</td>
                <td>{r.status === "Posted" ? <Pill tone="positive">Posted</Pill> : <Pill tone="warning">Draft</Pill>}</td>
                <td className="mono" style={{ color: "var(--muted)" }}>{r.posted}</td>
                <td><button className="btn sm ghost">Open</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        <div className="card">
          <div className="card-h">
            <div><div className="card-title">Statutory library — Lao + TH benchmark</div><div className="card-sub">Configurable per legal entity</div></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { c: "LA", t: "PIT — Personal Income Tax", s: "Tax Department · monthly" },
              { c: "LA", t: "NSSF / SSO contribution", s: "Employee + employer · monthly" },
              { c: "LA", t: "Provident Fund (matched 2–15%)", s: "Optional · employee elects" },
              { c: "LA", t: "Workmen's Compensation Fund", s: "WCF · sector-rated" },
              { c: "TH", t: "PND.1 / PND.1Kor · 50 Tawi", s: "Withholding tax" },
              { c: "TH", t: "SSO 1-10 · SPS.1-03", s: "Social security" },
              { c: "TH", t: "Kor.Tor.20 · SorKorLor.3 / .4", s: "Welfare Fund · Oct '25" },
              { c: "TH", t: "Provident Fund (2–15% matched)", s: "Trustee filing" },
            ].map((r, i) => (
              <div key={i} style={{ padding: 10, border: "1px solid var(--hairline)", borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Pill tone={r.c === "LA" ? "primary" : "outline"}>{r.c}</Pill>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{r.t}</span>
                </div>
                <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>{r.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-h">
            <div><div className="card-title">Bank disbursement</div><div className="card-sub">May draft · 1,248 staff</div></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { b: "BCEL", d: "Banque pour le Commerce Extérieur Lao", n: 802, a: 996_000_000 },
              { b: "LDB", d: "Lao Development Bank", n: 218, a: 312_000_000 },
              { b: "JDB", d: "Joint Development Bank", n: 162, a: 198_000_000 },
              { b: "KBank", d: "Kasikornbank · TH cross-border", n: 38, a: 42_000_000 },
              { b: "SCB", d: "Siam Commercial · TH cross-border", n: 28, a: 20_000_000 },
            ].map(r => (
              <div key={r.b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 44, height: 28, borderRadius: 6, background: "var(--bg-deep)", display: "grid", placeItems: "center", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em" }}>{r.b}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{r.d}</div>
                  <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{r.n} staff</div>
                </div>
                <div className="num" style={{ fontFamily: "var(--font-mono)", fontSize: 12.5 }}>₭{formatLAK(r.a)}</div>
              </div>
            ))}
          </div>
          <button className="btn primary" style={{ marginTop: 14, width: "100%", justifyContent: "center" }}>
            <Icon name="download" size={14} /> Generate bank files
          </button>
        </div>
      </div>
    </div>
  );
}

function Stub({ title, lines, icon = "sparkle" }) {
  return (
    <div className="page">
      <div className="card" style={{ padding: 32, display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
          <Icon name={icon} size={28} stroke={1.4} />
        </div>
        <div>
          <h2 className="serif" style={{ margin: 0, fontSize: 26 }}>{title}</h2>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>
            {lines.map((l, i) => <div key={i}>· {l}</div>)}
          </div>
          <div style={{ marginTop: 14 }}>
            <button className="btn primary"><Icon name="plus" /> Configure</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Biometric() {
  return <Stub icon="biometric" title="Biometric Identity & SSO"
    lines={[
      "Multi-modal capture: fingerprint · face · iris with liveness check",
      "Encrypted templates · step-up MFA · federated SSO with revocation",
      "7 active devices across HQ · Savannakhet · Pakse · Field kiosks",
    ]} />;
}

function Analytics() {
  return <Stub icon="chart" title="Analytics & AI Add-ons"
    lines={[
      "Cross-module exec dashboards · headcount · attrition · cost-to-serve",
      "Visa / WP expiry alerts (cross-border SEA)",
      "LINE / WhatsApp leave-approval bot · 24/7 ESS",
    ]} />;
}

function Settings() {
  return <Stub icon="settings" title="Workflow Builder & Settings"
    lines={[
      "No-code workflow builder · drag-and-drop approval chains",
      "Configurable custom fields per business unit",
      "Audit log · role-based access control · data residency",
    ]} />;
}

Object.assign(window, { StaffRecords, LeaveApprovals, TimeAttendance, Payroll, Biometric, Analytics, Settings });
