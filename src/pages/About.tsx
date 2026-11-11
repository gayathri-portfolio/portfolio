import { AboutIntro } from '../components/AboutIntro'
import { DesignJourney } from '../components/DesignJourney'
import { usePageTitle } from '../lib/usePageTitle'

export function About() {
  usePageTitle('About')
  return (
    <div className="min-h-screen">
      <AboutIntro />
      <DesignJourney />
    </div>
  )
}
