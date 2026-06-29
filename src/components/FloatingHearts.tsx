import { useEffect, useState, useRef } from 'react'

const hearts = ['💕', '💗', '💖', '💘', '💝', '♥️', '🩷', '✨', '🌸']

interface FloatingHeart {
  id: number
  emoji: string
  left: number
  duration: number
  delay: number
  size: number
}

export default function FloatingHearts() {
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([])
  const idCounter = useRef(0)

  useEffect(() => {
    const createHeart = () => {
      const id = idCounter.current++
      const heart: FloatingHeart = {
        id,
        emoji: hearts[Math.floor(Math.random() * hearts.length)],
        left: Math.random() * 100,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 2,
        size: 0.6 + Math.random() * 1.2,
      }
      setFloatingHearts(prev => [...prev, heart])

      // Remove after animation completes
      setTimeout(() => {
        setFloatingHearts(prev => prev.filter(h => h.id !== id))
      }, (heart.duration + heart.delay) * 1000)
    }

    // Create initial hearts
    for (let i = 0; i < 6; i++) {
      setTimeout(createHeart, i * 500)
    }

    // Continuously spawn hearts
    const interval = setInterval(createHeart, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {floatingHearts.map(heart => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}rem`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
}
