import { PawIcon } from './PawIcon'

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-text-faint sm:flex-row">
        <div className="flex items-center gap-2">
          <PawIcon className="h-3.5 w-3.5" />
          <span>© {new Date().getFullYear()} Gayathri V. Designed with a cat nearby.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="mailto:gayathrivellaiyan@gmail.com" className="hover:text-text">Email</a>
          <a href="tel:+916381652569" className="hover:text-text">Phone</a>
        </div>
      </div>
    </footer>
  )
}
