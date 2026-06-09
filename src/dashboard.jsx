/* Dashboard — KPIs, charts, approvals, upcoming */

function Dashboard({ lang, timeframe, setTimeframe, division, setDivision }) {
  const k = KPIS[timeframe];
  const tfLabel = TIMEFRAMES.find(t => t.id === timeframe).label;
  const divObj = DIVISIONS.find(d => d.id === division);

  const t = (en, lo) => lang === "lo" ? lo : en;

  return (
    <div className="page">
      {/* Filter bar */}
      <div className="filterbar">
        <div className="seg" role="tablist" aria-label="Timeframe">
          {TIMEFRAMES.map(tf => (
            <button key={tf.id} className={timeframe === tf.id ? "on" : ""} onClick={() => setTimeframe(tf.id)}>{tf.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {DIVISIONS.map(d => (
            <button key={d.id}
              className={`chip ${division === d.id ? "on" : ""}`}
              onClick={() => setDivision(d.id)}>
              {division !== d.id && <span className="swatch" />}
              {d.name}
              <span style={{ color: division === d.id ? "rgba(255,255,255,0.7)" : "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 11 }}>{d.count}</span>
            </button>
          ))}
        </div>
        <div className="spacer"></div>
        <button className="btn ghost"><Icon name="filter" /> More filters</button>
        <button className="btn"><Icon name="download" /> Export</button>
      </div>

      {/* Today's attendance — hero tile (biometric + manual punches roll up here) */}
      <TodayAttendance />

      {/* KPI grid */}
      <div className="kpi-grid">
        <KPI label="Headcount" value={k.headcount.toLocaleString()} delta={k.headcountDelta} suffix="" foot={`${tfLabel} · ${divObj.name}`} />
        <KPI label="Present today" value={`${k.presentPct}%`} delta={k.presentDelta} suffix="pp" foot={`${Math.round(k.headcount * k.presentPct / 100)} present`} />
        <KPI label="On leave" value={k.onLeave} delta={null}
             foot={<span><Pill tone="primary">A {k.onLeaveBreak.annual}</Pill>{" "}<Pill tone="positive">S {k.onLeaveBreak.sick}</Pill>{" "}<Pill tone="accent">P {k.onLeaveBreak.parental}</Pill></span>} />
        <KPI label="Pending approvals" value={k.pendingApprovals} delta={null}
             foot={<><span style={{ color: "var(--danger)" }}>● </span> 3 SLA-breach</>} />
        <KPI label={`Payroll · ${tfLabel}`} value={`₭${formatLAK(k.payrollLAK)}`} delta={k.payrollDelta} suffix="%" foot="LAK · gross" />
        <KPI label="Attrition (rolling 12m)" value={`${k.attrition}%`} delta={k.attritionDelta} suffix="pp" foot="industry: 11.2%" />
      </div>

      {/* Row 1 — Headcount trend + Division breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginBottom: 18 }}>
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Headcount trend</div>
              <div className="card-sub">Trailing 12 months · all divisions</div>
            </div>
            <div className="row">
              <Pill tone="positive">+9.9% YoY</Pill>
              <Pill tone="outline">Permanent 1,084 · Fixed 164</Pill>
            </div>
          </div>
          <LineChart data={HEADCOUNT_TREND} h={220} />
        </div>
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">By division</div>
              <div className="card-sub">Active staff</div>
            </div>
          </div>
          <BarChart data={DIV_BREAKDOWN} h={220} vertical />
        </div>
      </div>

      {/* Row 2 — Attendance heat + Leave by type + Workforce composition */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: 18, marginBottom: 18 }}>
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Attendance density</div>
              <div className="card-sub">Last 5 weeks · % present</div>
            </div>
          </div>
          <Heatmap grid={ATTENDANCE_HEAT} />
        </div>

        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Leave mix</div>
              <div className="card-sub">{tfLabel} · open requests</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Donut data={LEAVE_BY_TYPE} label="Days" />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              {LEAVE_BY_TYPE.map(d => (
                <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                  <span style={{ flex: 1 }}>{d.name}</span>
                  <span className="mono" style={{ color: "var(--muted)" }}>{d.v}d</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Statutory & ops</div>
              <div className="card-sub">Lao + cross-border</div>
            </div>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { l: "PIT (Tax Department)", v: "Apr filing on schedule", tone: "positive", k: "₭124M" },
              { l: "NSSF contribution", v: "Apr file ready · 15 May", tone: "primary", k: "₭109M" },
              { l: "Provident Fund (matched 2–15%)", v: "1,084 active · 86% take-up", tone: "outline", k: "₭54M" },
              { l: "Visa / work-permit expiring", v: "3 expats · 30 days", tone: "warning", k: "Action" },
              { l: "Contract renewals", v: "11 staff · 45 days", tone: "warning", k: "Review" },
            ].map((r, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.l}</div>
                  <div style={{ color: "var(--muted)", fontSize: 12 }}>{r.v}</div>
                </span>
                <Pill tone={r.tone}>{r.k}</Pill>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row 3 — Approvals queue + Upcoming */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
        <div className="card" style={{ padding: 0 }}>
          <div className="card-h" style={{ padding: "16px 18px 0" }}>
            <div>
              <div className="card-title">Approvals queue</div>
              <div className="card-sub">{k.pendingApprovals} pending · sorted by submission time</div>
            </div>
            <div className="row">
              <button className="btn ghost sm">View all</button>
            </div>
          </div>
          <table className="table" style={{ marginTop: 8 }}>
            <thead>
              <tr>
                <th>Staff</th><th>Division</th><th>Type</th><th>When</th><th>Submitted</th><th></th>
              </tr>
            </thead>
            <tbody>
              {APPROVALS.map(a => (
                <tr key={a.id}>
                  <td>
                    <Empl s={{ name: a.name, lao: a.lao }} />
                    <div className="id" style={{ marginTop: 2, marginLeft: 38 }}>{a.staffId} · {a.id}</div>
                  </td>
                  <td><span style={{ color: "var(--muted)" }}>{a.division}</span></td>
                  <td>
                    <div>{a.type}</div>
                    {a.days && <div style={{ color: "var(--muted)", fontSize: 11.5 }}>{a.days} day{a.days > 1 ? "s" : ""}</div>}
                  </td>
                  <td className="mono" style={{ color: "var(--ink-2)" }}>{a.dates}</td>
                  <td style={{ color: "var(--muted)" }}>
                    {a.priority === "urgent" && <Pill tone="danger">URGENT</Pill>}
                    {a.priority === "high" && <Pill tone="warning">HIGH</Pill>}
                    {" "}{a.submitted}
                  </td>
                  <td style={{ width: 1, whiteSpace: "nowrap" }}>
                    <button className="btn sm ghost" title="Reject"><Icon name="x" size={14} /></button>{" "}
                    <button className="btn sm primary" title="Approve"><Icon name="check" size={14} /> Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Upcoming</div>
              <div className="card-sub">Next 45 days</div>
            </div>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {UPCOMING.map((u, i) => (
              <li key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i ? "1px solid var(--hairline)" : "none" }}>
                <div style={{ width: 36, textAlign: "center", paddingTop: 2 }}>
                  <Icon name={u.tone === "warning" ? "flag" : u.tone === "primary" ? "payroll" : "globe"}
                    size={18} stroke={1.4}
                    style={{ color: u.tone === "warning" ? "var(--warning)" : u.tone === "primary" ? "var(--primary)" : "var(--muted)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{u.kind}</div>
                  <div style={{ color: "var(--muted)", fontSize: 12 }}>{u.who}</div>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-2)", alignSelf: "center" }}>{u.when}</div>
              </li>
            ))}
          </ul>
          <div className="divider"></div>
          <div className="card-title" style={{ marginBottom: 8 }}>Cross-cutting baseline</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[
              ["AI HR chatbot · 24/7", "sparkle"],
              ["Pulse engagement", "activity"],
              ["No-code workflows", "workflow"],
              ["Mobile + offline sync", "globe"],
              ["Multi-currency", "payroll"],
            ].map(([t, ic]) => (
              <span key={t} className="pill outline" style={{ padding: "4px 9px" }}>
                <Icon name={ic} size={11} stroke={1.6} /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Daily attendance hero — first thing HR sees on Pulse */
function TodayAttendance() {
  const a = ATTENDANCE_TODAY;
  const pct = (a.present / a.total) * 100;
  const max = Math.max(...a.hourly, 1);

  return (
    <div className="card" style={{ marginBottom: 18, padding: 0, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr 1fr", gap: 0 }}>

        {/* Left: hero number + breakdown */}
        <div style={{ padding: "18px 22px", borderRight: "1px solid var(--hairline)", background: "linear-gradient(180deg, var(--paper) 0%, var(--bg) 100%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="card-sub" style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>Today's attendance</div>
            <span className="spacer"></span>
            <Pill tone="positive"><span className="d"></span> Live · biometric uptime {(a.biometricUptime*100).toFixed(1)}%</Pill>
          </div>
          <div style={{ color: "var(--ink-2)", fontSize: 12.5, marginTop: 4 }}>{a.date}</div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
            <div className="serif num" style={{ fontSize: 40, lineHeight: 1, fontStyle: "italic" }}>{a.present.toLocaleString()}</div>
            <div className="num" style={{ fontSize: 16, color: "var(--muted)" }}>/ {a.total.toLocaleString()}</div>
            <Pill tone="primary">{pct.toFixed(1)}%</Pill>
          </div>
          <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>present across all sites</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 14 }}>
            {[
              { l: "Late",     v: a.late,    tone: "warning" },
              { l: "Absent",   v: a.absent,  tone: "danger" },
              { l: "On leave", v: a.onLeave, tone: "primary" },
              { l: "Early-out",v: a.early,   tone: "outline" },
            ].map(s => (
              <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", border: "1px solid var(--hairline)", borderRadius: 8, background: "var(--paper)" }}>
                <div className="num" style={{ fontWeight: 600, fontSize: 18, fontFamily: "var(--font-mono)" }}>{s.v}</div>
                <div style={{ flex: 1, color: "var(--muted)", fontSize: 11.5, lineHeight: 1.2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: per-site present + modality split */}
        <div style={{ padding: "18px 22px", borderRight: "1px solid var(--hairline)" }}>
          <div className="card-title" style={{ marginBottom: 8 }}>By site</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {a.bySite.map(s => {
              const p = (s.present / s.roster) * 100;
              return (
                <div key={s.site} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr auto", gap: 10, alignItems: "center", padding: "6px 0", borderBottom: "1px solid var(--hairline)" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{s.site}</div>
                    <div style={{ color: "var(--muted)", fontSize: 11 }}>{s.channel}</div>
                  </div>
                  <div className="num" style={{ fontSize: 12.5 }}>
                    <b>{s.present}</b><span style={{ color: "var(--muted)" }}> / {s.roster}</span>
                  </div>
                  <div className="row" style={{ gap: 6 }}>
                    <div style={{ display: "flex", width: 80, height: 5, borderRadius: 4, overflow: "hidden", background: "var(--bg-deep)" }}>
                      {s.modality.face > 0 && <div style={{ width: `${s.modality.face*100}%`, background: "var(--primary)" }} title={`Face ${(s.modality.face*100).toFixed(0)}%`} />}
                      {s.modality.fp > 0   && <div style={{ width: `${s.modality.fp*100}%`,   background: "var(--positive)" }} title={`FP ${(s.modality.fp*100).toFixed(0)}%`} />}
                      {s.modality.card > 0 && <div style={{ width: `${s.modality.card*100}%`, background: "var(--accent)" }} title={`Card ${(s.modality.card*100).toFixed(0)}%`} />}
                    </div>
                    <span className="num" style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{p.toFixed(0)}%</span>
                  </div>
                  <div>
                    {s.late > 5 ? <Pill tone="danger">{s.late}</Pill>
                    : s.late >= 2 ? <Pill tone="warning">{s.late}</Pill>
                    : <Pill tone="outline">{s.late}</Pill>}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, color: "var(--muted)", fontSize: 11 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--primary)" }} /> Face</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--positive)" }} /> Fingerprint</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--accent)" }} /> Card</span>
          </div>
        </div>

        {/* Right: hourly inflow + CTA */}
        <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column" }}>
          <div className="card-title">Hourly inflow</div>
          <div className="card-sub" style={{ marginBottom: 10 }}>00:00 → 23:00 · clock-in events</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 64 }}>
            {a.hourly.map((v, i) => (
              <div key={i} title={`${String(i).padStart(2,"0")}:00 — ${v} in`} style={{
                flex: 1,
                height: `${Math.max(2, (v / max) * 64)}px`,
                background: v === 0 ? "var(--bg-deep)" : "var(--primary)",
                borderRadius: 2,
                opacity: v === 0 ? 0.3 : 0.85,
              }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: 10.5, marginTop: 4, fontFamily: "var(--font-mono)" }}>
            <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
          </div>

          <div style={{ marginTop: "auto", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--muted)" }}>
              <Icon name="biometric" size={12} stroke={1.6} />
              <span>6 connectors active · ZK · Hik · Dahua · Suprema · Selfie · Webhook</span>
            </div>
            <button className="btn primary" style={{ justifyContent: "center" }}>
              <Icon name="clock" size={13} /> Open Time & Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, delta: d, suffix = "", foot }) {
  const D = d != null ? delta(d, suffix) : null;
  return (
    <div className="kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value num">{value}</div>
      <div className="kpi-foot">
        {D && <span className={`delta ${D.cls}`}>{D.sign} {D.text}</span>}
        <span style={{ color: "var(--muted)" }}>{foot}</span>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
