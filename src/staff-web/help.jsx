/* Web Staff Portal — help (split from staff-web.jsx) */

/* ---------- HELPDESK ---------- */
function HelpPage({ lang }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow={lang === "en" ? "Helpdesk · Cluster E" : "ຊ່ວຍເຫຼືອ · ກຸ່ມ E"}
        title={lang === "en" ? "HR Helpdesk" : "ຊ່ວຍເຫຼືອ HR"}
        sub={lang === "en" ? "Bilingual AI assistant + ticket queue routing to LINE OA / Telegram." : "ຜູ້ຊ່ວຍ AI ສອງພາສາ + ສົ່ງເຂົ້າຄິວເຈົ້າໜ້າທີ່."}
      />
      <div className="grid-2">
        <div className="card help-card">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Ask HR" : "ຖາມ HR"}</div>
            <div className="seg sm">
              <button className="seg-b on">EN</button>
              <button className="seg-b lao">ລາວ</button>
            </div>
          </div>
          <div className="chat">
            <div className="bub bot">
              {lang === "en" ? "Hi Souksavanh — what can I help with today?" : "ສະບາຍດີ ສຸກສະຫວັນ — ວັນນີ້ຊ່ວຍຫຍັງໄດ້ບໍ່?"}
            </div>
            <div className="bub you">{lang === "en" ? "I need a salary certificate for my child's school." : "ຕ້ອງການໜັງສືຮັບຮອງເງິນເດືອນສຳລັບລູກໄປໂຮງຮຽນ."}</div>
            <div className="bub bot">
              {lang === "en"
                ? "I can draft that. School name? I'll auto-fill your latest payslip."
                : "ສາມາດຮ່າງໃຫ້ໄດ້. ຂໍຊື່ໂຮງຮຽນ. ຈະດຶງໃບເງິນເດືອນລ່າສຸດໃຫ້ອັດຕະໂນມັດ."}
              <div className="suggest">
                <button>Sengsavanh Bilingual School</button>
                <button>Vientiane International</button>
                <button>{lang === "en" ? "Type custom" : "ພິມເອງ"}</button>
              </div>
            </div>
            <div className="bub you">Sengsavanh Bilingual School</div>
            <div className="bub bot">
              <div className="draft-box">
                <div className="draft-h">
                  <span className="pill primary small">Draft · Letter LT-2025-0701</span>
                  <span className="muted small">Auto-routed to HR Records</span>
                </div>
                <div className="draft-l">
                  <p>To: Principal, Sengsavanh Bilingual School</p>
                  <p>This is to certify that <strong>Souksavanh Phommachanh</strong> (EMP-00427) has been employed since 14 March 2017 as <strong>Senior Production Supervisor</strong> at Lao Beverage Co., Ltd., Savannakhet Plant, with a current monthly gross of ₭ 9,650,000…</p>
                </div>
                <div className="draft-actions">
                  <button className="btn primary sm">{lang === "en" ? "Send for HR e-sign" : "ສົ່ງໃຫ້ HR ເຊັນ"}</button>
                  <button className="btn ghost sm">{lang === "en" ? "Edit" : "ແກ້ໄຂ"}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="composer">
            <input placeholder={lang === "en" ? "Type a question…" : "ພິມຄຳຖາມ…"} />
            <button className="btn primary sm">{lang === "en" ? "Send" : "ສົ່ງ"}</button>
          </div>
        </div>

        <div className="grid-stack">
          <div className="card">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "My tickets" : "ຄຳຮ້ອງຂອງຂ້ອຍ"}</div>
              <a className="card-act">{lang === "en" ? "All" : "ທັງໝົດ"}</a>
            </div>
            <ul className="tk-l">
              {TICKETS.map(t => (
                <li key={t.id}>
                  <div className="tk-h">
                    <span className="mono small">{t.id}</span>
                    <StatusPill s={t.status} />
                  </div>
                  <div className="tk-t">{t.subj}</div>
                  <div className="tk-lo lao muted small">{t.subjLo}</div>
                  <div className="tk-meta">
                    <span className="muted small">{t.cat} · {t.agent}</span>
                    <span className="muted small">{t.t} {t.status === "open" && `· SLA ${t.sla}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="card-h"><div className="card-t">{lang === "en" ? "Channels" : "ຊ່ອງທາງ"}</div></div>
            <ul className="ch-l">
              <li><span className="ch-n">Web Portal</span><Pill tone="positive">Active</Pill></li>
              <li><span className="ch-n">Mobile (iOS / Android)</span><Pill tone="positive">Active</Pill></li>
              <li><span className="ch-n">LINE Official Account</span><Pill tone="positive">@laobev-hr</Pill></li>
              <li><span className="ch-n">Telegram bot</span><Pill tone="positive">@laobev_hr_bot</Pill></li>
              <li><span className="ch-n">Email</span><Pill>hr@laobev.la</Pill></li>
              <li><span className="ch-n">Plant kiosk</span><Pill>SVK · LPB · Pakse</Pill></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
