import { motion } from "framer-motion";

const sentences = [
  "I wasn't sure if I should make this.",
  "But I wanted to create something that might make you smile.",
  "Thank you for spending your time here."
];

export default function Finale() {
  return (
    <section id="finale" className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">ending</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-blush sm:text-4xl">baka chika</h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#f7efe7]/95 p-10 shadow-paper text-dusk"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, index) => (
            <span
              key={index}
              className="absolute top-[-20%] h-[140%] w-px rounded-full bg-white/15 blur-sm opacity-50 animate-[rain-fall_1.4s_linear_infinite]"
              style={{ left: `${index * 9}%`, animationDelay: `${index * 0.12}s` }}
            />
          ))}
        </div>
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {sentences.map((sentence) => (
              <p key={sentence} className="text-xl leading-9 sm:text-2xl">
                {sentence}
              </p>
            ))}
            <div className="rounded-[2rem] border border-driftwood/10 bg-[#fff4ed]/90 p-6 shadow-sm">
              <p className="text-sm text-driftwood/75">No matter where life takes us, I'm really happy I got to know you.</p>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-driftwood/80">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blush/10 text-blush">♥</span>
              <span>Soft stars and quiet thanks.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
