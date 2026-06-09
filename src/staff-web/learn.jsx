/* Web Staff Portal — learn (split from staff-web.jsx) */

/* ---------- LEARNING ---------- */
function LearnPage({ lang }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow={lang === "en" ? "Learning" : "ການຮຽນຮູ້"}
        title={lang === "en" ? "My Learning" : "ການຮຽນຮູ້ຂອງຂ້ອຍ"}
        sub={lang === "en" ? "Mandatory compliance, role-specific upskilling, and elective courses." : "ການປະຕິບັດຕາມກົດໝາຍ, ການພັດທະນາທັກສະ, ຄອສທາງເລືອກ."}
        right={<button className="btn primary">{lang === "en" ? "Browse catalog" : "ເບິ່ງລາຍການຄອສ"}</button>}
      />
      <div className="course-grid">
        {COURSES.map(c => (
          <div key={c.id} className="course">
            <div className="course-h">
              <Pill tone={c.progress === 100 ? "positive" : c.progress > 0 ? "primary" : "default"}>
                {c.progress === 100 ? (lang === "en" ? "Completed" : "ສຳເລັດ") : c.progress > 0 ? (lang === "en" ? "In progress" : "ກຳລັງຮຽນ") : (lang === "en" ? "Not started" : "ຍັງບໍ່ເລີ່ມ")}
              </Pill>
              <span className="mono small muted">{c.mins} min</span>
            </div>
            <div className="course-t">{c.t}</div>
            <div className="course-lo lao muted small">{c.lo}</div>
            <div className="course-bar"><div className="course-fill" style={{ width: c.progress + "%" }} /></div>
            <div className="course-meta">
              <span className="muted small">{lang === "en" ? "Due" : "ກຳນົດ"} {c.due}</span>
              <button className="btn sm ghost">{c.progress === 100 ? (lang === "en" ? "Certificate" : "ໃບຢັ້ງຢືນ") : (lang === "en" ? "Open" : "ເປີດ")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
