import { motion } from 'framer-motion'
import profilePhoto from '../assets/profile.png'

export function HeroPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      <motion.img
        src={profilePhoto}
        alt="Gayathri V"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative aspect-[4/5] w-full object-contain object-bottom drop-shadow-[0_25px_35px_rgba(24,20,10,0.25)]"
      />
    </motion.div>
  )
}
