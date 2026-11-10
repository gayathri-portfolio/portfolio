import type { CaseStudyContent } from './caseStudyTypes'

const IMG = `${import.meta.env.BASE_URL}case-studies/ultragym-ux`

export const ultragymUxStudy: CaseStudyContent = {
  slug: 'ultragym-ux-study',
  title: 'UltraGym UX Study',
  tagline: 'Eliminating friction in the workout journey',
  intro:
    'UltraGym is a smart, portable home gym system paired with a companion app, built for full-body strength training from a single compact device — anytime, anywhere. My goal was to remove the friction that stood between users and their workout, making it easy to start, follow through, and complete a session.',
  heroVisual: [
    {
      src: `${IMG}/screens/generate-workout.webp`,
      alt: 'Generate Workout screen: goal and experience level, warm-up toggle, body-area choice and muscle chips above a Build My Workout button.',
    },
    {
      src: `${IMG}/screens/buddy-mode-1.webp`,
      alt: 'Buddy Mode host view: stacked cards for each participant with their sets, reps and calories, and a Switch To button.',
    },
  ],
  glance: {
    problem: 'Starting a workout meant building it from scratch every time — 5+ decisions before the first rep.',
    role: 'Product design and UX research, in a team of two designers.',
    changed:
      'A five-part redesign covering setup, set editing, performance history, off-phone workouts and shared sessions.',
  },
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
          text: 'To begin a session, users had to manually choose exercises, set up reps and weights, configure rest timers, and structure their entire workout from scratch — every time. For beginners, it was overwhelming. For experienced users, it was just exhausting.',
        },
        {
          kind: 'cards',
          items: [
            {
              icon: 'decisions',
              title: 'Decision overload before the first rep',
              text: 'Users faced 5+ decisions — exercise, weight, sets, reps, rest — before a single rep. The empty state gave beginners no idea what to add or where to begin.',
            },
            {
              icon: 'sliders',
              title: 'Editing one set changed every set',
              text: 'Adjusting a set applied the same values to all sets, making warm-up sets and progressive overload impossible.',
            },
            {
              icon: 'history',
              title: 'No memory between sessions',
              text: 'No past data surfaced at the point of decision. Users had to remember what they did last time, take screenshots or note it down — and guessed their weights.',
            },
            {
              icon: 'phone',
              title: 'Constant phone interruptions mid-workout',
              text: "Users didn't want to keep checking their phones mid-workout. They wanted something more fluid and less intrusive.",
            },
            {
              icon: 'users',
              title: 'Built for one, broken for two',
              text: 'The device connected to one phone at a time, so families and couples had to disconnect and reconnect whenever they swapped turns.',
            },
          ],
        },
      ],
    },
    {
      number: '02',
      title: 'The product gave users control, not support',
      blocks: [
        {
          kind: 'note',
          label: 'What we kept seeing',
          text: 'Through support feedback, usability testing, and first-hand use, one pattern was consistent: users spent more time setting up their workout than doing it. They second-guessed every choice. They lacked confidence in whether they were doing the "right" thing. This wasn\'t a UI problem. It was a trust problem.',
        },
        {
          kind: 'callout',
          text: 'How might we reduce friction across the entire workout experience — before, during, and after?',
        },
        {
          kind: 'p',
          text: 'Rather than patching individual screens, we rethought the experience as a complete system — covering decision making, set editing, performance intelligence, off-phone workouts, and shared sessions.',
        },
      ],
    },
    {
      number: '03',
      eyebrow: 'Solution 1 of 5',
      title: 'Guided workout generation: from blank canvas to instant start',
      blocks: [
        {
          kind: 'p',
          text: 'Instead of asking users to build a workout from scratch, we introduced a guided generation flow. A few quick inputs — goal, experience level, available time, body parts — and the system produces a structured, ready-to-go routine.',
        },
        {
          kind: 'p',
          text: "The goal wasn't to remove control. It was to give users a strong, trustworthy starting point they could modify if they wanted — but didn't have to.",
        },
        {
          kind: 'compare-images',
          before: {
            src: `${IMG}/screens/select-exercises.webp`,
            caption: 'Before',
            note: 'Start from an exercise list and build everything by hand.',
            alt: 'Original Select Exercises screen: a long list of exercises to tick, with a Create Workout button.',
          },
          after: {
            src: `${IMG}/screens/generate-workout.webp`,
            caption: 'After',
            note: 'Answer a few questions and get a ready-made routine.',
            alt: 'Generate Workout screen: goal and experience level, warm-up toggle, body-area choice and muscle chips above a Build My Workout button.',
          },
        },
        {
          kind: 'list',
          items: [
            'Users answer 2–3 questions about their goal and experience level',
            'System generates a full, structured workout instantly — no manual building required',
            'Workouts are editable — full control is always available, just not required',
            'Beginner confidence goes up; experienced users still feel in control',
          ],
        },
      ],
    },
    {
      number: '04',
      eyebrow: 'Solution 2 of 5',
      title: 'Flexible set editing: workouts that work like real workouts',
      blocks: [
        {
          kind: 'p',
          text: 'In the original app, editing a set applied the change to every set in the exercise. This made common structures like warm-up sets or progressive overload impossible to build.',
        },
        {
          kind: 'p',
          text: 'We redesigned the interaction to allow individual set control — edit one, duplicate it, or build entirely custom progressions. Simple on the surface, transformative in practice.',
        },
        {
          kind: 'compare-images',
          before: {
            src: `${IMG}/screens/create-workout.webp`,
            caption: 'Before',
            note: 'One edit applied to every set in the exercise.',
            alt: 'Original Create Workout screen: exercises listed with a single Edit button each.',
          },
          after: {
            src: `${IMG}/screens/edit-set.webp`,
            caption: 'After',
            note: 'Each set edited on its own — mode, reps and weight, with a recommendation.',
            alt: 'Set editor for Seated Bicep Curl: set tabs 1 to 3, mode options, a weight recommendation, reps and a weight stepper.',
          },
        },
      ],
    },
    {
      number: '05',
      eyebrow: 'Solution 3 of 5',
      title: 'Performance intelligence: stop guessing, start progressing',
      blocks: [
        {
          kind: 'p',
          text: "The app had no memory. Users couldn't see what weight they last lifted, how many reps they hit, or whether they were improving. Every session was a guess.",
        },
        {
          kind: 'p',
          text: 'We rebuilt this from the ground up with three layers: performance prefill, rep and weight recommendations, and a redesigned strength assessment.',
        },
        {
          kind: 'image-grid',
          images: [
            {
              src: `${IMG}/screens/assessment-test.webp`,
              caption: 'Strength assessment test',
              alt: 'Strength Assessment Test screen: a grid of movement patterns, each with its tested weight and change since last time.',
            },
            {
              src: `${IMG}/screens/assessment-start-weight.webp`,
              caption: 'Starting weight',
              alt: 'Back squat screen: the exercise video with unilateral and combined starting-weight inputs and a Start button.',
            },
            {
              src: `${IMG}/screens/assessment-live.webp`,
              caption: 'Live set tracking',
              alt: 'Live back squat screen: the current weight, the exercise video and a row of completed-rep markers.',
            },
          ],
        },
        {
          kind: 'list',
          items: [
            'Performance prefill — previously completed sets auto-populate with your last logged data, eliminating repetitive input',
            'Smart recommendations — the app suggests reps and weight targets based on measured strength levels, not guesswork',
            '5RM is captured and converted to 1RM for more accurate, scalable recommendations',
          ],
        },
      ],
    },
    {
      number: '06',
      eyebrow: 'Solution 4 of 5',
      title: 'Seamless workouts: off the phone, into the flow',
      blocks: [
        {
          kind: 'p',
          text: 'Even with setup solved, the workout itself was fragmented. Users constantly picked up their phones to log sets, check timers, or adjust weights — interrupting their rhythm every few minutes.',
        },
        {
          kind: 'p',
          text: 'We took the experience beyond the phone with two key extensions: wearable integration and landscape TV mode.',
        },
        {
          kind: 'image',
          src: `${IMG}/screens/wearables.webp`,
          caption: 'Wearables',
          alt: 'Three smartwatch screens for a bicep curl workout: live heart rate and weight, set and rep progress, and skip or end controls.',
        },
        {
          kind: 'image',
          src: `${IMG}/screens/tv-mirror.webp`,
          caption: 'Mirroring the workout to a TV',
          alt: 'Landscape TV view: the trainer video beside sets, reps, calories, heart rate, current weight and End Workout and Rest buttons.',
        },
        {
          kind: 'list',
          items: [
            'Track live metrics — heart rate, calories, progress — directly from the wrist',
            'Adjust weights mid-set from the wearable without breaking form or picking up the phone',
            'Mirror the workout to a TV in landscape mode for a more immersive, hands-free experience',
          ],
        },
      ],
    },
    {
      number: '07',
      eyebrow: 'Solution 5 of 5',
      title: 'Buddy Mode: built for how people actually work out',
      blocks: [
        {
          kind: 'p',
          text: "A surprising insight from real usage: many users didn't work out alone. Families, couples, friends — they shared the device. But the system only supported one connection at a time, forcing constant disconnect-reconnect cycles between sets.",
        },
        {
          kind: 'p',
          text: "Buddy Mode turns a two-person workout into a seamless shared session. One person hosts; others join with a simple code. Each participant tracks their own workout independently, but they're together.",
        },
        {
          kind: 'image-grid',
          images: [
            {
              src: `${IMG}/screens/buddy-mode-1.webp`,
              caption: 'Host view',
              alt: 'Buddy Mode host view: stacked cards for each participant with their sets, reps and calories, and a Switch To button.',
            },
            {
              src: `${IMG}/screens/buddy-mode-2.webp`,
              caption: 'Switching participants',
              alt: 'Buddy Mode while switching: the next participant’s card expanded with their exercise video and stats.',
            },
          ],
        },
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
      number: '08',
      title: 'From friction to flow',
      blocks: [
        {
          kind: 'p',
          text: 'Parts of the solution are still rolling out, so these are the outcomes the redesign was built to deliver, shaped by research and usability testing:',
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
