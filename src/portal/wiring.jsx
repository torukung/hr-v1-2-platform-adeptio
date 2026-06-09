/* Mobile Staff Portal — wiring (split from portal.jsx) */

function Wiring() {
  const W = [
    { k: "A", n: "Personal Data & Profile", lo: "ຂໍ້ມູນສ່ວນຕົວ", from: "Address change · bank · KYC docs · profile photo · dependents · house-book OCR", to: "Staff Records · Documents Vault → People Ops review queue", target: "P1 · Staff Records" },
    { k: "B", n: "Pay & Statutory",         lo: "ເງິນເດືອນ",         from: "Payslip view · annual income · tax estimator · PF balance · salary advance", to: "Payroll module · Statutory library (Lao PIT + NSSF + PF / TH benchmark)", target: "P4 · Payroll" },
    { k: "C", n: "Time, Attendance & Leave", lo: "ເວລາ ແລະ ການລາພັກ", from: "Clock-in (selfie · GPS · QR · Wi-Fi · biometric) · punch correction · MC upload · leave · OT · shift swap", to: "Time & Attendance live board · Leave & ESS approvals · Approvals queue", target: "P2 · Leave & ESS · P3 · T&A" },
    { k: "D", n: "Claims, Loans & Benefits", lo: "ຄ່າໃຊ້ຈ່າຍ",         from: "OCR receipt expense · salary advance · loan · benefit enrollment · per-diem · life-event change", to: "Approvals queue → Payroll cycle linkage · Documents Vault", target: "P4 · Payroll" },
    { k: "E", n: "HR Helpdesk & Comms",     lo: "ບໍລິການ HR",         from: "SLA-tracked ticket · LINE OA · Telegram bot · grievance · pulse · kudos · directory · birthdays", to: "CMS · Communications inbox · new Staff Portal Inbox group", target: "CMS · Comms / Admin" },
    { k: "F", n: "Documents, Letters, Policy", lo: "ເອກະສານ",         from: "Self-generate employment / salary cert · visa & WP letter (e-sign) · policy hub · personal vault", to: "Documents Vault · Policies · Workflow Builder (e-sign chain)", target: "P1 · Documents · CMS · Policies" },
  ];
  return (
    <div className="wiring">
      <h2>Wiring — Staff Portal → HR System v1.0</h2>
      <div className="sub">Every action a staff member takes lands in a specific module of the HR console. Below is the contract.</div>
      <div className="wmatrix">
        <div className="h-cell">Cluster</div>
        <div className="h-cell">Capability</div>
        <div className="h-cell">Inbound from staff</div>
        <div className="h-cell">Lands in HR System</div>

        {W.map(w => (
          <React.Fragment key={w.k}>
            <div className={`key ${w.k}`}>{w.k}</div>
            <div>
              <div className="nm">{w.n}</div>
              <div className="lo">{w.lo}</div>
            </div>
            <div style={{ color: "var(--ink-2)", fontSize: 12.5 }}>{w.from}</div>
            <div>
              <div style={{ fontSize: 12.5 }}>{w.to}</div>
              <div style={{ marginTop: 6 }}>
                <span className="pill primary">{w.target}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------- Sidebar nav additions ---------- */

function NavAdditions() {
  return (
    <div className="nav-add">
      <div>
        <div style={{ fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-A)", fontWeight: 600 }}>+ NEW IN v1.0 HR Console</div>
        <h3 style={{ marginTop: 4 }}>Staff Portal Inbox</h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.55, margin: "6px 0 0" }}>
          A new group sits between <b>Workspace</b> and <b>People</b>. It absorbs the inbound flow from the portal — tickets, profile-change requests, document e-sign queues, and grievance escalations — without burying them inside individual modules.
        </p>
        <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, margin: "10px 0 0" }}>
          The dashboard front page also gains a <b>Staff requests</b> ribbon at the top, ahead of timeframe filters, so HR sees urgent SLA-breaching items before drilling into KPIs.
        </p>
      </div>
      <div className="panel">
        <div className="group">WORKSPACE</div>
        <div className="item"><I name="home" size={14} c="var(--muted)" /> Dashboard</div>
        <div className="item"><I name="leave" size={14} c="var(--muted)" /> Approvals <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--muted)" }}>23</span></div>

        <div className="group new">+ STAFF PORTAL INBOX</div>
        <div className="item new"><I name="chat" size={14} /> Helpdesk tickets <span className="badge">12 SLA</span></div>
        <div className="item new"><I name="profile" size={14} /> Profile change requests <span className="badge">7</span></div>
        <div className="item new"><I name="cert" size={14} /> Letter / e-sign queue <span className="badge">5</span></div>
        <div className="item new"><I name="grievance" size={14} /> Grievance · pulse <span className="badge">2 anon</span></div>
        <div className="item new"><I name="pulse" size={14} /> Engagement & kudos </div>

        <div className="group">PEOPLE — P1 / P2</div>
        <div className="item"><I name="profile" size={14} c="var(--muted)" /> Staff Records</div>
        <div className="item"><I name="leave" size={14} c="var(--muted)" /> Leave & ESS</div>
        <div className="item"><I name="vault" size={14} c="var(--muted)" /> Documents & Vault</div>

        <div className="group">WORKFORCE · TRUST · CMS</div>
        <div className="item"><I name="clock" size={14} c="var(--muted)" /> Time & Attendance</div>
        <div className="item"><I name="pay" size={14} c="var(--muted)" /> Payroll</div>
      </div>
    </div>
  );
}

/* ---------- App composition ---------- */
