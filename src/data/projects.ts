export interface CaseStudyProject {
  type: 'case-study'
  slug: string
  title: string
  tagline: string
  summary: string
  cover: string
  /** CSS aspect-ratio for the cover image, tuned per image so it crops cleanly */
  coverAspect: string
  tags: string[]
  highlights: string[]
  /** optional external "App Link" shown next to the title on the selected-work card */
  appLink?: string
}

export interface ExternalProject {
  type: 'external'
  title: string
  tagline: string
  href: string
  tags: string[]
  cover: string
}

export type Project = CaseStudyProject | ExternalProject

export const caseStudies: CaseStudyProject[] = [
  {
    type: 'case-study',
    slug: 'ultragym-pro',
    title: 'UltraGym Pro',
    tagline:
      'A commercial smart-gym experience designed for gyms, hotels, and workplaces, combining digital resistance training with a connected touchscreen experience.',
    summary:
      "Designing a 21.5-inch vertical interface for a user who's standing, moving, pulling and exerting force — not sitting calmly a foot from a laptop.",
    cover: '/case-studies/ultragym-pro/cover.jpg',
    coverAspect: '4 / 3',
    tags: ['Hardware UI', 'UX Research', '0→1'],
    highlights: ['End to End', 'Ownership'],
  },
  {
    type: 'case-study',
    slug: 'ultragym-ux-study',
    title: 'Ultragym UX Study',
    tagline:
      'A connected home-gym experience that brings guided workouts, personalised training, and real-time progress tracking into one companion app.',
    summary:
      'UltraGym combines smart fitness hardware with a companion app. My goal was to remove the friction that stood between users and their workout.',
    cover: '/case-studies/ultragym-ux/cover.jpg',
    coverAspect: '4 / 3',
    tags: ['Product Design', 'System Thinking', 'Mobile'],
    highlights: ['Redesign', 'Customer Experience Design'],
    appLink: 'https://play.google.com/store/apps/details?id=com.portl.fitness&pcampaignid=web_share',
  },
]

export const externalProjects: ExternalProject[] = [
  {
    type: 'external',
    title: 'Portl Ultragym',
    tagline: 'Smart Home Gym',
    href: 'https://www.behance.net/gallery/246583121/Smart-Home-Gym-Companion-App',
    tags: ['Fitness', 'Mobile App'],
    cover: '/other-work/portl-ultragym.webp',
  },
  {
    type: 'external',
    title: 'Portl Studio',
    tagline: 'Smart Mirror',
    href: 'https://www.behance.net/gallery/246870821/Portl-Studio-Mirror',
    tags: ['Fitness', 'Interface'],
    cover: '/other-work/portl-studio.jpg',
  },
  {
    type: 'external',
    title: 'Rider',
    tagline: 'Ridesharing Service App',
    href: 'https://www.behance.net/gallery/199655691/Riider-Ridesharing-service-app',
    tags: ['Mobility', 'Mobile App'],
    cover: '/other-work/rider.webp',
  },
  {
    type: 'external',
    title: 'Craftie',
    tagline: 'Ecommerce Site',
    href: 'https://www.behance.net/gallery/200909607/Craftie-Flower-Craft-website',
    tags: ['Ecommerce', 'Web'],
    cover: '/other-work/craftie.webp',
  },
]

export const designJourney = [
  {
    company: 'Portl Technologies',
    role: 'Fitness + Technology',
    period: '01',
    description:
      'Worked on experiences across fitness mirrors, wearable interfaces, and mobile products. Most of the focus was on reducing friction during workouts — clearer guidance, faster interactions and making transitions between screens feel more natural during workouts.',
    link: 'portl.co',
  },
  {
    company: 'ZAZZ IT Solutions Pvt Ltd',
    role: 'Product Design',
    period: '02',
    description:
      'Worked on web and mobile products across different industries, often moving between fast iterations, changing requirements, and tight timelines. It pushed me to think beyond individual screens and pay closer attention to flow, hierarchy, and how people actually move through a product.',
    link: 'zazz.io',
  },
  {
    company: 'Aliens Group Pvt Ltd',
    role: 'Architecture',
    period: '03',
    description:
      'Architecture taught me to think in systems. How people enter spaces, where attention naturally moves, what creates friction, and what quietly guides behavior. Those ideas carried over naturally into product design.',
    link: 'aliensgroup.in',
  },
]

export const faqs = [
  {
    question: 'Why did you move from architecture to product design?',
    answer:
      'Both fields revolve around how people move through experiences. One happens in physical spaces. The other happens through interactions, screens, and systems.',
  },
  {
    question: 'What usually catches your attention first in a product?',
    answer:
      'The rhythm of interactions — the space between actions, and whether the interface gets out of the way when it should.',
  },
  {
    question: "What's your design process actually like?",
    answer:
      'Research first, even when it feels slower. I go outside the product — talk to users, observe context, test assumptions — before I let myself touch a screen.',
  },
  {
    question: 'What’s something you overthink while designing?',
    answer:
      'Whether the default state is doing too much for the user, or not enough. Getting that balance right usually takes a few rounds.',
  },
  {
    question: 'How do you know a design is finally working?',
    answer:
      'When people stop mentioning the interface at all, and just talk about what they accomplished with it.',
  },
  {
    question: "What's your most repeated sentence during design reviews?",
    answer: '"Does this interaction make sense for someone actually using it right now?"',
  },
]
