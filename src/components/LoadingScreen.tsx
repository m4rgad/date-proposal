import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.div
        className="loading-heart"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        aria-hidden="true"
      >
        💕
      </motion.div>
      <motion.p
        className="mt-6 text-lg font-body font-medium tracking-wide"
        style={{ color: 'var(--text-secondary)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Тусгай зүйл бэлдэж байна
      </motion.p>
      <div className="loading-dots mt-3 text-2xl" style={{ color: 'var(--accent)' }}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </motion.div>
  )
}
