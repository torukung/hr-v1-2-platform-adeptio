/* Mobile Staff Portal — home (split from portal.jsx) */

/* Mobile staff is Vilaysone Keomany — EMP-00118 in the shared ledger */
const MY_MOBILE_STAFF_ID = "EMP-00118";

function Home() {
  const policy = (typeof policyRollupForStaff === "function") ? policyRollupForStaff(MY_MOBILE_STAFF_ID) : null;
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

        {/* Time-policy compliance — synced from HR · same record manager sees */}
        {policy && <MyTimePolicyMobile policy={policy} />}

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

/* ---------- Mobile · time-policy compliance card ---------- */
function MyTimePolicyMobile({ policy }) {
  const lvl = policy.level;
  const tone = lvl.tone === "danger" ? "#A8392E" : lvl.tone === "warning" ? "#C4843A" : "#2E6F47";
  const toneSoft = lvl.tone === "danger" ? "#F2D7CD" : lvl.tone === "warning" ? "#F4E7CE" : "#DDEAD8";
  const isClean = policy.total === 0;

  return (
    <div style={{
      margin: "0 16px 14px", padding: "12px 14px",
      background: "#FBF8F1", border: "1px solid #E5DECC", borderLeft: `3px solid ${tone}`,
      borderRadius: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <I name="clock" size={14} c={tone} />
        <span style={{ fontSize: 11, letterSpacing: ".09em", textTransform: "uppercase", color: "#6B6E7B", fontWeight: 600 }}>Time policy · 30 days</span>
        <span style={{ flex: 1 }}></span>
        <span style={{
          fontSize: 10, letterSpacing: ".06em", padding: "2px 8px", borderRadius: 999,
          background: toneSoft, color: tone, fontWeight: 700,
        }}>{lvl.label.toUpperCase()}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 32, lineHeight: 1, color: tone }}>{policy.total}</span>
        <span style={{ color: "#6B6E7B", fontSize: 12 }}>{isClean ? "incidents · clean record" : "incidents this month"}</span>
      </div>
      {!isClean && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {policy.late > 0    && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#F4E7CE", color: "#B5832B" }}>{policy.late} late</span>}
          {policy.early > 0   && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#F4E7CE", color: "#B5832B" }}>{policy.early} early</span>}
          {policy.lowconf > 0 && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#ECE4D2", color: "#6B6E7B" }}>{policy.lowconf} low-conf</span>}
          {policy.otUn > 0    && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#F4E7CE", color: "#B5832B" }}>{policy.otUn} OT-UA</span>}
          {policy.noshow > 0  && <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#F2D7CD", color: "#A8392E" }}>{policy.noshow} no-show</span>}
        </div>
      )}
      <div style={{ color: "#6B6E7B", fontSize: 11.5, marginTop: 8, lineHeight: 1.4 }}>
        {isClean
          ? "Clean record · keep it up. Your manager and HR see the same view."
          : `${lvl.note} · same record your manager sees.`
        }
      </div>
      {!isClean && policy.entries.length > 0 && (
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #E5DECC" }}>
          {policy.entries.slice(0, 2).map(e => {
            const def = (typeof POLICY_THRESHOLDS !== "undefined") ? POLICY_THRESHOLDS[e.kind] : null;
            return (
              <div key={e.id} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", color: "#8B8E99", fontSize: 10.5 }}>{policyFmtTs(e.ts)}</span>
                {def && <span style={{ fontSize: 9.5, padding: "1px 6px", borderRadius: 999, background: "#ECE4D2", color: "#6B6E7B", fontWeight: 600 }}>{def.short}</span>}
                <span style={{ fontSize: 11.5, color: "#2A2F45", flex: 1, lineHeight: 1.35 }}>{e.detail}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- Screen 2: Apply leave (cluster C) ---------- */
