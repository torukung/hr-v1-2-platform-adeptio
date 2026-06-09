/* Web Staff Portal — desktop self-service ESS
   Single-tenant, EN/LO bilingual, deep-navy + cream paper aesthetic
   Loaded by Web Staff Portal.html
*/


/* ---------- Icon set (stroke 1.7) ---------- */
const ICONS = {
  home:    <><path d="M3 11l9-7 9 7M5 10v10h14V10" /></>,
  user:    <><circle cx="12" cy="9" r="3.6" /><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" /></>,
  pay:     <><rect x="3.5" y="6" width="17" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /></>,
  leave:   <><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3.5v3M16 3.5v3M8 13l2 2 4-4" /></>,
  claim:   <><rect x="3.5" y="6" width="17" height="13" rx="2" /><path d="M3.5 10h17M7 14h3M7 16.5h5" /></>,
  vault:   <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><circle cx="14" cy="12" r="2.6" /><path d="M14 9.5v-1M7 10v4" /></>,
  chat:    <><path d="M4 5h16v11H8l-4 4z" /></>,
  book:    <><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z" /></>,
  bell:    <><path d="M6 9.5a6 6 0 0 1 12 0V14l1.5 2.5h-15L6 14V9.5z" /><path d="M9.5 19a2.5 2.5 0 0 0 5 0" /></>,
  search:  <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></>,
  plus:    <><path d="M12 5v14M5 12h14" /></>,
  chev:    <><path d="M9 6l6 6-6 6" /></>,
  chevD:   <><path d="M6 9l6 6 6-6" /></>,
  chevR:   <><path d="M9 6l6 6-6 6" /></>,
  check:   <><path d="M5 12l5 5L20 7" /></>,
  x:       <><path d="M6 6l12 12M6 18L18 6" /></>,
  clock:   <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  flag:    <><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></>,
  download:<><path d="M12 4v11M7 11l5 5 5-5M5 19h14" /></>,
  file:    <><path d="M14 3H6v18h12V7zM14 3v4h4" /></>,
  upload:  <><path d="M12 19V8M7 12l5-5 5 5M5 4h14" /></>,
  arrow:   <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></>,
  dot:     <><circle cx="12" cy="12" r="3" /></>,
  target:  <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /></>,
  pin:     <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>,
  bank:    <><path d="M3 10l9-5 9 5M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18" /></>,
  cog:     <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
  grid:    <><rect x="3.5" y="3.5" width="7" height="7" /><rect x="13.5" y="3.5" width="7" height="7" /><rect x="3.5" y="13.5" width="7" height="7" /><rect x="13.5" y="13.5" width="7" height="7" /></>,
  cal:     <><rect x="3.5" y="4.5" width="17" height="16" rx="2" /><path d="M3.5 9h17M8 3.5v3M16 3.5v3" /></>,
  phone:   <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 19h2" /></>,
  logout:  <><path d="M14 4h5v16h-5M14 12H4M8 8l-4 4 4 4" /></>,
  edit:    <><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" /></>,
  chip:    <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 8h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16" /></>,
  flow:    <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="3" width="6" height="6" rx="1.5" /><rect x="9" y="15" width="6" height="6" rx="1.5" /><path d="M9 6h6M12 9v6" /></>,
  book2:   <><path d="M4 5h7a3 3 0 0 1 3 3v12H7a3 3 0 0 1-3-3z" /><path d="M14 8a3 3 0 0 1 3-3h3v15h-3a3 3 0 0 0-3 3" /></>,
};
const I = ({ n, s = 16, c = "currentColor", w = 1.7 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{ICONS[n]}</svg>
);
