/* Web Staff Portal — pay (split from staff-web.jsx) */

/* ---------- PAY & TAX ---------- */
function PayPage({ lang }) {
  const latest = PAY_HISTORY[0];
  return (
    <div className="page">
      <PageHeader
        eyebrow={lang === "en" ? "Pay · Cluster B" : "ເງິນເດືອນ · ກຸ່ມ B"}
        title={lang === "en" ? "Pay & Tax" : "ເງິນເດືອນ & ພາສີ"}
        sub={lang === "en" ? "Payslips, NSSF, Provident Fund, salary advance, annual income (50 Tawi · Kor.Tor.20)." : "ໃບເງິນເດືອນ, NSSF, ກອງທຶນ, ເງິນລ່ວງໜ້າ, ລາຍໄດ້ປະຈຳປີ."}
        right={<>
          <button className="btn ghost"><I n="download" s={13} /> {lang === "en" ? "Latest payslip" : "ຮັບໃບເງິນເດືອນລ່າສຸດ"}</button>
          <button className="btn primary">{lang === "en" ? "Annual summary" : "ສະຫຼຸບປະຈຳປີ"}</button>
        </>}
      />

      <div className="grid-2">
        {/* Big payslip card */}
        <div className="payslip-big">
          <div className="ps-eyebrow">{lang === "en" ? "Latest payslip · July 2025" : "ໃບເງິນເດືອນລ່າສຸດ · ກໍລະກົດ 2025"}</div>
          <div className="ps-net">
            <span className="ps-lbl">{lang === "en" ? "Net pay" : "ເງິນສຸດທິ"}</span>
            <span className="ps-amt serif italic">₭ {latest.net.toLocaleString()}</span>
          </div>
          <div className="ps-grid">
            <div><span className="k">{lang === "en" ? "Gross" : "ລາຍຮັບລວມ"}</span><span className="v mono">₭ {latest.gross.toLocaleString()}</span></div>
            <div><span className="k">{lang === "en" ? "Overtime" : "ລ່ວງເວລາ"}</span><span className="v mono">₭ {latest.ot.toLocaleString()}</span></div>
            <div><span className="k">PIT</span><span className="v mono neg">−₭ {latest.pit.toLocaleString()}</span></div>
            <div><span className="k">NSSF</span><span className="v mono neg">−₭ {latest.nssf.toLocaleString()}</span></div>
            <div><span className="k">{lang === "en" ? "Provident Fund" : "ກອງທຶນ"}</span><span className="v mono neg">−₭ {latest.pf.toLocaleString()}</span></div>
            <div><span className="k">{lang === "en" ? "Bank · BCEL" : "ທະນາຄານ · BCEL"}</span><span className="v mono">····8821</span></div>
          </div>
          <div className="ps-band">
            <div className="ps-band-bar">
              {(() => {
                const segs = [
                  { c: "#FFFFFF",          v: latest.net },
                  { c: "rgba(255,255,255,0.55)", v: latest.pit },
                  { c: "rgba(255,255,255,0.40)", v: latest.nssf },
                  { c: "rgba(255,255,255,0.28)", v: latest.pf },
                ];
                const total = segs.reduce((a, x) => a + x.v, 0);
                return segs.map((s, i) => <div key={i} style={{ width: `${(s.v / total) * 100}%`, background: s.c }} />);
              })()}
            </div>
            <div className="ps-band-leg">
              <span><i className="sw" style={{ background: "#FFFFFF" }} />Net</span>
              <span><i className="sw" style={{ background: "rgba(255,255,255,0.55)" }} />PIT</span>
              <span><i className="sw" style={{ background: "rgba(255,255,255,0.40)" }} />NSSF</span>
              <span><i className="sw" style={{ background: "rgba(255,255,255,0.28)" }} />PF</span>
            </div>
          </div>
          <div className="ps-actions">
            <button className="btn light"><I n="download" s={13} /> PDF</button>
            <button className="btn ghost-light">{lang === "en" ? "Email me a copy" : "ສົ່ງໃຫ້ອີເມວ"}</button>
            <button className="btn ghost-light">{lang === "en" ? "Bank statement letter" : "ໜັງສືຮັບຮອງ"}</button>
          </div>
        </div>

        {/* Right column tools */}
        <div className="grid-stack">
          <div className="card">
            <div className="card-h"><div className="card-t">{lang === "en" ? "Annual income (Kor.Tor.20)" : "ລາຍຮັບປະຈຳປີ (50 Tawi)"}</div></div>
            <div className="ann-stat">
              <div className="ann-stat-r"><span className="k">{lang === "en" ? "Gross YTD" : "ຍອດລວມ"}</span><span className="v mono">₭ 65,800,000</span></div>
              <div className="ann-stat-r"><span className="k">{lang === "en" ? "PIT YTD" : "ພາສີລວມ"}</span><span className="v mono">₭ 5,773,800</span></div>
              <div className="ann-stat-r"><span className="k">{lang === "en" ? "Effective tax rate" : "ອັດຕາພາສີ"}</span><span className="v mono">8.77%</span></div>
              <div className="ann-stat-r"><span className="k">{lang === "en" ? "Tax bracket" : "ຂັ້ນພາສີ"}</span><span className="v">9% (5–15M)</span></div>
            </div>
          </div>

          <div className="card">
            <div className="card-h"><div className="card-t">{lang === "en" ? "Salary advance" : "ເງິນເດືອນລ່ວງໜ້າ"}</div></div>
            <div className="sa-row">
              <div className="sa-l">
                <div className="kt-l small">{lang === "en" ? "Available this cycle" : "ຍອດທີ່ຮັບໄດ້"}</div>
                <div className="sa-amt serif italic">₭ 2,400,000</div>
                <div className="kt-s small">{lang === "en" ? "Up to 30% of net · subject to manager approval" : "ສູງສຸດ 30% ຂອງເງິນສຸດທິ"}</div>
              </div>
              <button className="btn primary">{lang === "en" ? "Request advance" : "ຂໍລ່ວງໜ້າ"}</button>
            </div>
          </div>
        </div>

        {/* Pay history table */}
        <div className="card col-2">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "12-month history" : "ປະຫວັດ 12 ເດືອນ"}</div>
            <a className="card-act">{lang === "en" ? "Export CSV" : "ສົ່ງອອກ CSV"}</a>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>{lang === "en" ? "Period" : "ຮອບ"}</th>
                <th className="r">{lang === "en" ? "Gross" : "ລວມ"}</th>
                <th className="r">{lang === "en" ? "Overtime" : "OT"}</th>
                <th className="r">PIT</th>
                <th className="r">NSSF</th>
                <th className="r">PF</th>
                <th className="r">{lang === "en" ? "Net" : "ສຸດທິ"}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {PAY_HISTORY.map(p => (
                <tr key={p.m}>
                  <td>{p.m}</td>
                  <td className="r mono">{p.gross.toLocaleString()}</td>
                  <td className="r mono muted">{p.ot ? p.ot.toLocaleString() : "—"}</td>
                  <td className="r mono">{p.pit.toLocaleString()}</td>
                  <td className="r mono">{p.nssf.toLocaleString()}</td>
                  <td className="r mono">{p.pf.toLocaleString()}</td>
                  <td className="r mono strong">{p.net.toLocaleString()}</td>
                  <td className="r"><a className="lk"><I n="download" s={13} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
