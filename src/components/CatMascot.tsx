import kitty from '../assets/kitty.png'

export function CatMascot({ className }: { className?: string }) {
  return <img src={kitty} alt="" aria-hidden="true" className={className} style={{ objectFit: 'contain' }} />
}
