/* Shared portal UI primitives — load AFTER policy-ledger.jsx, BEFORE per-portal scripts.
 *
 * Consumers (HR Console, Team Manager Portal, Web Staff Portal, Mobile Personas) all
 * historically reimplemented the same Alert / KPI / Pill / Avatar / formatLAK / tone-color
 * helpers inline. Centralizing them here means a fix or a token rename lands in one place.
 */

/* Currency: format Lao Kip with thousand separators. Replaces the 2 inline LAK formatters
 * (fmtLAK in staff-web/data.jsx and formatLAK in src/data.jsx). Pass `compact` for "M"/"k". */
function formatLAK(n, { compact = false } = {}) {
  if (n == null || isNaN(n)) return "—";
  if (compact) {
    if (n >= 1_000_000) return `₭${(n / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
    if (n >= 1_000)     return `₭${(n / 1_000).toFixed(0)}k`;
  }
  try { return `₭ ${new Intl.NumberFormat(undefined).format(Math.round(n))}`; }
  catch (e) { return `₭ ${Math.round(n)}`; }
}

/* Tone palette — single source for "warning"/"danger"/"positive"/"muted" → fg+soft hexes.
 * Replaces the 4 inline tone ternary chains across Manager / Mobile / staff-web. */
const TONE_FG = Object.freeze({
  danger:   "#A8392E",
  warning:  "#C4843A",
  positive: "#2E6F47",
  primary:  "#1A2A57",
  muted:    "#5C5F6B",
});
const TONE_BG = Object.freeze({
  danger:   "#F2D7CD",
  warning:  "#F4E7CE",
  positive: "#DDEAD8",
  primary:  "#E5E8F2",
  muted:    "#ECE4D2",
});
function policyToneColors(tone) {
  return { fg: TONE_FG[tone] || TONE_FG.muted, soft: TONE_BG[tone] || TONE_BG.muted };
}

/* StatusPill — accepts tone + label. Replaces three near-identical Pill implementations. */
function StatusPill({ tone = "muted", children, small = false, ariaLabel }) {
  return (
    <span className={"pill " + tone + (small ? " small" : "")} aria-label={ariaLabel}>
      {children}
    </span>
  );
}

/* Avatar — circular initials/icon. Replaces .av/.me-av/.c-av div re-implementations. */
function Avatar({ initials, size = 32, mode, children }) {
  const style = {
    width: size, height: size, borderRadius: "50%",
    display: "grid", placeItems: "center",
    background: "var(--bg-deep)", color: "var(--ink)",
    fontWeight: 600, fontSize: Math.max(11, Math.round(size * 0.35)),
    flexShrink: 0,
  };
  return <span className={"avatar" + (mode ? " " + mode : "")} aria-hidden="true" style={style}>{children || initials}</span>;
}

/* Alert — icon mark + title + sub + optional action. Replaces .alert blocks duplicated
 * across Web Staff Portal, Team Manager Portal, Mobile Personas (3+ near-identical copies). */
function Alert({ tone = "info", icon, title, sub, action, children }) {
  return (
    <div className="alert" role={tone === "danger" ? "alert" : "status"}>
      <div className={"al-mk " + (tone === "danger" ? "dang" : tone === "warning" ? "warn" : tone === "positive" ? "pos" : "info")} aria-hidden="true">
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="al-t">{title}</div>
        {sub && <div className="al-s">{sub}</div>}
        {children}
      </div>
      {action}
    </div>
  );
}

/* KPI — label / display value / sub / optional progress bar. Replaces .kt/.mt/.kpi
 * tile reimplementations. */
function KPI({ label, value, unit, sub, progress, mode }) {
  return (
    <div className={"kpi" + (mode ? " " + mode : "")}>
      <div className="kpi-l">{label}</div>
      <div className="kpi-v">{value}{unit && <span className="kpi-u">{unit}</span>}</div>
      {sub && <div className="kpi-s">{sub}</div>}
      {progress != null && (
        <div className="kpi-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div style={{ width: progress + "%" }} />
        </div>
      )}
    </div>
  );
}

/* Locale formatters — wrap Intl so callers don't hardcode "en-GB". */
function formatDate(d, lang = "en", opts = { day: "2-digit", month: "short", year: "numeric" }) {
  if (!d) return "—";
  try {
    const date = d instanceof Date ? d : new Date(d);
    return new Intl.DateTimeFormat(lang === "lo" ? "lo-LA" : undefined, opts).format(date);
  } catch (e) { return String(d); }
}
function formatNumber(n, lang = "en") {
  if (n == null || isNaN(n)) return "—";
  try { return new Intl.NumberFormat(lang === "lo" ? "lo-LA" : undefined).format(n); }
  catch (e) { return String(n); }
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    formatLAK, formatDate, formatNumber,
    TONE_FG, TONE_BG, policyToneColors,
    StatusPill, Avatar, Alert, KPI,
  });
}
