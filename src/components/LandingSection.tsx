import { motion } from 'framer-motion'
import Typewriter from './Typewriter'

interface LandingSectionProps {
  onOpen: () => void
}

export default function LandingSection({ onOpen }: LandingSectionProps) {
  return (
    <motion.section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      aria-label="Welcome section"
    >
      <motion.div
        className="absolute top-[15%] left-[10%] text-4xl sm:text-5xl opacity-20"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        🌹
      </motion.div>
      <motion.div
        className="absolute top-[20%] right-[12%] text-3xl sm:text-4xl opacity-20"
        animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        🦋
      </motion.div>

      <div className="glass-card-strong p-8 sm:p-12 md:p-16 max-w-2xl w-full text-center">
        <motion.div
          className="text-5xl sm:text-6xl mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
          aria-hidden="true"
        >
          💌
        </motion.div>

        <motion.h1
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <Typewriter text="I Have Something Important to Ask You ❤️" speed={45} delay={800} />
        </motion.h1>

        <motion.p
          className="font-body text-base sm:text-lg mb-10 font-medium"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          Big Gee эрээпэр ганаа
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.6 }}
        >
          <motion.button
            className="btn-romantic"
            onClick={onOpen}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Open my question"
          >
            <span className="relative z-10 flex items-center gap-2">
              Онгойлгох
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                💝
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 4.5 }}
          aria-hidden="true"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300" />
          <span className="text-sm">✨</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300" />
        </motion.div>
      </div>
    </motion.section>
  )
}
