/* Web Staff Portal — data (split from staff-web.jsx) */

/* ---------- Mock identity + data ---------- */
const ME = {
  id: "EMP-00427",
  nameEn: "Souksavanh Phommachanh",
  nameLo: "ສຸກສະຫວັນ ພົມມະຈັນ",
  title: "Senior Production Supervisor",
  titleLo: "ຫົວໜ້າຝ່າຍຜະລິດອາວຸໂສ",
  division: "Savannakhet Plant",
  divisionLo: "ໂຮງງານ ສະຫວັນນະເຂດ",
  department: "Bottling Line A",
  manager: "Khamla Chanthavong",
  joined: "2017-03-14",
  email: "souksavanh.p@laobev.la",
  phone: "+856 20 5544 0127",
  bank: "BCEL · ····8821",
  nssf: "12-04-1985-0427",
  pit: "TIN 5500-04-0427",
  avatar: "SP",
};

const REQUESTS = [
  { id: "LV-2025-0814", kind: "Annual Leave", lo: "ລາພັກ", date: "Aug 14–16", days: 3, status: "approved",  step: "All approvers signed", t: "Aug 02" },
  { id: "OT-2025-0801", kind: "Overtime",     lo: "ລ່ວງເວລາ", date: "Aug 01 · 4h", days: null, status: "approved", step: "Posted to payroll", t: "Aug 01" },
  { id: "EX-2025-0734", kind: "Travel claim", lo: "ຂໍອະນຸມັດເບີກ", date: "Vientiane site visit", days: null, status: "review", step: "Finance · Sengthong", t: "Jul 30" },
  { id: "MC-2025-0720", kind: "Sick leave",   lo: "ລາປ່ວຍ", date: "Jul 18 (1d)", days: 1, status: "approved", step: "MC verified by clinic", t: "Jul 19" },
  { id: "LT-2025-0701", kind: "Letter request", lo: "ໜັງສືຮັບຮອງ", date: "Salary cert · embassy", days: null, status: "draft", step: "Awaiting your e-signature", t: "Jul 29" },
];

const PAY_HISTORY = [
  { m: "Jul 2025", gross: 9_650_000, net: 8_124_500, pit: 824_500, nssf: 451_000, pf: 250_000, ot: 320_000 },
  { m: "Jun 2025", gross: 9_330_000, net: 7_896_400, pit: 786_600, nssf: 451_000, pf: 250_000, ot: 0 },
  { m: "May 2025", gross: 9_330_000, net: 7_896_400, pit: 786_600, nssf: 451_000, pf: 250_000, ot: 0 },
  { m: "Apr 2025", gross: 9_510_000, net: 8_038_200, pit: 802_800, nssf: 451_000, pf: 250_000, ot: 180_000 },
  { m: "Mar 2025", gross: 9_330_000, net: 7_896_400, pit: 786_600, nssf: 451_000, pf: 250_000, ot: 0 },
  { m: "Feb 2025", gross: 9_330_000, net: 7_896_400, pit: 786_600, nssf: 451_000, pf: 250_000, ot: 0 },
];

const ANNOUNCEMENTS = [
  { tag: "Policy",    en: "Updated overtime policy effective Sept 1, 2025", lo: "ນະໂຍບາຍລ່ວງເວລາສະບັບປັບປຸງມີຜົນວັນທີ 1 ກັນຍາ 2025", date: "Aug 03", divisionTag: "All divisions" },
  { tag: "Holiday",   en: "Boun Haw Khao Padap Dinh — Sept 6 (paid holiday)", lo: "ບຸນຫໍ່ເຂົ້າປະດັບດິນ — ວັນທີ 6 ກັນຍາ (ມື້ພັກລັດຖະການ)", date: "Aug 02", divisionTag: "Lao operations" },
  { tag: "Recognition", en: "Q2 Safety Champions announced — Bottling Line A", lo: "ປະກາດແຊ້ມຄວາມປອດໄພໄຕມາດ 2 — ສາຍບັນຈຸຂວດ A", date: "Aug 01", divisionTag: "Savannakhet" },
  { tag: "Training",  en: "GMP refresher for production staff — Aug 22", lo: "ຝຶກອົບຮົມ GMP ສຳລັບພະນັກງານຜະລິດ — 22 ສິງຫາ", date: "Jul 30", divisionTag: "Production" },
];

const HOLIDAYS_LAO = {
  8:  [], // Aug
  9:  [{ d: 6, en: "Boun Haw Khao Padap Dinh", lo: "ບຸນຫໍ່ເຂົ້າປະດັບດິນ" }, { d: 20, en: "Boun Haw Khao Salak", lo: "ບຸນຫໍ່ເຂົ້າສະຫຼາກ" }],
  10: [{ d: 7, en: "Boun Awk Phansa", lo: "ບຸນອອກພັນສາ" }, { d: 8, en: "Boun Suang Heua", lo: "ບຸນຊ່ວງເຮືອ" }],
  12: [{ d: 2, en: "Lao National Day", lo: "ວັນຊາດລາວ" }],
};

const TICKETS = [
  { id: "HD-3142", subj: "Provident fund balance not visible", subjLo: "ຍອດກອງທຶນສຳຮອງລ້ຽງຊີບບໍ່ສະແດງ", cat: "Pay & Statutory", status: "open",     sla: "4h 12m", agent: "Phetdara V.", t: "2h ago" },
  { id: "HD-3128", subj: "Update emergency contact", subjLo: "ປັບປຸງຜູ້ຕິດຕໍ່ສຸກເສີນ", cat: "Profile", status: "resolved", sla: "—", agent: "Auto-routed", t: "Yesterday" },
  { id: "HD-3097", subj: "Salary certificate for housing loan", subjLo: "ໜັງສືຮັບຮອງເງິນເດືອນສຳລັບກູ້ຢືມບ້ານ", cat: "Documents", status: "resolved", sla: "—", agent: "HR Front Desk",  t: "Jul 21" },
];

const COURSES = [
  { id: "L-201", t: "GMP Refresher 2025", lo: "ຝຶກອົບຮົມ GMP 2025", due: "Aug 22", progress: 64, mins: 45 },
  { id: "L-184", t: "Forklift Recertification", lo: "ຕໍ່ໃບອະນຸຍາດຂັບລົດຍົກ", due: "Sept 10", progress: 0, mins: 90 },
  { id: "L-152", t: "Cybersecurity Essentials", lo: "ພື້ນຖານຄວາມປອດໄພໄຊເບີ", due: "Completed", progress: 100, mins: 30 },
  { id: "L-120", t: "Anti-Bribery Annual Attest", lo: "ການຢັ້ງຢືນຕ້ານການຕິດສິນບົນ", due: "Dec 31", progress: 0, mins: 20 },
];

const PERFORMANCE = {
  cycle: "H2 2025",
  selfDue: "Sept 30",
  objectives: [
    { t: "Reduce line A downtime to <3.5%", lo: "ຫຼຸດເວລາຢຸດສາຍ A ໃຫ້ <3.5%", weight: 30, progress: 78 },
    { t: "Train 6 new operators on SOP-12", lo: "ຝຶກພະນັກງານໃໝ່ 6 ຄົນ SOP-12", weight: 25, progress: 50 },
    { t: "Zero recordable safety incidents", lo: "ບໍ່ມີເຫດການຄວາມປອດໄພ", weight: 25, progress: 100 },
    { t: "Implement OEE dashboard for shift leads", lo: "ຕິດຕັ້ງ Dashboard OEE", weight: 20, progress: 30 },
  ],
};

const CLAIM_HISTORY = [
  { id: "EX-0734", t: "Vientiane site visit",   lo: "ໄປສະຖານທີ່ ວຽງຈັນ", amt: 1_240_000, status: "review",  date: "Jul 30" },
  { id: "EX-0712", t: "Client dinner — partner", lo: "ຄ່າຮັບຮອງລູກຄ້າ", amt: 680_000,   status: "approved", date: "Jul 22" },
  { id: "EX-0701", t: "Mobile data top-up Q3",   lo: "ຄ່າອິນເຕີເນັດ ໄຕມາດ 3", amt: 360_000, status: "approved", date: "Jul 14" },
  { id: "EX-0688", t: "Stationery — line office", lo: "ເຄື່ອງຂຽນ ຫ້ອງສາຍຜະລິດ", amt: 180_000,  status: "approved", date: "Jul 02" },
];

const fmtLAK = (n) => "₭ " + n.toLocaleString("en-US");
