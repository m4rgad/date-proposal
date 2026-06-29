import { useEffect, useRef } from 'react'

const sparkleEmojis = ['✨', '💫', '⭐', '🌟', '💖']

export default function CursorSparkles() {
  const lastSparkle = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastSparkle.current < 80) return
      lastSparkle.current = now

      const sparkle = document.createElement('span')
      sparkle.className = 'sparkle'
      sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)]
      sparkle.style.left = `${e.clientX - 8}px`
      sparkle.style.top = `${e.clientY - 8}px`
      sparkle.style.fontSize = `${0.6 + Math.random() * 0.6}rem`
      document.body.appendChild(sparkle)

      setTimeout(() => {
        sparkle.remove()
      }, 600)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return null
}
