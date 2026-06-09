/* Web Staff Portal — perf (split from staff-web.jsx) */

/* ---------- PERFORMANCE ---------- */
function PerfPage({ lang }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow={lang === "en" ? "Performance" : "ການປະເມີນ"}
        title={lang === "en" ? "My Performance" : "ການປະເມີນຂອງຂ້ອຍ"}
        sub={`${PERFORMANCE.cycle} · ${lang === "en" ? "Self-review opens" : "ປະເມີນຕົວເອງເປີດ"} ${PERFORMANCE.selfDue}`}
        right={<button className="btn primary">{lang === "en" ? "Start self-review" : "ເລີ່ມປະເມີນ"}</button>}
      />
      <div className="card">
        <div className="card-h">
          <div className="card-t">{lang === "en" ? "Objectives & key results" : "ເປົ້າໝາຍ ແລະ ຜົນສຳເລັດ"}</div>
        </div>
        <ul className="obj-l">
          {PERFORMANCE.objectives.map((o, i) => (
            <li key={i}>
              <div className="obj-h">
                <div className="obj-t">{o.t}</div>
                <div className="lao muted small">{o.lo}</div>
              </div>
              <div className="obj-bar"><div className="obj-fill" style={{ width: o.progress + "%" }} /></div>
              <div className="obj-meta">
                <span className="muted small">{o.weight}% {lang === "en" ? "weight" : "ນ້ຳໜັກ"}</span>
                <span className="mono small">{o.progress}%</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
