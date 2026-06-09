/* Web Staff Portal — home (split from staff-web.jsx) */

/* ---------- HOME ---------- */
function HomePage({ lang, setRoute }) {
  const today = new Date();
  const greet = today.getHours() < 12 ? "Good morning" : today.getHours() < 17 ? "Good afternoon" : "Good evening";
  const greetLo = today.getHours() < 12 ? "ສະບາຍດີຕອນເຊົ້າ" : today.getHours() < 17 ? "ສະບາຍດີຕອນບ່າຍ" : "ສະບາຍດີຕອນແລງ";
  const [clockedIn, setClockedIn] = React.useState(true);

  return (
    <div className="page">
      {/* Hero band */}
      <div className="hero">
        <div className="hero-l">
          <div className="hero-eyebrow">{today.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
          <h1 className="hero-greet">
            <span className="serif italic">{lang === "en" ? greet : greetLo},</span>{" "}
            <span className="serif italic accent">{lang === "en" ? ME.nameEn.split(" ")[0] : ME.nameLo.split(" ")[0]}</span>
          </h1>
          <div className="hero-sub">
            {lang === "en"
              ? `You have 2 items needing attention · ${REQUESTS.filter(r => r.status === "review" || r.status === "draft").length} pending requests`
              : `ມີ 2 ລາຍການທີ່ຕ້ອງການຄວາມສົນໃຈ · ${REQUESTS.filter(r => r.status === "review" || r.status === "draft").length} ການຮ້ອງຂໍຄ້າງຢູ່`}
          </div>
        </div>

        <div className="hero-r">
          <div className="clock-card">
            <div className="cc-l">
              <div className="cc-eyebrow">{lang === "en" ? "Today's shift" : "ວຽງເຮັດວຽກມື້ນີ້"}</div>
              <div className="cc-time mono">07:48 → 16:30</div>
              <div className="cc-meta">{lang === "en" ? "Bottling Line A · Shift 1" : "ສາຍບັນຈຸ A · ກະທີ 1"}</div>
            </div>
            <button className={"cc-btn " + (clockedIn ? "on" : "")} onClick={() => setClockedIn(!clockedIn)}>
              <span className="cc-dot" />
              <span>{clockedIn ? (lang === "en" ? "Clocked in 07:46" : "ເຂົ້າວຽກ 07:46") : (lang === "en" ? "Clock in" : "ເຂົ້າວຽກ")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action banner row */}
      <div className="alerts">
        <div className="alert">
          <div className="al-mark warning"><I n="flag" s={14} /></div>
          <div className="al-body">
            <div className="al-t">{lang === "en" ? "Sign salary certificate draft" : "ເຊັນເອກະສານໃບຮັບຮອງເງິນເດືອນ"}</div>
            <div className="al-s">{lang === "en" ? "Letter LT-2025-0701 awaits your e-signature for embassy." : "ໜັງສື LT-2025-0701 ຕ້ອງການລາຍເຊັນເອເລັກໂທຣນິກຂອງທ່ານ."}</div>
          </div>
          <button className="al-btn">{lang === "en" ? "Open" : "ເປີດ"} <I n="arrow" s={13} /></button>
        </div>
        <div className="alert">
          <div className="al-mark positive"><I n="check" s={14} /></div>
          <div className="al-body">
            <div className="al-t">{lang === "en" ? "Annual leave Aug 14–16 approved" : "ລາພັກ 14–16 ສິງຫາ ໄດ້ຮັບອະນຸມັດແລ້ວ"}</div>
            <div className="al-s">{lang === "en" ? "Cover assigned: Bounmy Vongphachanh." : "ຜູ້ຮັບແທນ: ບຸນມີ ວົງພະຈັນ."}</div>
          </div>
          <button className="al-btn ghost">{lang === "en" ? "Details" : "ລາຍລະອຽດ"}</button>
        </div>
      </div>

      {/* Big grid */}
      <div className="home-grid">
        {/* Row 1 — KPI tiles */}
        <div className="ktile col-3">
          <div className="kt-l">{lang === "en" ? "Net pay · July" : "ເງິນສຸດທິ · ກໍລະກົດ"}</div>
          <div className="kt-v serif italic">₭ 8,124,500</div>
          <div className="kt-s">+₭ 228,100 vs Jun · <a onClick={() => setRoute("pay")}>View payslip →</a></div>
        </div>
        <div className="ktile col-3">
          <div className="kt-l">{lang === "en" ? "Annual leave balance" : "ຍອດລາພັກປະຈຳປີ"}</div>
          <div className="kt-v serif italic">12.5 <span className="kt-u">/ 18 days</span></div>
          <div className="kt-bar"><div className="kt-bar-fill" style={{ width: "69%" }} /></div>
        </div>
        <div className="ktile col-3">
          <div className="kt-l">{lang === "en" ? "Tenure" : "ໄລຍະເວລາເຮັດວຽກ"}</div>
          <div className="kt-v serif italic">8y 5m</div>
          <div className="kt-s">{lang === "en" ? "Joined Mar 2017 · Senior tier" : "ເຂົ້າມີນາ 2017 · ລະດັບອາວຸໂສ"}</div>
        </div>
        <div className="ktile col-3">
          <div className="kt-l">{lang === "en" ? "Performance · H1" : "ການປະເມີນ · ໄລຍະ 1"}</div>
          <div className="kt-v serif italic">4.2<span className="kt-u">/5</span></div>
          <div className="kt-s">{lang === "en" ? "H2 self-review opens Sept 1" : "ປະເມີນຕົວເອງ ໄລຍະ 2 ເປີດ 1 ກັນຍາ"}</div>
        </div>

        {/* Row 2 — Quick actions */}
        <div className="card col-8">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Quick actions" : "ການກະທຳດ່ວນ"}</div>
            <div className="card-s">{lang === "en" ? "Most common self-service tasks" : "ການບໍລິການຕົວເອງທີ່ໃຊ້ບໍ່ຍຸດ"}</div>
          </div>
          <div className="qa-grid">
            {[
              { ic: "leave", t: "Apply leave",       lo: "ຍື່ນລາ",        c: "C", to: "leave" },
              { ic: "clock", t: "Log overtime",      lo: "ບັນທຶກ OT",      c: "C", to: "leave" },
              { ic: "claim", t: "Submit expense",    lo: "ຂໍເບີກຄ່າໃຊ້ຈ່າຍ", c: "D", to: "claims" },
              { ic: "pay",   t: "Salary advance",    lo: "ຂໍເງິນລ່ວງໜ້າ",   c: "B", to: "pay" },
              { ic: "file",  t: "Request letter",    lo: "ຂໍໜັງສືຮັບຮອງ",   c: "F", to: "docs" },
              { ic: "user",  t: "Update profile",    lo: "ປັບຂໍ້ມູນ",      c: "A", to: "profile" },
              { ic: "chat",  t: "Open ticket",       lo: "ຂໍຊ່ວຍເຫຼືອ",     c: "E", to: "helpdesk" },
              { ic: "book2", t: "Browse training",   lo: "ຄອສຮຽນ",        c: "B", to: "learn" },
            ].map((q, i) => (
              <button key={i} className="qa" onClick={() => setRoute(q.to)}>
                <div className={"qa-ic c-" + q.c}><I n={q.ic} s={18} /></div>
                <div className="qa-t">{lang === "en" ? q.t : q.lo}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2b — Today */}
        <div className="card col-4">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "On your team today" : "ທີມງານມື້ນີ້"}</div>
            <div className="card-s">{lang === "en" ? "Bottling Line A · 14 people" : "ສາຍ A · 14 ຄົນ"}</div>
          </div>
          <div className="team-strip">
            {[
              { i: "BV", n: "Bounmy V.",   s: "Working" },
              { i: "PT", n: "Phetdara T.", s: "Working" },
              { i: "KC", n: "Khamla C.",   s: "Working" },
              { i: "SH", n: "Sengthong H.", s: "On leave" },
              { i: "VL", n: "Vilakhone L.", s: "On leave" },
              { i: "AS", n: "Aphone S.", s: "Working" },
              { i: "+8", n: "8 more", s: "" },
            ].map((p, i) => (
              <div key={i} className={"tp " + (p.s === "On leave" ? "off" : "")}>
                <div className="tp-av">{p.i}</div>
                <div className="tp-n">{p.n}</div>
                {p.s && <div className="tp-s">{p.s}</div>}
              </div>
            ))}
          </div>
          <div className="card-foot">
            <div className="row-tag">
              <span className="dot pos" />
              <span>{lang === "en" ? "12 working" : "ກຳລັງເຮັດວຽກ 12"}</span>
            </div>
            <div className="row-tag">
              <span className="dot warn" />
              <span>{lang === "en" ? "2 on leave" : "ລາ 2"}</span>
            </div>
          </div>
        </div>

        {/* Row 3 — My requests */}
        <div className="card col-8">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "My requests" : "ການຮ້ອງຂໍຂອງຂ້ອຍ"}</div>
            <a className="card-act">{lang === "en" ? "View all" : "ເບິ່ງທັງໝົດ"}</a>
          </div>
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 130 }}>ID</th>
                <th>{lang === "en" ? "Request" : "ປະເພດ"}</th>
                <th>{lang === "en" ? "When" : "ເມື່ອໃດ"}</th>
                <th>{lang === "en" ? "Step" : "ຂັ້ນຕອນ"}</th>
                <th>{lang === "en" ? "Status" : "ສະຖານະ"}</th>
              </tr>
            </thead>
            <tbody>
              {REQUESTS.map(r => (
                <tr key={r.id}>
                  <td><span className="mono small">{r.id}</span></td>
                  <td>
                    <div className="cell-stack">
                      <span>{r.kind}</span>
                      <span className="lao muted">{r.lo}</span>
                    </div>
                  </td>
                  <td>{r.date}</td>
                  <td className="muted">{r.step}</td>
                  <td><StatusPill s={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Row 3b — Statutory */}
        <div className="card col-4 statu">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Your statutory" : "ສະຖານະຕາມກົດໝາຍ"}</div>
            <div className="card-s">{lang === "en" ? "PIT, NSSF, Provident Fund" : "ພາສີລາຍໄດ້, ປະກັນສັງຄົມ, ກອງທຶນ"}</div>
          </div>
          <div className="kv">
            <span className="k">{lang === "en" ? "PIT YTD withheld" : "ພາສີຫັກຮອດ"}</span>
            <span className="v mono">₭ 5,773,800</span>
          </div>
          <div className="kv">
            <span className="k">{lang === "en" ? "NSSF YTD" : "NSSF ຮອດ"}</span>
            <span className="v mono">₭ 3,157,000</span>
          </div>
          <div className="kv">
            <span className="k">{lang === "en" ? "Provident Fund balance" : "ກອງທຶນສຳຮອງ"}</span>
            <span className="v mono">₭ 18,420,300</span>
          </div>
          <div className="kv">
            <span className="k">{lang === "en" ? "TIN" : "ເລກຜູ້ເສຍພາສີ"}</span>
            <span className="v mono">{ME.pit.replace("TIN ", "")}</span>
          </div>
          <div className="kv">
            <span className="k">{lang === "en" ? "NSSF #" : "NSSF #"}</span>
            <span className="v mono">{ME.nssf}</span>
          </div>
          <div className="card-foot end">
            <a className="lk">50 Tawi {lang === "en" ? "summary" : "ສະຫຼຸບ"} <I n="arrow" s={13} /></a>
          </div>
        </div>

        {/* Row 4 — Announcements */}
        <div className="card col-8">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Announcements" : "ປະກາດ"}</div>
            <a className="card-act">{lang === "en" ? "Open communications" : "ເບິ່ງການແຈ້ງເຕືອນ"}</a>
          </div>
          <ul className="ann">
            {ANNOUNCEMENTS.map((a, i) => (
              <li key={i} className="ann-i">
                <Pill tone={a.tag === "Policy" ? "primary" : a.tag === "Holiday" ? "accent" : a.tag === "Recognition" ? "positive" : "default"}>{a.tag}</Pill>
                <div className="ann-body">
                  <div className="ann-t">{a.en}</div>
                  <div className="ann-lo lao">{a.lo}</div>
                </div>
                <div className="ann-meta">
                  <div>{a.divisionTag}</div>
                  <div className="muted">{a.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Row 4b — Learning teaser */}
        <div className="card col-4">
          <div className="card-h">
            <div className="card-t">{lang === "en" ? "Learning due" : "ຄອສທີ່ໃກ້ກຳນົດ"}</div>
            <a className="card-act" onClick={() => setRoute("learn")}>{lang === "en" ? "All courses" : "ທຸກຄອສ"}</a>
          </div>
          <ul className="lrn">
            {COURSES.slice(0, 3).map(c => (
              <li key={c.id} className="lrn-i">
                <div className="lrn-t">
                  <div>{c.t}</div>
                  <div className="lao muted">{c.lo}</div>
                </div>
                <div className="lrn-bar"><div className="lrn-fill" style={{ width: c.progress + "%" }} /></div>
                <div className="lrn-meta">
                  <span className="muted">{c.due}</span>
                  <span className="mono">{c.progress}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
