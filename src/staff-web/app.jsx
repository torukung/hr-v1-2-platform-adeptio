/* Web Staff Portal — app (split from staff-web.jsx) */

/* ---------- ROUTER ---------- */
// Frozen route map — replaces stringly-typed setRoute("home") calls
const ROUTES = Object.freeze({
  HOME:"home",PROFILE:"profile",PAY:"pay",LEAVE:"leave",CLAIMS:"claims",
  DOCS:"docs",HELPDESK:"helpdesk",LEARN:"learn",PERF:"perf",SETTINGS:"settings"
});

function App() {
  const [route, setRoute] = React.useState(ROUTES.HOME);
  const [lang, setLang] = React.useState("en");

  const Page = {
    [ROUTES.HOME]: HomePage, [ROUTES.PROFILE]: ProfilePage, [ROUTES.PAY]: PayPage,
    [ROUTES.LEAVE]: LeavePage, [ROUTES.CLAIMS]: ClaimsPage, [ROUTES.DOCS]: DocsPage,
    [ROUTES.HELPDESK]: HelpPage, [ROUTES.LEARN]: LearnPage, [ROUTES.PERF]: PerfPage,
  }[route] || HomePage;

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [route]);

  return (
    <div className={"shell " + (lang === "lo" ? "lao-mode" : "")}>
      <Sidebar route={route} setRoute={setRoute} lang={lang} />
      <div className="main">
        <TopBar lang={lang} setLang={setLang} route={route} setRoute={setRoute} />
        <main id="main" className="content">
          <Page lang={lang} setRoute={setRoute} />
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
