/* Communications CMS — bilingual EN + LO editor + policies */

function CMS({ lang }) {
  const [tab, setTab] = React.useState("posts");
  const [selected, setSelected] = React.useState(POSTS[0].id);
  const post = POSTS.find(p => p.id === selected) || POSTS[0];

  return (
    <div className="page">
      <div className="filterbar">
        <div className="seg">
          {[
            { id: "posts", label: "Announcements" },
            { id: "policies", label: "Policies & docs" },
            { id: "templates", label: "Templates" },
            { id: "audiences", label: "Audiences" },
          ].map(t => (
            <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="spacer"></div>
        <Pill tone="outline"><Icon name="globe" size={11} /> Bilingual EN · LO required for staff comms</Pill>
        <button className="btn primary"><Icon name="plus" /> New announcement</button>
      </div>

      {tab === "posts" && (
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 18 }}>
          {/* List */}
          <div className="card" style={{ padding: 0, alignSelf: "start" }}>
            <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--hairline)" }}>
              <div className="card-title">Posts · {POSTS.length}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {POSTS.map(p => (
                <button key={p.id} onClick={() => setSelected(p.id)}
                  style={{
                    textAlign: "left", border: 0, background: selected === p.id ? "var(--bg-deep)" : "transparent",
                    padding: "12px 14px", borderBottom: "1px solid var(--hairline)", cursor: "pointer",
                  }}>
                  <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
                    <Pill tone={p.status === "published" ? "positive" : p.status === "scheduled" ? "primary" : "outline"}>{p.status}</Pill>
                    <span style={{ color: "var(--muted)", fontSize: 11 }}>· {p.audience}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{p.title_en}</div>
                  <div className="lao" style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.3, marginTop: 2 }}>{p.title_lao}</div>
                  <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 6 }}>{p.schedule} · {p.author}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="card">
            <div className="card-h" style={{ marginBottom: 16 }}>
              <div className="row" style={{ gap: 8 }}>
                <Pill tone={post.status === "published" ? "positive" : post.status === "scheduled" ? "primary" : "outline"}>{post.status}</Pill>
                <span style={{ color: "var(--muted)", fontSize: 12 }}>{post.id} · {post.author}</span>
              </div>
              <div className="row">
                <button className="btn ghost sm">Preview</button>
                <button className="btn sm">Save draft</button>
                <button className="btn primary sm">{post.status === "published" ? "Update" : "Schedule"}</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              <BiPane lang="en" flag="EN" title="English" body={post.title_en} value={post.body_en} />
              <BiPane lang="lo" flag="ລາວ" title="Lao · ພາສາລາວ" body={post.title_lao} value={post.body_lao} />
            </div>

            <div className="divider"></div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
              <Field label="Audience" value={post.audience} />
              <Field label="Channels" value={post.channels.join(" · ")} />
              <Field label="Schedule" value={post.schedule} />
              <Field label="AI translation" value="On · reviewer required" />
            </div>

            <div className="divider"></div>

            <div className="row" style={{ gap: 8, color: "var(--muted)", fontSize: 12, flexWrap: "wrap" }}>
              <span>Delivers via:</span>
              {[
                ["ESS portal", "home"],
                ["Push (mobile)", "bell"],
                ["LINE", "chat"],
                ["WhatsApp", "chat"],
                ["Email", "file"],
                ["Display kiosks · plant", "users"],
              ].map(([l, ic]) => (
                <span key={l} className="pill outline" style={{ padding: "3px 8px" }}>
                  <Icon name={ic} size={11} /> {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "policies" && (
        <div className="card" style={{ padding: 0 }}>
          <table className="table">
            <thead>
              <tr><th>Policy</th><th>ID</th><th>Languages</th><th>Owner</th><th>Version</th><th>Updated</th><th></th></tr>
            </thead>
            <tbody>
              {POLICIES.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{p.title}</div>
                    <div className="lao" style={{ color: "var(--muted)", fontSize: 12 }}>{p.lao}</div>
                  </td>
                  <td className="id">{p.id}</td>
                  <td><Pill tone="primary">{p.lang}</Pill></td>
                  <td style={{ color: "var(--muted)" }}>{p.owner}</td>
                  <td className="mono">{p.v}</td>
                  <td className="mono" style={{ color: "var(--muted)" }}>{p.updated}</td>
                  <td><button className="btn sm ghost">Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "templates" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { t: "Onboarding welcome (Day 1)", lo: "ການຕ້ອນຮັບພະນັກງານໃໝ່ — ມື້ທຳອິດ", c: ["ESS", "Email"] },
            { t: "Probation completion", lo: "ສຳເລັດໄລຍະທົດລອງ", c: ["ESS"] },
            { t: "Payroll cycle reminder", lo: "ແຈ້ງເຕືອນວົງຈອນເງິນເດືອນ", c: ["ESS", "LINE"] },
            { t: "Visa / WP expiry warning", lo: "ແຈ້ງເຕືອນວີຊາໝົດອາຍຸ", c: ["Email", "WhatsApp"] },
            { t: "Public holiday closure", lo: "ປິດເຮັດການວັນຫຍຸດລັດຖະການ", c: ["ESS", "Display"] },
            { t: "Pulse / engagement survey", lo: "ການສຳຫຼວດຄວາມຜູກພັນ", c: ["ESS", "Email"] },
          ].map(tpl => (
            <div key={tpl.t} className="card" style={{ padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 11.5 }}>
                <Icon name="file" size={13} /> Template
              </div>
              <div style={{ fontWeight: 500, marginTop: 6 }}>{tpl.t}</div>
              <div className="lao" style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 2 }}>{tpl.lo}</div>
              <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
                {tpl.c.map(c => <Pill key={c} tone="outline">{c}</Pill>)}
              </div>
              <button className="btn sm" style={{ marginTop: 12 }}>Use template</button>
            </div>
          ))}
        </div>
      )}

      {tab === "audiences" && (
        <div className="card" style={{ padding: 0 }}>
          <table className="table">
            <thead><tr><th>Audience</th><th>Rule</th><th>Members</th><th>Last used</th><th></th></tr></thead>
            <tbody>
              {[
                { n: "All staff", r: "status = active", m: 1248, u: "Today" },
                { n: "Pakse Distribution", r: "division = Pakse", m: 218, u: "28 Apr" },
                { n: "Expats — visa renewal", r: "contract.has_visa = true", m: 32, u: "12 Apr" },
                { n: "Probation", r: "contract = Probation", m: 64, u: "01 May" },
                { n: "People managers", r: "role.is_manager = true", m: 142, u: "Today" },
              ].map((a, i) => (
                <tr key={i}>
                  <td><b>{a.n}</b></td>
                  <td className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>{a.r}</td>
                  <td className="num">{a.m.toLocaleString()}</td>
                  <td className="mono" style={{ color: "var(--muted)" }}>{a.u}</td>
                  <td><button className="btn sm ghost">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function BiPane({ lang, flag, title, body, value }) {
  return (
    <div style={{ border: "1px solid var(--hairline)", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--paper)", borderBottom: "1px solid var(--hairline)" }}>
        <span style={{ fontFamily: lang === "lo" ? "var(--font-lao)" : "var(--font-ui)", fontWeight: 600, fontSize: 11, letterSpacing: "0.06em" }}>{flag}</span>
        <span style={{ color: "var(--muted)", fontSize: 12 }}>{title}</span>
        <span className="spacer"></span>
        <button className="btn sm ghost"><Icon name="sparkle" size={12} /> Translate</button>
      </div>
      <div style={{ padding: 14 }}>
        <div className={lang === "lo" ? "lao" : ""}
          contentEditable suppressContentEditableWarning
          style={{
            fontFamily: lang === "lo" ? "var(--font-lao)" : "var(--font-display)",
            fontStyle: lang === "lo" ? "normal" : "italic",
            fontSize: lang === "lo" ? 19 : 22,
            lineHeight: 1.25, letterSpacing: lang === "lo" ? 0 : "-0.005em",
            outline: "none", marginBottom: 10,
          }}>
          {body}
        </div>
        <div className={lang === "lo" ? "lao" : ""}
          contentEditable suppressContentEditableWarning
          style={{
            fontFamily: lang === "lo" ? "var(--font-lao)" : "var(--font-ui)",
            fontSize: 13.5, lineHeight: 1.65,
            color: "var(--ink-2)", minHeight: 110, outline: "none",
          }}>
          {value}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="card-title" style={{ marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { CMS });
