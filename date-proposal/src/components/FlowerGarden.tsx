import { motion } from "framer-motion";
import { MouseEvent, useMemo, useState } from "react";

const flowerMessages = [
  "You make quiet mornings feel brighter.",
  "There is a warmth in your gentle presence.",
  "Your kindness blooms in small ways every day.",
  "The world feels softer when you are near.",
  "You are more cherished than words can hold."
];

const flowerTypes = [
  { color: "bg-blush/20", petal: "bg-blush/70" },
  { color: "bg-sage/20", petal: "bg-sage/70" },
  { color: "bg-lavender/20", petal: "bg-lavender/70" }
];

export default function FlowerGarden() {
  const [flowers, setFlowers] = useState<{ id: string; left: number; top: number; type: number; message: string }[]>([]);

  const handleGardenClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setFlowers((prev) => [
      ...prev,
      {
        id: `flower-${Date.now()}`,
        left: x,
        top: y,
        type: prev.length % flowerTypes.length,
        message: flowerMessages[prev.length % flowerMessages.length]
      }
    ]);
  };

  const seeds = useMemo(
    () => [...Array(8)].map((_, index) => ({ left: 8 + (index % 4) * 22, top: 12 + Math.floor(index / 4) * 18 })),
    []
  );

  return (
    <section id="garden" className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">flower garden</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-blush sm:text-4xl">Plant a quiet bloom</h2>
      </div>
      <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#1b171f]/95 p-6 shadow-paper">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_bottom,rgba(170,180,160,0.08),transparent_24%)]" />
        <div className="relative min-h-[420px] rounded-[2.5rem] border border-white/10 bg-[#24202a]/95 p-4" onClick={handleGardenClick}>
          {seeds.map((seed, index) => (
            <div key={index} className="absolute h-3 w-3 rounded-full bg-cream/80" style={{ left: `${seed.left}%`, top: `${seed.top}%` }} />
          ))}
          {flowers.map((flower) => (
            <motion.div
              key={flower.id}
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute grid place-items-center"
              style={{ left: `${flower.left}%`, top: `${flower.top}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="relative flex h-24 w-24 items-center justify-center">
                <div className={`absolute h-20 w-20 rounded-full ${flowerTypes[flower.type].color} blur-md`} />
                {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={idx} className={`absolute h-16 w-16 rounded-full ${flowerTypes[flower.type].petal} opacity-90`} style={{ transform: `rotate(${idx * 72}deg) translateY(-14px)` }} />
                ))}
                <div className="relative h-10 w-10 rounded-full bg-cream" />
              </div>
              <p className="mt-3 w-40 text-center text-xs leading-5 text-cream/85">{flower.message}</p>
            </motion.div>
          ))}
          <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_28%)]" />
          <div className="pointer-events-none absolute left-8 bottom-8 h-16 w-16 rounded-full bg-sage/15 blur-2xl" />
        </div>
        <div className="mt-6 flex items-center justify-between rounded-[2rem] border border-white/10 bg-[#16131b]/90 px-5 py-4 text-sm text-cream/80">
          <span>Click anywhere to plant a flower.</span>
          <span>{flowers.length} blossoms</span>
        </div>
      </div>
    </section>
  );
}
