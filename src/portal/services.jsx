/* Mobile Staff Portal — services (split from portal.jsx) */

function Services() {
  const C = [
    { k: "A", c: "var(--c-A)", n: "Personal Data & Profile", lo: "ຂໍ້ມູນສ່ວນຕົວ", li: ["Address · phone · email", "Emergency · dependents", "Bank · KYC · profile photo"] },
    { k: "B", c: "var(--c-B)", n: "Pay & Statutory", lo: "ເງິນເດືອນ ແລະ ພາສີ", li: ["Payslip current + history", "Annual income (50 Tawi · KT.20)", "Tax estimator · FBP · PF balance"] },
    { k: "C", c: "var(--c-C)", n: "Time, Attendance & Leave", lo: "ເວລາ ແລະ ການລາພັກ", li: ["Clock-in: selfie · GPS · QR · Wi-Fi", "Punch correction · MC upload", "Leave · shift swap · OT · team cal"] },
    { k: "D", c: "var(--c-D)", n: "Claims, Loans & Benefits", lo: "ຄ່າໃຊ້ຈ່າຍ ແລະ ສະຫວັດດີການ", li: ["OCR receipt expense claim", "Salary advance · loan", "Benefits enrollment · per-diem"] },
    { k: "E", c: "var(--c-E)", n: "HR Helpdesk & Comms", lo: "ບໍລິການ HR ແລະ ຂ່າວສານ", li: ["SLA-tracked HR ticket inbox", "LINE OA · Telegram chatbot", "Announcements · pulse · grievance"] },
    { k: "F", c: "var(--c-F)", n: "Documents, Letters, Policy", lo: "ເອກະສານ ແລະ ນະໂຍບາຍ", li: ["Self-generate cert · salary letter", "Visa / WP request with e-sign", "Policy hub · personal vault"] },
  ];
  return (
    <div className="ess">
      <IOSStatusBar />
      <div style={{ padding: "6px 18px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <I name="x" size={18} c="var(--muted)" />
        <div style={{ fontSize: 15, fontWeight: 600 }}>All services</div>
        <div style={{ flex: 1 }}></div>
        <span className="pill outline">EN · ລາວ</span>
      </div>

      <div className="scroll">
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 14, padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <I name="sparkle" size={14} c="var(--c-E)" />
          <span style={{ fontSize: 12.5, color: "var(--muted)", flex: 1 }}>Search a service or ask in your own words…</span>
          <span className="pill outline">⌘K</span>
        </div>

        <div className="grid6">
          {C.map(c => (
            <div key={c.k} className="cluster">
              <div className="head">
                <div className="ic" style={{ background: c.c }}>{c.k}</div>
                <div>
                  <div className="nm">{c.n}</div>
                  <div className="lo">{c.lo}</div>
                </div>
              </div>
              <ul>{c.li.map((l, i) => <li key={i}>{l}</li>)}</ul>
            </div>
          ))}
        </div>

        {/* Baseline reminders */}
        <div className="sec-h"><span className="t">Baseline · every screen</span></div>
        <div className="lst">
          <div className="row-i">
            <div className="ic" style={{ background: "var(--bg-deep)", color: "var(--muted)" }}><I name="wifi" size={14} /></div>
            <div className="body"><div className="ttl">Mobile-first · offline sync</div><div className="sub">Field workers, kiosks, low-bandwidth sites</div></div>
          </div>
          <div className="row-i">
            <div className="ic" style={{ background: "var(--bg-deep)", color: "var(--muted)" }}><I name="geo" size={14} /></div>
            <div className="body"><div className="ttl">Multilingual · Lao · Thai · EN</div><div className="sub">User-pinned per device · auto-translate</div></div>
          </div>
          <div className="row-i">
            <div className="ic" style={{ background: "var(--bg-deep)", color: "var(--muted)" }}><I name="fp" size={14} /></div>
            <div className="body"><div className="ttl">SSO + biometric login</div><div className="sub">WCAG 2.1 AA · audit trail every action</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Wiring matrix ---------- */
