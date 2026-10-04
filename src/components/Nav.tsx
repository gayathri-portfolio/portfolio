import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { label: 'Home', href: '/#top' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: `${import.meta.env.BASE_URL}resume.pdf`, external: true },
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
      {/* minimal top utility bar — pointer-events-none on the full-width
          wrapper so its empty left side doesn't swallow clicks meant for
          whatever fixed element (e.g. a case study's "Back to work" link)
          sits underneath it there; only the actual content re-enables them. */}
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-2 px-5">
          <Link
            to="/#contact"
            className="pointer-events-auto inline-flex rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg-elevated transition-transform hover:scale-[1.03]"
          >
            Let's talk
          </Link>
          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* primary nav, docked bottom-center — same pointer-events split as
          the header above, so its empty sides don't block clicks on
          whatever sits beneath that full-width band. */}
      <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5">
          {links.map((l) => {
            const isRoute = !l.external && !l.href.includes('#')
            const linkHash = l.external || isRoute ? null : l.href.slice(l.href.indexOf('#')) // "#top" | "#work"
            const isActive = l.external
              ? false
              : isRoute
                ? pathname === l.href
                : pathname === '/' && (hash === linkHash || (linkHash === '#top' && hash === ''))
            return l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-transparent px-4 py-2 text-sm text-text-muted transition-colors hover:border-black hover:text-text active:border-black"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.href}
                className={`rounded-full border border-transparent px-4 py-2 text-sm transition-colors hover:border-black hover:text-text active:border-black ${
                  isActive ? 'text-text' : 'text-text-muted'
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
