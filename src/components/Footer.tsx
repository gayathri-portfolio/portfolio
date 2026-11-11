import { PawIcon } from './PawIcon'
import { profile } from '../data/profile'

const LINKS = [
  { label: 'Email', href: profile.emailHref },
  { label: 'Phone', href: profile.phoneHref },
  { label: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'Behance', href: profile.behance, external: true },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-5 pb-28 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-text-faint sm:flex-row">
        <div className="flex items-center gap-2">
          <PawIcon className="h-3.5 w-3.5" />
          <span>© {new Date().getFullYear()} Gayathri V. Designed with a cat nearby.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
