import { useState, useEffect, useCallback } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
  className?: string
}

export default function Typewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const tick = useCallback(() => {
    setDisplayed(prev => {
      if (prev.length >= text.length) {
        setDone(true)
        onComplete?.()
        return prev
      }
      return text.slice(0, prev.length + 1)
    })
  }, [text, onComplete])

  useEffect(() => {
    if (!started) return
    if (done) return

    const interval = setInterval(tick, speed)
    return () => clearInterval(interval)
  }, [started, done, tick, speed])

  if (!started) return <span className={className}>&nbsp;</span>

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="typewriter-cursor" aria-hidden="true" />}
    </span>
  )
}
