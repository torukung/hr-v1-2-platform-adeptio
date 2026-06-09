/* Mobile Staff Portal — leave (split from portal.jsx) */

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
