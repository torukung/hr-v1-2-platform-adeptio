/* Single source of truth for time-policy data.
 *
 * Loaded by:
 *   v1.0 HR System.html      — before src/data.jsx
 *   Web Staff Portal.html    — before src/staff-web/icons.jsx
 *   Team Manager Portal.html — before the inline <script type="text/babel">
 *
 * Three views sync against this:
 *   HR aggregate          → policyAggregateByKind(POLICY_LEDGER)
 *   Manager (own team)    → policyForManager(MANAGER_ID)
 *   Staff (self)          → policyForStaff(STAFF_ID)
 *
 * Threshold rules and warning escalation levels are defined ONCE here.
 */

/* ---- Threshold catalog — what triggers each policy flag ---- */
const POLICY_THRESHOLDS = {
  late:         { label: "Late punch",          short: "LATE",   tone: "warning", rule: "≥ 15 min after shift start",  auto: true  },
  early:        { label: "Early-out",            short: "EARLY",  tone: "warning", rule: "≥ 30 min before shift end",   auto: true  },
  noshow:       { label: "No-show",              short: "NOSHOW", tone: "danger",  rule: "No punch ± shift window",      auto: true  },
  ot_unapprov:  { label: "Unapproved OT",        short: "OT-UA",  tone: "warning", rule: "OT > 30 min, no approval",     auto: true  },
  antipassback: { label: "Anti-passback",        short: "APB",    tone: "danger",  rule: "Two 'in' events within 30 s",  auto: true  },
  lowconf:      { label: "Low-confidence match", short: "LOW",    tone: "outline", rule: "Match score < 0.90",            auto: false },
  missing_pair: { label: "Missing pair",         short: "PAIR",   tone: "outline", rule: "Only 1 punch on shift",         auto: true  },
  geo_out:      { label: "Geofence violation",   short: "GEO",    tone: "danger",  rule: "Field punch outside route",     auto: true  },
};

/* ---- Warning escalation ladder — single rule applied everywhere ---- */
const POLICY_WARNING_LEVELS = [
  { id: "ok",         label: "OK",         tone: "outline", range: [0, 2],    note: "Within tolerance · no action",        manager: "informational only" },
  { id: "monitoring", label: "Monitoring", tone: "warning", range: [3, 5],    note: "Informal coaching · 1:1 suggested",   manager: "schedule a check-in within 7 days" },
  { id: "warned",     label: "Warned",     tone: "danger",  range: [6, 9],    note: "Written warning · monthly review",     manager: "issue PIP draft, copy HR" },
  { id: "severe",     label: "Severe",     tone: "danger",  range: [10, 999], note: "HR escalation required",                manager: "auto-escalates to HR Director" },
];

/* ---- Canonical ledger (last 30 days · May 2026) ----
 * Each row is one auto-flagged or manually-logged time-policy event.
 * Shared IDs (PV-####) appear in HR Analytics, Manager team view, Staff record, and the punch ledger.
 * managerId is the EMP ID of the line manager who owns the conversation with the staff.
 */
const POLICY_LEDGER = [
  // ---- Bounmy Sengdara · Plant Bottling · Savannakhet (top offender · WARNED) — 9L 4E 1NS 2OT = 16
  { id: "PV-2026-00203", ts: "2026-05-13T08:02:33+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "med",  source: "ZK-SVK-04",  detail: "Shift starts 07:45 · received 08:02 (17 min late)", status: "open" },
  { id: "PV-2026-00198", ts: "2026-05-12T08:11:09+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "med",  source: "ZK-SVK-04",  detail: "Late 26 min — third occurrence in 7 days",          status: "acknowledged", reviewer: "S. Khampheng" },
  { id: "PV-2026-00181", ts: "2026-05-09T08:23:04+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "med",  source: "ZK-SVK-04",  detail: "Late 38 min · traffic claim · no documentation",     status: "open" },
  { id: "PV-2026-00164", ts: "2026-05-06T07:59:50+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "low",  source: "ZK-SVK-04",  detail: "Late 14 min — borderline, auto-flagged",             status: "acknowledged", reviewer: "S. Khampheng" },
  { id: "PV-2026-00150", ts: "2026-05-05T08:18:21+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "med",  source: "ZK-SVK-04",  detail: "Late 33 min",                                          status: "open" },
  { id: "PV-2026-00141", ts: "2026-05-02T08:08:11+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "med",  source: "ZK-SVK-04",  detail: "Late 23 min",                                          status: "open" },
  { id: "PV-2026-00128", ts: "2026-04-30T08:03:42+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "low",  source: "ZK-SVK-04",  detail: "Late 18 min",                                          status: "acknowledged", reviewer: "S. Khampheng" },
  { id: "PV-2026-00115", ts: "2026-04-28T08:14:09+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "med",  source: "ZK-SVK-04",  detail: "Late 29 min",                                          status: "open" },
  { id: "PV-2026-00102", ts: "2026-04-25T08:00:55+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "late",        severity: "low",  source: "ZK-SVK-04",  detail: "Late 15 min",                                          status: "acknowledged", reviewer: "S. Khampheng" },
  { id: "PV-2026-00204", ts: "2026-05-13T15:42:00+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "early",       severity: "low",  source: "ZK-SVK-04",  detail: "Early-out 32 min · no approval",                       status: "open" },
  { id: "PV-2026-00190", ts: "2026-05-10T15:55:21+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "early",       severity: "med",  source: "ZK-SVK-04",  detail: "Early-out 47 min · no approval",                       status: "open" },
  { id: "PV-2026-00170", ts: "2026-05-07T16:03:00+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "early",       severity: "low",  source: "ZK-SVK-04",  detail: "Early-out 36 min · no approval",                       status: "acknowledged", reviewer: "S. Khampheng" },
  { id: "PV-2026-00135", ts: "2026-05-01T15:51:18+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "early",       severity: "low",  source: "ZK-SVK-04",  detail: "Early-out 41 min",                                     status: "acknowledged", reviewer: "S. Khampheng" },
  { id: "PV-2026-00118", ts: "2026-04-29T00:00:00+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "noshow",      severity: "high", source: "ZK-SVK-04",  detail: "No punch on rostered shift · marked unpaid",          status: "disputed", reviewer: "S. Khampheng" },
  { id: "PV-2026-00200", ts: "2026-05-12T19:30:00+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "ot_unapprov", severity: "med",  source: "ZK-SVK-04",  detail: "OT 1h 45m · no manager approval on file",              status: "open" },
  { id: "PV-2026-00155", ts: "2026-05-04T20:12:00+07:00", staffId: "EMP-00342", staffName: "Bounmy Sengdara",  managerId: "EMP-00805", dept: "Plant · Bottling",   site: "Savannakhet Plant",   kind: "ot_unapprov", severity: "med",  source: "ZK-SVK-04",  detail: "OT 2h 27m · no manager approval on file",              status: "open" },

  // ---- Manilay Khamphan · Field Sales · Pakse (MONITORING) — 6L 7E 0NS 0OT = 13
  { id: "PV-2026-00210", ts: "2026-05-13T13:42:11+07:00", staffId: "EMP-00533", staffName: "Manilay Khamphan", managerId: "EMP-00118", dept: "Field Sales",       site: "Pakse",                kind: "early",       severity: "low",  source: "selfie",     detail: "Punch-out 32 min before shift end · 17:58",            status: "open" },
  { id: "PV-2026-00187", ts: "2026-05-09T17:32:00+07:00", staffId: "EMP-00533", staffName: "Manilay Khamphan", managerId: "EMP-00118", dept: "Field Sales",       site: "Pakse",                kind: "early",       severity: "med",  source: "selfie",     detail: "Punch-out 58 min before shift end",                    status: "acknowledged", reviewer: "V. Keomany" },
  { id: "PV-2026-00175", ts: "2026-05-08T08:34:18+07:00", staffId: "EMP-00533", staffName: "Manilay Khamphan", managerId: "EMP-00118", dept: "Field Sales",       site: "Pakse",                kind: "late",        severity: "med",  source: "selfie",     detail: "Mobile selfie clock-in 49 min late",                    status: "open" },
  { id: "PV-2026-00149", ts: "2026-05-05T08:21:02+07:00", staffId: "EMP-00533", staffName: "Manilay Khamphan", managerId: "EMP-00118", dept: "Field Sales",       site: "Pakse",                kind: "late",        severity: "low",  source: "selfie",     detail: "Late 36 min",                                            status: "open" },
  { id: "PV-2026-00130", ts: "2026-05-01T17:21:00+07:00", staffId: "EMP-00533", staffName: "Manilay Khamphan", managerId: "EMP-00118", dept: "Field Sales",       site: "Pakse",                kind: "early",       severity: "low",  source: "selfie",     detail: "Early-out 39 min",                                       status: "acknowledged", reviewer: "V. Keomany" },
  { id: "PV-2026-00121", ts: "2026-04-30T08:45:00+07:00", staffId: "EMP-00533", staffName: "Manilay Khamphan", managerId: "EMP-00118", dept: "Field Sales",       site: "Pakse",                kind: "late",        severity: "med",  source: "selfie",     detail: "Late 60 min",                                            status: "open" },
  { id: "PV-2026-00111", ts: "2026-04-27T17:11:00+07:00", staffId: "EMP-00533", staffName: "Manilay Khamphan", managerId: "EMP-00118", dept: "Field Sales",       site: "Pakse",                kind: "early",       severity: "low",  source: "selfie",     detail: "Early-out 49 min",                                       status: "acknowledged", reviewer: "V. Keomany" },
  { id: "PV-2026-00098", ts: "2026-04-25T08:18:00+07:00", staffId: "EMP-00533", staffName: "Manilay Khamphan", managerId: "EMP-00118", dept: "Field Sales",       site: "Pakse",                kind: "late",        severity: "low",  source: "selfie",     detail: "Late 33 min",                                            status: "acknowledged", reviewer: "V. Keomany" },

  // ---- Khamla Chanthavong's TEAM (Manager Portal) ---- managerId: EMP-00800

  // Manysone Phimmavong · Bottling A · Khamla's team (3 lates this month — flagged in Manager alerts)
  { id: "PV-2026-00207", ts: "2026-05-13T08:12:45+07:00", staffId: "EMP-00833", staffName: "Manysone Phimmavong", managerId: "EMP-00800", dept: "Bottling Line A",  site: "Savannakhet Plant",   kind: "late",        severity: "med",  source: "ZK-SVK-05",  detail: "Late 27 min · 3rd occurrence this month — 1-on-1 suggested", status: "open" },
  { id: "PV-2026-00185", ts: "2026-05-09T08:08:30+07:00", staffId: "EMP-00833", staffName: "Manysone Phimmavong", managerId: "EMP-00800", dept: "Bottling Line A",  site: "Savannakhet Plant",   kind: "late",        severity: "low",  source: "ZK-SVK-05",  detail: "Late 23 min",                                            status: "acknowledged", reviewer: "K. Chanthavong" },
  { id: "PV-2026-00132", ts: "2026-05-02T08:05:11+07:00", staffId: "EMP-00833", staffName: "Manysone Phimmavong", managerId: "EMP-00800", dept: "Bottling Line A",  site: "Savannakhet Plant",   kind: "late",        severity: "low",  source: "ZK-SVK-05",  detail: "Late 20 min",                                            status: "acknowledged", reviewer: "K. Chanthavong" },

  // Phetdara Thavixay · Khamla's team (1 unapproved OT — also flagged in Manager alerts)
  { id: "PV-2026-00199", ts: "2026-05-12T20:14:00+07:00", staffId: "EMP-00812", staffName: "Phetdara Thavixay",   managerId: "EMP-00800", dept: "Bottling Line A",  site: "Savannakhet Plant",   kind: "ot_unapprov", severity: "med",  source: "ZK-SVK-05",  detail: "OT 2h 14m yesterday · approval submitted late, pending", status: "open" },

  // Aphone Saysana · Khamla's team (early-out)
  { id: "PV-2026-00161", ts: "2026-05-06T15:47:00+07:00", staffId: "EMP-00815", staffName: "Aphone Saysana",      managerId: "EMP-00800", dept: "Bottling Line A",  site: "Savannakhet Plant",   kind: "early",       severity: "low",  source: "ZK-SVK-05",  detail: "Early-out 35 min · no approval",                          status: "acknowledged", reviewer: "K. Chanthavong" },

  // Souksavanh Phommachanh — the Web Staff Portal user (low-conf match · OK status, but a record exists)
  { id: "PV-2026-00191", ts: "2026-05-10T07:48:09+07:00", staffId: "EMP-00427", staffName: "Souksavanh Phommachanh", managerId: "EMP-00800", dept: "Bottling Line A", site: "Savannakhet Plant",  kind: "lowconf",     severity: "low",  source: "ZK-SVK-05",  detail: "Face match score 0.87 · sun glare on early-shift entry · auto-flagged for review", status: "acknowledged", reviewer: "K. Chanthavong" },
  { id: "PV-2026-00126", ts: "2026-05-01T07:46:00+07:00", staffId: "EMP-00427", staffName: "Souksavanh Phommachanh", managerId: "EMP-00800", dept: "Bottling Line A", site: "Savannakhet Plant",  kind: "lowconf",     severity: "low",  source: "ZK-SVK-05",  detail: "Face match score 0.89 · scarf partial occlusion · auto-flagged",                  status: "resolved", reviewer: "K. Chanthavong" },

  // Bounmy Vongphachanh BV · Khamla's team — 1 missing-pair (forgot to clock out)
  { id: "PV-2026-00146", ts: "2026-05-04T16:00:00+07:00", staffId: "EMP-00811", staffName: "Bounmy Vongphachanh", managerId: "EMP-00800", dept: "Bottling Line A",  site: "Savannakhet Plant",   kind: "missing_pair", severity: "low", source: "ZK-SVK-05",  detail: "Only clock-in recorded for shift · likely forgot to clock out", status: "resolved", reviewer: "K. Chanthavong" },

  // ---- Other top offenders (flatter — fewer entries, just enough to make the totals work) ----

  // Sengdao Inpanya EMP-00984 — Pakse Distribution
  { id: "PV-2026-00197", ts: "2026-05-12T08:19:00+07:00", staffId: "EMP-00984", staffName: "Sengdao Inpanya",      managerId: "EMP-00871", dept: "Pakse Distribution", site: "Pakse Distribution", kind: "late",        severity: "med",  source: "ZK-PKS-02",  detail: "Late 27 min",                                              status: "open" },
  { id: "PV-2026-00177", ts: "2026-05-08T07:47:48+07:00", staffId: "EMP-00984", staffName: "Sengdao Inpanya",      managerId: "EMP-00871", dept: "Pakse Distribution", site: "Pakse Distribution", kind: "ot_unapprov", severity: "med",  source: "ZK-PKS-02",  detail: "OT 2h 14m yesterday · no manager approval on file",        status: "open" },
  { id: "PV-2026-00154", ts: "2026-05-04T19:30:00+07:00", staffId: "EMP-00984", staffName: "Sengdao Inpanya",      managerId: "EMP-00871", dept: "Pakse Distribution", site: "Pakse Distribution", kind: "ot_unapprov", severity: "med",  source: "ZK-PKS-02",  detail: "OT 1h 50m · no approval",                                  status: "open" },

  // Anousone Sayavong EMP-00712 — Plant Filling
  { id: "PV-2026-00196", ts: "2026-05-12T08:01:00+07:00", staffId: "EMP-00712", staffName: "Anousone Sayavong",   managerId: "EMP-00805", dept: "Plant · Filling",    site: "Savannakhet Plant",   kind: "late",        severity: "low",  source: "ZK-SVK-04",  detail: "Late 16 min",                                              status: "open" },
  { id: "PV-2026-00163", ts: "2026-05-06T08:22:00+07:00", staffId: "EMP-00712", staffName: "Anousone Sayavong",   managerId: "EMP-00805", dept: "Plant · Filling",    site: "Savannakhet Plant",   kind: "late",        severity: "med",  source: "ZK-SVK-04",  detail: "Late 37 min",                                              status: "acknowledged", reviewer: "S. Khampheng" },

  // Khamla Souvanhpheng EMP-00871 — Pakse
  { id: "PV-2026-00186", ts: "2026-05-09T08:22:00+07:00", staffId: "EMP-00871", staffName: "Khamla Souvanhpheng", managerId: "EMP-00118", dept: "Pakse Distribution", site: "Pakse Distribution", kind: "late",        severity: "med",  source: "ZK-PKS-02",  detail: "Late 22 min · third occurrence in 14 days",                status: "acknowledged", reviewer: "M. Phetsamone" },

  // Sisana Bouphaphanh EMP-01098 — LPB Branch
  { id: "PV-2026-00208", ts: "2026-05-13T13:36:55+07:00", staffId: "EMP-01098", staffName: "Sisana Bouphaphanh",  managerId: "EMP-00609", dept: "LPB Branch",         site: "Luang Prabang",       kind: "lowconf",     severity: "low",  source: "selfie",     detail: "Selfie 0.81 · iPad low-light",                              status: "open" },

  // Saysamone Phommachanh EMP-00609 — LPB
  { id: "PV-2026-00184", ts: "2026-05-09T11:14:00+07:00", staffId: "EMP-00609", staffName: "Saysamone Phommachanh", managerId: "EMP-01205", dept: "LPB Branch",       site: "Luang Prabang",       kind: "geo_out",     severity: "high", source: "selfie",     detail: "Selfie clock-in 4.2 km outside assigned route geofence",   status: "disputed", reviewer: "T. Vongphachan" },

  // Khamphouy Sirisak EMP-00060 — HQ Finance
  { id: "PV-2026-00179", ts: "2026-05-08T07:11:02+07:00", staffId: "EMP-00060", staffName: "Khamphouy Sirisak",   managerId: "EMP-01205", dept: "Finance · Treasury",  site: "HQ Vientiane",        kind: "noshow",      severity: "low",  source: "manual",     detail: "No punch logged · marked WFH retroactively · pending audit", status: "open" },

  // Anti-passback (no specific staff)
  { id: "PV-2026-00194", ts: "2026-05-12T07:11:02+07:00", staffId: null,        staffName: "Unknown",              managerId: "EMP-00805", dept: "—",                  site: "Savannakhet Plant",   kind: "antipassback",severity: "med",  source: "ZK-SVK-04",  detail: "Two 'in' events 8s apart on Plant Gate-1 · tailgating?",   status: "open" },
];

/* Pre-built indexes — computed ONCE at module load.
 * Replaces O(n) Array.filter on every call with O(1) Map lookup.
 */
const _byStaffId = (() => {
  const m = new Map();
  for (const e of POLICY_LEDGER) {
    if (!e.staffId) continue;
    if (!m.has(e.staffId)) m.set(e.staffId, []);
    m.get(e.staffId).push(e);
  }
  return m;
})();
const _byManagerId = (() => {
  const m = new Map();
  for (const e of POLICY_LEDGER) {
    if (!e.managerId) continue;
    if (!m.has(e.managerId)) m.set(e.managerId, []);
    m.get(e.managerId).push(e);
  }
  return m;
})();
const _sortedByTs = [...POLICY_LEDGER].sort((a, b) => (b.ts || "").localeCompare(a.ts || ""));

/* Computed: cap-month totals per kind (used when HR shows aggregates) */
function policyAggregateByKind(entries) {
  const acc = {};
  for (const e of entries) acc[e.kind] = (acc[e.kind] || 0) + 1;
  return acc;
}

/* Filter to one staff member — O(1) via index */
function policyForStaff(staffId) {
  return _byStaffId.get(staffId) || [];
}

/* Filter to all direct reports of one manager — O(1) via index */
function policyForManager(managerId) {
  return _byManagerId.get(managerId) || [];
}

/* Filter to an explicit team roster (array of staffIds) */
function policyForTeam(staffIds) {
  const out = [];
  for (const id of staffIds) {
    const rows = _byStaffId.get(id);
    if (rows) out.push(...rows);
  }
  return out;
}

/* Map a 30-day count to its escalation level */
function policyStatus(count30d) {
  return POLICY_WARNING_LEVELS.find(l => count30d >= l.range[0] && count30d <= l.range[1]) || POLICY_WARNING_LEVELS[0];
}

/* Latest-N projection — uses pre-sorted index when called against full ledger,
 * otherwise sorts the supplied subset (Manager / Staff scopes are small).
 */
function policyRecent(entries, n = 8) {
  if (entries === POLICY_LEDGER) return _sortedByTs.slice(0, n);
  return [...entries].sort((a, b) => (b.ts || "").localeCompare(a.ts || "")).slice(0, n);
}

/* Per-staff roll-up: counts by kind + total + status level */
function policyRollupForStaff(staffId) {
  const rows = policyForStaff(staffId);
  const byKind = policyAggregateByKind(rows);
  const total = rows.length;
  return {
    staffId, total,
    byKind,
    late: byKind.late || 0,
    early: byKind.early || 0,
    noshow: byKind.noshow || 0,
    otUn: byKind.ot_unapprov || 0,
    lowconf: byKind.lowconf || 0,
    other: total - (byKind.late||0) - (byKind.early||0) - (byKind.noshow||0) - (byKind.ot_unapprov||0) - (byKind.lowconf||0),
    level: policyStatus(total),
    entries: rows,
  };
}

/* Per-manager roll-up: per-staff buckets + team aggregates + status counts.
 * Replaces the inline reducer that lived in Team Manager Portal.html and
 * Mobile Personas.html (same byStaff loop reimplemented twice).
 */
function policyRollupForManager(managerId) {
  const entries = policyForManager(managerId);
  const byStaff = {};
  for (const e of entries) {
    if (!e.staffId) continue;
    if (!byStaff[e.staffId]) byStaff[e.staffId] = {
      staff: e.staffName, staffId: e.staffId,
      total: 0, late: 0, early: 0, noshow: 0, otUn: 0, lowconf: 0, other: 0, last: null,
    };
    const r = byStaff[e.staffId]; r.total++;
    if (e.kind === "late") r.late++;
    else if (e.kind === "early") r.early++;
    else if (e.kind === "noshow") r.noshow++;
    else if (e.kind === "ot_unapprov") r.otUn++;
    else if (e.kind === "lowconf") r.lowconf++;
    else r.other++;
    if (!r.last || e.ts > r.last.ts) r.last = e;
  }
  const rows = Object.values(byStaff)
    .map(r => ({ ...r, level: policyStatus(r.total) }))
    .sort((a, b) => b.total - a.total);
  return {
    managerId,
    entries,
    rows,
    total: entries.length,
    byKind: policyAggregateByKind(entries),
    monitoring: rows.filter(r => r.level.id === "monitoring").length,
    warned: rows.filter(r => r.level.id === "warned" || r.level.id === "severe").length,
  };
}

/* Format a ledger timestamp to short locale string */
function policyFmtTs(ts) {
  if (!ts) return "—";
  try {
    const d = new Date(ts);
    return d.toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  } catch (e) { return ts; }
}

if (typeof window !== "undefined") {
  Object.assign(window, {
    POLICY_THRESHOLDS, POLICY_WARNING_LEVELS, POLICY_LEDGER,
    policyAggregateByKind, policyForStaff, policyForManager, policyForTeam,
    policyStatus, policyRecent, policyRollupForStaff, policyRollupForManager, policyFmtTs,
  });
}
