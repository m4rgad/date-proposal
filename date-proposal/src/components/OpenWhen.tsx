import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const letters = [
  {
    id: "bad-day",
    label: "Open when you’re having a bad day",
    message:
      "I know today might not be going the way you wanted. I just want you to remember that one bad day doesn’t define you. You’ve made it through every difficult day before this one, and I know you’ll get through this too. Be gentle with yourself today. Take a break, eat some goimon, drink some cola, watch gremix, and remember that someone(me._.) out there is always cheering for you. I hope tomorrow feels a more more lighter. ❤️"
  },
  {
    id: "alone",
    label: "Open when you feel alone",
    message:
      "If you’re reading this, I hope you know that even when you feel alone, you’re not forgotten. There is someone who thinks about you, cares about you, and wants to see you happy. I hope this letter feels like a small reminder that you matter. You don’t have to carry everything on your shoukders."
  },
  {
    id: "hug",
    label: "Open when you need a hug",
    message:
      "I wish I could be there right now to give you a BIG hug. So for now, imagine this letter as a little hug from me. A hug that says: ‘You’re okay. You’re important. You’re loved.’ Stay a little longer, breathe slowly, and remember that better moments are coming."
  },
  {
    id: "sleep",
    label: "Open when you can’t sleep",
    message:
      "Still awake? Your brain is probably thinking about a thousand things right now. Forget everything for a moment. Close your eyes, relax your shoulders, and just breathe. You don’t have to solve everything tonight. I hope your dreams are peaceful, and I hope tomorrow brings you something that makes you smile."
  },
  {
    id: "future",
    label: "Open when you’re scared about the future",
    message:
      "The future can be scary because we can’t see what’s coming. But I hope you remember how far you’ve already come. You are stronger and more capable than you realize. Don’t let fear stop you from chasing the things you want. No matter where life takes you, I hope you always believe in yourself. Dont forget who you are, the perfect person in everyone's eyes and mine."
  },
  {
    id: "giving-up",
    label: "Open when you feel like giving up",
    message:
      "Before you give up, please remember why you started. Remember all the times you thought you couldn’t do something but somehow made it through. You don’t have to be perfect. You just have to keep going, even if it’s slowly. I believe in you, even on the days when you don’t believe in yourself."
  },
  {
    id: "smile",
    label: "Open when you need a smile",
    message:
      "Congratulations, you opened this letter, so now you have to smile (even a tiny one counts). I hope something small makes you happy today — a good song, a funny video, a good meal, or a random memory. Also, just a reminder: your smile is one of the things that makes you special. Don’t forget to use it."
  },
  {
    id: "crying",
    label: "Open when you’re crying",
    message:
      "I wish I could take away whatever made you cry. But please don’t be ashamed of your feelings. Crying doesn’t mean you’re weak. It means you’re human. Take your time. Let it out. When you’re ready, Camerton - Нулимсаа арч охин мээнь"
  },
  {
    id: "lost",
    label: "Open when you’re feeling lost",
    message:
      "It’s okay if you don’t know exactly where you’re going right now. Sometimes life feels confusing, and that’s part of growing. You don’t need to have everything figured out today. Take one step at a time. Trust yourself. You’ll find your way."
  },
  {
    id: "compliment",
    label: "Open when you need a compliment",
    message:
      "Here’s your reminder: you’re amazing. You’re someone with a good heart, someone who tries, someone who makes a difference even when you don’t notice it. I hope you see yourself the way the people who care about you see you. Never forget that you are special, and there is no one else exactly like you."
  }
];

export default function OpenWhen() {
  const [opened, setOpened] = useState<string | null>(null);

  return (
    <section id="open-when" className="relative py-10 sm:py-16">
      <div className="mb-8 px-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-cream/50">open when</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-blush sm:text-4xl">Letters for quiet moments</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {letters.map((letter) => (
          <button
            key={letter.id}
            type="button"
            onClick={() => setOpened(letter.id)}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#f4ebe4]/95 p-6 text-left shadow-paper transition hover:-translate-y-1"
          >
            <div className="absolute -left-10 top-8 h-24 w-24 rounded-full bg-sage/15 blur-2xl" />
            <div className="relative z-10 space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-driftwood/60">sealed envelope</p>
              <h3 className="text-xl font-semibold text-driftwood">{letter.label}</h3>
              <p className="max-w-[20rem] text-sm leading-6 text-driftwood/80">Tap to unfold a message that feels like a folded note tucked into a pocket.</p>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dusk/90 px-5 py-10 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 24, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 16, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-3xl rounded-[2rem] border border-white/15 bg-[#f8f2ec] p-10 shadow-soft"
            >
              <button
                type="button"
                onClick={() => setOpened(null)}
                className="absolute right-5 top-5 rounded-full border border-driftwood/10 bg-white/90 px-3 py-2 text-sm text-driftwood transition hover:bg-cream"
              >
                close
              </button>
              <div className="mb-3 text-sm uppercase tracking-[0.35em] text-driftwood/60">letter</div>
              <h3 className="text-3xl font-semibold text-driftwood">{letters.find((letter) => letter.id === opened)?.label}</h3>
              <p className="mt-6 max-w-2xl leading-8 text-driftwood/85">{letters.find((letter) => letter.id === opened)?.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
