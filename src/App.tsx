import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import FloatingHearts from './components/FloatingHearts'
import CursorSparkles from './components/CursorSparkles'
import DarkModeToggle from './components/DarkModeToggle'
import MusicControl from './components/MusicControl'
import LandingSection from './components/LandingSection'
import QuestionSection from './components/QuestionSection'
import PlanningSection, { DateDetails } from './components/PlanningSection'
import SuccessSection from './components/SuccessSection'

type AppSection = 'loading' | 'landing' | 'question' | 'planning' | 'success'

function App() {
  const [currentSection, setCurrentSection] = useState<AppSection>('loading')
  const [isDark, setIsDark] = useState(false)
  const [dateDetails, setDateDetails] = useState<DateDetails | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSection('landing')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const handleOpenQuestion = useCallback(() => {
    setCurrentSection('question')
  }, [])

  const handleYesClick = useCallback(() => {
    setCurrentSection('planning')
  }, [])

  const handlePlanComplete = useCallback((details: DateDetails) => {
    setDateDetails(details)
    setCurrentSection('success')
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => !prev)
  }, [])

  return (
    <div className="romantic-bg" role="main" aria-label="Date proposal website">
      <AnimatePresence mode="wait">
        {currentSection === 'loading' && <LoadingScreen key="loading" />}
        {currentSection === 'landing' && (
          <LandingSection key="landing" onOpen={handleOpenQuestion} />
        )}
        {currentSection === 'question' && (
          <QuestionSection key="question" onYes={handleYesClick} />
        )}
        {currentSection === 'planning' && (
          <PlanningSection key="planning" onComplete={handlePlanComplete} />
        )}
        {currentSection === 'success' && dateDetails && (
          <SuccessSection key="success" dateDetails={dateDetails} />
        )}
      </AnimatePresence>

      {currentSection !== 'loading' && (
        <>
          <FloatingHearts />
          <CursorSparkles />
          <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
          <MusicControl />
        </>
      )}
    </div>
  )
}

export default App
