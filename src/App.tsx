import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { PawCursorTrail } from './components/PawCursorTrail'
import { CustomCursor } from './components/CustomCursor'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { CaseStudyUltragymPro } from './pages/CaseStudyUltragymPro'
import { CaseStudyUltragymUx } from './pages/CaseStudyUltragymUx'
import { NotFound } from './pages/NotFound'

/** React Router's client-side navigation only updates the URL's hash — it
 * never triggers the browser's native "scroll to #id" behavior the way a
 * full page load does, so every hash link (`/#work`, `/#top`, "Back to
 * work") needs that scroll driven manually here instead. */
function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash || hash === '#top') {
      window.scrollTo({ top: 0 })
      return
    }
    const id = hash.slice(1)
    // The destination page (e.g. Home, after navigating from a case study)
    // may not have mounted its sections yet on the very next tick, so
    // retry briefly until the target actually exists. setTimeout (not
    // requestAnimationFrame) so this still runs if the tab is backgrounded
    // mid-navigation.
    let attempts = 0
    let timer: ReturnType<typeof setTimeout>
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
      attempts += 1
      if (attempts < 30) timer = setTimeout(tryScroll, 16)
    }
    tryScroll()
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="grain min-h-screen">
      <ScrollToTopOnNavigate />
      <CustomCursor />
      <PawCursorTrail />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/ultragym-pro" element={<CaseStudyUltragymPro />} />
        <Route path="/work/ultragym-ux-study" element={<CaseStudyUltragymUx />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
