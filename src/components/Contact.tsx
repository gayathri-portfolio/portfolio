import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, Mail, Phone } from 'lucide-react'
import { SectionLabel } from './SectionLabel'
import { PawIcon } from './PawIcon'

const EMAIL = 'gayathrivellaiyan@gmail.com'
const PHONE = '+91-6381652569'

export function Contact() {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null)

  const copy = async (value: string, key: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      setTimeout(() => setCopied(null), 1800)
    } catch {
      // clipboard not available — ignore
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionLabel className="justify-center">LET'S CONNECT</SectionLabel>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg-elevated"
        >
          <PawIcon className="h-7 w-7" />
        </motion.div>

        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          The next station is…
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-muted">
          Available now for new roles and collaborations. Reach out — I usually reply within a day.
        </p>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => copy(EMAIL, 'email')}
            className="glass group flex items-center justify-between gap-3 rounded-full px-5 py-3 text-sm text-text transition-transform hover:scale-[1.02]"
          >
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-text-muted" />
              {EMAIL}
            </span>
            {copied === 'email' ? (
              <Check className="h-4 w-4 text-accent-2" />
            ) : (
              <Copy className="h-4 w-4 text-text-faint transition-colors group-hover:text-text" />
            )}
          </button>
          <button
            type="button"
            onClick={() => copy(PHONE, 'phone')}
            className="glass group flex items-center justify-between gap-3 rounded-full px-5 py-3 text-sm text-text transition-transform hover:scale-[1.02]"
          >
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-text-muted" />
              {PHONE}
            </span>
            {copied === 'phone' ? (
              <Check className="h-4 w-4 text-accent-2" />
            ) : (
              <Copy className="h-4 w-4 text-text-faint transition-colors group-hover:text-text" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
