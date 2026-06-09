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

Object.assign(window, {
  DIVISIONS, TIMEFRAMES, KPIS, HEADCOUNT_TREND, DIV_BREAKDOWN, LEAVE_BY_TYPE,
  ATTENDANCE_HEAT, APPROVALS, UPCOMING, STAFF, POSTS, POLICIES, PAYROLL_RUNS,
  formatLAK, delta,
});
