import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/#work' },
  { label: 'Journey', href: '/#journey' },
  { label: 'Resume', href: '/resume.pdf', external: true },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* minimal top utility bar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-2 px-5">
          <a
            href="mailto:gayathrivellaiyan@gmail.com"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg-elevated transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Let's talk
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* primary nav, docked bottom-center */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="glass flex items-center gap-1 rounded-full p-1.5">
          {links.map((l) => {
            const linkHash = l.external ? null : l.href.slice(1) // "#top" | "#work" | "#journey"
            const isActive =
              !l.external && pathname === '/' && (hash === linkHash || (linkHash === '#top' && hash === ''))
            return l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-transparent px-4 py-2 text-sm text-text-muted transition-colors hover:border-text/25 hover:text-text"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                className={`rounded-full border px-4 py-2 text-sm transition-colors hover:border-text/25 hover:text-text ${
                  isActive ? 'border-text/40 text-text' : 'border-transparent text-text-muted'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
