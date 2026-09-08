import { Link } from 'react-router-dom'
import { PawIcon } from '../components/PawIcon'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <PawIcon className="h-10 w-10 text-accent" />
      <h1 className="mt-6 font-display text-4xl font-semibold text-text">Lost the scent</h1>
      <p className="mt-3 max-w-sm text-text-muted">
        This page wandered off. Even a cat can't find it from here.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-text px-6 py-3 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
      >
        Back home
      </Link>
    </div>
  )
}
