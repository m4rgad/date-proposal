import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Music2, Sparkles, SunMedium, Moon } from "lucide-react";
import Landing from "./components/Landing";
import PolaroidWall from "./components/PolaroidWall";
import MusicRoom from "./components/MusicRoom";
import BirthdayCountdown from "./components/BirthdayCountdown";
import OpenWhen from "./components/OpenWhen";
import FlowerGarden from "./components/FlowerGarden";
import Finale from "./components/Finale";
import Cursor from "./components/Cursor";

const sections = [
  { id: "polaroids", title: "Polaroids" },
  { id: "music", title: "Music" },
  { id: "birthday-countdown", title: "Birthday" },
  { id: "open-when", title: "Letters" },
  { id: "garden", title: "Garden" },
  { id: "finale", title: "Finale" }
];

const PASSWORD = "1234";

export default function App() {
  const [phase, setPhase] = useState<"landing" | "site">("landing");
  const [entryError, setEntryError] = useState("");
  const [dark, setDark] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [rainOn, setRainOn] = useState(false);
  const [firefliesOn, setFirefliesOn] = useState(false);
  const [page, setPage] = useState(sections[0].id);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("scrapbook-theme");
    const storedPage = window.localStorage.getItem("scrapbook-page");
    const storedRain = window.localStorage.getItem("scrapbook-rain");
    const storedFireflies = window.localStorage.getItem("scrapbook-fireflies");
    if (storedTheme) setDark(storedTheme === "dark");
    if (storedPage && sections.some((section) => section.id === storedPage)) setPage(storedPage as typeof page);
    if (storedRain) setRainOn(storedRain === "true");
    if (storedFireflies) setFirefliesOn(storedFireflies === "true");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("scrapbook-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    window.localStorage.setItem("scrapbook-page", page);
  }, [page]);

  useEffect(() => {
    window.localStorage.setItem("scrapbook-rain", String(rainOn));
  }, [rainOn]);

  useEffect(() => {
    window.localStorage.setItem("scrapbook-fireflies", String(firefliesOn));
  }, [firefliesOn]);

  const renderPage = () => {
    switch (page) {
      case "polaroids":
        return <PolaroidWall />;
      case "music":
        return <MusicRoom />;
      case "birthday-countdown":
        return <BirthdayCountdown />;
      case "open-when":
        return <OpenWhen />;
      case "garden":
        return <FlowerGarden />;
      case "finale":
        return <Finale />;
      default:
        return <PolaroidWall />;
    }
  };

  const pageIndex = sections.findIndex((section) => section.id === page);
  const progress = ((pageIndex + 1) / sections.length) * 100;
  const pageTitle = sections.find((section) => section.id === page)?.title ?? "Scrapbook";
  const hasPrev = pageIndex > 0;
  const hasNext = pageIndex < sections.length - 1;
  const prevPage = hasPrev ? sections[pageIndex - 1].id : null;
  const nextPage = hasNext ? sections[pageIndex + 1].id : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent text-cream selection:bg-blush/40">
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
      </div>
      <Cursor />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,237,218,0.18),transparent_26%),linear-gradient(180deg,rgba(255,225,205,0.14),transparent_42%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(255,226,198,0.16),transparent_40%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[url('/src/assets/texture-paper.png')] opacity-6" />
      {rainOn && <div className="pointer-events-none rain-mode" />}
      {firefliesOn && <div className="pointer-events-none fireflies-mode" />}
      <div className="pointer-events-none absolute right-12 top-32 hidden h-28 w-28 rounded-full bg-blush/12 blur-3xl lg:block" />

      <AnimatePresence mode="wait">
        {phase === "landing" ? (
          <Landing
            onBegin={(password: string) => {
              if (password === PASSWORD) {
                setEntryError("");
                setPhase("site");
                setPage("polaroids");
              } else {
                setEntryError("That password is not correct.");
              }
            }}
            entryError={entryError}
            soundOn={soundOn}
            setSoundOn={setSoundOn}
            dark={dark}
            toggleDark={() => setDark((value) => !value)}
          />
        ) : (
          <motion.main
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="relative mx-auto min-h-screen max-w-[1480px] px-5 pb-24 pt-6 lg:px-12"
          >
            <header className="sticky top-0 z-40 rounded-[2rem] border border-blush/10 bg-[rgba(20,10,18,0.45)] backdrop-blur-2xl shadow-2xl shadow-black/10">
              <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cream/60">a quiet gift</p>
                  <h1 className="mt-1 text-xl font-semibold tracking-tight text-cream sm:text-2xl">A handmade story for you</h1>
                </div>
                <nav className="flex flex-wrap gap-3 text-sm text-cream/80 sm:gap-4">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setPage(section.id)}
                      className={`rounded-full px-4 py-2 transition ${page === section.id ? "bg-blush/20 text-cream" : "bg-white/10 hover:bg-white/15"}`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </header>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3 text-sm text-cream/75">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 uppercase tracking-[0.35em]">{pageTitle}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{pageIndex + 1} / {sections.length}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {hasPrev && (
                  <button
                    type="button"
                    onClick={() => prevPage && setPage(prevPage)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cream transition hover:border-cream/30 hover:bg-white/10"
                  >
                    Previous
                  </button>
                )}
                {hasNext && (
                  <button
                    type="button"
                    onClick={() => nextPage && setPage(nextPage)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-cream px-4 py-2 text-sm font-semibold text-dusk transition hover:bg-[#f3eae0]"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={false}
                animate={{ width: `${progress}%` }}
                className="h-1 rounded-full bg-gradient-to-r from-blush via-cream to-sage"
              />
            </div>
            <div className="mt-10 px-2 pb-12">
              {renderPage()}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
