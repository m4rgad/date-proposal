import { useState } from 'react'
import { motion } from 'framer-motion'

export interface DateDetails {
  date: string
  time: string
  location: string
}

interface PlanningSectionProps {
  onComplete: (details: DateDetails) => void
}

const LOCATIONS = [
  "The Rooftop Garden Café ☕🌿",
  "Movie Theater & Popcorn 🍿🎬",
  "Picnic in the Park 🧺🌸",
  "Aquarium Date 🐠🌊",
  "Late Night Drive & Ice Cream 🍦🚗",
  "Other (I have a place in mind!)"
]

export default function PlanningSection({ onComplete }: PlanningSectionProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [customLocation, setCustomLocation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !location || (location.startsWith('Other') && !customLocation)) return
    
    onComplete({
      date,
      time,
      location: location.startsWith('Other') ? customLocation : location
    })
  }

  return (
    <motion.section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.7 }}
      aria-label="Plan the date section"
    >
      <div className="glass-card-strong p-6 sm:p-10 md:p-14 max-w-xl w-full text-center">
        <motion.div
          className="text-5xl sm:text-6xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 150 }}
          aria-hidden="true"
        >
          🗓️
        </motion.div>

        <motion.h2
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Yay! Now let's plan it 💕
        </motion.h2>

        <motion.p
          className="font-body text-base sm:text-lg mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          When and where would you like to go?
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Date Picker */}
          <div>
            <label className="block font-body font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Choose a Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-rose-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-400 font-body text-gray-700"
            />
          </div>

          {/* Time Picker */}
          <div>
            <label className="block font-body font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Pick a Time
            </label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 rounded-xl border border-rose-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-400 font-body text-gray-700"
            />
          </div>

          {/* Location Picker */}
          <div>
            <label className="block font-body font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Where should we go?
            </label>
            <div className="space-y-3">
              {LOCATIONS.map((loc) => (
                <label key={loc} className="flex items-center gap-3 p-3 rounded-xl border border-rose-100 bg-white/40 cursor-pointer hover:bg-white/60 transition-colors">
                  <input
                    type="radio"
                    name="location"
                    value={loc}
                    checked={location === loc}
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-rose-500 focus:ring-rose-400"
                    required
                  />
                  <span className="font-body text-gray-800">{loc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Location */}
          {location.startsWith('Other') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <label className="block font-body font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Where to? ✨
              </label>
              <input
                type="text"
                required
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="Type your idea here..."
                className="w-full p-3 rounded-xl border border-rose-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-rose-400 font-body text-gray-700"
              />
            </motion.div>
          )}

          <motion.div
            className="pt-4 flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button type="submit" className="btn-yes w-full">
              Confirm Date 💌
            </button>
          </motion.div>
        </form>
      </div>
    </motion.section>
  )
}
