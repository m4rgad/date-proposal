import { useEffect, useRef, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Countdown from './Countdown'

import { DateDetails } from './PlanningSection'

interface SuccessSectionProps {
  dateDetails: DateDetails
}

// Google Calendar link
function getCalendarUrl(dateDetails: DateDetails) {
  const target = new Date(`${dateDetails.date}T${dateDetails.time}:00`)
  const endTarget = new Date(target.getTime() + 3 * 60 * 60 * 1000)
  const formatForGoogle = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "")
  const start = formatForGoogle(target)
  const end = formatForGoogle(endTarget)
  const title = encodeURIComponent('Our Date 💕')
  const loc = encodeURIComponent(dateDetails.location)
  const details = encodeURIComponent('Our special date together ❤️')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${loc}&details=${details}`
}

export default function SuccessSection({ dateDetails }: SuccessSectionProps) {
  const targetDate = useMemo(() => new Date(`${dateDetails.date}T${dateDetails.time}:00`), [dateDetails])
  
  const displayDate = useMemo(() => targetDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  }), [targetDate])
  
  const displayTime = useMemo(() => targetDate.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true
  }), [targetDate])
  const confettiFired = useRef(false)
  const [heartsVisible, setHeartsVisible] = useState(true)

  // Fire confetti on mount
  useEffect(() => {
    if (confettiFired.current) return
    confettiFired.current = true

    // Play success sound (soft chime)
    try {
      const ctx = new AudioContext()
      const playNote = (freq: number, delay: number) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0, ctx.currentTime + delay)
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 1.5)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + delay)
        osc.stop(ctx.currentTime + delay + 1.5)
      }
      playNote(523.25, 0)
      playNote(659.25, 0.15)
      playNote(783.99, 0.3)
      playNote(1046.5, 0.45)
    } catch {
      // Audio not available
    }

    // Confetti bursts
    const fire = (opts: confetti.Options) => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#fda4af', '#f9a8d4', '#d8b4fe', '#fff'],
        ...opts,
      })
    }

    fire({ angle: 60, origin: { x: 0, y: 0.6 } })
    fire({ angle: 120, origin: { x: 1, y: 0.6 } })
    setTimeout(() => fire({ spread: 100, origin: { x: 0.5, y: 0.4 } }), 400)
    setTimeout(() => {
      fire({ angle: 60, origin: { x: 0.2, y: 0.7 } })
      fire({ angle: 120, origin: { x: 0.8, y: 0.7 } })
    }, 800)
    setTimeout(() => fire({ particleCount: 120, spread: 120, origin: { x: 0.5, y: 0.5 } }), 1200)

    // Hide heart rain after 5 seconds
    setTimeout(() => setHeartsVisible(false), 5000)
  }, [])

  // Generate success heart rain
  const hearts = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: ['❤️', '💕', '💖', '💗', '🩷', '✨'][i % 6],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      size: 0.8 + Math.random() * 1.5,
    })), [])

  return (
    <motion.section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      aria-label="Date accepted celebration"
    >
      {/* Heart rain */}
      {heartsVisible && hearts.map(h => (
        <span
          key={h.id}
          className="success-heart"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            fontSize: `${h.size}rem`,
          }}
          aria-hidden="true"
        >
          {h.emoji}
        </span>
      ))}

      <div className="glass-card-strong p-8 sm:p-12 md:p-16 max-w-xl w-full text-center">
        {/* Celebration emoji */}
        <motion.div
          className="text-6xl sm:text-7xl mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
          aria-hidden="true"
        >
          🎉
        </motion.div>

        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Yay!!
        </motion.h2>

        <motion.p
          className="font-handwriting text-xl sm:text-2xl mb-8"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          You just made me the happiest person.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.5, scaleX: 1 }}
          transition={{ delay: 1 }}
          aria-hidden="true"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300" />
          <span>💕</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300" />
        </motion.div>

        {/* Date details */}
        <motion.div
          className="glass-card p-6 mb-8 text-left space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="font-display text-lg sm:text-xl font-semibold text-center mb-4" style={{ color: 'var(--text-primary)' }}>
            Here are the details ✨
          </h3>
          <Detail icon="📅" label="Date" value={displayDate} />
          <Detail icon="🕖" label="Time" value={displayTime} />
          <Detail icon="📍" label="Location" value={dateDetails.location} />
        </motion.div>

        {/* Calendar button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <a
            href={getCalendarUrl(dateDetails)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-calendar"
            aria-label="Add date to Google Calendar"
          >
            📅 Add to Calendar
          </a>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="font-body text-sm mb-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
            Counting down to our date...
          </p>
          <Countdown targetDate={targetDate} />
        </motion.div>

        {/* Footer message */}
        <motion.p
          className="mt-8 font-handwriting text-lg"
          style={{ color: 'var(--accent)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          Can't wait to see you! 💕
        </motion.p>
      </div>
    </motion.section>
  )
}

function Detail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xl flex-shrink-0" aria-hidden="true">{icon}</span>
      <div>
        <p className="font-body text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </p>
        <p className="font-body text-base sm:text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
          {value}
        </p>
      </div>
    </div>
  )
}
