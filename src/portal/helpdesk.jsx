/* Mobile Staff Portal — helpdesk (split from portal.jsx) */

function Helpdesk() {
  return (
    <div className="ess">
      <IOSStatusBar />
      <div style={{ padding: "6px 18px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <I name="chev" size={18} c="var(--muted)" style={{ transform: "scaleX(-1)" }} />
        <div className="av" style={{ background: "color-mix(in oklab, var(--c-E) 18%, white)", color: "var(--c-E)" }}>HR</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.1 }}>HR Assist · ຜູ້ຊ່ວຍ HR</div>
          <div style={{ fontSize: 11, color: "var(--positive)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--positive)" }}></span>
            AI · routes to People Ops if needed
          </div>
        </div>
        <span className="pill outline">EN · LO</span>
      </div>

      <div className="scroll" style={{ paddingBottom: 100 }}>

        <div className="chat">
          <div className="bub bot">
            Hi Vilaysone — how can I help today?
            <span className="lo">ສະບາຍດີ ວິໄລສອນ — ມີຫຍັງໃຫ້ຊ່ວຍບໍ?</span>
          </div>

          <div className="chat-suggest">
            <span className="c">Leave balance</span>
            <span className="c">Payslip Apr</span>
            <span className="c">Visa renewal</span>
            <span className="c">Salary cert</span>
          </div>

          <div className="bub you">
            How much annual leave do I have left?
          </div>

          <div className="bub bot">
            You have <b>11.5 days</b> annual + <b>1.5 days</b> carried from 2025. You also have a pending request for 13–15 May that will deduct 3 days once your manager approves.
            <span className="lo">ທ່ານມີວັນລາພັກ 11.5 ວັນ ແລະ ຍົກຍອດອີກ 1.5 ວັນ.</span>
          </div>

          <div className="chat-suggest">
            <span className="c">Apply more leave</span>
            <span className="c">View calendar</span>
            <span className="c">Talk to a person</span>
          </div>

          <div className="bub you">Can you generate my employment certificate?</div>

          <div className="bub bot" style={{ background: "color-mix(in oklab, var(--c-E) 6%, white)", border: "1px solid color-mix(in oklab, var(--c-E) 16%, white)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "var(--c-E)", fontWeight: 600, marginBottom: 4 }}>
              <I name="cert" size={13} c="var(--c-E)" /> Letter draft ready
            </div>
            Employment certificate · English + Lao · e-signed by HR Director.
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <span className="pill primary">Preview PDF</span>
              <span className="pill positive">Send to email</span>
            </div>
          </div>

          <div className="bub bot" style={{ background: "var(--paper)", border: "1px dashed var(--hairline-strong)" }}>
            <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Ticket auto-created</div>
            <b>HR-2026-0418</b> · SLA 4h · routed to People Ops
            <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>You can also reach HR via LINE OA or Telegram (Thai + Lao).</div>
          </div>
        </div>

        <div className="composer">
          <I name="sparkle" size={16} c="var(--c-E)" />
          <input placeholder="Ask anything in EN or ລາວ…" />
          <I name="cam" size={16} c="var(--muted)" />
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "grid", placeItems: "center" }}>
            <I name="arrow" size={14} c="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Screen 5: All services (the 6 clusters) ---------- */
