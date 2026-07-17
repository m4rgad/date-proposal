import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const stars = Array.from({ length: 12 }, (_, index) => ({
  id: `star-${index}`,
  top: 12 + index * 6,
  left: 14 + (index % 4) * 18,
  title: [`Kindness`, `Memory`, `Quote`, `Reason`][index % 4],
  message: [
    "Your laughter feels like sunlight through leaves.",
    "The first time we shared tea, I felt at ease.",
    "Be gentle with yourself. It feels like a promise.",
    "You have a way of making quiet spaces feel warm."
  ][index % 4]
}));

export default function Constellation() {
  const [opened, setOpened] = useState<string[]>([]);
  const completed = opened.length >= 6;

  const lines = useMemo(
    () =>
      completed
        ? [
            { x1: 18, y1: 20, x2: 50, y2: 10 },
            { x1: 50, y1: 10, x2: 82, y2: 20 },
            { x1: 82, y1: 20, x2: 50, y2: 46 },
            { x1: 50, y1: 46, x2: 18, y2: 20 }
          ]
        : [],
    [completed]
  );

  const toggleStar = (id: string) => {
    setOpened((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <section id="stars" className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">constellation</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-cream sm:text-4xl">A starry field of small truths</h2>
      </div>
      <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#131116]/90 p-8 shadow-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_22%),radial-gradient(circle_at_bottom,rgba(178,146,191,0.06),transparent_28%)]" />
        {lines.length > 0 && (
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none">
            {lines.map((line, index) => (
              <motion.line
                key={index}
                x1={`${line.x1}%`}
                y1={`${line.y1}%`}
                x2={`${line.x2}%`}
                y2={`${line.y2}%`}
                stroke="#e8d7ff"
                strokeWidth="0.35"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.6, delay: 0.5 }}
              />
            ))}
          </svg>
        )}
        <div className="relative grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {stars.map((star) => {
            const isOpen = opened.includes(star.id);
            return (
              <button
                key={star.id}
                type="button"
                onClick={() => toggleStar(star.id)}
                className="group relative rounded-[2rem] border border-white/10 bg-[#1c1722]/95 p-6 text-left transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-full border border-cream/20 ${isOpen ? "bg-blush/20" : "bg-white/10"}`} />
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cream/60">{star.title}</p>
                    <p className="mt-2 text-lg font-semibold text-cream">{star.message.slice(0, 30)}…</p>
                  </div>
                </div>
                {isOpen && <p className="mt-4 text-sm leading-6 text-cream/75">{star.message}</p>}
              </button>
            );
          })}
        </div>
        {completed && (
          <div className="mt-6 rounded-[2rem] border border-blush/20 bg-blush/10 p-6 text-center text-sm text-cream/90">
            When enough stars were opened, a small heart constellation appeared in the night.
          </div>
        )}
      </div>
    </section>
  );
}
