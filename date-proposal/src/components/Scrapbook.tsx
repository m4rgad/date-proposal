import { motion } from "framer-motion";

const pages = [
  {
    title: "A quiet page",
    text: "Soft paper, a small pressed bloom, and the way the light lingers on a memory.",
    note: "Remember the afternoon we shared stories over coffee?"
  },
  {
    title: "Polaroid moments",
    text: "A stack of photographs, taped with care, each one carrying a gentle smile.",
    note: "You always make ordinary evenings feel like something rare."
  },
  {
    title: "Paper whispers",
    text: "Handwritten thoughts, the edge of a torn page, and a tiny drawing that feels true.",
    note: "I wanted this to feel like a quiet letter tucked inside a book."
  }
];

export default function Scrapbook() {
  return (
    <section id="scrapbook" className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">scrapbook</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-cream sm:text-4xl">The notebook of small moments</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        {pages.map((page, index) => (
          <motion.div
            key={page.title}
            initial={{ opacity: 0, y: 32, rotate: index === 1 ? -1.5 : 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-parchment/95 p-6 shadow-paper"
          >
            <div className="absolute -left-6 top-8 h-20 w-20 rounded-full bg-blush/12 blur-2xl" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cream/80 text-dusk">✧</span>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-driftwood/70">page {index + 1}</p>
                  <h3 className="mt-2 text-xl font-semibold text-driftwood">{page.title}</h3>
                </div>
              </div>
              <p className="text-sm leading-7 text-driftwood/85">{page.text}</p>
              <div className="rounded-3xl border border-driftwood/10 bg-white/70 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.35em] text-driftwood/70">handwritten</p>
                <p className="mt-3 text-base font-handwritten text-driftwood/90">{page.note}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-8 bottom-8 h-24 w-24 rounded-full bg-sage/10 blur-2xl" />
            <div className="absolute right-5 top-5 h-12 w-20 rotate-[-12deg] rounded-2xl bg-[#f9efee] shadow-[0_12px_30px_rgba(20,10,10,0.08)]" />
            <div className="absolute left-6 bottom-6 h-12 w-12 rounded-full bg-blush/10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
