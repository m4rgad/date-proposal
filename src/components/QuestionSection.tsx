import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuestionSectionProps {
  onYes: () => void
}

const playfulMessages = [
  "Итгэлтэй байна уу? 🥺",
  "Дахиад сайн бодоорой ❤️",
  "Тэг л дээ? 👉👈",
  "Гоё хоол авч өгнө шдээ 🍕",
  "Чи өөрөө ч хүсэж байгааг мэдэж байна 😄",
  "За за... сүүлийн боломж шүү!",
  "Гуйж байна шдээ? 🌹",
  "Гоё байна гэж амлаж байна! 🎉",
  "Зүрхийг минь битгий шархлуулаач 💔",
  "Дахиад нэг боломж олгох уу? 🥹",
]

export default function QuestionSection({ onYes }: QuestionSectionProps) {
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [message, setMessage] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const yesScale = Math.min(1 + noCount * 0.15, 2.2)

  const handleNo = useCallback(() => {
    const next = noCount + 1
    setNoCount(next)
    setMessage(playfulMessages[Math.min(next - 1, playfulMessages.length - 1)])

    // Move to random position within container
    const container = containerRef.current
    if (container) {
      const rect = container.getBoundingClientRect()
      const maxX = rect.width - 160
      const maxY = rect.height - 60
      setNoPos({
        x: Math.random() * maxX - maxX / 2,
        y: Math.random() * maxY - maxY / 2,
      })
    }
  }, [noCount])

  return (
    <motion.section
      ref={containerRef}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.7 }}
      aria-label="Date question"
    >
      <div className="glass-card-strong p-8 sm:p-12 md:p-16 max-w-xl w-full text-center relative overflow-visible">
        <motion.div
          className="text-5xl sm:text-6xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          aria-hidden="true"
        >
          💖
        </motion.div>

        <motion.h2
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Надтай болзоонд явах уу?
        </motion.h2>

        <motion.p
          className="font-handwriting text-lg sm:text-xl mb-10"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Чамаас үүнийг асуухыг их удаан хүлээлээ...
        </motion.p>

        {/* Playful message */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              className="font-body text-lg font-semibold mb-6"
              style={{ color: 'var(--accent)' }}
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="relative flex items-center justify-center gap-6 min-h-[120px]">
          <motion.button
            className="btn-yes"
            onClick={onYes}
            animate={{ scale: yesScale }}
            transition={{ type: 'spring', stiffness: 200 }}
            whileHover={{ scale: yesScale * 1.08 }}
            whileTap={{ scale: yesScale * 0.95 }}
            aria-label="Yes, I'll go on a date"
          >
            ❤️ Тэгье
          </motion.button>

          <motion.button
            className="btn-no"
            onClick={handleNo}
            animate={{
              x: noPos.x,
              y: noPos.y,
              scale: Math.max(1 - noCount * 0.08, 0.3),
              opacity: Math.max(1 - noCount * 0.08, 0.3),
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            aria-label="No"
            style={{ position: noCount > 0 ? 'absolute' : 'relative' }}
          >
            💔 Үгүй
          </motion.button>
        </div>

        {noCount > 3 && (
          <motion.p
            className="mt-6 font-body text-sm opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
          >
            (Үгүй товч зугтаад байх шиг байна... 🏃‍♂️)
          </motion.p>
        )}
      </div>
    </motion.section>
  )
}
