/* Web Staff Portal — claims (split from staff-web.jsx) */

/* ---------- CLAIMS ---------- */
function ClaimsPage({ lang }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow={lang === "en" ? "Claims · Cluster D" : "ການເບີກ · ກຸ່ມ D"}
        title={lang === "en" ? "Claims & Benefits" : "ການເບີກ & ສະຫວັດດີການ"}
        sub={lang === "en" ? "Expense, travel, mobile, medical, and benefit claims with receipt OCR." : "ເບີກຄ່າໃຊ້ຈ່າຍ, ເດີນທາງ, ມືຖື, ການແພດ ແລະ ສະຫວັດດີການ."}
        right={<button className="btn primary"><I n="plus" s={13} /> {lang === "en" ? "New claim" : "ຮ້ອງຂໍໃໝ່"}</button>}
      />

      <div className="claim-row">
        {[
          { t: "Travel & site",  lo: "ເດີນທາງ", c: "D", v: "₭ 1,240,000", s: "1 in review", icon: "pin" },
          { t: "Mobile/data",    lo: "ມືຖື/ອິນເຕີເນັດ", c: "B", v: "₭ 360,000", s: "Quarterly cap ₭ 720k", icon: "phone" },
          { t: "Medical",        lo: "ການແພດ", c: "E", v: "₭ 0", s: "Annual cap ₭ 6M", icon: "claim" },
          { t: "Per-diem",       lo: "ຄ່າປະຈຳວັນ", c: "F", v: "₭ 0", s: "₭ 240k/day field", icon: "claim" },
        ].map((b, i) => (
          <div key={i} className="claim-card">
            <div className={"claim-ic c-" + b.c}><I n={b.icon} s={18} /></div>
            <div className="claim-body">
              <div className="claim-t">{lang === "en" ? b.t : b.lo}</div>
              <div className="claim-v serif italic">{b.v}</div>
              <div className="claim-s muted small">{b.s}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card col-2">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Recent claims" : "ການເບີກລ່າສຸດ"}</div>
            <div className="seg sm">
              {["All", "Pending", "Approved", "Rejected"].map((s, i) => <button key={s} className={"seg-b" + (i === 0 ? " on" : "")}>{s}</button>)}
            </div>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th>ID</th>
                <th>{lang === "en" ? "Description" : "ລາຍລະອຽດ"}</th>
                <th>{lang === "en" ? "Date" : "ວັນທີ"}</th>
                <th className="r">{lang === "en" ? "Amount" : "ຈຳນວນ"}</th>
                <th>{lang === "en" ? "Status" : "ສະຖານະ"}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {CLAIM_HISTORY.map(c => (
                <tr key={c.id}>
                  <td className="mono small">{c.id}</td>
                  <td>
                    <div className="cell-stack">
                      <span>{c.t}</span>
                      <span className="lao muted small">{c.lo}</span>
                    </div>
                  </td>
                  <td>{c.date}</td>
                  <td className="r mono">{c.amt.toLocaleString()}</td>
                  <td><StatusPill s={c.status} /></td>
                  <td className="r"><a className="lk">{lang === "en" ? "View" : "ເບິ່ງ"}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
