/* Web Staff Portal — leave (split from staff-web.jsx) */

/* ---------- TIME & LEAVE ---------- */
function LeavePage({ lang }) {
  const [month, setMonth] = React.useState(8); // August
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <div className="page">
      <PageHeader
        eyebrow={lang === "en" ? "Time · Cluster C" : "ເວລາ · ກຸ່ມ C"}
        title={lang === "en" ? "Time & Leave" : "ເວລາ & ການລາ"}
        sub={lang === "en" ? "Apply leave, log overtime, swap shifts. Calendar shows Lao public holidays." : "ຍື່ນລາ, ບັນທຶກລ່ວງເວລາ, ສັບປ່ຽນກະ."}
        right={<>
          <button className="btn ghost">{lang === "en" ? "Log overtime" : "ບັນທຶກ OT"}</button>
          <button className="btn primary"><I n="plus" s={13} /> {lang === "en" ? "Apply leave" : "ຍື່ນລາ"}</button>
        </>}
      />

      {/* My time-policy record · synced from HR · same source as Manager view */}
      <MyPolicyRecord lang={lang} />


      {/* Balances row */}
      <div className="bal-row">
        {[
          { t: "Annual",    lo: "ປີ", used: 5.5, total: 18, c: "#1A2A57" },
          { t: "Sick",      lo: "ປ່ວຍ", used: 1, total: 30, c: "#A8392E" },
          { t: "Personal",  lo: "ສ່ວນຕົວ", used: 0, total: 3, c: "#6B3A86" },
          { t: "Compensatory", lo: "ຊົດເຊີຍ", used: 0, total: 4, c: "#2E6F47" },
          { t: "Bereavement", lo: "ສະນຸເຊີຍ", used: 0, total: 5, c: "#8B6E2C" },
        ].map((b, i) => (
          <div key={i} className="bal">
            <div className="bal-h">
              <div className="bal-t">{lang === "en" ? b.t : b.lo}</div>
              <div className="bal-tot mono">{(b.total - b.used).toFixed(1)}<span>/{b.total}d</span></div>
            </div>
            <div className="bal-bar"><div style={{ width: `${(b.used / b.total) * 100}%`, background: b.c }} /></div>
            <div className="bal-s">{b.used}d {lang === "en" ? "used" : "ໃຊ້ແລ້ວ"}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Calendar */}
        <div className="card">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Calendar" : "ປະຕິທິນ"}</div>
            <div className="cal-nav">
              <button className="ic-btn" onClick={() => setMonth(Math.max(1, month - 1))}><I n="chev" s={14} c="currentColor" /></button>
              <span className="cal-m">{monthNames[month - 1]} 2025</span>
              <button className="ic-btn" onClick={() => setMonth(Math.min(12, month + 1))}><I n="chev" s={14} c="currentColor" /></button>
            </div>
          </div>
          {(() => {
            const firstDow = (new Date(2025, month - 1, 1).getDay() + 6) % 7; // Mon-first
            const days = new Date(2025, month, 0).getDate();
            const cells = [];
            for (let i = 0; i < firstDow; i++) cells.push(null);
            for (let d = 1; d <= days; d++) cells.push(d);
            const hol = HOLIDAYS_LAO[month] || [];
            const myLeave = month === 8 ? [14, 15, 16] : [];
            return (
              <div className="cal">
                <div className="cal-row dow">
                  {(lang === "en" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["ຈ", "ອ", "ພ", "ພຫ", "ສ", "ສ", "ອາ"]).map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="cal-grid">
                  {cells.map((c, i) => {
                    if (!c) return <div key={i} className="cal-c em" />;
                    const isHol = hol.find(h => h.d === c);
                    const isLv = myLeave.includes(c);
                    const isWk = ((firstDow + c - 1) % 7) >= 5;
                    return (
                      <div key={i} className={"cal-c" + (isHol ? " hol" : "") + (isLv ? " lv" : "") + (isWk ? " wk" : "")}>
                        <span className="cal-d">{c}</span>
                        {isHol && <span className="cal-tag accent lao">{isHol.lo.split(" ")[0]}</span>}
                        {isLv && <span className="cal-tag primary">{lang === "en" ? "AL" : "ລາ"}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
          <div className="cal-leg">
            <span><i className="sw" style={{ background: "#1A2A57" }} />{lang === "en" ? "My leave" : "ການລາ"}</span>
            <span><i className="sw" style={{ background: "#F4E7CE", border: "1px solid #C4843A" }} />{lang === "en" ? "Lao holiday" : "ມື້ພັກລາວ"}</span>
            <span><i className="sw" style={{ background: "#ECE4D2" }} />{lang === "en" ? "Weekend" : "ວັນພັກ"}</span>
          </div>
        </div>

        {/* Apply form preview */}
        <div className="card">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Apply leave" : "ຍື່ນລາ"}</div>
            <div className="card-s">{lang === "en" ? "Live preview · approval workflow" : "ສະແດງຕົວຢ່າງ · ຂັ້ນຕອນອະນຸມັດ"}</div>
          </div>
          <div className="form">
            <div className="fld">
              <label>{lang === "en" ? "Leave type" : "ປະເພດ"}</label>
              <div className="seg">
                {["Annual", "Sick", "Personal", "Comp"].map((s, i) => <button key={s} className={"seg-b" + (i === 0 ? " on" : "")}>{s}</button>)}
              </div>
            </div>
            <div className="fld-row">
              <div className="fld">
                <label>{lang === "en" ? "From" : "ຈາກ"}</label>
                <input className="inp" defaultValue="2025-08-14" />
              </div>
              <div className="fld">
                <label>{lang === "en" ? "To" : "ຫາ"}</label>
                <input className="inp" defaultValue="2025-08-16" />
              </div>
              <div className="fld" style={{ flex: 0, minWidth: 90 }}>
                <label>{lang === "en" ? "Days" : "ມື້"}</label>
                <div className="inp ro mono">3</div>
              </div>
            </div>
            <div className="fld">
              <label>{lang === "en" ? "Cover (suggested)" : "ຜູ້ຮັບແທນ"}</label>
              <div className="inp inp-pers">
                <span className="av sm">BV</span>
                <span>Bounmy Vongphachanh</span>
                <span className="muted small">· same shift · 92% match</span>
              </div>
            </div>
            <div className="fld">
              <label>{lang === "en" ? "Reason" : "ເຫດຜົນ"}</label>
              <textarea className="inp ta" rows={2} defaultValue="Family obligations." />
            </div>

            <div className="flow">
              <div className="flow-h">{lang === "en" ? "Approval flow" : "ຂັ້ນຕອນ"}</div>
              <div className="flow-row">
                {[
                  { who: "Manager", n: "K. Chanthavong", on: true },
                  { who: "Plant Director", n: "T. Soulivong" },
                  { who: "HR Records", n: "Auto-post" },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    <div className={"flow-step" + (s.on ? " on" : "")}>
                      <div className="fs-c">{i + 1}</div>
                      <div>
                        <div className="fs-w">{s.who}</div>
                        <div className="fs-n muted small">{s.n}</div>
                      </div>
                    </div>
                    {i < 2 && <div className="flow-arr"><I n="chevR" s={14} c="#8B8E99" /></div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button className="btn ghost">{lang === "en" ? "Save draft" : "ບັນທຶກຊົ່ວຄາວ"}</button>
              <button className="btn primary">{lang === "en" ? "Submit" : "ສົ່ງ"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- My Time-Policy Record (staff-side projection of POLICY_LEDGER) ---------- */
function MyPolicyRecord({ lang }) {
  const r = (typeof policyRollupForStaff === "function") ? policyRollupForStaff(ME.id) : null;
  const t = (en, lo) => lang === "en" ? en : lo;
  if (!r) {
    return (
      <div className="card" style={{ padding: "12px 14px", borderLeft: "3px solid #6B6E7B", marginBottom: 14 }}>
        <div className="card-t">{t("Time-policy record", "ບັນທຶກນະໂຍບາຍເວລາ")}</div>
        <div style={{ color: "var(--muted)", fontSize: 12 }}>{t("Policy ledger not available — please reload.", "ບໍ່ສາມາດໂຫຼດບັນທຶກ — ກະລຸນາໂຫຼດຄືນ.")}</div>
      </div>
    );
  }

  const lvl = r.level;
  const tone = lvl.tone === "danger" ? "#A8392E" : lvl.tone === "warning" ? "#C4843A" : "#2E6F47";
  const toneSoft = lvl.tone === "danger" ? "#F2D7CD" : lvl.tone === "warning" ? "#F4E7CE" : "#DDEAD8";
  const breakdown = [
    { id: "late",    label: t("Late",      "ຊ້າ"),         v: r.late },
    { id: "early",   label: t("Early-out", "ອອກໄວ"),       v: r.early },
    { id: "noshow",  label: t("No-show",   "ບໍ່ມາ"),       v: r.noshow },
    { id: "ot_unapprov", label: t("OT-UA", "OT ບໍ່ອະນຸມັດ"), v: r.otUn },
    { id: "lowconf", label: t("Low-conf",  "ກວດສອບໜ້າ"),   v: r.lowconf },
    { id: "other",   label: t("Other",     "ອື່ນໆ"),       v: r.other },
  ].filter(x => x.v > 0);

  return (
    <div className="card" style={{ padding: 0, marginBottom: 14, overflow: "hidden", borderLeft: `3px solid ${tone}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1fr) 1.6fr auto", gap: 0 }}>

        {/* Hero — status & total · compact */}
        <div style={{ padding: "12px 16px", background: `linear-gradient(180deg, ${toneSoft}55 0%, transparent 100%)`, borderRight: "1px solid var(--hairline)" }}>
          <div style={{ fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>
            {t("My time-policy record", "ບັນທຶກນະໂຍບາຍເວລາ")} · {t("30 days", "30 ມື້")}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 30, lineHeight: 1, color: tone }}>{r.total}</div>
            <div style={{ color: "var(--muted)", fontSize: 12 }}>{t("incidents", "ຄັ້ງ")}</div>
            <span className="spacer"></span>
            <span className="pill" style={{ background: toneSoft, color: tone, border: `1px solid ${tone}40`, fontWeight: 700, letterSpacing: ".05em", padding: "2px 9px", fontSize: 10.5 }}>
              {lvl.label.toUpperCase()}
            </span>
          </div>
          <div style={{ color: "var(--ink-2)", fontSize: 12, marginTop: 6, lineHeight: 1.4 }}>{lvl.note}</div>
          <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 6, lineHeight: 1.4, fontWeight: 500 }}>
            ↔ {t("Same record your manager (", "ບັນທຶກດຽວກັນກັບທີ່ຫົວໜ້າ (")}<span style={{ color: "var(--ink-2)", fontWeight: 600 }}>{ME.manager}</span>{t(") and HR see.", ") ແລະ HR ເບິ່ງ.")}
          </div>
        </div>

        {/* Breakdown + recent incidents · compact */}
        <div style={{ padding: "12px 16px", borderRight: "1px solid var(--hairline)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{t("Breakdown", "ການແຈກແຈງ")}</span>
            {breakdown.length > 0 && (
              <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>
                {breakdown.map(b => (
                  <span key={b.id} className="pill outline" style={{ padding: "2px 8px", fontSize: 11 }}>
                    <b style={{ fontFamily: "var(--font-mono)", marginRight: 4 }}>{b.v}</b> {b.label}
                  </span>
                ))}
              </span>
            )}
          </div>
          {breakdown.length === 0 && (
            <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>{t("Clean record · no incidents this month.", "ບໍ່ມີຂໍ້ບົກຜ່ອງເດືອນນີ້.")}</div>
          )}
          <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 4 }}>{t("Recent incidents", "ເຫດການລ່າສຸດ")}</div>
          {r.entries.length === 0 ? (
            <div style={{ color: "var(--muted)", fontSize: 12 }}>{t("None.", "ບໍ່ມີ.")}</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {r.entries.slice(0, 3).map(e => {
                const def = POLICY_THRESHOLDS[e.kind] || { short: e.kind.toUpperCase(), tone: "outline" };
                return (
                  <div key={e.id} style={{ display: "flex", gap: 10, padding: "5px 0", borderTop: "1px solid var(--hairline)", alignItems: "center" }}>
                    <span className="mono" style={{ color: "var(--muted)", fontSize: 11, flex: "0 0 78px" }}>{policyFmtTs(e.ts)}</span>
                    <span className={`pill ${def.tone}`} style={{ fontSize: 10, letterSpacing: ".06em", fontWeight: 600, flex: "0 0 auto" }}>{def.short}</span>
                    <span style={{ flex: 1, fontSize: 12, color: "var(--ink-2)" }}>{e.detail}</span>
                    <span className="mono" style={{ color: "var(--ink-2)", fontSize: 11, flex: "0 0 auto", fontWeight: 500, padding: "2px 6px", background: "var(--bg-deep)", borderRadius: 4 }}>{e.id}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Threshold reference + actions · narrower column */}
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", minWidth: 200 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 6 }}>{t("Warning thresholds", "ເກນຕ່າງໆ")}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 8 }}>
            {POLICY_WARNING_LEVELS.map(L => {
              const isMe = L.id === lvl.id;
              return (
                <div key={L.id} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "3px 8px",
                  background: isMe ? "var(--paper)" : "transparent",
                  border: isMe ? `1px solid ${tone}40` : "1px solid transparent",
                  borderRadius: 6, fontSize: 11,
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--muted)", flex: "0 0 36px" }}>{L.range[0]}–{L.range[1] >= 999 ? "∞" : L.range[1]}</span>
                  <span style={{ flex: 1, fontWeight: isMe ? 600 : 400 }}>{L.label}</span>
                  {isMe && <span style={{ fontSize: 9.5, color: tone, fontWeight: 700, letterSpacing: ".06em" }}>← YOU</span>}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "auto", display: "flex", gap: 6 }}>
            <button className="btn ghost sm" style={{ flex: 1, justifyContent: "center" }}>{t("Dispute", "ໂຕ້ແຍ້ງ")}</button>
            <button className="btn ghost sm" style={{ flex: 1, justifyContent: "center" }}>{t("History", "ປະຫວັດ")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
