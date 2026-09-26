import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { SectionLabel } from './SectionLabel'
import { CatMascot } from './CatMascot'

const EMAIL = 'gayathrivellaiyan@gmail.com'
const PHONE = '+91-6381652569'

function CornerBrackets() {
  const base = 'absolute h-5 w-5 border-accent'
  return (
    <>
      <span className={`${base} -left-2.5 -top-2.5 border-l-2 border-t-2`} />
      <span className={`${base} -right-2.5 -top-2.5 border-r-2 border-t-2`} />
      <span className={`${base} -bottom-2.5 -left-2.5 border-b-2 border-l-2`} />
      <span className={`${base} -bottom-2.5 -right-2.5 border-b-2 border-r-2`} />
    </>
  )
}

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

        <h2 className="mt-6 font-display text-[clamp(3rem,11vw,6.5rem)] font-bold leading-[0.92] tracking-tight text-accent">
          <span className="block">The Next</span>
          <span className="block">Station is…</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-4 flex w-fit items-start"
        >
          <CatMascot className="h-36 w-36 shrink-0 sm:h-44 sm:w-44" />
          <div className="glass mt-2 max-w-[190px] -translate-x-3 rounded-2xl rounded-bl-sm px-4 py-2.5 text-left text-xs leading-snug text-text sm:max-w-[210px] sm:text-sm">
            Yes — available for new Product Design opportunities.
          </div>
        </motion.div>

        <p className="mx-auto mt-6 max-w-md text-text-muted">
          Available now for new roles and collaborations. Reach out — I usually reply within a day.
        </p>

        <div className="relative mx-auto mt-12 max-w-xs">
          <CornerBrackets />
          <div className="glass-strong flex flex-col items-center gap-5 rounded-3xl px-8 py-9">
            <button
              type="button"
              onClick={() => copy(PHONE, 'phone')}
              className="group flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-accent"
            >
              {copied === 'phone' ? (
                <Check className="h-3.5 w-3.5 text-accent-2" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-text-faint transition-colors group-hover:text-accent" />
              )}
              {PHONE}
            </button>

            <button
              type="button"
              onClick={() => copy(EMAIL, 'email')}
              className="group flex items-center gap-2 text-sm font-medium text-text transition-colors hover:text-accent"
            >
              {copied === 'email' ? (
                <Check className="h-3.5 w-3.5 text-accent-2" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-text-faint transition-colors group-hover:text-accent" />
              )}
              {EMAIL}
            </button>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-2 font-display text-lg font-bold tracking-wide text-text transition-colors hover:text-accent"
            >
              [ Let's Connect ]
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
