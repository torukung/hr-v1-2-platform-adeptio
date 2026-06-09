/* ------- Mock data + i18n strings -------- */

const DIVISIONS = [
  { id: "all", name: "All divisions", lao: "ທຸກພະແນກ", count: 1248 },
  { id: "hq",  name: "HQ Vientiane", lao: "ສຳນັກງານໃຫຍ່ ວຽງຈັນ", count: 412 },
  { id: "savan", name: "Savannakhet Plant", lao: "ໂຮງງານ ສະຫວັນນະເຂດ", count: 286 },
  { id: "lpb", name: "Luang Prabang Branch", lao: "ສາຂາ ຫຼວງພະບາງ", count: 134 },
  { id: "pakse", name: "Pakse Distribution", lao: "ສູນກະຈາຍ ປາກເຊ", count: 218 },
  { id: "field", name: "Field Sales", lao: "ພະນັກງານພາກສະໜາມ", count: 198 },
];

const TIMEFRAMES = [
  { id: "today",   label: "Today" },
  { id: "wtd",     label: "Week" },
  { id: "mtd",     label: "Month" },
  { id: "qtd",     label: "Quarter" },
  { id: "ytd",     label: "Year" },
];

/* KPI deltas keyed by timeframe so filters change numbers visibly */
const KPIS = {
  today: {
    headcount: 1248, headcountDelta: +3,
    presentPct: 94.2, presentDelta: +0.6,
    onLeave: 47, onLeaveBreak: { annual: 21, sick: 12, parental: 6, other: 8 },
    pendingApprovals: 23,
    payrollLAK: 1842_000_000, payrollDelta: +1.4,
    attrition: 8.4, attritionDelta: -0.3,
    overtime: 312,
    visaExpiring: 4, contractsRenew: 11,
  },
  wtd: {
    headcount: 1248, headcountDelta: +6,
    presentPct: 93.1, presentDelta: +0.2,
    onLeave: 86, onLeaveBreak: { annual: 38, sick: 22, parental: 11, other: 15 },
    pendingApprovals: 41,
    payrollLAK: 1842_000_000, payrollDelta: +1.4,
    attrition: 8.4, attritionDelta: -0.3,
    overtime: 1840,
    visaExpiring: 4, contractsRenew: 11,
  },
  mtd: {
    headcount: 1248, headcountDelta: +14,
    presentPct: 92.6, presentDelta: -0.4,
    onLeave: 142, onLeaveBreak: { annual: 64, sick: 38, parental: 18, other: 22 },
    pendingApprovals: 87,
    payrollLAK: 1842_000_000, payrollDelta: +1.4,
    attrition: 8.4, attritionDelta: -0.3,
    overtime: 7220,
    visaExpiring: 4, contractsRenew: 11,
  },
  qtd: {
    headcount: 1248, headcountDelta: +38,
    presentPct: 92.9, presentDelta: +0.3,
    onLeave: 384, onLeaveBreak: { annual: 192, sick: 96, parental: 38, other: 58 },
    pendingApprovals: 154,
    payrollLAK: 5526_000_000, payrollDelta: +2.1,
    attrition: 8.4, attritionDelta: -0.3,
    overtime: 21640,
    visaExpiring: 4, contractsRenew: 11,
  },
  ytd: {
    headcount: 1248, headcountDelta: +112,
    presentPct: 92.1, presentDelta: -0.7,
    onLeave: 1432, onLeaveBreak: { annual: 720, sick: 380, parental: 142, other: 190 },
    pendingApprovals: 312,
    payrollLAK: 22104_000_000, payrollDelta: +6.8,
    attrition: 8.4, attritionDelta: -0.3,
    overtime: 86400,
    visaExpiring: 4, contractsRenew: 11,
  },
};

/* 12-month headcount trend */
const HEADCOUNT_TREND = [
  { m: "Jun", v: 1136 }, { m: "Jul", v: 1148 }, { m: "Aug", v: 1162 },
  { m: "Sep", v: 1170 }, { m: "Oct", v: 1184 }, { m: "Nov", v: 1198 },
  { m: "Dec", v: 1206 }, { m: "Jan", v: 1212 }, { m: "Feb", v: 1224 },
  { m: "Mar", v: 1232 }, { m: "Apr", v: 1240 }, { m: "May", v: 1248 },
];

const DIV_BREAKDOWN = [
  { id: "hq", name: "HQ Vientiane", v: 412, color: "var(--primary)" },
  { id: "savan", name: "Savannakhet Plant", v: 286, color: "#3F4F8A" },
  { id: "pakse", name: "Pakse Distribution", v: 218, color: "#6B7AAE" },
  { id: "field", name: "Field Sales", v: 198, color: "var(--accent)" },
  { id: "lpb", name: "Luang Prabang", v: 134, color: "#D9B57A" },
];

const LEAVE_BY_TYPE = [
  { id: "annual", name: "Annual",      v: 64, color: "var(--primary)" },
  { id: "sick", name: "Sick / MC",     v: 38, color: "var(--positive)" },
  { id: "parental", name: "Parental",  v: 18, color: "var(--accent)" },
  { id: "wellness", name: "Wellness",  v: 12, color: "#C9A36A" },
  { id: "unpaid", name: "Unpaid / Other", v: 10, color: "#8B8E99" },
];

/* Attendance heatmap: 5 weeks × 7 days, value 0-1 */
const ATTENDANCE_HEAT = (() => {
  const rng = (s) => () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const r = rng(7);
  const grid = [];
  for (let w = 0; w < 5; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) {
      // weekend lower
      const base = d === 0 || d === 6 ? 0.15 : 0.78 + r() * 0.18;
      row.push(Math.min(1, base + (r() - 0.5) * 0.1));
    }
    grid.push(row);
  }
  return grid;
})();

/* Approvals queue */
const APPROVALS = [
  { id: "AP-2231", staffId: "EMP-00871", name: "Khamla Souvanhpheng", lao: "ຄຳລາ ສຸວັນເພັງ", division: "Pakse Distribution", type: "Annual leave", days: 3, dates: "13–15 May", submitted: "2h ago", priority: "normal" },
  { id: "AP-2230", staffId: "EMP-01205", name: "Phonesavanh Inthavong", lao: "ພອນສະຫວັນ ອິນທະວົງ", division: "HQ Vientiane", type: "OT pre-approval", days: 6, dates: "12 May, 18:00–24:00", submitted: "3h ago", priority: "normal" },
  { id: "AP-2229", staffId: "EMP-00342", name: "Bounmy Sengdara", lao: "ບຸນມີ ແສງດາລາ", division: "Savannakhet Plant", type: "Sick leave (MC)", days: 2, dates: "12–13 May", submitted: "5h ago", priority: "urgent" },
  { id: "AP-2228", staffId: "EMP-00118", name: "Vilaysone Keomany", lao: "ວິໄລສອນ ແກ້ວມະນີ", division: "Field Sales", type: "Field check-in correction", days: 1, dates: "11 May", submitted: "yesterday", priority: "normal" },
  { id: "AP-2227", staffId: "EMP-00609", name: "Saysamone Phommachanh", lao: "ໄຊສະໝອນ ພົມມະຈັນ", division: "Luang Prabang", type: "Parental leave", days: 90, dates: "01 Jun – 29 Aug", submitted: "yesterday", priority: "high" },
  { id: "AP-2226", staffId: "EMP-00455", name: "Daovone Phimmasone", lao: "ດາວວອນ ພິມມະສອນ", division: "HQ Vientiane", type: "Document — Work permit", days: null, dates: "Renewal", submitted: "2 days ago", priority: "high" },
];

/* Upcoming events */
const UPCOMING = [
  { kind: "Visa expiry", who: "3 expats — Savannakhet", when: "in 30 days", tone: "warning" },
  { kind: "Contract renewal", who: "11 staff — multiple", when: "in 45 days", tone: "warning" },
  { kind: "Public holiday", who: "Lao National Day", when: "02 Dec", tone: "muted" },
  { kind: "Payroll run", who: "May cycle — 1,248 staff", when: "25 May", tone: "primary" },
  { kind: "NSSF filing", who: "Apr contributions", when: "15 May", tone: "primary" },
];

/* Staff records (sample 12) */
const STAFF = [
  { id: "EMP-00118", name: "Vilaysone Keomany", lao: "ວິໄລສອນ ແກ້ວມະນີ", role: "Senior Sales Rep", division: "Field Sales", site: "Vientiane", manager: "P. Inthavong", status: "active", joined: "2019-03-04", contract: "Permanent" },
  { id: "EMP-00342", name: "Bounmy Sengdara", lao: "ບຸນມີ ແສງດາລາ", role: "Line Operator", division: "Savannakhet Plant", site: "Savannakhet", manager: "S. Khampheng", status: "on-leave", joined: "2021-08-19", contract: "Permanent" },
  { id: "EMP-00455", name: "Daovone Phimmasone", lao: "ດາວວອນ ພິມມະສອນ", role: "Logistics Lead (Expat)", division: "HQ Vientiane", site: "Vientiane", manager: "K. Souvanhpheng", status: "active", joined: "2022-01-10", contract: "Fixed 24m" },
  { id: "EMP-00609", name: "Saysamone Phommachanh", lao: "ໄຊສະໝອນ ພົມມະຈັນ", role: "Branch Coordinator", division: "Luang Prabang", site: "Luang Prabang", manager: "T. Vongphachan", status: "parental", joined: "2018-11-22", contract: "Permanent" },
  { id: "EMP-00871", name: "Khamla Souvanhpheng", lao: "ຄຳລາ ສຸວັນເພັງ", role: "Distribution Officer", division: "Pakse Distribution", site: "Pakse", manager: "M. Phetsamone", status: "active", joined: "2020-05-30", contract: "Permanent" },
  { id: "EMP-01205", name: "Phonesavanh Inthavong", lao: "ພອນສະຫວັນ ອິນທະວົງ", role: "HRIS Analyst", division: "HQ Vientiane", site: "Vientiane", manager: "K. Vannasing", role_dept: "People Ops", status: "active", joined: "2023-02-14", contract: "Permanent" },
  { id: "EMP-00712", name: "Anousone Sayavong", lao: "ອານຸສອນ ໄຊຍະວົງ", role: "Plant Supervisor", division: "Savannakhet Plant", site: "Savannakhet", manager: "B. Sengdara", status: "active", joined: "2017-06-01", contract: "Permanent" },
  { id: "EMP-00533", name: "Manilay Khamphan", lao: "ມະນີໄລ ຄຳພັນ", role: "Field Sales Rep", division: "Field Sales", site: "Pakse", manager: "V. Keomany", status: "active", joined: "2024-01-08", contract: "Probation" },
  { id: "EMP-00984", name: "Sengdao Inpanya", lao: "ແສງດາວ ອິນປັນຍາ", role: "Forklift Operator", division: "Pakse Distribution", site: "Pakse", manager: "K. Souvanhpheng", status: "active", joined: "2019-09-12", contract: "Permanent" },
  { id: "EMP-00276", name: "Khanthaly Vongchanh", lao: "ຂັນທະລີ ວົງຈັນ", role: "Reception", division: "HQ Vientiane", site: "Vientiane", manager: "P. Inthavong", status: "active", joined: "2022-07-04", contract: "Permanent" },
  { id: "EMP-01098", name: "Sisana Bouphaphanh", lao: "ສີສະໜາ ບຸບຜາພັນ", role: "Tour Liaison", division: "Luang Prabang", site: "Luang Prabang", manager: "S. Phommachanh", status: "on-leave", joined: "2020-12-01", contract: "Permanent" },
  { id: "EMP-00060", name: "Khamphouy Sirisak", lao: "ຄຳພວຍ ສິລິສັກ", role: "Finance Partner", division: "HQ Vientiane", site: "Vientiane", manager: "—", status: "active", joined: "2015-04-17", contract: "Permanent" },
];

/* CMS posts (bilingual) */
const POSTS = [
  {
    id: "post-014",
    title_en: "May payroll cycle: payslips available 25 May",
    title_lao: "ວົງຈອນເງິນເດືອນເດືອນພຶດສະພາ: ໃບເງິນເດືອນຈະອອກວັນທີ 25 ພຶດສະພາ",
    body_en: "Your May 2026 payslip will be released to the ESS portal at 18:00 on 25 May. Bank disbursement to BCEL / LDB / JDB completes the same evening. PIT and NSSF deductions follow the latest schedule published by the Tax Department.",
    body_lao: "ໃບເງິນເດືອນປະຈຳເດືອນພຶດສະພາ 2026 ຈະອັບໂຫຼດໃສ່ປະຕູ ESS ເວລາ 18:00 ໂມງ ວັນທີ 25 ພຶດສະພາ. ການໂອນເງິນຜ່ານທະນາຄານ BCEL / LDB / JDB ຈະສຳເລັດໃນຄ່ຳວັນດຽວກັນ. ການຫັກພາສີ PIT ແລະ NSSF ປະຕິບັດຕາມຕາຕະລາງຫຼ້າສຸດຂອງກົມພາສີ.",
    audience: "All staff", channels: ["ESS", "Email", "LINE"], status: "scheduled", schedule: "25 May, 09:00",
    author: "K. Vannasing — People Ops",
  },
  {
    id: "post-013",
    title_en: "Updated wellness leave policy — effective 01 Jun",
    title_lao: "ປັບປຸງນະໂຍບາຍລາພັກສຸຂະພາບຈິດ — ມີຜົນແຕ່ 01 ມິຖຸນາ",
    body_en: "Wellness / mental-health leave is now a standalone leave type with 5 paid days per calendar year. No supporting document required for the first 2 days; manager approval required from day 3 onwards.",
    body_lao: "ການລາພັກສຸຂະພາບຈິດແມ່ນປະເພດການລາພັກແຍກຕ່າງຫາກ ມີ 5 ວັນຮັບເງິນຕໍ່ປີ. ບໍ່ຕ້ອງມີເອກະສານປະກອບສຳລັບ 2 ວັນທຳອິດ; ຕ້ອງມີການອະນຸຍາດຈາກຫົວໜ້າຕັ້ງແຕ່ມື້ທີ 3 ຂຶ້ນໄປ.",
    audience: "All staff", channels: ["ESS", "WhatsApp"], status: "published", schedule: "Published 04 May",
    author: "K. Vannasing — People Ops",
  },
  {
    id: "post-012",
    title_en: "Biometric clock-in rolls out at Pakse depot",
    title_lao: "ລະບົບລົງເວລາດ້ວຍຊີວະພາບ ເລີ່ມໃຊ້ທີ່ສູນປາກເຊ",
    body_en: "Three new biometric kiosks (face + fingerprint, with liveness check) are live at Pakse Distribution. Web and mobile punch remain available; offline sync supported for 24h.",
    body_lao: "ຕູ້ບໍລິການຊີວະພາບ 3 ຈຸດ (ໜ້າ + ລາຍນິ້ວມື, ກວດສອບການມີຊີວິດ) ໄດ້ເປີດໃຊ້ທີ່ສູນກະຈາຍປາກເຊ. ການລົງເວລາຜ່ານເວັບ ແລະ ມືຖືຍັງຄົງມີ; ຮອງຮັບການຊິງຄ໌ອອບລາຍຂັ້ນຕ່ຳ 24 ຊົ່ວໂມງ.",
    audience: "Pakse Distribution", channels: ["ESS"], status: "published", schedule: "Published 28 Apr",
    author: "T. Bounlieng — IT Ops",
  },
  {
    id: "post-011",
    title_en: "Reminder: Q2 self-development goal-setting due 20 May",
    title_lao: "ແຈ້ງເຕືອນ: ກຳນົດເປົ້າໝາຍພັດທະນາຕົນເອງ Q2 ກຳນົດ 20 ພຶດສະພາ",
    body_en: "Add at least 2 development goals in the People Ops module. Your line manager will review during the 1:1 in week 22.",
    body_lao: "ກະລຸນາເພີ່ມເປົ້າໝາຍພັດທະນາຢ່າງໜ້ອຍ 2 ຂໍ້ໃນໂມດູນ People Ops. ຫົວໜ້າຂອງທ່ານຈະທົບທວນໃນການພົບປະ 1:1 ສັບປະດາທີ 22.",
    audience: "All staff", channels: ["ESS", "Email"], status: "draft", schedule: "—",
    author: "K. Vannasing — People Ops",
  },
];

const POLICIES = [
  { id: "POL-007", title: "Annual leave & carry-forward", lao: "ການລາພັກປະຈຳປີ ແລະ ການຍົກຍອດ", lang: "EN · LO", v: "v3.2", updated: "12 Apr 2026", owner: "People Ops" },
  { id: "POL-012", title: "Code of conduct & harassment", lao: "ມາດຕະຖານຈັນຍາບັນ", lang: "EN · LO", v: "v2.0", updated: "01 Mar 2026", owner: "Legal" },
  { id: "POL-019", title: "Travel & expense — domestic", lao: "ຄ່າເດີນທາງ — ພາຍໃນ", lang: "EN · LO", v: "v1.6", updated: "22 Feb 2026", owner: "Finance" },
  { id: "POL-024", title: "Data protection & ESS access", lao: "ການປົກປ້ອງຂໍ້ມູນ ແລະ ການເຂົ້າເຖິງ ESS", lang: "EN · LO", v: "v1.1", updated: "08 Jan 2026", owner: "IT Ops" },
  { id: "POL-031", title: "Provident fund — 2–15% matched", lao: "ກອງທຶນສຳຮອງລ້ຽງຊີບ", lang: "EN · LO", v: "v2.4", updated: "30 Nov 2025", owner: "Finance" },
];

/* Payroll runs */
const PAYROLL_RUNS = [
  { id: "PR-2026-04", period: "Apr 2026", status: "Posted", staff: 1240, gross: 1815_000_000, net: 1542_000_000, pit: 124_000_000, nssf: 109_000_000, posted: "25 Apr" },
  { id: "PR-2026-03", period: "Mar 2026", status: "Posted", staff: 1232, gross: 1798_000_000, net: 1530_000_000, pit: 121_000_000, nssf: 107_000_000, posted: "25 Mar" },
  { id: "PR-2026-05", period: "May 2026", status: "Draft",  staff: 1248, gross: 1842_000_000, net: 1568_000_000, pit: 126_000_000, nssf: 110_000_000, posted: "—" },
];

/* Helpers */
function formatLAK(v) {
  // show in millions/billions
  if (v >= 1e9) return (v / 1e9).toFixed(2) + "B";
  if (v >= 1e6) return (v / 1e6).toFixed(0) + "M";
  return v.toLocaleString();
}

function delta(v, suffix = "") {
  const sign = v > 0 ? "▲" : v < 0 ? "▼" : "•";
  const cls = v > 0 ? "pos" : v < 0 ? "neg" : "muted";
  return { sign, cls, text: (v > 0 ? "+" : "") + v + suffix };
}

/* ---- Biometric / access connectors — capability showcase ---- */

/* Connected: 6 (4 Tier-1 SEA + selfie/geofence + generic webhook) */
const BIOMETRIC_CONNECTORS = [
  {
    id: "zk", vendor: "ZKTeco", tag: "Tier-1 · SEA",
    pattern: "push", patternLabel: "Device push (ADMS)",
    apiKind: "Push SDK · ADMS · BioTime",
    modalities: ["face", "fp", "card", "pin"],
    status: "connected", devices: 14, sites: 3, lastEvent: "2s ago", health: 1.0,
    note: "Most-installed brand in Laos · OEM fleet at Savannakhet & Pakse",
    accent: "#1A2A57",
  },
  {
    id: "hik", vendor: "Hikvision", tag: "Tier-1 · SEA",
    pattern: "push", patternLabel: "Device push (HTTPS)",
    apiKind: "ISAPI · Artemis cloud",
    modalities: ["face", "card"],
    status: "connected", devices: 9, sites: 2, lastEvent: "11s ago", health: 0.997,
    note: "HQ lobby + Luang Prabang office face panels",
    accent: "#A8392E",
  },
  {
    id: "dahua", vendor: "Dahua", tag: "Tier-1 · SEA",
    pattern: "agent", patternLabel: "On-prem agent",
    apiKind: "DSS Pro · DH SDK",
    modalities: ["face", "card"],
    status: "connected", devices: 3, sites: 1, lastEvent: "1m 04s ago", health: 0.991,
    note: "Hardened gate panels at Champasak warehouse",
    accent: "#C4843A",
  },
  {
    id: "suprema", vendor: "Suprema", tag: "Enterprise",
    pattern: "cloud", patternLabel: "Cloud-bridge (BioStar Air)",
    apiKind: "BioStar 2 · BioStar Air",
    modalities: ["face", "fp"],
    status: "connected", devices: 4, sites: 1, lastEvent: "44s ago", health: 1.0,
    note: "Exec floor · MFA-tier enrolment",
    accent: "#2E6F47",
  },
  {
    id: "selfie", vendor: "Selfie + Geofence", tag: "Mobile",
    pattern: "mobile", patternLabel: "Phone-as-credential",
    apiKind: "Mobile SDK · 3D liveness",
    modalities: ["face", "geo"],
    status: "connected", devices: 142, sites: 0, lastEvent: "5s ago", health: 1.0,
    note: "Field reps · auditors · no-hardware sites",
    accent: "#3F4F8A",
  },
  {
    id: "webhook", vendor: "Generic Webhook", tag: "Open spec",
    pattern: "push", patternLabel: "POST JSON · HMAC",
    apiKind: "Bring-your-own protocol",
    modalities: ["any"],
    status: "available", devices: 0, sites: 0, lastEvent: "—", health: null,
    note: "Escape hatch · any device that can POST signed JSON",
    accent: "#6B6E7B",
  },
];

/* "We can also speak…" — 16 vendors / standards we can light up on demand */
const BIOMETRIC_AVAILABLE = [
  { vendor: "Anviz",                 group: "OEM kin",     note: "Same protocol family as ZKTeco" },
  { vendor: "eSSL · Realtime",       group: "OEM kin",     note: "Push-protocol clones · India + SEA" },
  { vendor: "Verkada",               group: "Cloud-native",note: "REST + webhooks · global enterprise" },
  { vendor: "Kisi",                  group: "Cloud-native",note: "Modern offices · mobile creds" },
  { vendor: "Brivo",                 group: "Cloud-native",note: "Multi-tenant · SaaS" },
  { vendor: "Openpath / Avigilon Alta", group: "Cloud-native", note: "Mobile-first credentials" },
  { vendor: "HID Origo + Mobile",    group: "Enterprise",  note: "Apple Wallet · NFC · global standard" },
  { vendor: "Honeywell Pro-Watch",   group: "Enterprise",  note: "Plant-grade access" },
  { vendor: "Bosch AMS",             group: "Enterprise",  note: "Industrial sites" },
  { vendor: "OSDP v2.2",             group: "Standard",    note: "Open Supervised Device Protocol" },
  { vendor: "Wiegand bridge",        group: "Standard",    note: "Legacy 26 / 34 / 56-bit" },
  { vendor: "ONVIF · RTSP",          group: "Standard",    note: "Any IP camera + event feed" },
  { vendor: "MQTT",                  group: "Standard",    note: "IoT face panels · OEM Chinese" },
  { vendor: "AWS Rekognition",       group: "AI service",  note: "Cloud face match" },
  { vendor: "Azure Face API",        group: "AI service",  note: "Cloud liveness" },
  { vendor: "CSV / SFTP drop",       group: "Legacy",      note: "Daily file import for legacy systems" },
];

/* Modality catalog — chips used across Connectors, Devices, Events */
const BIOMETRIC_MODALITIES = [
  { id: "face", label: "Face",            short: "FACE", lao: "ໜ້າ",          tone: "primary",  note: "2D + IR liveness · 3D structured-light optional" },
  { id: "fp",   label: "Fingerprint",     short: "FP",   lao: "ລາຍນິ້ວມື",   tone: "positive", note: "Capacitive / optical · plant + enterprise" },
  { id: "card", label: "RFID / Mifare",   short: "CARD", lao: "ບັດ",          tone: "outline",  note: "Fallback credential" },
  { id: "pin",  label: "PIN",             short: "PIN",  lao: "ລະຫັດ",       tone: "outline",  note: "Backup only" },
  { id: "qr",   label: "QR / OTP",        short: "QR",   lao: "QR",           tone: "accent",   note: "Visitors · contractors" },
  { id: "geo",  label: "Geofence + Selfie", short: "GEO",  lao: "ຕຳແໜ່ງ + ໜ້າ", tone: "primary", note: "Field staff · no-hardware sites" },
  { id: "ble",  label: "BLE / NFC",       short: "BLE",  lao: "BLE",          tone: "accent",   note: "Phone-as-badge" },
  { id: "palm", label: "Palm vein",       short: "PALM", lao: "ເສັ້ນຝາມື",   tone: "positive", note: "Premium · niche" },
  { id: "any",  label: "Any signal",      short: "ANY",  lao: "ຫຼາຍຮູບແບບ", tone: "outline",  note: "Open webhook spec" },
];

/* "Today's attendance" snapshot used by HR Pulse + Time & Attendance */
const ATTENDANCE_TODAY = {
  date: "Wednesday · 13 May 2026",
  total: 1248,
  present: 1187,
  late: 14,
  absent: 9,
  onLeave: 38,
  early: 22,
  inflowToNow: 1187,
  expectedToNow: 1210,
  biometricUptime: 0.997,
  bySite: [
    { site: "HQ Vientiane",       roster: 412, present: 398, late: 3, channel: "Hik · Suprema · Web", modality: { face: 0.71, fp: 0.18, card: 0.11 } },
    { site: "Savannakhet Plant",  roster: 286, present: 268, late: 7, channel: "ZKTeco · 4 panels",   modality: { face: 0.49, fp: 0.42, card: 0.09 } },
    { site: "Pakse Distribution", roster: 218, present: 209, late: 2, channel: "ZKTeco · 3 panels",   modality: { face: 0.62, fp: 0.30, card: 0.08 } },
    { site: "Luang Prabang",      roster: 134, present: 124, late: 0, channel: "Hik · Web",           modality: { face: 0.83, fp: 0.00, card: 0.17 } },
    { site: "Field Sales",        roster: 198, present: 188, late: 2, channel: "Selfie + Geofence",   modality: { face: 1.00, fp: 0.00, card: 0.00 } },
  ],
  // 24-hour inflow buckets (00:00 → 23:00)
  hourly: [0, 0, 0, 0, 0, 2, 38, 142, 412, 318, 168, 60, 12, 4, 6, 12, 18, 38, 80, 18, 6, 0, 0, 0],
};

/* Live event stream — 13 punches, mixed vendors / modalities / sites */
const ATTENDANCE_EVENTS = [
  { ts: "13:42:11", staff: "Vilaysone Keomany",     staffId: "EMP-00118", dept: "Field Sales",        site: "Pakse",              door: "Mobile · geo + selfie", device: "iPhone 14 · iOS 18.4",  modality: "face", vendor: "selfie",  conf: 0.96, dir: "in",  flag: null         },
  { ts: "13:41:48", staff: "Bounmy Sengdara",       staffId: "EMP-00342", dept: "Plant · Bottling",   site: "Savannakhet Plant",  door: "Locker B-2",            device: "ZK MB360",              modality: "fp",   vendor: "zk",      conf: 0.91, dir: "out", flag: null         },
  { ts: "13:41:02", staff: "Khamphouy Sirisak",     staffId: "EMP-00060", dept: "Finance · Treasury", site: "HQ Vientiane",       door: "Floor 4 — exec",        device: "Suprema X-Station 2",   modality: "face", vendor: "suprema", conf: 0.99, dir: "in",  flag: null         },
  { ts: "13:40:55", staff: "Manilay Khamphan",      staffId: "EMP-00533", dept: "Field Sales",        site: "Pakse",              door: "Mobile · geo + selfie", device: "Galaxy A55 · Android 14", modality: "face", vendor: "selfie",  conf: 0.88, dir: "in",  flag: "low-conf"   },
  { ts: "13:40:14", staff: "Phonesavanh Inthavong", staffId: "EMP-01205", dept: "HQ · People Ops",    site: "HQ Vientiane",       door: "HQ Lobby",              device: "Hik DS-K1T642MFW",      modality: "face", vendor: "hik",     conf: 0.99, dir: "in",  flag: null         },
  { ts: "13:39:42", staff: "Sengdao Inpanya",       staffId: "EMP-00984", dept: "Pakse Distribution", site: "Pakse Distribution", door: "Warehouse Gate-A",      device: "Dahua ASI7223X",        modality: "card", vendor: "dahua",   conf: 1.00, dir: "out", flag: null         },
  { ts: "13:39:12", staff: "Anousone Sayavong",     staffId: "EMP-00712", dept: "Plant · Filling",    site: "Savannakhet Plant",  door: "Plant Gate-1",          device: "ZK MB360",              modality: "face", vendor: "zk",      conf: 0.97, dir: "in",  flag: null         },
  { ts: "13:38:47", staff: "Khanthaly Vongchanh",   staffId: "EMP-00276", dept: "HQ · Reception",     site: "HQ Vientiane",       door: "HQ Lobby",              device: "Hik DS-K1T642MFW",      modality: "face", vendor: "hik",     conf: 0.95, dir: "out", flag: null         },
  { ts: "13:38:11", staff: "Daovone Phimmasone",    staffId: "EMP-00455", dept: "HQ · Logistics",     site: "HQ Vientiane",       door: "Floor 2 — ops",         device: "Suprema BioEntry W2",   modality: "fp",   vendor: "suprema", conf: 0.92, dir: "in",  flag: null         },
  { ts: "13:37:58", staff: "Saysamone Phommachanh", staffId: "EMP-00609", dept: "LPB Branch",         site: "Luang Prabang",      door: "Branch Front",          device: "Hik DS-K1T343MFWX",     modality: "card", vendor: "hik",     conf: 1.00, dir: "in",  flag: null         },
  { ts: "13:37:21", staff: "Visitor · V-2186",      staffId: "—",         dept: "Visitor",            site: "HQ Vientiane",       door: "HQ Lobby",              device: "Hik DS-K1T642MFW",      modality: "qr",   vendor: "hik",     conf: 1.00, dir: "in",  flag: "visitor"    },
  { ts: "13:36:55", staff: "Sisana Bouphaphanh",    staffId: "EMP-01098", dept: "LPB Branch",         site: "Luang Prabang",      door: "Tour liaison desk",     device: "iPad Air · iOS 18",     modality: "face", vendor: "selfie",  conf: 0.81, dir: "in",  flag: "low-conf"   },
  { ts: "13:36:02", staff: "Khamla Souvanhpheng",   staffId: "EMP-00871", dept: "Pakse Distribution", site: "Pakse Distribution", door: "Office wing",           device: "ZK MB360",              modality: "face", vendor: "zk",      conf: 0.94, dir: "in",  flag: null         },
];

/* Anomalies / investigations queue (rolling 24h) */
const ATTENDANCE_ANOMALIES = [
  { ts: "13:40:55", staff: "Manilay Khamphan",  staffId: "EMP-00533", site: "Pakse",                kind: "Low-confidence match",     severity: "low",  note: "Selfie 0.88 · sun glare · auto-flagged" },
  { ts: "13:36:55", staff: "Sisana Bouphaphanh",staffId: "EMP-01098", site: "Luang Prabang",        kind: "Low-confidence match",     severity: "low",  note: "Selfie 0.81 · iPad low-light" },
  { ts: "12:14:08", staff: "—",                 staffId: "EMP-00342", site: "Savannakhet Plant",    kind: "Anti-passback",            severity: "med",  note: "Two consecutive 'in' events · 8s gap · tailgating?" },
  { ts: "08:02:33", staff: "Bounmy Sengdara",   staffId: "EMP-00342", site: "Savannakhet Plant",    kind: "Late punch · 17 min",      severity: "med",  note: "Shift starts 07:45 · received 08:02" },
  { ts: "07:11:02", staff: "Khamphouy Sirisak", staffId: "EMP-00060", site: "HQ Vientiane",         kind: "Out-of-pattern early in",  severity: "low",  note: "First time before 07:30 in 60 days" },
  { ts: "06:48:21", staff: "—",                 staffId: "—",         site: "Pakse Distribution",   kind: "Device offline · 6m",      severity: "high", note: "ZK MB360 #2 lost heartbeat · auto-buffer engaged" },
];

/* Device inventory across the fleet */
const BIOMETRIC_DEVICES = [
  { id: "ZK-VTE-01",  vendor: "zk",      model: "ZK MB360",            site: "HQ Vientiane",       door: "Side B-1",          ip: "10.21.4.21",  fw: "6.20.7.21", staff: 312, lastSeen: "2s ago",  status: "online" },
  { id: "ZK-SVK-04",  vendor: "zk",      model: "ZK MB360",            site: "Savannakhet Plant",  door: "Plant Gate-1",      ip: "10.42.1.4",   fw: "6.20.7.21", staff: 286, lastSeen: "5s ago",  status: "online" },
  { id: "ZK-SVK-05",  vendor: "zk",      model: "ZK SpeedFace V5L",    site: "Savannakhet Plant",  door: "Locker B-2",        ip: "10.42.1.5",   fw: "6.20.7.21", staff: 286, lastSeen: "12s ago", status: "online" },
  { id: "ZK-PKS-02",  vendor: "zk",      model: "ZK MB360",            site: "Pakse Distribution", door: "Office wing",       ip: "10.55.2.2",   fw: "6.20.6.40", staff: 218, lastSeen: "2s ago",  status: "online" },
  { id: "ZK-PKS-03",  vendor: "zk",      model: "ZK MB360",            site: "Pakse Distribution", door: "Warehouse loop",    ip: "10.55.2.3",   fw: "6.20.6.40", staff: 218, lastSeen: "6m ago",  status: "offline" },
  { id: "HIK-VTE-01", vendor: "hik",     model: "Hik DS-K1T642MFW",    site: "HQ Vientiane",       door: "HQ Lobby",          ip: "10.21.4.50",  fw: "V2.2.34",   staff: 412, lastSeen: "11s ago", status: "online" },
  { id: "HIK-VTE-02", vendor: "hik",     model: "Hik DS-K1T343MFWX",   site: "HQ Vientiane",       door: "Floor 2 — ops",     ip: "10.21.4.52",  fw: "V2.2.34",   staff: 188, lastSeen: "30s ago", status: "online" },
  { id: "HIK-LPB-01", vendor: "hik",     model: "Hik DS-K1T343MFWX",   site: "Luang Prabang",      door: "Branch front",      ip: "10.71.0.10",  fw: "V2.2.30",   staff: 134, lastSeen: "1m ago",  status: "online" },
  { id: "DH-CMP-01",  vendor: "dahua",   model: "Dahua ASI7223X",      site: "Champasak Warehouse",door: "Gate-A",            ip: "10.61.0.4",   fw: "V2.620.20", staff: 64,  lastSeen: "1m ago",  status: "online" },
  { id: "SUP-VTE-01", vendor: "suprema", model: "Suprema X-Station 2", site: "HQ Vientiane",       door: "Floor 4 — exec",    ip: "10.21.4.80",  fw: "1.5.2",     staff: 28,  lastSeen: "44s ago", status: "online" },
  { id: "SUP-VTE-02", vendor: "suprema", model: "Suprema BioEntry W2", site: "HQ Vientiane",       door: "Server room",       ip: "10.21.4.81",  fw: "1.5.2",     staff: 12,  lastSeen: "2m ago",  status: "online" },
];

/* ---- Per-connector deep configuration (level-2/3 forms) ---- */
const BIOMETRIC_CONFIG = {
  zk: {
    summary: { lastSync: "2s ago", inFlight: 14, queue: 0, errors24h: 0 },
    auth: "Push SDK (ADMS) over HTTPS · device serial whitelist · HMAC-signed events",
    sections: [
      { title: "Server endpoint (devices push to us)", note: "ZKTeco MB360 / SpeedFace devices POST clock events to this URL.", fields: [
        { id: "endpoint",   label: "ADMS push URL",                  kind: "url",      readOnly: true,  value: "https://hrms.adeptio.la/iclock/cdata?SN={serial}" },
        { id: "tls",        label: "TLS cert fingerprint (SHA-256)", kind: "text",     readOnly: true,  value: "8B:4A:0E:33:F2:81:C7:B2:A9:54:7E:6C:11:B9:33:DD" },
        { id: "heartbeat",  label: "Heartbeat interval",             kind: "number",   value: 30, unit: "sec" },
        { id: "timeout",    label: "Push timeout",                   kind: "number",   value: 5,  unit: "sec" },
      ]},
      { title: "Authentication", fields: [
        { id: "apiKey",     label: "Tenant API key",                 kind: "password", value: "zk_8c4f1a3e9b2d6e5f0a1b2c3d4e5f6a7b" },
        { id: "hmac",       label: "HMAC shared secret",             kind: "password", value: "•••••••• (rotated 14 May)" },
        { id: "whitelist",  label: "Device serial whitelist",        kind: "textarea", value: "ZK-VTE-01\nZK-SVK-04\nZK-SVK-05\nZK-PKS-02\nZK-PKS-03", help: "One serial per line; events from non-listed devices are rejected at the edge." },
      ]},
      { title: "Event subscription", fields: [
        { id: "events",     label: "Subscribe to events",            kind: "checkboxes", value: ["attendance","enrol","alarm","doorOpen"], options: ["attendance","enrol","alarm","doorOpen","tamper","battery"] },
        { id: "tz",         label: "Device time zone",               kind: "select",   value: "Asia/Vientiane", options: ["Asia/Vientiane","Asia/Bangkok","Asia/Singapore","UTC"] },
        { id: "userIdField",label: "User ID field on payload",       kind: "select",   value: "PIN", options: ["PIN","userId","cardNo"] },
      ]},
      { title: "SDK fallback (offline mode)", note: "Engages when device cannot reach the internet — local agent pulls via SDK on port 4370.", fields: [
        { id: "fbHost",     label: "On-prem agent host",             kind: "text",     value: "10.21.4.10" },
        { id: "fbPort",     label: "Agent port (TCP)",               kind: "number",   value: 4370 },
        { id: "fbInterval", label: "Pull interval",                  kind: "number",   value: 60, unit: "sec" },
      ]},
    ],
  },
  hik: {
    summary: { lastSync: "11s ago", inFlight: 9, queue: 0, errors24h: 1 },
    auth: "Hikvision ISAPI (HTTP digest) for direct devices · OAuth2 for Artemis cloud",
    sections: [
      { title: "Mode", fields: [
        { id: "mode", label: "Connection mode", kind: "radio", value: "isapi-direct", options: [
          { id: "isapi-direct", label: "ISAPI direct · device push",   note: "Device → us. Best for on-prem deployments." },
          { id: "artemis",      label: "Artemis cloud bridge",          note: "Hikvision cloud → us via REST + webhook." },
        ]},
      ]},
      { title: "ISAPI · device endpoint", fields: [
        { id: "host",       label: "Device host or VLAN gateway",     kind: "text",     value: "10.21.4.50" },
        { id: "port",       label: "HTTPS port",                      kind: "number",   value: 443 },
        { id: "user",       label: "ISAPI admin user",                kind: "text",     value: "admin" },
        { id: "pass",       label: "ISAPI admin password",            kind: "password", value: "•••••••••••• (16 chars)" },
        { id: "authMode",   label: "Auth mode",                       kind: "select",   value: "digest", options: ["digest","basic","mTLS"] },
      ]},
      { title: "Event subscription (POST callback)", fields: [
        { id: "callback",   label: "Webhook callback URL",            kind: "url",      readOnly: true, value: "https://hrms.adeptio.la/biometric/hik/callback" },
        { id: "topics",     label: "Subscribe to event topics",       kind: "checkboxes", value: ["AccessControllerEvent","FaceCaptureEvent","AlarmEvent"], options: ["AccessControllerEvent","FaceCaptureEvent","AlarmEvent","DoorEvent","TamperEvent"] },
        { id: "format",     label: "Payload format",                  kind: "select",   value: "json", options: ["json","xml"] },
        { id: "verifyTLS",  label: "Verify outbound TLS to Hik device", kind: "toggle", value: true },
      ]},
      { title: "Artemis cloud (alternative)", fields: [
        { id: "appKey",     label: "Artemis App key",                 kind: "text",     value: "27ad6e1f-..." },
        { id: "appSecret",  label: "Artemis App secret",              kind: "password", value: "•••••••••••• (32 chars)" },
        { id: "region",     label: "Region",                          kind: "select",   value: "ap-southeast-1", options: ["ap-southeast-1","ap-east-1","eu-west-1"] },
      ]},
    ],
  },
  dahua: {
    summary: { lastSync: "1m 04s ago", inFlight: 3, queue: 0, errors24h: 0 },
    auth: "DH SDK over TCP (37777) · DSS Pro REST · on-prem agent forwards events to HRMS",
    sections: [
      { title: "On-prem agent", note: "Adeptio agent runs on the local LAN and forwards events to the cloud HRMS over outbound HTTPS.", fields: [
        { id: "agentVer",   label: "Agent version",                   kind: "text",     readOnly: true, value: "adeptio-agent v1.4.2" },
        { id: "activation", label: "Activation token",                kind: "password", value: "agt_••••••••••• (rotates monthly)" },
        { id: "agentHost",  label: "Agent host (LAN)",                kind: "text",     value: "10.61.0.10" },
        { id: "outbound",   label: "Outbound HTTPS to",               kind: "url",      readOnly: true, value: "https://agent.adeptio.la/relay" },
      ]},
      { title: "DSS Pro server (vendor cloud)", fields: [
        { id: "dssHost",    label: "DSS Pro host",                    kind: "text",     value: "dss.lao-beverage.local" },
        { id: "dssPort",    label: "DSS REST port",                   kind: "number",   value: 443 },
        { id: "dssUser",    label: "DSS service account",             kind: "text",     value: "svc-adeptio" },
        { id: "dssPass",    label: "DSS password",                    kind: "password", value: "•••••••••••• (24 chars)" },
      ]},
      { title: "Direct SDK (bypass DSS)", fields: [
        { id: "sdkPort",    label: "SDK TCP port",                    kind: "number",   value: 37777 },
        { id: "sdkProto",   label: "Protocol",                        kind: "select",   value: "DH_NetSDK_v3", options: ["DH_NetSDK_v3","DH_NetSDK_v2"] },
        { id: "channels",   label: "Channel → door mapping",          kind: "textarea", value: "1 → Gate-A\n2 → Gate-B\n3 → Loading dock", help: "One mapping per line, vendor channel index → HRMS door label." },
      ]},
      { title: "Resilience", fields: [
        { id: "buffer",     label: "Local offline buffer",            kind: "number",   value: 24, unit: "hours" },
        { id: "encrypt",    label: "Encrypt local buffer (AES-256)",  kind: "toggle",   value: true },
      ]},
    ],
  },
  suprema: {
    summary: { lastSync: "44s ago", inFlight: 4, queue: 0, errors24h: 0 },
    auth: "BioStar 2 REST · BioStar Air OAuth2",
    sections: [
      { title: "BioStar 2 server", fields: [
        { id: "host",     label: "BioStar 2 host",       kind: "text",     value: "biostar.lao-beverage.local" },
        { id: "port",     label: "Port",                 kind: "number",   value: 443 },
        { id: "user",     label: "BioStar admin",        kind: "text",     value: "adeptio-svc" },
        { id: "pass",     label: "Password",             kind: "password", value: "•••••••••••• (20 chars)" },
      ]},
      { title: "BioStar Air (cloud)", fields: [
        { id: "clientId", label: "OAuth2 client ID",     kind: "text",     value: "biostar-air-9f3a2c1b" },
        { id: "clientSecret", label: "Client secret",    kind: "password", value: "•••••••••••• (32 chars)" },
      ]},
    ],
  },
  selfie: {
    summary: { lastSync: "5s ago", inFlight: 142, queue: 0, errors24h: 2 },
    auth: "Mobile SDK · device-bound key · 3D liveness",
    sections: [
      { title: "Mobile SDK", fields: [
        { id: "ios",   label: "iOS bundle ID",          kind: "text", value: "la.adeptio.staff.portal" },
        { id: "and",   label: "Android package",        kind: "text", value: "la.adeptio.staff" },
        { id: "live",  label: "Liveness threshold",     kind: "number", value: 0.85, unit: "score" },
        { id: "geo",   label: "Geofence radius (default)", kind: "number", value: 150, unit: "metres" },
      ]},
    ],
  },
  webhook: {
    summary: { lastSync: "—", inFlight: 0, queue: 0, errors24h: 0 },
    auth: "POST JSON · HMAC-SHA256 signature · IP allowlist",
    sections: [
      { title: "Inbound endpoint", fields: [
        { id: "url",     label: "Receive URL",                  kind: "url", readOnly: true, value: "https://hrms.adeptio.la/biometric/webhook/{tenant}" },
        { id: "secret",  label: "HMAC signing secret",          kind: "password", value: "•••••••••••• (rotate)" },
        { id: "schema",  label: "Expected payload schema",      kind: "textarea", value: '{ "ts": "ISO-8601", "staffId": "string", "site": "string", "modality": "face|fp|card|pin|qr", "conf": 0.0-1.0, "dir": "in|out" }' },
      ]},
    ],
  },
};

/* ---- Add-Connector wizard — pattern templates ---- */
const ADD_CONNECTOR_TEMPLATES = {
  POST: {
    title: "Push (POST) — devices send to us",
    description: "Use when the device or platform can POST events to a public HTTPS endpoint. We provide the URL; you configure the device to call it.",
    fields: [
      { id: "name",      label: "Connector name",                  kind: "text",     value: "",        placeholder: "e.g. ZKTeco · Pakse depot" },
      { id: "endpoint",  label: "Inbound URL (we provide)",        kind: "url",      readOnly: true,  value: "https://hrms.adeptio.la/biometric/post/{token}" },
      { id: "auth",      label: "Auth method",                      kind: "select",   value: "hmac",   options: ["hmac","bearer","mTLS","none"] },
      { id: "secret",    label: "HMAC shared secret",               kind: "password", value: "",       placeholder: "32+ random chars" },
      { id: "ipAllow",   label: "Allowed source IPs (CIDR)",        kind: "textarea", value: "",       placeholder: "10.21.0.0/16\n203.0.113.0/24" },
      { id: "schema",    label: "Payload schema (JSON example)",    kind: "textarea", value: '{\n  "ts": "2026-05-13T07:51:14Z",\n  "staffId": "EMP-00118",\n  "site": "HQ Vientiane",\n  "door": "Lobby",\n  "modality": "face",\n  "conf": 0.97,\n  "dir": "in"\n}' },
      { id: "sigHeader", label: "Signature header name",            kind: "text",     value: "X-Adeptio-Signature" },
      { id: "rate",      label: "Rate limit (requests/sec)",        kind: "number",   value: 50,       unit: "rps" },
    ],
  },
  GET: {
    title: "Pull (GET) — we poll the vendor API",
    description: "Use when the vendor exposes a REST endpoint we can poll on a schedule. Best for legacy or read-only systems.",
    fields: [
      { id: "name",      label: "Connector name",                  kind: "text",     value: "",        placeholder: "e.g. Anviz CrossChex · Vientiane" },
      { id: "url",       label: "Endpoint URL",                     kind: "url",      value: "",        placeholder: "https://api.vendor.com/v1/events" },
      { id: "method",    label: "HTTP method",                      kind: "select",   value: "GET",    options: ["GET","POST"] },
      { id: "auth",      label: "Auth header",                      kind: "select",   value: "bearer", options: ["bearer","apiKey","basic","oauth2-cc","none"] },
      { id: "token",     label: "Bearer / API key",                 kind: "password", value: "" },
      { id: "headers",   label: "Extra headers",                    kind: "textarea", value: "Accept: application/json\nX-Tenant: lao-bev" },
      { id: "params",    label: "Query parameters",                 kind: "textarea", value: "since={lastCursor}\nlimit=500" },
      { id: "interval",  label: "Polling interval",                 kind: "number",   value: 60,       unit: "sec" },
      { id: "cursor",    label: "Cursor field on response",         kind: "text",     value: "next_since" },
      { id: "pathItems", label: "JSON path to event array",         kind: "text",     value: "$.data.events" },
    ],
  },
  cloud: {
    title: "Cloud bridge — vendor cloud → us",
    description: "Use when the vendor exposes a hosted SaaS (OAuth2 + webhooks). We exchange tokens with their cloud and subscribe to their event feed.",
    fields: [
      { id: "name",       label: "Connector name",                 kind: "text",     value: "",        placeholder: "e.g. Verkada · APAC tenant" },
      { id: "tokenUrl",   label: "OAuth2 token URL",                kind: "url",      value: "",        placeholder: "https://api.vendor.com/oauth2/token" },
      { id: "clientId",   label: "Client ID",                       kind: "text",     value: "" },
      { id: "secret",     label: "Client secret",                   kind: "password", value: "" },
      { id: "grant",      label: "Grant type",                      kind: "select",   value: "client_credentials", options: ["client_credentials","authorization_code","refresh_token"] },
      { id: "scopes",     label: "Scopes (space-separated)",        kind: "text",     value: "events:read devices:read users:read" },
      { id: "region",     label: "Region",                          kind: "select",   value: "ap-southeast-1", options: ["ap-southeast-1","ap-east-1","eu-west-1","us-east-1"] },
      { id: "tenantId",   label: "Tenant / org ID",                 kind: "text",     value: "" },
      { id: "webhookUrl", label: "Webhook URL we expose",           kind: "url",      readOnly: true, value: "https://hrms.adeptio.la/biometric/cloud/{tenantId}/events" },
      { id: "events",     label: "Subscribe to events",             kind: "checkboxes", value: ["access.granted","access.denied"], options: ["access.granted","access.denied","face.captured","alarm.raised","device.offline"] },
      { id: "verify",     label: "Verify webhook signature",        kind: "toggle",   value: true },
    ],
  },
  agent: {
    title: "On-prem agent — local relay forwards to cloud",
    description: "Use for legacy SDK-only fleets or air-gapped sites. Install Adeptio agent on the office LAN; it talks vendor SDK locally and forwards normalised events to us.",
    fields: [
      { id: "name",       label: "Connector name",                 kind: "text",     value: "",        placeholder: "e.g. Dahua · Champasak warehouse" },
      { id: "platform",   label: "Agent platform",                  kind: "select",   value: "linux-x86", options: ["linux-x86","linux-arm","windows","docker"] },
      { id: "activation", label: "Activation token (use once)",     kind: "password", value: "agt_5f3c9a2e1d8b4f0c6e7a3b2c1d4e5f6a" },
      { id: "downloadUrl",label: "Download URL",                    kind: "url",      readOnly: true, value: "https://dl.adeptio.la/agent/v1.4.2/adeptio-agent-linux-x86.tar.gz" },
      { id: "buffer",     label: "Local buffer if cloud unreachable", kind: "number", value: 24,       unit: "hours" },
      { id: "vendorSdk",  label: "Vendor SDK to use",               kind: "select",   value: "dh-netsdk-v3", options: ["dh-netsdk-v3","zk-pull-v6","hik-isapi","suprema-biostar","custom"] },
    ],
  },
  mobile: {
    title: "Mobile — phone-as-credential",
    description: "Use for field staff and no-hardware sites. Staff authenticate with selfie + 3D liveness inside a geofence; events sync via the mobile SDK.",
    fields: [
      { id: "name",       label: "Connector name",                 kind: "text",     value: "Field reps · Pakse" },
      { id: "ios",        label: "iOS bundle ID",                   kind: "text",     value: "la.adeptio.staff" },
      { id: "and",        label: "Android package",                 kind: "text",     value: "la.adeptio.staff" },
      { id: "liveness",   label: "Liveness threshold",              kind: "number",   value: 0.85,     unit: "score" },
      { id: "geo",        label: "Default geofence radius",         kind: "number",   value: 150,      unit: "m" },
      { id: "offline",    label: "Allow offline punches (sync later)", kind: "toggle", value: true },
    ],
  },
};

/* ---- Connector logs (mock tail) ---- */
const CONNECTOR_LOGS = {
  zk: [
    { ts: "13:42:09", level: "info",  msg: "ZK-VTE-01 → POST /iclock/cdata · 200 · 42 ms · pin=00118 face=0.97 in" },
    { ts: "13:41:47", level: "info",  msg: "ZK-SVK-04 → POST /iclock/cdata · 200 · 38 ms · pin=00342 fp=0.91 out" },
    { ts: "13:39:11", level: "info",  msg: "ZK-SVK-04 → POST /iclock/cdata · 200 · 41 ms · pin=00712 face=0.97 in" },
    { ts: "06:48:21", level: "warn",  msg: "ZK-PKS-03 heartbeat missed (>120s) · auto-buffer engaged · queued=4" },
    { ts: "06:54:10", level: "info",  msg: "ZK-PKS-03 reconnected · drained 4 buffered events" },
  ],
  hik: [
    { ts: "13:41:01", level: "info",  msg: "HIK-VTE-01 callback · AccessControllerEvent · staff=01205 face=0.99 in" },
    { ts: "13:38:46", level: "info",  msg: "HIK-VTE-01 callback · AccessControllerEvent · staff=00276 face=0.95 out" },
    { ts: "10:14:32", level: "warn",  msg: "ISAPI digest auth failed once (HIK-LPB-01) · retried OK" },
  ],
  dahua: [
    { ts: "13:39:41", level: "info",  msg: "agent · DH-CMP-01 · channel=2 · card=A38B91 out · forwarded" },
    { ts: "12:01:02", level: "info",  msg: "agent · keepalive ok · queue=0 · cloud rtt=82ms" },
  ],
};

/* ---- Policy compliance / Analytics report ----
 * NOTE: per-kind metadata (label · tone · threshold rule) lives in POLICY_THRESHOLDS
 * (src/policy-ledger.jsx). The arrays below are computed projections of POLICY_LEDGER
 * for HR-side displays. Org-wide totals (e.g. 142 late MTD across 1,248 staff) are kept
 * as separate aggregates because the ledger holds only the visible sample.
 */

/* Org-wide MTD totals — sourced from the full T&A pipeline, not just the visible ledger */
const POLICY_KIND_TOTALS = {
  late: 142, early: 86, noshow: 24, ot_unapprov: 38, antipassback: 12, lowconf: 56, missing_pair: 31, geo_out: 8,
};
const POLICY_KIND_DELTA = {
  late: -8.2, early: +3.1, noshow: -12.0, ot_unapprov: +14.0, antipassback: +50.0, lowconf: -4.0, missing_pair: -2.0, geo_out: +33.0,
};

/* POLICY_KINDS — kept as a flat array for the KPI strip rendering, derived from the threshold catalog */
const POLICY_KINDS = Object.entries(POLICY_THRESHOLDS).map(([id, def]) => ({
  id, label: def.label, short: def.short, tone: def.tone, threshold: def.rule,
  count: POLICY_KIND_TOTALS[id] || 0,
  deltaPct: POLICY_KIND_DELTA[id] || 0,
}));

/* Top offenders — derived from the ledger by counting incidents per staff (last 30 days) */
const POLICY_TOP_OFFENDERS = (() => {
  const rollup = {};
  for (const e of POLICY_LEDGER) {
    if (!e.staffId) continue;
    const r = rollup[e.staffId] || (rollup[e.staffId] = {
      staff: e.staffName, staffId: e.staffId, dept: e.dept, site: e.site,
      late: 0, early: 0, noshow: 0, otUn: 0, lowconf: 0, other: 0, total: 0,
    });
    r.total += 1;
    if (e.kind === "late") r.late += 1;
    else if (e.kind === "early") r.early += 1;
    else if (e.kind === "noshow") r.noshow += 1;
    else if (e.kind === "ot_unapprov") r.otUn += 1;
    else if (e.kind === "lowconf") r.lowconf += 1;
    else r.other += 1;
  }
  // attach status from shared POLICY_WARNING_LEVELS rules
  return Object.values(rollup)
    .map(r => ({ ...r, status: policyStatus(r.total).id, trend: 0 /* no historical data in ledger; left at 0 */ }))
    .sort((a, b) => b.total - a.total);
})();

/* 12-week trend (kept hard-coded — historical data outside the 30-day ledger window) */
const POLICY_TREND_12W = [
  { w: "W7",  late: 38, early: 22 }, { w: "W8",  late: 41, early: 18 }, { w: "W9",  late: 36, early: 24 },
  { w: "W10", late: 44, early: 26 }, { w: "W11", late: 32, early: 30 }, { w: "W12", late: 28, early: 22 },
  { w: "W13", late: 35, early: 28 }, { w: "W14", late: 30, early: 24 }, { w: "W15", late: 26, early: 20 },
  { w: "W16", late: 33, early: 26 }, { w: "W17", late: 38, early: 24 }, { w: "W18", late: 29, early: 22 },
];

/* By-division breakdown — counts derived from ledger; rate uses DIVISIONS roster sizes */
const POLICY_BY_DIVISION = (() => {
  const _site2div = {
    "HQ Vientiane": "HQ Vientiane",
    "Savannakhet Plant": "Savannakhet Plant",
    "Pakse Distribution": "Pakse Distribution",
    "Pakse": "Pakse Distribution",
    "Luang Prabang": "Luang Prabang",
  };
  const _rosterByDiv = { "HQ Vientiane": 412, "Savannakhet Plant": 286, "Pakse Distribution": 218, "Luang Prabang": 134, "Field Sales": 198 };
  const counts = {};
  for (const e of POLICY_LEDGER) {
    const div = _site2div[e.site] || e.site;
    counts[div] = (counts[div] || 0) + 1;
  }
  // augment with org-wide MTD adjustments (so the displayed rates reflect more than the visible ledger)
  const orgScale = 4.5; // ledger is ~22% of org-wide MTD; multiplier brings it close to actual reported rates
  return Object.keys(_rosterByDiv).map(div => ({
    div,
    total: Math.round((counts[div] || 0) * orgScale),
    rate: ((counts[div] || 0) * orgScale) / _rosterByDiv[div],
    trend: 0,
  })).sort((a, b) => b.total - a.total);
})();

/* Recent incidents — projection of the ledger (latest N) */
const POLICY_INCIDENTS_RECENT = policyRecent(POLICY_LEDGER, 8).map(e => ({
  id: e.id,
  ts: policyFmtTs(e.ts).split(" ").slice(-1)[0] || policyFmtTs(e.ts),  // HH:MM portion when same day
  staff: e.staffName,
  staffId: e.staffId || "—",
  kind: e.kind,
  site: e.site,
  detail: e.detail,
  severity: e.severity,
}));

Object.assign(window, {
  DIVISIONS, TIMEFRAMES, KPIS, HEADCOUNT_TREND, DIV_BREAKDOWN, LEAVE_BY_TYPE,
  ATTENDANCE_HEAT, APPROVALS, UPCOMING, STAFF, POSTS, POLICIES, PAYROLL_RUNS,
  BIOMETRIC_CONNECTORS, BIOMETRIC_AVAILABLE, BIOMETRIC_MODALITIES, BIOMETRIC_DEVICES,
  BIOMETRIC_CONFIG, ADD_CONNECTOR_TEMPLATES, CONNECTOR_LOGS,
  ATTENDANCE_TODAY, ATTENDANCE_EVENTS, ATTENDANCE_ANOMALIES,
  POLICY_KINDS, POLICY_TOP_OFFENDERS, POLICY_TREND_12W, POLICY_BY_DIVISION, POLICY_INCIDENTS_RECENT,
  formatLAK, delta,
});
