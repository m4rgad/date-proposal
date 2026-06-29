import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const isPlayingRef = useRef(false)

  // Generate a soft romantic melody using Web Audio API
  const createMelody = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    const ctx = audioContextRef.current

    // Simple romantic chord progression
    const sampleRate = ctx.sampleRate
    const duration = 32 // seconds of audio
    const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel)

      // Chord notes (frequencies) – soft romantic progression
      const chords = [
        [261.63, 329.63, 392.00], // C major
        [220.00, 277.18, 329.63], // A minor
        [174.61, 220.00, 261.63], // F major
        [196.00, 246.94, 293.66], // G major
        [261.63, 311.13, 392.00], // C (with Eb for emotion)
        [220.00, 261.63, 329.63], // A minor
        [174.61, 220.00, 261.63], // F major
        [196.00, 246.94, 293.66], // G major
      ]

      const chordDuration = duration / chords.length
      const samplesPerChord = Math.floor(sampleRate * chordDuration)

      for (let c = 0; c < chords.length; c++) {
        const chord = chords[c]
        for (let i = 0; i < samplesPerChord; i++) {
          const t = i / sampleRate
          const globalT = (c * samplesPerChord + i) / (sampleRate * duration)
          let sample = 0

          for (const freq of chord) {
            // Soft sine with slight vibrato
            const vibrato = 1 + 0.002 * Math.sin(2 * Math.PI * 4.5 * t)
            sample += Math.sin(2 * Math.PI * freq * vibrato * t) * 0.12
            // Add octave harmonic softly
            sample += Math.sin(2 * Math.PI * freq * 2 * vibrato * t) * 0.03
          }

          // Melody line on top – gentle arpeggiation
          const melodyNotes = [
            chord[2] * 2, chord[1] * 2, chord[0] * 2, chord[1] * 2,
          ]
          const noteIdx = Math.floor((t / chordDuration) * 4) % melodyNotes.length
          const noteT = t % (chordDuration / 4)
          const melodyEnvelope = Math.exp(-noteT * 3) * 0.08
          sample += Math.sin(2 * Math.PI * melodyNotes[noteIdx] * t) * melodyEnvelope

          // Smooth fade in/out for each chord
          const chordProgress = i / samplesPerChord
          const fadeIn = Math.min(1, chordProgress * 10)
          const fadeOut = Math.min(1, (1 - chordProgress) * 10)
          const chordEnvelope = fadeIn * fadeOut

          // Overall fade
          const overallFade = Math.min(1, globalT * 8) * Math.min(1, (1 - globalT) * 8)

          // Stereo spread
          const pan = channel === 0 ? 0.8 : 1.2
          data[c * samplesPerChord + i] = sample * chordEnvelope * overallFade * pan * 0.6
        }
      }
    }

    return buffer
  }, [])

  const playMusic = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    const ctx = audioContextRef.current
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    const buffer = createMelody()
    const source = ctx.createBufferSource()
    source.buffer = buffer
    source.loop = true

    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 2)

    source.connect(gain)
    gain.connect(ctx.destination)
    source.start(0)

    sourceRef.current = source
    gainRef.current = gain
  }, [createMelody])

  const stopMusic = useCallback(() => {
    if (gainRef.current && audioContextRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(
        0,
        audioContextRef.current.currentTime + 0.5
      )
      setTimeout(() => {
        sourceRef.current?.stop()
        sourceRef.current = null
      }, 500)
    }
  }, [])

  const toggleMusic = useCallback(async () => {
    if (isPlayingRef.current) {
      stopMusic()
      isPlayingRef.current = false
      setIsPlaying(false)
    } else {
      await playMusic()
      isPlayingRef.current = true
      setIsPlaying(true)
    }
  }, [playMusic, stopMusic])

  useEffect(() => {
    setIsLoaded(true)
    return () => {
      sourceRef.current?.stop()
      audioContextRef.current?.close()
    }
  }, [])

  if (!isLoaded) return null

  return (
    <motion.button
      className={`music-control glass-card ${!isPlaying ? 'music-paused' : ''}`}
      onClick={toggleMusic}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <div className="music-bars">
        <div className="music-bar" />
        <div className="music-bar" />
        <div className="music-bar" />
        <div className="music-bar" />
      </div>
    </motion.button>
  )
}
