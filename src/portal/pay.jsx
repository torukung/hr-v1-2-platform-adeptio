/* Mobile Staff Portal — pay (split from portal.jsx) */

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
