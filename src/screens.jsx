/* Other screens — Staff, Leave, Time & Attendance, Payroll, Biometric, Analytics, Settings */

/* ---- shared helpers used by Biometric + Time & Attendance ---- */

/* Compact modality chip (FACE / FP / CARD / PIN / QR / GEO / BLE / PALM / ANY) */
function ModalityChip({ id }) {
  const m = (BIOMETRIC_MODALITIES || []).find(x => x.id === id) || { short: id.toUpperCase(), tone: "outline", label: id };
  return <span className={`pill ${m.tone}`} style={{ fontSize: 10.5, letterSpacing: ".06em", fontWeight: 600 }} title={m.label}>{m.short}</span>;
}

/* Connection-pattern badge — push / cloud / agent / pull / mobile */
const PATTERN_META = {
  push:   { label: "Push",   tone: "primary",  desc: "Device → server in real time" },
  cloud:  { label: "Cloud",  tone: "accent",   desc: "Vendor cloud → us via REST/webhook" },
  agent:  { label: "Agent",  tone: "positive", desc: "Local relay forwards to HRMS" },
  pull:   { label: "Pull",   tone: "outline",  desc: "Polling (last-resort)" },
  mobile: { label: "Mobile", tone: "primary",  desc: "Phone-as-credential" },
};
function PatternBadge({ id }) {
  const p = PATTERN_META[id] || { label: id, tone: "outline" };
  return <span className={`pill ${p.tone}`} title={p.desc} style={{ fontSize: 10.5, letterSpacing: ".06em", fontWeight: 600 }}>{p.label.toUpperCase()}</span>;
}

/* Status dot for connector / device health */
function StatusDot({ status }) {
  const map = { connected: "var(--positive)", available: "var(--muted)", online: "var(--positive)", offline: "var(--danger)", degraded: "var(--warning)" };
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: map[status] || "var(--muted)", boxShadow: status === "connected" || status === "online" ? "0 0 0 3px rgba(46,111,71,0.15)" : "none", flex: "0 0 auto" }} />;
}

/* Mini horizontal bar — used everywhere */
function MiniBar({ value, max = 1, color = "var(--primary)", w = 100, h = 6 }) {
  const pct = Math.max(0, Math.min(1, value / max)) * 100;
  return (
    <div style={{ width: w, height: h, background: "var(--bg-deep)", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ height: h, width: `${pct}%`, background: color, borderRadius: 4 }} />
    </div>
  );
}

/* Stacked modality split bar — face / fp / card */
function ModalitySplitBar({ split, w = 140, h = 6 }) {
  const segs = [
    { k: "face", c: "var(--primary)" },
    { k: "fp",   c: "var(--positive)" },
    { k: "card", c: "var(--accent)" },
  ];
  return (
    <div style={{ display: "flex", width: w, height: h, borderRadius: 4, overflow: "hidden", background: "var(--bg-deep)" }}>
      {segs.map(s => (split[s.k] > 0
        ? <div key={s.k} style={{ width: `${split[s.k] * 100}%`, height: h, background: s.c }} title={`${s.k.toUpperCase()} ${(split[s.k]*100).toFixed(0)}%`} />
        : null))}
    </div>
  );
}

/* Tiny 24-hour inflow bars — used in dashboard widget + Today tab */
function HourlyBars({ data, h = 36, color = "var(--primary)" }) {
  const max = Math.max(...data, 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: h }}>
      {data.map((v, i) => (
        <div key={i} title={`${String(i).padStart(2,"0")}:00 — ${v}`} style={{
          flex: 1,
          height: `${Math.max(2, (v / max) * h)}px`,
          background: v === 0 ? "var(--bg-deep)" : color,
          borderRadius: 2,
          opacity: v === 0 ? 0.4 : 0.85,
        }} />
      ))}
    </div>
  );
}



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
  const [tab, setTab] = React.useState("today");
  return (
    <div className="page">
      <div className="filterbar">
        <div className="seg">
          {[
            { id: "today",       label: "Today" },
            { id: "investigate", label: "Investigate · 6" },
            { id: "reports",     label: "Reports" },
          ].map(t => (
            <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <Pill tone="positive"><span className="d"></span> Synced 12s ago</Pill>
        <div className="spacer"></div>
        <button className="btn ghost"><Icon name="filter" /> Filters</button>
        <button className="btn"><Icon name="download" /> Export</button>
      </div>

      {tab === "today" && <TATodayTab />}
      {tab === "investigate" && <TAInvestigateTab />}
      {tab === "reports" && <TAReportsTab />}
    </div>
  );
}

/* ---- TIME & ATTENDANCE · Today tab (live board) ---- */
function TATodayTab() {
  const a = ATTENDANCE_TODAY;
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginBottom: 18 }}>
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Live board · {a.date}</div>
              <div className="card-sub">{a.present.toLocaleString()} of {a.total.toLocaleString()} present · {((a.present/a.total)*100).toFixed(1)}% · biometric uptime {(a.biometricUptime*100).toFixed(1)}%</div>
            </div>
            <div className="row" style={{ gap: 6 }}>
              <Pill tone="positive">▲ {a.inflowToNow.toLocaleString()} in</Pill>
              <Pill tone="warning">{a.late} late</Pill>
              <Pill tone="danger">{a.absent} absent</Pill>
              <Pill tone="primary">{a.onLeave} on leave</Pill>
            </div>
          </div>
          <table className="table" style={{ marginTop: 8 }}>
            <thead>
              <tr><th>Site</th><th>Punch channel</th><th>Present / roster</th><th>Coverage</th><th>Modality split</th><th>Late</th><th></th></tr>
            </thead>
            <tbody>
              {a.bySite.map(s => {
                const pct = (s.present / s.roster) * 100;
                return (
                  <tr key={s.site}>
                    <td><div style={{ fontWeight: 500 }}>{s.site}</div></td>
                    <td><span style={{ color: "var(--muted)", fontSize: 12.5 }}>{s.channel}</span></td>
                    <td className="num"><b>{s.present}</b><span style={{ color: "var(--muted)" }}> / {s.roster}</span></td>
                    <td>
                      <div className="row" style={{ gap: 8 }}>
                        <MiniBar value={pct} max={100} w={110} color={pct > 95 ? "var(--positive)" : pct > 90 ? "var(--primary)" : "var(--warning)"} />
                        <span className="num" style={{ fontSize: 12, color: "var(--ink-2)" }}>{pct.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="row" style={{ gap: 6 }}>
                        <ModalitySplitBar split={s.modality} />
                        <span style={{ fontSize: 11.5, color: "var(--muted)" }}>
                          {Object.entries(s.modality).filter(([_,v])=>v>0).map(([k,v])=>`${k.toUpperCase()} ${(v*100).toFixed(0)}%`).join(" · ")}
                        </span>
                      </div>
                    </td>
                    <td>
                      {s.late > 5 && <Pill tone="danger">{s.late}</Pill>}
                      {s.late >= 2 && s.late <= 5 && <Pill tone="warning">{s.late}</Pill>}
                      {s.late < 2 && <Pill tone="outline">{s.late}</Pill>}
                    </td>
                    <td><button className="btn sm ghost"><Icon name="chevron" size={14} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Hourly inflow</div>
              <div className="card-sub">00:00–23:00 · clock-in events</div>
            </div>
          </div>
          <HourlyBars data={a.hourly} h={120} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: 11, marginTop: 6, fontFamily: "var(--font-mono)" }}>
            <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
          </div>
          <div className="divider"></div>
          <div className="card-title" style={{ marginBottom: 8 }}>Shift coverage</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { l: "Morning · 06:00–14:00",   v: 96 },
              { l: "Afternoon · 14:00–22:00", v: 91 },
              { l: "Night · 22:00–06:00",     v: 84 },
              { l: "Field rotation",          v: 88 },
            ].map(s => (
              <div key={s.l}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                  <span>{s.l}</span><span className="num" style={{ color: "var(--muted)" }}>{s.v}%</span>
                </div>
                <MiniBar value={s.v} max={100} w="100%" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="card-h" style={{ padding: "16px 18px 0" }}>
          <div>
            <div className="card-title">Recent punches · live tail</div>
            <div className="card-sub">All vendors · all sites · last 12 events</div>
          </div>
          <div className="row" style={{ gap: 6 }}>
            <Pill tone="positive"><span className="d"></span> Streaming</Pill>
            <button className="btn ghost sm">Pause</button>
          </div>
        </div>
        <EventTable events={ATTENDANCE_EVENTS} compact />
      </div>
    </>
  );
}

/* ---- TIME & ATTENDANCE · Investigate tab ---- */
function TAInvestigateTab() {
  const [site, setSite] = React.useState("all");
  const [vendor, setVendor] = React.useState("all");
  const [flag, setFlag] = React.useState("all");

  const filtered = ATTENDANCE_EVENTS.filter(e =>
    (site === "all" || e.site.includes(site)) &&
    (vendor === "all" || e.vendor === vendor) &&
    (flag === "all" || (flag === "anomaly" ? e.flag != null : e.flag === flag))
  );

  return (
    <>
      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card-h">
          <div>
            <div className="card-title">Investigation queue · last 24h</div>
            <div className="card-sub">{ATTENDANCE_ANOMALIES.length} anomalies flagged · 0 escalated</div>
          </div>
          <div className="row" style={{ gap: 6 }}>
            <Pill tone="danger">1 high</Pill>
            <Pill tone="warning">2 medium</Pill>
            <Pill tone="outline">3 low</Pill>
          </div>
        </div>
        <table className="table" style={{ marginTop: 8 }}>
          <thead>
            <tr><th>Time</th><th>Staff</th><th>Site</th><th>Anomaly</th><th>Severity</th><th>Note</th><th></th></tr>
          </thead>
          <tbody>
            {ATTENDANCE_ANOMALIES.map((x, i) => (
              <tr key={i}>
                <td className="mono" style={{ color: "var(--ink-2)" }}>{x.ts}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{x.staff}</div>
                  <div className="id">{x.staffId}</div>
                </td>
                <td><span style={{ color: "var(--muted)" }}>{x.site}</span></td>
                <td>{x.kind}</td>
                <td>
                  {x.severity === "high" && <Pill tone="danger">HIGH</Pill>}
                  {x.severity === "med" && <Pill tone="warning">MED</Pill>}
                  {x.severity === "low" && <Pill tone="outline">LOW</Pill>}
                </td>
                <td style={{ color: "var(--muted)", fontSize: 12.5, maxWidth: 360 }}>{x.note}</td>
                <td><button className="btn sm">Investigate</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="card-h" style={{ padding: "16px 18px 0", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="card-title">Punch ledger</div>
            <div className="card-sub">Filter by site, vendor, or flag — drill into any event</div>
          </div>
          <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
            <select className="chip" value={site} onChange={e => setSite(e.target.value)} style={{ paddingRight: 8 }}>
              <option value="all">All sites</option>
              <option value="HQ Vientiane">HQ Vientiane</option>
              <option value="Savannakhet">Savannakhet Plant</option>
              <option value="Pakse">Pakse</option>
              <option value="Luang Prabang">Luang Prabang</option>
            </select>
            <select className="chip" value={vendor} onChange={e => setVendor(e.target.value)} style={{ paddingRight: 8 }}>
              <option value="all">All vendors</option>
              <option value="zk">ZKTeco</option>
              <option value="hik">Hikvision</option>
              <option value="dahua">Dahua</option>
              <option value="suprema">Suprema</option>
              <option value="selfie">Selfie + Geofence</option>
            </select>
            <select className="chip" value={flag} onChange={e => setFlag(e.target.value)} style={{ paddingRight: 8 }}>
              <option value="all">All events</option>
              <option value="anomaly">Anomalies only</option>
              <option value="low-conf">Low confidence</option>
              <option value="visitor">Visitors</option>
            </select>
          </div>
        </div>
        <EventTable events={filtered} />
        <div style={{ display: "flex", padding: "10px 16px", color: "var(--muted)", fontSize: 12 }}>
          Showing {filtered.length} of {ATTENDANCE_EVENTS.length} · paged 1 of 1
        </div>
      </div>
    </>
  );
}

/* ---- TIME & ATTENDANCE · Reports tab ---- */
function TAReportsTab() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
        {[
          { kind: "Daily attendance",     v: "Wed 13 May 2026", n: "1,187 / 1,248 present · 14 late",  hint: "PDF · CSV" },
          { kind: "Weekly summary",       v: "Wk 19 · 06–12 May", n: "Avg 92.6% · 38 anomalies",        hint: "PDF · CSV · XLSX" },
          { kind: "Monthly · pay period", v: "Apr 2026",          n: "1,240 staff · 7,220 OT hrs",      hint: "PDF · payroll handoff" },
          { kind: "Anomaly audit",        v: "Last 30 days",      n: "182 flagged · 8 escalated",        hint: "PDF · CSV" },
        ].map(r => (
          <div key={r.kind} className="card">
            <div className="card-sub" style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>{r.kind}</div>
            <div className="serif" style={{ fontSize: 18, marginTop: 4 }}>{r.v}</div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>{r.n}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              <button className="btn sm primary"><Icon name="download" size={12} /> Export</button>
              <button className="btn sm ghost">Schedule</button>
            </div>
            <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 8 }}>{r.hint}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Attendance density · last 5 weeks</div>
              <div className="card-sub">% present per day · all sites blended</div>
            </div>
            <Pill tone="outline">Avg 91.8%</Pill>
          </div>
          <Heatmap grid={ATTENDANCE_HEAT} />
        </div>
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Modality mix · this month</div>
              <div className="card-sub">Across 1,187 daily punches</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 6 }}>
            {[
              { id: "face", label: "Face (incl. selfie)", v: 0.62, c: "var(--primary)" },
              { id: "fp",   label: "Fingerprint",          v: 0.24, c: "var(--positive)" },
              { id: "card", label: "RFID / Mifare",        v: 0.10, c: "var(--accent)" },
              { id: "qr",   label: "QR (visitors)",        v: 0.03, c: "#C9A36A" },
              { id: "other",label: "PIN / fallback",       v: 0.01, c: "#8B8E99" },
            ].map(r => (
              <div key={r.id}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                  <span>{r.label}</span><span className="num" style={{ color: "var(--muted)" }}>{(r.v*100).toFixed(0)}%</span>
                </div>
                <MiniBar value={r.v} w="100%" color={r.c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* Reusable event-stream table */
function EventTable({ events, compact = false }) {
  return (
    <table className="table" style={{ marginTop: 8 }}>
      <thead>
        <tr>
          <th>Time</th>
          <th>Staff</th>
          {!compact && <th>Department</th>}
          <th>Site · Door</th>
          <th>Device</th>
          <th>Modality</th>
          <th>Conf.</th>
          <th>Dir.</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e, i) => {
          const conn = (BIOMETRIC_CONNECTORS || []).find(c => c.id === e.vendor);
          return (
            <tr key={i}>
              <td className="mono" style={{ color: "var(--ink-2)", whiteSpace: "nowrap" }}>{e.ts}</td>
              <td>
                <div style={{ fontWeight: 500 }}>{e.staff}</div>
                <div className="id">{e.staffId}</div>
              </td>
              {!compact && <td><span style={{ color: "var(--muted)" }}>{e.dept}</span></td>}
              <td>
                <div>{e.site}</div>
                <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{e.door}</div>
              </td>
              <td>
                <div style={{ fontSize: 12.5 }}>{e.device}</div>
                {conn && <div style={{ color: conn.accent, fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>{conn.vendor}</div>}
              </td>
              <td><ModalityChip id={e.modality} /></td>
              <td className="num" style={{ color: e.conf < 0.9 ? "var(--warning)" : "var(--ink-2)" }}>{e.conf.toFixed(2)}</td>
              <td>{e.dir === "in"
                ? <Pill tone="positive">IN</Pill>
                : <Pill tone="outline">OUT</Pill>}
              </td>
              <td>
                {e.flag === "low-conf" && <Pill tone="warning">low conf</Pill>}
                {e.flag === "visitor"  && <Pill tone="accent">visitor</Pill>}
                {e.flag == null && <span style={{ color: "var(--muted)", fontSize: 11.5 }}>—</span>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
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
  const [tab, setTab] = React.useState("connectors");
  // { mode: "list" | "detail" | "add", id?: string }
  const [view, setView] = React.useState({ mode: "list" });
  const isDrilled = tab === "connectors" && view.mode !== "list";
  return (
    <div className="page">
      <div className="filterbar">
        <div className="seg">
          {[
            { id: "connectors", label: `Connectors · ${BIOMETRIC_CONNECTORS.filter(c=>c.status==="connected").length}/${BIOMETRIC_CONNECTORS.length}` },
            { id: "devices",    label: `Devices · ${BIOMETRIC_DEVICES.length}` },
            { id: "events",     label: "Live events" },
            { id: "flow",       label: "Flexibility & data flow" },
          ].map(t => (
            <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => { setTab(t.id); setView({ mode: "list" }); }}>{t.label}</button>
          ))}
        </div>
        <Pill tone="positive"><span className="d"></span> All connectors healthy</Pill>
        <div className="spacer"></div>
        {!isDrilled && <button className="btn ghost"><Icon name="filter" /> Filter</button>}
        <button className="btn primary" onClick={() => { setTab("connectors"); setView({ mode: "add" }); }}><Icon name="plus" /> Add connector</button>
      </div>

      {tab === "connectors" && <BioConnectorsTab view={view} setView={setView} />}
      {tab === "devices"    && <BioDevicesTab />}
      {tab === "events"     && <BioEventsTab />}
      {tab === "flow"       && <BioFlowTab />}
    </div>
  );
}

/* ---- BIOMETRIC · Connectors tab ---- */
function BioConnectorsTab({ view, setView }) {
  if (view.mode === "detail") return <ConnectorDetail id={view.id} onBack={() => setView({ mode: "list" })} />;
  if (view.mode === "add")    return <AddConnectorWizard onBack={() => setView({ mode: "list" })} />;
  return (
    <>
      <div className="card" style={{ padding: "16px 18px", marginBottom: 18, background: "linear-gradient(180deg, var(--paper) 0%, var(--bg) 100%)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", flex: "0 0 auto" }}>
            <Icon name="biometric" size={22} stroke={1.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 20, lineHeight: 1.25 }}>One platform · {BIOMETRIC_CONNECTORS.length + BIOMETRIC_AVAILABLE.length} ways in.</div>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4, maxWidth: 720 }}>
              Mix and match per site. Tier-1 SEA hardware (ZKTeco, Hikvision, Dahua, Suprema) ships with native SDK push, plus selfie + geofence for field staff and a generic webhook spec as the open escape hatch. Anything else listed below can be enabled in days, not weeks.
            </div>
          </div>
          <div className="row" style={{ gap: 6, flex: "0 0 auto" }}>
            <Pill tone="positive">{BIOMETRIC_CONNECTORS.filter(c=>c.status==="connected").length} active</Pill>
            <Pill tone="outline">{BIOMETRIC_AVAILABLE.length} available</Pill>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 18 }}>
        {BIOMETRIC_CONNECTORS.map(c => <ConnectorCard key={c.id} c={c} onConfigure={() => setView({ mode: "detail", id: c.id })} />)}
      </div>

      <div className="card">
        <div className="card-h">
          <div>
            <div className="card-title">We can also speak…</div>
            <div className="card-sub">{BIOMETRIC_AVAILABLE.length} additional connectors ready to enable on request — vendors, standards, AI services, legacy bridges</div>
          </div>
          <button className="btn ghost sm">Request connector</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {BIOMETRIC_AVAILABLE.map(v => (
            <div key={v.vendor} style={{ padding: "10px 12px", border: "1px solid var(--hairline)", borderRadius: 8, background: "var(--paper)" }} title={v.note}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{v.vendor}</span>
                <span className="spacer"></span>
                <span className="pill outline" style={{ fontSize: 10, letterSpacing: ".06em" }}>{v.group}</span>
              </div>
              <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>{v.note}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* Single connector card */
function ConnectorCard({ c, onConfigure }) {
  const isConnected = c.status === "connected";
  return (
    <div className="card" style={{ borderLeft: `3px solid ${c.accent}`, padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 9, background: c.accent, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14, letterSpacing: ".02em", fontFamily: "var(--font-display)", fontStyle: "italic", flex: "0 0 auto" }}>
          {c.vendor.split(/[\s+]/).map(s => s[0]).slice(0, 2).join("").toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>{c.vendor}</div>
          <div style={{ color: "var(--muted)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500, marginTop: 2 }}>{c.tag}</div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 999, background: c.status === "connected" ? "var(--positive-soft)" : "var(--bg-deep)", color: c.status === "connected" ? "var(--positive)" : "var(--muted)", fontSize: 10, fontWeight: 600, letterSpacing: ".05em", flex: "0 0 auto" }}>
          <StatusDot status={c.status} />
          <span style={{ textTransform: "uppercase" }}>{c.status === "connected" ? "Live" : "Available"}</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        <PatternBadge id={c.pattern} />
        {c.modalities.map(m => <ModalityChip key={m} id={m} />)}
      </div>
      <div style={{ color: "var(--ink-2)", fontSize: 12.5, marginBottom: 12, lineHeight: 1.5, minHeight: 36 }}>{c.note}</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, fontSize: 11.5, marginBottom: 12, paddingTop: 12, borderTop: "1px solid var(--hairline)" }}>
        <div><div style={{ color: "var(--muted)", fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500 }}>Devices</div><div className="num" style={{ fontWeight: 600, fontSize: 15, marginTop: 2 }}>{c.devices}</div></div>
        <div><div style={{ color: "var(--muted)", fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500 }}>Sites</div><div className="num" style={{ fontWeight: 600, fontSize: 15, marginTop: 2 }}>{c.sites}</div></div>
        <div><div style={{ color: "var(--muted)", fontSize: 10.5, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500 }}>Last event</div><div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 500, marginTop: 4 }}>{c.lastEvent}</div></div>
      </div>
      <div style={{ color: "var(--muted)", fontSize: 11, marginBottom: 12, fontFamily: "var(--font-mono)", paddingBottom: 4, borderBottom: "1px dashed var(--hairline)" }}>{c.apiKind}</div>
      <div className="row" style={{ gap: 6, marginTop: 10 }}>
        {isConnected
          ? <><button className="btn sm primary" onClick={onConfigure} style={{ flex: 1, justifyContent: "center" }}><Icon name="settings" size={11} /> Configure</button><button className="btn sm ghost" onClick={onConfigure}>Test</button><button className="btn sm ghost" onClick={onConfigure}>Logs</button></>
          : <><button className="btn sm primary" onClick={onConfigure} style={{ flex: 1, justifyContent: "center" }}><Icon name="plus" size={11} /> Connect</button><button className="btn sm ghost" onClick={onConfigure}>Docs</button></>
        }
      </div>
    </div>
  );
}

/* ---- shared <ConfigForm/> — renders a sections[].fields[] schema as a real-looking form ---- */
function ConfigForm({ sections, columns = 2, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {sections.map((s, si) => (
        <div key={si}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{si + 1}</div>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.title}</div>
          </div>
          {s.note && <div style={{ color: "var(--muted)", fontSize: 12, marginLeft: 32, marginBottom: 8 }}>{s.note}</div>}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 10, marginLeft: 32 }}>
            {s.fields.map(f => <FormField key={f.id} f={f} onChange={onChange} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function FormField({ f, onChange }) {
  const baseInput = {
    width: "100%", padding: "8px 10px", border: "1px solid var(--hairline)", borderRadius: 6,
    background: f.readOnly ? "var(--bg-deep)" : "var(--paper)",
    color: "var(--ink)", fontSize: 12.5, fontFamily: f.kind === "url" || f.id === "schema" || f.id === "pathItems" ? "var(--font-mono)" : "inherit",
    outline: "none",
  };
  const wide = ["textarea", "checkboxes", "radio"].includes(f.kind) ? { gridColumn: "1 / -1" } : {};
  const labelEl = (
    <label style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-2)", fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
      {f.label}
      {f.readOnly && <Pill tone="outline">read-only</Pill>}
    </label>
  );

  let control = null;
  if (f.kind === "textarea") {
    control = <textarea defaultValue={f.value} placeholder={f.placeholder} readOnly={f.readOnly} rows={Math.min(8, Math.max(3, String(f.value || "").split("\n").length + 1))} style={{ ...baseInput, fontFamily: "var(--font-mono)", lineHeight: 1.5, resize: "vertical" }} />;
  } else if (f.kind === "select") {
    control = (
      <select defaultValue={f.value} style={baseInput}>
        {f.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  } else if (f.kind === "checkboxes") {
    control = (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {f.options.map(o => (
          <label key={o} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", border: "1px solid var(--hairline)", borderRadius: 999, background: f.value.includes(o) ? "var(--primary-soft)" : "var(--paper)", color: f.value.includes(o) ? "var(--primary)" : "var(--ink-2)", fontSize: 12, cursor: "pointer", fontFamily: "var(--font-mono)" }}>
            <input type="checkbox" defaultChecked={f.value.includes(o)} style={{ accentColor: "var(--primary)" }} />
            {o}
          </label>
        ))}
      </div>
    );
  } else if (f.kind === "toggle") {
    control = (
      <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 10px", border: "1px solid var(--hairline)", borderRadius: 8, background: "var(--paper)", width: "fit-content" }}>
        <input type="checkbox" defaultChecked={f.value} style={{ accentColor: "var(--primary)" }} />
        <span style={{ fontSize: 12.5 }}>{f.value ? "Enabled" : "Disabled"}</span>
      </label>
    );
  } else if (f.kind === "radio") {
    control = (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {f.options.map(o => (
          <label key={o.id} style={{ display: "flex", gap: 8, padding: 10, border: "1px solid var(--hairline)", borderRadius: 8, background: f.value === o.id ? "var(--primary-soft)" : "var(--paper)", cursor: "pointer" }}>
            <input type="radio" name={f.id} defaultChecked={f.value === o.id} style={{ accentColor: "var(--primary)", marginTop: 3 }} />
            <div>
              <div style={{ fontWeight: 500, fontSize: 13 }}>{o.label}</div>
              {o.note && <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{o.note}</div>}
            </div>
          </label>
        ))}
      </div>
    );
  } else if (f.kind === "password") {
    control = <input type="password" defaultValue={f.value} placeholder={f.placeholder} readOnly={f.readOnly} style={{ ...baseInput, fontFamily: "var(--font-mono)" }} />;
  } else if (f.kind === "number") {
    control = (
      <div style={{ position: "relative", maxWidth: 220 }}>
        <input type="number" defaultValue={f.value} placeholder={f.placeholder} readOnly={f.readOnly} style={{ ...baseInput, fontFamily: "var(--font-mono)", paddingRight: f.unit ? 50 : 10 }} />
        {f.unit && <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 11, pointerEvents: "none", letterSpacing: ".04em" }}>{f.unit}</span>}
      </div>
    );
  } else {
    control = <input type="text" defaultValue={f.value} placeholder={f.placeholder} readOnly={f.readOnly} style={baseInput} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", ...wide }}>
      {labelEl}
      {control}
      {f.help && <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 4 }}>{f.help}</div>}
    </div>
  );
}

/* ---- Connector detail (level 2-3) ---- */
function ConnectorDetail({ id, onBack }) {
  const c = BIOMETRIC_CONNECTORS.find(x => x.id === id);
  const cfg = BIOMETRIC_CONFIG[id];
  const logs = CONNECTOR_LOGS[id] || [];
  const devices = BIOMETRIC_DEVICES.filter(d => d.vendor === id);
  const [sub, setSub] = React.useState("connection");

  if (!c || !cfg) return <div className="card">Connector not found.</div>;

  return (
    <>
      <div className="card" style={{ padding: "14px 18px", marginBottom: 14, borderLeft: `3px solid ${c.accent}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn ghost sm" onClick={onBack}><Icon name="chevron" size={13} style={{ transform: "rotate(180deg)" }} /> Back</button>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: c.accent, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16 }}>
            {c.vendor.split(/[\s+]/).map(s => s[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.1 }}>{c.vendor}</div>
            <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>{c.tag} · {c.patternLabel} · {c.apiKind}</div>
          </div>
          <div className="row" style={{ gap: 6 }}>
            <Pill tone="outline">Last sync {cfg.summary.lastSync}</Pill>
            <Pill tone={cfg.summary.errors24h > 0 ? "warning" : "positive"}>{cfg.summary.errors24h} errors / 24h</Pill>
            <StatusDot status={c.status} />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="card-h" style={{ padding: "12px 18px 0" }}>
          <div className="seg">
            {[
              { id: "connection", label: "Connection" },
              { id: "devices",    label: `Devices · ${devices.length}` },
              { id: "logs",       label: `Logs · ${logs.length}` },
            ].map(t => (
              <button key={t.id} className={sub === t.id ? "on" : ""} onClick={() => setSub(t.id)}>{t.label}</button>
            ))}
          </div>
          <div className="spacer"></div>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn ghost sm">Test connection</button>
            <button className="btn primary sm"><Icon name="check" size={12} /> Save</button>
          </div>
        </div>

        {sub === "connection" && (
          <div style={{ padding: "16px 18px 22px" }}>
            <div style={{ background: "var(--paper)", border: "1px solid var(--hairline)", borderRadius: 8, padding: "10px 14px", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="biometric" size={14} stroke={1.6} />
              <span style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{cfg.auth}</span>
            </div>
            <ConfigForm sections={cfg.sections} columns={2} />
          </div>
        )}

        {sub === "devices" && (
          <table className="table">
            <thead><tr><th>Device ID</th><th>Model</th><th>Site · Door</th><th>IP</th><th>Firmware</th><th>Last seen</th><th>Status</th></tr></thead>
            <tbody>
              {devices.map(d => (
                <tr key={d.id}>
                  <td className="id">{d.id}</td>
                  <td>{d.model}</td>
                  <td><div>{d.site}</div><div style={{ color: "var(--muted)", fontSize: 11.5 }}>{d.door}</div></td>
                  <td className="mono" style={{ color: "var(--muted)" }}>{d.ip}</td>
                  <td className="mono" style={{ color: "var(--muted)" }}>{d.fw}</td>
                  <td className="mono" style={{ color: d.status === "offline" ? "var(--danger)" : "var(--muted)" }}>{d.lastSeen}</td>
                  <td><span className="row" style={{ gap: 6 }}><StatusDot status={d.status} /><span style={{ fontSize: 12.5, textTransform: "capitalize" }}>{d.status}</span></span></td>
                </tr>
              ))}
              {devices.length === 0 && <tr><td colSpan={7} style={{ color: "var(--muted)", padding: "18px 16px" }}>No devices in inventory yet.</td></tr>}
            </tbody>
          </table>
        )}

        {sub === "logs" && (
          <div style={{ padding: "12px 18px", fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7, background: "#14182A", color: "#E5DECC", borderRadius: "0 0 14px 14px", maxHeight: 360, overflow: "auto" }}>
            {logs.map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#8B8E99", flex: "0 0 auto" }}>{l.ts}</span>
                <span style={{ flex: "0 0 50px", color: l.level === "warn" ? "#C4843A" : l.level === "error" ? "#A8392E" : "#6B7AAE", textTransform: "uppercase", fontWeight: 600 }}>{l.level}</span>
                <span style={{ flex: 1 }}>{l.msg}</span>
              </div>
            ))}
            {logs.length === 0 && <span style={{ color: "#8B8E99" }}>(no logs yet)</span>}
          </div>
        )}
      </div>
    </>
  );
}

/* ---- Add Connector wizard (level 2-3) ---- */
function AddConnectorWizard({ onBack }) {
  const [pattern, setPattern] = React.useState(null);

  const PATTERN_CARDS = [
    { id: "POST",   label: "Push (POST)",          sub: "Device → us · webhook receiver",       hint: "ZKTeco · Hikvision · Suprema · custom panels", icon: "activity" },
    { id: "GET",    label: "Pull (GET)",            sub: "We poll the vendor API on schedule",   hint: "Anviz · Hik Artemis · legacy REST",            icon: "download" },
    { id: "cloud",  label: "Cloud bridge",          sub: "OAuth2 + webhook to vendor SaaS",      hint: "Verkada · Kisi · Brivo · BioStar Air",          icon: "globe" },
    { id: "agent",  label: "On-prem agent",         sub: "Local relay forwards to cloud",        hint: "Dahua · legacy SDK fleets · air-gapped sites",  icon: "workflow" },
    { id: "mobile", label: "Mobile / phone",        sub: "Selfie + geofence · BLE · NFC",         hint: "Field reps · auditors · contractors",            icon: "users" },
  ];

  return (
    <>
      <div className="card" style={{ padding: "14px 18px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="btn ghost sm" onClick={onBack}><Icon name="chevron" size={13} style={{ transform: "rotate(180deg)" }} /> Back</button>
          <div className="serif" style={{ fontSize: 18, lineHeight: 1.1, fontStyle: "italic" }}>Add a connector</div>
          <div style={{ color: "var(--muted)", fontSize: 12 }}>Pick the integration pattern your vendor supports — we'll show you what fields we need.</div>
          <div className="spacer"></div>
          {pattern && <Pill tone="primary">Step 2 of 2 · {ADD_CONNECTOR_TEMPLATES[pattern].title.split(" — ")[0]}</Pill>}
          {!pattern && <Pill tone="outline">Step 1 of 2 · Choose pattern</Pill>}
        </div>
      </div>

      {!pattern && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {PATTERN_CARDS.map(p => (
            <button key={p.id} onClick={() => setPattern(p.id)}
              className="card"
              style={{ textAlign: "left", border: "1px solid var(--hairline)", padding: 16, cursor: "pointer", background: "var(--paper)", fontFamily: "inherit", color: "var(--ink)", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center" }}>
                <Icon name={p.icon} size={18} stroke={1.5} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.label}</div>
              <div style={{ color: "var(--muted)", fontSize: 11.5, lineHeight: 1.4 }}>{p.sub}</div>
              <div style={{ marginTop: "auto", paddingTop: 8, borderTop: "1px solid var(--hairline)", color: "var(--ink-2)", fontSize: 11, fontStyle: "italic" }}>{p.hint}</div>
            </button>
          ))}
        </div>
      )}

      {pattern && (() => {
        const tpl = ADD_CONNECTOR_TEMPLATES[pattern];
        return (
          <div className="card" style={{ padding: "16px 18px 22px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--hairline)" }}>
              <div>
                <div className="serif" style={{ fontSize: 16, fontStyle: "italic", lineHeight: 1.2 }}>{tpl.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4, maxWidth: 720 }}>{tpl.description}</div>
              </div>
              <div className="spacer"></div>
              <button className="btn ghost sm" onClick={() => setPattern(null)}>Change pattern</button>
            </div>

            <ConfigForm sections={[{ title: "Required fields", fields: tpl.fields }]} columns={2} />

            <div style={{ display: "flex", gap: 8, marginTop: 22, paddingTop: 14, borderTop: "1px solid var(--hairline)" }}>
              <button className="btn ghost"><Icon name="check" size={13} /> Test connection</button>
              <div className="spacer"></div>
              <button className="btn ghost" onClick={onBack}>Cancel</button>
              <button className="btn primary"><Icon name="plus" size={13} /> Create connector</button>
            </div>
          </div>
        );
      })()}
    </>
  );
}

/* ---- BIOMETRIC · Devices tab ---- */
function BioDevicesTab() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <table className="table">
        <thead>
          <tr>
            <th>Device ID</th><th>Vendor · Model</th><th>Site · Door</th><th>IP</th><th>Firmware</th><th>Enrolled</th><th>Last seen</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          {BIOMETRIC_DEVICES.map(d => {
            const conn = BIOMETRIC_CONNECTORS.find(c => c.id === d.vendor);
            return (
              <tr key={d.id}>
                <td className="id">{d.id}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{d.model}</div>
                  {conn && <div style={{ color: conn.accent, fontSize: 10.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>{conn.vendor}</div>}
                </td>
                <td>
                  <div>{d.site}</div>
                  <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{d.door}</div>
                </td>
                <td className="mono" style={{ color: "var(--muted)" }}>{d.ip}</td>
                <td className="mono" style={{ color: "var(--muted)" }}>{d.fw}</td>
                <td className="num">{d.staff}</td>
                <td className="mono" style={{ color: d.status === "offline" ? "var(--danger)" : "var(--muted)" }}>{d.lastSeen}</td>
                <td>
                  <span className="row" style={{ gap: 6 }}>
                    <StatusDot status={d.status} />
                    <span style={{ fontSize: 12.5, textTransform: "capitalize", color: d.status === "offline" ? "var(--danger)" : "var(--ink-2)" }}>{d.status}</span>
                  </span>
                </td>
                <td><button className="btn sm ghost"><Icon name="chevron" size={14} /></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---- BIOMETRIC · Live events tab ---- */
function BioEventsTab() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="card-h" style={{ padding: "16px 18px 0" }}>
        <div>
          <div className="card-title">Live event tail</div>
          <div className="card-sub">All connectors · {ATTENDANCE_EVENTS.length} most recent · streaming via push + cloud + agent</div>
        </div>
        <div className="row" style={{ gap: 6 }}>
          <Pill tone="positive"><span className="d"></span> Streaming</Pill>
          <button className="btn ghost sm">Pause</button>
          <button className="btn ghost sm"><Icon name="download" size={12} /> Export</button>
        </div>
      </div>
      <EventTable events={ATTENDANCE_EVENTS} />
    </div>
  );
}

/* ---- BIOMETRIC · Flow tab — visualises the 5 patterns converging into HRMS ---- */
function BioFlowTab() {
  const lanes = [
    { id: "push",   label: "Device push",       sub: "ZKTeco · Hikvision · Suprema",        tone: "primary",  desc: "Door device POSTs each scan to our endpoint.", count: "27 devices" },
    { id: "cloud",  label: "Cloud-bridge",      sub: "Suprema BioStar Air · Verkada · Kisi", tone: "accent",   desc: "Vendor cloud aggregates → REST + webhook to us.", count: "1 connector" },
    { id: "agent",  label: "On-prem agent",     sub: "Dahua DSS · legacy SDK fleets",        tone: "positive", desc: "Local relay forwards to HRMS (works behind NAT).", count: "1 site" },
    { id: "pull",   label: "REST pull",         sub: "Anviz · Hik Artemis · Generic",         tone: "outline",  desc: "We poll the vendor API on a schedule.", count: "Standby" },
    { id: "mobile", label: "Phone-as-credential", sub: "Selfie + geofence · BLE · NFC",       tone: "primary",  desc: "Mobile SDK with 3D liveness, no door hardware.", count: "142 staff" },
  ];
  return (
    <>
      <div className="card" style={{ marginBottom: 18, padding: 18 }}>
        <div className="card-h" style={{ marginBottom: 10 }}>
          <div>
            <div className="card-title">5 ways data lands in the platform</div>
            <div className="card-sub">Pick any combination per site — push for HQ, agent for legacy plants, mobile for field reps</div>
          </div>
          <Pill tone="outline">All paths land in the same Time & Attendance ledger</Pill>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr auto 1fr auto 1fr", gap: 14, alignItems: "stretch", marginTop: 10 }}>
          {/* Lanes column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lanes.map(l => (
              <div key={l.id} style={{ padding: "10px 12px", borderLeft: `3px solid ${l.tone === "primary" ? "var(--primary)" : l.tone === "positive" ? "var(--positive)" : l.tone === "accent" ? "var(--accent)" : "var(--muted)"}`, background: "var(--paper)", borderRadius: "0 8px 8px 0", border: "1px solid var(--hairline)", borderLeftWidth: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 13.5 }}>{l.label}</span>
                  <span className="spacer"></span>
                  <Pill tone={l.tone}>{l.count}</Pill>
                </div>
                <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>{l.sub}</div>
                <div style={{ color: "var(--ink-2)", fontSize: 12, marginTop: 4 }}>{l.desc}</div>
              </div>
            ))}
          </div>

          {/* Arrow column */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
            <Icon name="chevron" size={28} stroke={1.4} />
          </div>

          {/* Hub */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 10, padding: 18, background: "var(--primary)", color: "#fff", borderRadius: 14, textAlign: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", opacity: .7 }}>HR Platform</div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.2 }}>Adeptio · Identity & Attendance hub</div>
            <div style={{ fontSize: 12, opacity: .8, marginTop: 4 }}>Normalises events · de-duplicates · enforces anti-passback · audit-logs everything</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginTop: 6 }}>
              <span className="pill" style={{ background: "rgba(255,255,255,.14)", color: "#fff", border: "1px solid rgba(255,255,255,.22)" }}>HMAC-signed</span>
              <span className="pill" style={{ background: "rgba(255,255,255,.14)", color: "#fff", border: "1px solid rgba(255,255,255,.22)" }}>Encrypted at rest</span>
              <span className="pill" style={{ background: "rgba(255,255,255,.14)", color: "#fff", border: "1px solid rgba(255,255,255,.22)" }}>Lao PDPA-ready</span>
            </div>
          </div>

          {/* Arrow column */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
            <Icon name="chevron" size={28} stroke={1.4} />
          </div>

          {/* Downstream */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { l: "Time & Attendance",   s: "Live board · investigation · exports", icon: "clock",   tone: "primary" },
              { l: "Payroll",             s: "OT calc · pay-period close · Lao PIT/NSSF", icon: "payroll", tone: "positive" },
              { l: "Workflow Builder",    s: "Anomaly auto-routing to managers", icon: "workflow", tone: "accent" },
              { l: "Analytics",           s: "Attrition · cost-to-serve · cross-border", icon: "chart",   tone: "outline" },
              { l: "ESS / Mobile portal", s: "Staff sees own punches + correction requests", icon: "users", tone: "primary" },
            ].map(d => (
              <div key={d.l} style={{ padding: "10px 12px", border: "1px solid var(--hairline)", borderRadius: 8, background: "var(--paper)", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: "var(--bg-deep)", display: "grid", placeItems: "center", flex: "0 0 auto" }}>
                  <Icon name={d.icon} size={15} stroke={1.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{d.l}</div>
                  <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{d.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {[
          { l: "Deployment options", items: ["Cloud (default)", "On-prem (air-gapped sites)", "Hybrid: edge agent + cloud HRMS"] },
          { l: "Security posture",   items: ["TLS 1.3 inbound · mTLS optional", "Templates encrypted (AES-256-GCM)", "Step-up MFA · revocation list", "Lao PDPA · TH PDPA · GDPR"] },
          { l: "Resilience",         items: ["Offline buffer 24h on edge", "Retry queue at hub", "Anti-passback · liveness · spoof-detect", "Audit log on every action"] },
        ].map(g => (
          <div key={g.l} className="card">
            <div className="card-title" style={{ marginBottom: 8 }}>{g.l}</div>
            <ul style={{ paddingLeft: 16, margin: 0, color: "var(--ink-2)", fontSize: 12.5, lineHeight: 1.7 }}>
              {g.items.map(it => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function Analytics() {
  const [scope, setScope] = React.useState("mtd");
  const totalViolations = POLICY_KINDS.reduce((s, k) => s + k.count, 0);
  const trendMax = Math.max(...POLICY_TREND_12W.flatMap(w => [w.late, w.early]));

  return (
    <div className="page">
      <div className="filterbar">
        <div className="seg">
          {[
            { id: "wtd", label: "This week" },
            { id: "mtd", label: "This month" },
            { id: "qtd", label: "This quarter" },
            { id: "ytd", label: "YTD" },
          ].map(t => (
            <button key={t.id} className={scope === t.id ? "on" : ""} onClick={() => setScope(t.id)}>{t.label}</button>
          ))}
        </div>
        <Pill tone="warning">{totalViolations} violations · {POLICY_KINDS.filter(k=>k.tone==="danger").reduce((s,k)=>s+k.count,0)} severe</Pill>
        <div className="spacer"></div>
        <button className="btn ghost"><Icon name="filter" /> Slice by division</button>
        <button className="btn"><Icon name="download" /> Export PDF</button>
        <button className="btn"><Icon name="download" /> Export CSV</button>
      </div>

      {/* Hero band */}
      <div className="card" style={{ padding: "16px 18px", marginBottom: 18, background: "linear-gradient(180deg, var(--paper) 0%, var(--bg) 100%)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary-soft)", color: "var(--primary)", display: "grid", placeItems: "center", flex: "0 0 auto" }}>
            <Icon name="chart" size={22} stroke={1.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 20, lineHeight: 1.25, fontStyle: "italic" }}>Policy compliance · {scope === "mtd" ? "May 2026 to date" : scope === "wtd" ? "this week" : scope === "qtd" ? "Q2 2026" : "YTD 2026"}</div>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4, maxWidth: 760 }}>
              Late punches, early-outs, no-shows and unapproved overtime — surfaced from the Time & Attendance ledger and biometric event stream. Click any policy tile or staff row to drill into the underlying punches.
            </div>
          </div>
          <div className="row" style={{ gap: 6, flex: "0 0 auto" }}>
            <Pill tone="positive">▼ 8.2% MoM</Pill>
            <Pill tone="primary">vs. industry · -3.4 pp better</Pill>
          </div>
        </div>
      </div>

      {/* Policy KPI strip — 8 tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 18 }}>
        {POLICY_KINDS.map(k => {
          const pos = k.deltaPct < 0;
          return (
            <div key={k.id} className="card" style={{ padding: 14, borderTop: `3px solid var(--${k.tone === "danger" ? "danger" : k.tone === "warning" ? "warning" : k.tone === "outline" ? "muted" : "primary"})` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className={`pill ${k.tone}`} style={{ fontSize: 10, letterSpacing: ".06em", fontWeight: 600 }}>{k.short}</span>
                <span className="spacer"></span>
                <span className={`delta ${pos ? "pos" : "neg"}`} style={{ fontSize: 11, color: pos ? "var(--positive)" : "var(--danger)", fontFamily: "var(--font-mono)" }}>
                  {pos ? "▼" : "▲"} {Math.abs(k.deltaPct).toFixed(1)}%
                </span>
              </div>
              <div className="num" style={{ fontSize: 28, fontWeight: 600, marginTop: 6, fontFamily: "var(--font-display)", fontStyle: "italic" }}>{k.count}</div>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink-2)" }}>{k.label}</div>
              <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 4, fontFamily: "var(--font-mono)" }}>{k.threshold}</div>
            </div>
          );
        })}
      </div>

      {/* Trend + division breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18, marginBottom: 18 }}>
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Late & early-out · 12-week trend</div>
              <div className="card-sub">All sites · weekly counts</div>
            </div>
            <div className="row" style={{ gap: 12, fontSize: 11.5, color: "var(--muted)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 4, background: "var(--warning)", borderRadius: 2 }} /> Late</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 4, background: "var(--accent)", borderRadius: 2 }} /> Early-out</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 180, marginTop: 10, paddingLeft: 4 }}>
            {POLICY_TREND_12W.map((w, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 150 }}>
                  <div style={{ width: 12, height: `${(w.late / trendMax) * 150}px`, background: "var(--warning)", borderRadius: "3px 3px 0 0" }} title={`${w.w} · ${w.late} late`} />
                  <div style={{ width: 12, height: `${(w.early / trendMax) * 150}px`, background: "var(--accent)", borderRadius: "3px 3px 0 0" }} title={`${w.w} · ${w.early} early`} />
                </div>
                <div style={{ fontSize: 10, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{w.w}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">By division</div>
              <div className="card-sub">Violations rate per active staff</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 6 }}>
            {POLICY_BY_DIVISION.map(d => (
              <div key={d.div}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 12.5 }}>
                  <span style={{ fontWeight: 500 }}>{d.div}</span>
                  <span className="num" style={{ color: "var(--muted)" }}>{d.total} <span style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>({(d.rate*100).toFixed(1)}%)</span></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                  <MiniBar value={d.rate} max={0.30} w="100%" color={d.rate > 0.20 ? "var(--warning)" : d.rate > 0.12 ? "var(--primary)" : "var(--positive)"} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: d.trend > 0 ? "var(--danger)" : d.trend < 0 ? "var(--positive)" : "var(--muted)", whiteSpace: "nowrap" }}>
                    {d.trend > 0 ? `▲ +${d.trend}` : d.trend < 0 ? `▼ ${d.trend}` : "•  0"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top offenders + recent incidents */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18 }}>
        <div className="card" style={{ padding: 0 }}>
          <div className="card-h" style={{ padding: "16px 18px 0" }}>
            <div>
              <div className="card-title">Top offenders</div>
              <div className="card-sub">Staff with most policy hits this period · ranked by total</div>
            </div>
            <button className="btn ghost sm">View all 47</button>
          </div>
          <table className="table" style={{ marginTop: 8 }}>
            <thead>
              <tr>
                <th>Staff</th>
                <th>Department</th>
                <th>Late</th>
                <th>Early-out</th>
                <th>No-show</th>
                <th>Unapproved OT</th>
                <th>Total</th>
                <th>Trend</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {POLICY_TOP_OFFENDERS.map(o => (
                <tr key={o.staffId}>
                  <td>
                    <Empl s={{ name: o.staff, lao: "" }} />
                    <div className="id" style={{ marginLeft: 38, marginTop: 2 }}>{o.staffId}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 12.5 }}>{o.dept}</div>
                    <div style={{ color: "var(--muted)", fontSize: 11 }}>{o.site}</div>
                  </td>
                  <td className="num" style={{ color: o.late >= 5 ? "var(--warning)" : "var(--ink-2)" }}>{o.late}</td>
                  <td className="num" style={{ color: o.early >= 5 ? "var(--warning)" : "var(--ink-2)" }}>{o.early}</td>
                  <td className="num" style={{ color: o.noshow >= 1 ? "var(--danger)" : "var(--muted)" }}>{o.noshow}</td>
                  <td className="num" style={{ color: o.otUn >= 3 ? "var(--warning)" : "var(--ink-2)" }}>{o.otUn}</td>
                  <td>
                    <div className="row" style={{ gap: 6 }}>
                      <span className="num" style={{ fontSize: 13, fontWeight: 600 }}>{o.total}</span>
                      <MiniBar value={o.total} max={20} w={50} color={o.total >= 13 ? "var(--danger)" : o.total >= 8 ? "var(--warning)" : "var(--primary)"} />
                    </div>
                  </td>
                  <td className="mono" style={{ color: o.trend > 0 ? "var(--danger)" : o.trend < 0 ? "var(--positive)" : "var(--muted)", fontSize: 12 }}>
                    {o.trend > 0 ? `▲ +${o.trend}` : o.trend < 0 ? `▼ ${o.trend}` : "•  0"}
                  </td>
                  <td>
                    {o.status === "warned"     && <Pill tone="danger">Warned</Pill>}
                    {o.status === "monitoring" && <Pill tone="warning">Monitoring</Pill>}
                    {o.status === "ok"         && <Pill tone="outline">OK</Pill>}
                    {o.status === "exempted"   && <Pill tone="primary">Exempt</Pill>}
                  </td>
                  <td><button className="btn sm ghost"><Icon name="chevron" size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Recent incidents</div>
              <div className="card-sub">Last 24 h — auto-flagged from punch ledger</div>
            </div>
            <button className="btn ghost sm">All</button>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {POLICY_INCIDENTS_RECENT.map((x, i) => {
              const k = POLICY_KINDS.find(p => p.id === x.kind);
              return (
                <li key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderTop: i ? "1px solid var(--hairline)" : "none" }}>
                  <div style={{ width: 56, flex: "0 0 auto", textAlign: "center" }}>
                    <div className="mono" style={{ color: "var(--muted)", fontSize: 11 }}>{x.ts}</div>
                    {x.severity === "high" && <Pill tone="danger">HIGH</Pill>}
                    {x.severity === "med"  && <Pill tone="warning">MED</Pill>}
                    {x.severity === "low"  && <Pill tone="outline">LOW</Pill>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{x.staff}</span>
                      {k && <span className={`pill ${k.tone}`} style={{ fontSize: 9.5, letterSpacing: ".06em", fontWeight: 600 }}>{k.short}</span>}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 1 }}>{x.staffId} · {x.site}</div>
                    <div style={{ color: "var(--ink-2)", fontSize: 12, marginTop: 4 }}>{x.detail}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
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
