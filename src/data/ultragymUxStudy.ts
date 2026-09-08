import type { CaseStudyContent } from './caseStudyTypes'

export const ultragymUxStudy: CaseStudyContent = {
  slug: 'ultragym-ux-study',
  title: 'Ultragym UX Study',
  tagline: 'Removing friction from the UltraGym companion app',
  intro:
    "UltraGym combines smart fitness hardware with a companion app to help users plan workouts, track progress, and stay consistent. While the hardware was powerful, the overall experience still required too much effort. My goal wasn't to add more features — it was to remove the friction that stood between users and their workout.",
  heroImage: '/case-studies/ultragym-ux/cover.svg',
  meta: {
    role: 'Product Designer — UI/UX (End-to-End)',
    team: '2 Product Designers',
    company: 'Portl Technologies',
    industry: 'Fitness + Technology',
    responsibilities: [
      'Product discovery and user research',
      'UX strategy and information architecture',
      'Interaction design',
      'UI design',
      'High-fidelity prototyping',
      'Developer handoff',
      'Cross-functional collaboration',
    ],
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
          kind: 'list',
          items: [
            'No starting point — empty state with no guidance; beginners had no idea what to add or where to begin.',
            'Editing a set changed all sets — adjusting one applied the same values globally, making progressive overload impossible.',
            'Zero performance history — no past data surfaced at the point of decision; users guessed their weights every time.',
            'Single-user only — the device connection was 1:1, so two people working out meant constant disconnect-reconnect cycles.',
          ],
        },
      ],
    },
    {
      number: '02',
      title: 'The product gave users control, not support',
      blocks: [
        {
          kind: 'p',
          text: 'Through support feedback, usability testing, and first-hand use, one pattern was consistent: users spent more time setting up their workout than doing it. They second-guessed every choice. They lacked confidence in whether they were doing the "right" thing. This wasn\'t a UI problem. It was a trust problem.',
        },
        {
          kind: 'callout',
          label: 'The question',
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
        {
          kind: 'quote',
          text: 'Guided Workout Generation — from blank canvas to instant start. A few quick inputs — goal, experience level, available time, body parts — and the system produces a structured, ready-to-go routine.',
        },
        {
          kind: 'compare',
          before: [
            'Users build a workout from scratch, screen by screen',
            'No starting point for beginners',
            'Full control, but full effort every time',
          ],
          after: [
            'Users answer 2–3 questions about goal and experience level',
            'System generates a full, structured workout instantly',
            'Workouts stay editable — control is available, not required',
          ],
        },
        {
          kind: 'p',
          text: 'Flexible Set Editing — in the original app, editing a set applied the change to every set in the exercise, making common structures like warm-up sets or progressive overload impossible. We redesigned the interaction to allow individual set control — edit one, duplicate it, or build entirely custom progressions.',
        },
        {
          kind: 'p',
          text: "Performance Intelligence — the app had no memory. We rebuilt this with three layers: performance prefill (previously completed sets auto-populate with your last logged data), smart recommendations (suggested reps and weight based on measured strength, not guesswork), and a redesigned assessment (gradual, per-movement, converting 5RM to 1RM for scalable recommendations).",
        },
        {
          kind: 'p',
          text: 'Seamless Workouts — we took the experience beyond the phone with wearable integration (live metrics on the wrist, adjust weight mid-set without picking up the phone) and a landscape TV mode for a more immersive, hands-free experience.',
        },
        {
          kind: 'p',
          text: "Buddy Mode — a surprising insight from real usage: many users shared the device with family or friends, but the system only supported one connection at a time. Buddy Mode turns a two-person workout into a seamless shared session: one host, others join instantly with a 4-digit code, each tracking their own progress independently.",
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
          kind: 'cards',
          items: [
            { icon: '⏱️', title: 'Reduce workout setup time', text: 'Fewer decisions between opening the app and starting a rep.' },
            { icon: '🧠', title: 'Lower cognitive load for beginners', text: 'A structured starting point instead of a blank screen.' },
            { icon: '✅', title: 'Improve confidence in decisions', text: 'Recommendations grounded in the user’s own performance history.' },
            { icon: '🌊', title: 'Create a more seamless flow', text: 'Fewer phone interruptions mid-set, more time in motion.' },
            { icon: '🤝', title: 'Support shared fitness experiences', text: 'Buddy Mode replaces disconnect-reconnect cycles with one session.' },
          ],
        },
      ],
    },
  ],
  reflection:
    'This project shifted my perspective from designing screens to designing systems. The biggest challenge was balancing simplicity with flexibility — ensuring beginners felt guided, while experienced users still felt in control. It also pushed me to think beyond the app itself, considering how physical devices, shared environments, and real-world behaviors shape digital experiences.',
  learnings:
    'System thinking, not screen thinking — and that trust is often the real problem hiding behind a UI complaint.',
}
