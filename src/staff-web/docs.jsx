/* Web Staff Portal — docs (split from staff-web.jsx) */

/* ---------- DOCUMENTS ---------- */
function DocsPage({ lang }) {
  const FOLDERS = [
    { t: "Payslips", lo: "ໃບເງິນເດືອນ", n: 28, ic: "pay", c: "B" },
    { t: "Letters & e-sign", lo: "ໜັງສື & ລາຍເຊັນ", n: 12, ic: "file", c: "F" },
    { t: "Contracts", lo: "ສັນຍາ", n: 4, ic: "file", c: "C" },
    { t: "Tax (50 Tawi)", lo: "ໃບພາສີ", n: 6, ic: "file", c: "D" },
    { t: "Training certificates", lo: "ໃບຢັ້ງຢືນ", n: 9, ic: "book2", c: "A" },
    { t: "Personal docs", lo: "ເອກະສານສ່ວນຕົວ", n: 11, ic: "vault", c: "E" },
  ];
  return (
    <div className="page">
      <PageHeader
        eyebrow={lang === "en" ? "Documents · Cluster F" : "ເອກະສານ · ກຸ່ມ F"}
        title={lang === "en" ? "Documents Vault" : "ຄັງເອກະສານ"}
        sub={lang === "en" ? "Personal documents, letters, contracts, certificates and tax forms." : "ເອກະສານສ່ວນຕົວ, ໜັງສື, ສັນຍາ, ໃບຢັ້ງຢືນ."}
        right={<>
          <button className="btn ghost"><I n="upload" s={13} /> {lang === "en" ? "Upload" : "ອັບໂຫຼດ"}</button>
          <button className="btn primary">{lang === "en" ? "Request letter" : "ຂໍໜັງສືຮັບຮອງ"}</button>
        </>}
      />
      <div className="folder-grid">
        {FOLDERS.map((f, i) => (
          <div key={i} className="fold">
            <div className={"fold-ic c-" + f.c}><I n={f.ic} s={20} /></div>
            <div className="fold-t">{lang === "en" ? f.t : f.lo}</div>
            <div className="fold-s muted small">{f.n} {lang === "en" ? "files" : "ໄຟລ໌"}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-h">
          <div className="card-t">{lang === "en" ? "Recently issued" : "ອອກໃໝ່ລ່າສຸດ"}</div>
        </div>
        <ul className="doc-l lg">
          {[
            { t: "Payslip — July 2025",                  lo: "ໃບເງິນເດືອນ — ກໍລະກົດ 2025", st: "PDF · signed", date: "Aug 02" },
            { t: "Salary certificate (Khampheng visa)",  lo: "ໜັງສືຮັບຮອງ — ວີຊາ",         st: "Awaiting signature", date: "Jul 29" },
            { t: "Annual income — Kor.Tor.20 (50 Tawi)", lo: "ໃບລາຍຮັບປະຈຳປີ",            st: "Issued by Finance", date: "Jan 31" },
            { t: "Contract — renewed",                   lo: "ສັນຍາ — ຕໍ່ໃໝ່",            st: "Active", date: "Mar 14" },
            { t: "GMP Certificate — 2024",               lo: "ໃບຢັ້ງຢືນ GMP — 2024",     st: "Verified", date: "Nov 12 2024" },
          ].map((d, i) => (
            <li key={i}>
              <I n="file" s={16} c="#8B8E99" />
              <div>
                <div>{d.t}</div>
                <div className="lao muted small">{d.lo}</div>
              </div>
              <div className="muted small">{d.st}</div>
              <div className="muted small">{d.date}</div>
              <a className="lk small"><I n="download" s={13} /></a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
