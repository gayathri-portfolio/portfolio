import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Intro } from '../components/Intro'
import { SelectedWork } from '../components/SelectedWork'
import { Contact } from '../components/Contact'

export function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash || hash === '#top') {
      window.scrollTo({ top: 0 })
      return
    }
    const id = hash.slice(1)
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }, [hash])

  return (
    <>
      <Hero />
      <Intro />
      <SelectedWork />
      <Contact />
    </>
  )
}
