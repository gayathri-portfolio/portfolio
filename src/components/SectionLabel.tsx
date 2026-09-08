import { PawIcon } from './PawIcon'
import { cn } from '../lib/cn'

export function SectionLabel({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 text-sm font-medium tracking-wide text-accent', className)}>
      <PawIcon className="h-3.5 w-3.5" />
      <span>
        {children}
      </span>
    </div>
  )
}
