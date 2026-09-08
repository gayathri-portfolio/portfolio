import { motion } from 'framer-motion'
import { PawIcon } from './PawIcon'

export function HeroPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[280px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[38%_38%_44%_44%/48%_48%_40%_40%] border border-border-strong bg-gradient-to-b from-accent-soft to-surface shadow-[0_30px_60px_-25px_rgba(24,20,10,0.35)]"
      >
        {/* generic portrait placeholder — swap for the real photo */}
        <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice">
          <circle cx="100" cy="95" r="42" fill="var(--border-strong)" opacity="0.9" />
          <path d="M20 250 C20 175 55 150 100 150 C145 150 180 175 180 250 Z" fill="var(--border-strong)" opacity="0.9" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
      </motion.div>

      {/* cat badge — swap portrait for a real photo of Gayathri with her cat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-4 -right-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-bg bg-accent text-bg-elevated shadow-lg"
      >
        <PawIcon className="h-9 w-9" />
      </motion.div>
    </motion.div>
  )
}
