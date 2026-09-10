import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { PawCursorTrail } from './components/PawCursorTrail'
import { Home } from './pages/Home'
import { CaseStudyUltragymPro } from './pages/CaseStudyUltragymPro'
import { CaseStudyUltragymUx } from './pages/CaseStudyUltragymUx'
import { NotFound } from './pages/NotFound'

function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="grain min-h-screen">
      <ScrollToTopOnNavigate />
      <PawCursorTrail />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/ultragym-pro" element={<CaseStudyUltragymPro />} />
        <Route path="/work/ultragym-ux-study" element={<CaseStudyUltragymUx />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}
