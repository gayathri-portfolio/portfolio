import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { CatMascot } from './CatMascot'

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
    <section
      id="contact"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-28 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[960px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="relative flex w-full max-w-3xl flex-1 flex-col items-center justify-evenly text-center">
        <h2 className="font-display text-[clamp(3.2rem,12vw,8rem)] font-bold leading-[0.9] tracking-tight text-accent">
          <span className="block">The Next</span>
          <span className="block">Station is…</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 w-full max-w-lg sm:mt-20"
        >
          <div className="glass-strong flex flex-col overflow-hidden rounded-[28px] text-left shadow-[0_24px_48px_-28px_rgb(var(--shadow-color)/0.45)] sm:flex-row">
            <div className="flex shrink-0 items-center justify-center bg-surface p-6 sm:w-[38%]">
              <CatMascot className="h-28 w-28 sm:h-full sm:w-full sm:max-h-40 sm:max-w-40" />
            </div>

            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">Product Designer</p>
                <p className="mt-1 font-display text-3xl font-bold leading-none text-text sm:text-4xl">Gayathri V</p>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => copy(PHONE, 'phone')}
                  className="group flex items-center gap-2.5 text-sm font-medium text-text transition-colors hover:text-accent"
                >
                  {copied === 'phone' ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent-2" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0 text-text-faint transition-colors group-hover:text-accent" />
                  )}
                  {PHONE}
                </button>

                <button
                  type="button"
                  onClick={() => copy(EMAIL, 'email')}
                  className="group flex items-center gap-2.5 text-sm font-medium text-text transition-colors hover:text-accent"
                >
                  {copied === 'email' ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent-2" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0 text-text-faint transition-colors group-hover:text-accent" />
                  )}
                  {EMAIL}
                </button>
              </div>

              <a
                href={`mailto:${EMAIL}`}
                className="-mt-1 self-start font-serif text-xl italic text-accent transition-opacity hover:opacity-70"
              >
                — let's connect
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
