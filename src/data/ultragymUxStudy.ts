import type { CaseStudyContent } from './caseStudyTypes'

const IMG = '/case-studies/ultragym-ux'

export const ultragymUxStudy: CaseStudyContent = {
  slug: 'ultragym-ux-study',
  title: 'Ultragym UX Study',
  tagline: 'Eliminating friction in the workout journey',
  intro:
    'Ultragym is a smart, portable home gym system paired with a companion app that enables users to perform full-body strength training using a single compact device. It is designed for people who want the flexibility of working out anytime, anywhere — without the need for a traditional gym setup. Our mission is to eliminate friction in the workout journey, making it easy for users to start, follow through, and complete workouts efficiently.',
  heroImage: `${IMG}/cover.webp`,
  meta: {
    role: 'Product Designer, Research',
    team: '2 Designers',
    company: 'Portl Technologies',
    industry: 'Fitness',
    responsibilities: ['UX Research', 'Product Design', 'Interaction Design', 'System Thinking'],
  },
  sections: [
    {
      number: '01',
      title: 'Starting a workout felt like homework',
      blocks: [
        {
          kind: 'p',
          text: 'To begin a session, users had to manually choose exercises, set up reps and weights, configure rest timers, and structure their entire workout from scratch — every single time. For beginners, it was overwhelming. For experienced users, it was just exhausting.',
        },
        {
          kind: 'cards',
          items: [
            {
              icon: '🧩',
              title: 'Decision overload before you even start',
              text: 'Users faced 5+ decisions before their first rep. Exercise choice, weight, sets, reps, rest time — all before a single rep.',
            },
            {
              icon: '🔁',
              title: 'No memory between sessions',
              text: 'Every time users started, it felt like starting from scratch. They had to either remember what they did last time, take screenshots, or note it down.',
            },
            {
              icon: '📱',
              title: 'Constant phone interruptions mid-workout',
              text: "Users didn't want to constantly check their phones mid-workout. They wanted something more fluid and less intrusive.",
            },
            {
              icon: '👥',
              title: 'Built for one, broken for two',
              text: 'Families and couples who shared the device had to disconnect and reconnect every time they swapped turns — every single time.',
            },
          ],
        },
        {
          kind: 'image',
          src: `${IMG}/page-04.webp`,
        },
        {
          kind: 'list',
          items: [
            'No starting point. Empty state with no guidance — beginners had no idea what to add or where to begin.',
            'Editing a set changed all sets. Adjusting one set applied the same values globally, making progressive overload impossible.',
            'Zero performance history. No past data surfaced at the point of decision. Users guessed their weights every time.',
            'Single-user only. The device connection was 1:1 — two people working out meant constant disconnect-reconnect cycles.',
          ],
        },
      ],
    },
    {
      number: '02',
      title: 'The product gave users control, not support',
      blocks: [
        {
          kind: 'quote',
          text: 'Through support feedback, usability testing, and first-hand use, one pattern was consistent: users spent more time setting up their workout than doing it. They second-guessed every choice. They lacked confidence in whether they were doing the "right" thing. This wasn\'t a UI problem. It was a trust problem.',
        },
        {
          kind: 'callout',
          text: 'How might we reduce friction across the entire workout experience — before, during, and after?',
        },
      ],
    },
    {
      number: '03',
      title: 'A system-level redesign across four areas',
      blocks: [
        {
          kind: 'p',
          text: 'Rather than patching individual screens, we rethought the experience as a complete system — covering decision making, interaction flexibility, performance intelligence, and shared workouts.',
        },
        { kind: 'subheading', eyebrow: 'Solution 01', text: 'Guided Workout Generation — from blank canvas to instant start' },
        {
          kind: 'p',
          text: 'Instead of asking users to build a workout from scratch, we introduced a guided generation flow. A few quick inputs — goal, experience level, available time, body parts — and the system produces a structured, ready-to-go routine.',
        },
        {
          kind: 'p',
          text: "The goal wasn't to remove control. It was to give users a strong, trustworthy starting point they could modify if they wanted — but didn't have to.",
        },
        { kind: 'image', src: `${IMG}/page-07.webp`, caption: 'Before → After: Select Exercises / Generate Workout' },
        {
          kind: 'list',
          items: [
            'Users answer 2–3 questions about their goal and experience level',
            'System generates a full, structured workout instantly — no manual building required',
            'Workouts are editable — full control is always available, just not required',
            'Beginner confidence goes up; experienced users still feel in control',
          ],
        },

        { kind: 'subheading', eyebrow: 'Solution 02', text: 'Flexible Set Editing — workouts that work like real workouts' },
        {
          kind: 'p',
          text: 'In the original app, editing a set applied the change to every set in the exercise. This made common structures like warm-up sets or progressive overload impossible to build.',
        },
        {
          kind: 'p',
          text: 'We redesigned the interaction to allow individual set control — edit one, duplicate it, or build entirely custom progressions. Simple on the surface, transformative in practice.',
        },
        { kind: 'image', src: `${IMG}/page-08.webp`, caption: 'Before → After: Create Workout set editing' },

        { kind: 'subheading', eyebrow: 'Solution 03', text: 'Performance Intelligence — stop guessing, start progressing' },
        {
          kind: 'p',
          text: "The app had no memory. Users couldn't see what weight they last lifted, how many reps they hit, or whether they were improving. Every session was a guess.",
        },
        {
          kind: 'p',
          text: 'We rebuilt this from the ground up with three layers: performance prefill, rep and weight recommendations, and a redesigned strength assessment.',
        },
        { kind: 'image', src: `${IMG}/page-09.webp`, caption: 'Strength Assessment Test, starting weight, and live set tracking' },
        {
          kind: 'list',
          items: [
            'Performance prefill — previously completed sets auto-populate with your last logged data, eliminating repetitive input',
            'Smart recommendations — the app suggests reps and weight targets based on measured strength levels, not guesswork',
            '5RM is captured and converted to 1RM for more accurate, scalable recommendations',
          ],
        },

        { kind: 'subheading', eyebrow: 'Solution 04', text: 'Seamless Workouts — off the phone, into the flow' },
        {
          kind: 'p',
          text: 'Even with setup solved, the workout itself was fragmented. Users constantly picked up their phones to log sets, check timers, or adjust weights — interrupting their rhythm every few minutes.',
        },
        {
          kind: 'p',
          text: 'We took the experience beyond the phone with two key extensions: wearable integration and landscape TV mode.',
        },
        { kind: 'image', src: `${IMG}/page-11.webp` },
        {
          kind: 'list',
          items: [
            'Track live metrics — heart rate, calories, progress — directly from the wrist',
            'Adjust weights mid-set from the wearable without breaking form or picking up the phone',
            'Mirror the workout to a TV in landscape mode for a more immersive, hands-free experience',
          ],
        },

        { kind: 'subheading', eyebrow: 'Solution 05', text: 'Buddy Mode — built for how people actually work out' },
        {
          kind: 'p',
          text: "A surprising insight from real usage: many users didn't work out alone. Families, couples, friends — they shared the device. But the system only supported one connection at a time, forcing constant disconnect-reconnect cycles between sets.",
        },
        {
          kind: 'p',
          text: "Buddy Mode turns a two-person workout into a seamless shared session. One person hosts; others join with a simple code. Each participant tracks their own workout independently, but they're together.",
        },
        { kind: 'image', src: `${IMG}/page-12.webp`, caption: 'Buddy Mode — a seamless shared workout session' },
        {
          kind: 'list',
          items: [
            'Host creates a session; others join instantly with a 4-digit code — no pairing friction',
            'Each participant follows their own workout plan and tracks their own progress independently',
            'Visual indicators show who is currently active and who is next — transitions are seamless',
            'Adds a social and motivational dimension to solo hardware — workouts feel shared, not parallel',
          ],
        },
      ],
    },
    {
      number: '04',
      title: 'From friction to flow',
      blocks: [
        {
          kind: 'p',
          text: 'Parts of the solution are still rolling out. But the expected impact across every layer of the experience is significant — and the design direction is validated by research and usability testing.',
        },
        {
          kind: 'list',
          items: [
            'Reduce workout setup time',
            'Lower cognitive load for beginners',
            'Improve confidence in workout decisions',
            'Create a more seamless workout flow',
            'Support both individual and shared fitness experiences',
          ],
        },
      ],
    },
  ],
  reflection: {
    paragraphs: ['This project shifted my perspective from designing screens to designing systems.'],
    points: [
      'The biggest challenge was balancing simplicity with flexibility — ensuring that beginners felt guided, while experienced users still felt in control.',
      'It also pushed me to think beyond the app itself, considering how physical devices, shared environments, and real-world behaviors shape digital experiences.',
    ],
  },
}
