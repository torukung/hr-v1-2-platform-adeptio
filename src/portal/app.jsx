/* Mobile Staff Portal — app (split from portal.jsx) */

function App() {
  const W = 320, H = 700; // shorter phones to fit 5-up
  const FRAMES = [
    { id: "home",   label: "Home",          meta: "Priority feed · alerts · quick actions",  el: <Home /> },
    { id: "leave",  label: "Apply Leave",   meta: "Cluster C · routes to manager → HR",       el: <LeaveApply /> },
    { id: "pay",    label: "Pay & Tax",     meta: "Cluster B · payslip · 50 Tawi · KT.20",   el: <Pay /> },
    { id: "help",   label: "HR Helpdesk",   meta: "Cluster E · AI · LINE / Telegram",        el: <Helpdesk /> },
    { id: "all",    label: "All Services",  meta: "Six clusters A–F",                         el: <Services /> },
  ];
  return (
    <div className="canvas">
      <div className="canvas-head">
        <div>
          <div className="eyebrow">v1.0 · Staff Portal · ESS</div>
          <h1 className="h1">Staff self-service — without ever calling HR.</h1>
          <div className="lede">Mobile-first, conversational by default, bilingual English + Lao on every screen. Every action wires straight into the v1.0 HR Console — leave to the Approvals queue, payslips to Payroll, helpdesk tickets to a new <i>Staff Portal Inbox</i> group in the sidebar.</div>
        </div>
        <a className="home-link" href="v1.0 HR System.html">Open HR Console <I name="arrow" size={12} /></a>
      </div>

      <div className="strip">
        {FRAMES.map(f => (
          <div key={f.id} className="frame-card">
            <div className="phone-wrap">
              <IOSDevice width={W} height={H}>
                {f.el}
              </IOSDevice>
            </div>
            <div className="frame-label">{f.label}</div>
            <div className="frame-meta">{f.meta}</div>
          </div>
        ))}
      </div>

      <NavAdditions />
      <Wiring />

      <div className="baseline">
        <div className="lab">Baseline · every screen</div>
        <div className="item"><I name="wifi" size={14} c="#fff" /> Mobile-first · offline sync</div>
        <div className="sep"></div>
        <div className="item"><I name="geo" size={14} c="#fff" /> Multilingual · Lao · Thai · EN</div>
        <div className="sep"></div>
        <div className="item">WCAG 2.1 AA</div>
        <div className="sep"></div>
        <div className="item"><I name="fp" size={14} c="#fff" /> SSO + biometric login</div>
        <div className="sep"></div>
        <div className="item"><I name="check" size={14} c="#fff" /> Audit trail on every action</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
