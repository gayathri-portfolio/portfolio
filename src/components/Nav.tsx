import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { PawIcon } from './PawIcon'

const links = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/#work' },
  { label: 'Journey', href: '/#journey' },
  { label: 'Contact', href: '/#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <div
          className={`flex items-center gap-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'border-border bg-bg-elevated/80 px-3 py-1.5 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-md'
              : 'border-transparent bg-transparent px-0 py-0'
          }`}
        >
          <Link to="/#top" className="flex items-center gap-2 pr-1 font-display text-base font-semibold tracking-tight text-text">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-bg-elevated">
              <PawIcon className="h-3.5 w-3.5" />
            </span>
            Gayathri V
          </Link>
        </div>

        <nav
          className={`hidden items-center gap-1 rounded-full border transition-all duration-300 md:flex ${
            scrolled ? 'border-border bg-bg-elevated/80 px-1.5 py-1.5 backdrop-blur-md' : 'border-border/70 bg-surface/60 px-1.5 py-1.5 backdrop-blur-sm'
          }`}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-text-muted transition-colors hover:bg-surface-hover hover:text-text"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="mailto:gayathrivellaiyan@gmail.com"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg-elevated transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Let's talk
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-5 mt-3 overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-lg md:hidden"
          >
            <div className="flex flex-col p-2">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-text-muted hover:bg-surface hover:text-text"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
