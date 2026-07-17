import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Music2, Sparkles, SunMedium, Moon } from "lucide-react";

interface LandingProps {
  onBegin: (password: string) => void;
  entryError: string;
  soundOn: boolean;
  setSoundOn: (value: boolean) => void;
  dark: boolean;
  toggleDark: () => void;
}

export default function Landing({ onBegin, entryError, soundOn, setSoundOn, dark, toggleDark }: LandingProps) {
  const [password, setPassword] = useState("");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-transparent px-5 text-cream"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,241,220,0.18),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(255,208,180,0.16),transparent_24%)]" />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6 rounded-[2.5rem] border border-blush/10 bg-[rgba(255,246,236,0.1)] p-10 text-center shadow-soft backdrop-blur-xl sm:p-14">
        <Sparkles className="mx-auto h-12 w-12 text-blush/80" />
        <p className="text-sm uppercase tracking-[0.35em] text-cream/50">for a very special day</p>
        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-cream sm:text-6xl">Hi, Emma.</h1>
        <p className="max-w-xl text-base leading-8 text-cream/75 sm:text-lg">
          I made something just for you.
        </p>
        <p className="text-sm text-cream/50">Enter the password to open the gift.</p>

        <div className="w-full max-w-md space-y-3 text-left">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            className="w-full rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream/50 outline-none transition focus:border-blush"
          />
          {entryError && <p className="text-sm text-blush">{entryError}</p>}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onBegin(password)}
            className="inline-flex items-center gap-3 rounded-full bg-blush px-6 py-3 text-sm font-semibold text-cream transition hover:scale-[1.01] hover:bg-blush/90"
          >
            Begin <ArrowRight className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 rounded-full border border-blush/10 bg-white/10 px-4 py-3 text-cream">
            <button
              type="button"
              onClick={() => setSoundOn(!soundOn)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-transparent text-cream transition hover:border-blush/30 hover:bg-blush/10"
              aria-label="Toggle sound"
            >
              <Music2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggleDark}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-transparent text-cream transition hover:border-blush/30 hover:bg-blush/10"
              aria-label="Toggle theme"
            >
              {dark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
