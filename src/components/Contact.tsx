import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { CatMascot } from './CatMascot'
import { profile } from '../data/profile'

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
      aria-labelledby="contact-title"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-28 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[960px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="relative flex w-full max-w-4xl flex-col items-center text-center">
        <p className="flex items-center gap-2 text-sm font-medium text-text-muted">
          <span aria-hidden className="h-2 w-2 rounded-full bg-accent-2" />
          {profile.availability}
        </p>
        <h2
          id="contact-title"
          className="mt-4 font-display text-[clamp(2.2rem,6vw,3.9rem)] font-bold leading-[0.98] tracking-tight text-text"
        >
          Open to full-time <span className="text-accent">product/UI/UX design roles</span>
        </h2>
        <p className="mt-5 max-w-xl text-lg text-text-muted">
          Based in {profile.location}, open to {profile.workModes}.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 w-full max-w-xl"
        >
          <div className="glass-strong flex flex-col overflow-hidden rounded-[28px] text-left shadow-[0_24px_48px_-28px_rgb(var(--shadow-color)/0.45)] sm:flex-row">
            <div className="flex shrink-0 items-center justify-center p-6 sm:w-[28%] sm:pr-0">
              <CatMascot className="h-24 w-24 sm:h-full sm:w-full sm:max-h-36 sm:max-w-36" />
            </div>

            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-faint">{profile.roles}</p>
                <p className="mt-1 font-display text-3xl font-bold leading-none text-text sm:text-4xl">{profile.name}</p>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-border pt-4">
                {(
                  [
                    ['phone', profile.phone],
                    ['email', profile.email],
                  ] as const
                ).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => copy(value, key)}
                    aria-label={`Copy ${key === 'phone' ? 'phone number' : 'email address'} ${value}`}
                    className="group flex items-center gap-2.5 text-sm font-medium text-text transition-colors hover:text-accent"
                  >
                    {copied === key ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-accent-2" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 shrink-0 text-text-faint transition-colors group-hover:text-accent" />
                    )}
                    {value}
                    {copied === key && <span className="text-xs text-text-muted">Copied</span>}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {/* a standard mailto: opens the visitor's own mail app with a new
                    message to me. It also copies the address, as a fallback for
                    visitors who have no mail app set up. */}
                <a
                  href={profile.emailHref}
                  onClick={() => copy(profile.email, 'email')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-text px-3.5 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
                {(
                  [
                    ['LinkedIn', profile.linkedin],
                    ['Resume', profile.resume],
                  ] as const
                ).map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-border-strong px-3.5 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
                  >
                    {label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <p role="status" className="-mt-2 min-h-4 text-xs text-text-muted">
                {copied === 'email' && "Email address copied — paste it if your mail app doesn't open."}
              </p>
            </div>
          </div>
        </motion.div>

        <p className="mt-8 text-sm text-text-muted">Also open to freelance projects.</p>
      </div>
    </section>
  )
}
