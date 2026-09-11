import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { HoverLetters } from './HoverLetters'

const WORDS = ['Designs', 'Solves', 'Grows']
const INTERVAL = 2200

export function RotatingWord() {
  const [index, setIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % WORDS.length), INTERVAL)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  if (reduceMotion) {
    return <span className="text-accent">{WORDS[0]}</span>
  }

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      {/* invisible ghost reserves box size to the widest word, so the layout never shifts */}
      <span className="invisible whitespace-nowrap" aria-hidden="true">
        {WORDS.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[index]}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 whitespace-nowrap text-accent"
        >
          <HoverLetters text={WORDS[index]} letterClassName="hover:-translate-y-2 hover:text-accent-2" />
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
