import type { CaseStudyContent } from './caseStudyTypes'

const IMG = `${import.meta.env.BASE_URL}case-studies/ultragym-pro`

export const ultragymPro: CaseStudyContent = {
  slug: 'ultragym-pro',
  title: 'UltraGym Pro',
  tagline: 'On-device touchscreen for a 120 kg commercial strength machine',
  intro:
    'UltraGym Pro is a commercial strength-training system with up to 120 kg of digital resistance, bringing workout guidance, strength assessment, and real-time training feedback directly onto the machine. I designed its 21.5-inch vertical interface for a user who is standing, moving, pulling and exerting force — making every interaction glanceable, legible, and easy to act on under exertion.',
  heroVisual: [
    {
      src: `${IMG}/hero-product.webp`,
      alt: 'A man doing a lunge with a barbell on the UltraGym Pro machine, its portrait touchscreen mounted on the central column.',
    },
  ],
  glance: {
    problem:
      'Bring guided training, strength testing and live feedback onto a 21.5-inch screen read from about a metre away, mid-workout.',
    role: 'End-to-end product design — field research, flows, wireframes, UI, usability testing and developer handoff.',
    changed:
      'An adaptive strength test that, in testing, helped users reach their 1RM faster than a fixed sequence.',
  },
  meta: {
    role: 'Product Designer — UI/UX (End-to-End)',
    team: 'CEO, COO, Fitness Manager, Engineering',
    company: 'Portl Technologies',
    industry: 'Fitness + Hardware',
    responsibilities: [
      'Field research & trainer interviews',
      'Competitor & product analysis',
      'User flows and wireframes',
      'UI + interaction design',
      'Usability testing & iteration',
      'Developer handoff',
    ],
  },
  sections: [
    {
      number: '01',
      title: 'Why UltraGym needed a Pro version',
      blocks: [
        {
          kind: 'stat-grid',
          items: [
            { label: 'Digital resistance', value: '1.5–120 kg' },
            { label: 'Portrait touchscreen', value: '21.5″' },
          ],
        },
        { kind: 'callout', label: 'The product question', text: 'What happens to people who need more than 70 kg?' },
        {
          kind: 'p',
          text: "The founder's direction was to explore a Pro version with 120 kg resistance and a screen integrated into the machine, opening up more possibilities for how the machine could be used.",
        },
        {
          kind: 'p',
          text: 'The product was designed to make better use of the machine through different attachment and positioning possibilities, including column and floor outputs, allowing users to perform different types of exercises and make fuller use of the equipment.',
        },
      ],
    },
    {
      number: '02',
      title: 'The challenge',
      blocks: [
        {
          kind: 'callout',
          text: 'How do you design a sophisticated fitness experience for someone who is standing and moving in front of a 21.5-inch touchscreen, viewing it from roughly 1 metre away and interacting with it from around 2 feet?',
        },
        {
          kind: 'p',
          text: "I started with a BRD and listed the features I knew would be necessary for this version. But I didn't want to design the software based only on assumptions. So I went outside the product.",
        },
        {
          kind: 'cards',
          items: [
            {
              title: 'Gym context & trainer perspectives',
              text: 'I looked at the environments first. I visited other connected fitness gyms, spoke with trainers and tried to understand how this product could fit into real gym scenarios.',
            },
            {
              title: 'User & product conversations',
              text: 'I also interviewed people in the office — both fitness and non-fitness users — by having them stand in front of the product and asking what they would expect from it and which features they would want to see.',
            },
            {
              title: 'Competitor study & exploration',
              text: 'I analyzed connected fitness products such as Speediance and Tonal to understand how similar products approached the experience.',
            },
          ],
        },
        {
          kind: 'p',
          text: 'I then brought these observations back into the product discussion with the CEO/founder and Fitness Manager and continued refining the product direction before moving into user flows and wireframes.',
        },
        {
          kind: 'steps',
          items: [
            'User flows & wireframes',
            'UI + interaction exploration',
            'Product, fitness & engineering discussions',
            'Testing + iteration',
            'Refinement',
            'Developer handoff',
          ],
          note: 'The process was not linear. Product, design, fitness expertise and engineering discussions continuously influenced the experience as it evolved.',
        },
      ],
    },
    {
      number: '03',
      title: 'The environment became part of the UX problem',
      blocks: [
        {
          kind: 'p',
          text: 'UltraGym Pro uses a 21.5-inch portrait touchscreen at 1080 × 1920 px. Unlike a phone or laptop, the user would be standing in front of the machine rather than sitting close to the screen.',
        },
        {
          kind: 'note',
          label: 'Observation',
          text: 'When I observed users standing in front of the device, I noticed a consistent pattern: without any cues, people naturally positioned themselves around the middle of the platform, roughly one metre from the screen.',
        },
        {
          kind: 'list',
          items: [
            'That became an important consideration for the interface. The screen needed to remain visible and legible from roughly one metre away, while interactions needed to work comfortably when the user moved closer, to around 2 feet from the screen.',
            "The observation also influenced the physical experience beyond the screen. I pushed for markers on the platform to help establish the appropriate standing position for different use cases, so users wouldn't have to figure out where to stand on their own.",
          ],
        },
        {
          kind: 'image',
          src: `${IMG}/scale-distance.webp`,
          alt: 'Scale and distance diagram: the machine beside a user lunging about one metre from the 21-inch, 1080 × 1920 px portrait screen.',
        },
        { kind: 'subheading', text: 'At first, the scale was hard to grasp' },
        {
          kind: 'p',
          text: 'This was a new screen size for me. Initially, I struggled to visualize how large or small elements should actually be. Some of my first attempts made everything too large because I was designing for the canvas rather than the way the user would see it.',
        },
        {
          kind: 'p',
          text: 'I started with paper sketches to quickly explore the overall layout and spatial relationships before moving into Figma.',
        },
        {
          kind: 'p',
          text: "Once I translated those ideas into Figma wireframes, the challenge didn't disappear. A layout that looked reasonable on the canvas could still feel very different when considered as a 21.5-inch portrait screen viewed from roughly one metre away. I had to keep revisiting the scale, spacing and proportions of the interface to understand what could realistically fit without making the experience feel dense.",
        },
        {
          kind: 'p',
          text: 'This back-and-forth between physical sketching and digital wireframing helped me gradually establish the structure of the experience.',
        },
      ],
    },
    {
      number: '04',
      title: 'From wireframes to UI',
      blocks: [
        { kind: 'p', text: "The wireframes gave me structure, but they weren't the final answer." },
        {
          kind: 'p',
          text: 'As I worked through the screens, discussions with the CEO/founder, Fitness Manager and developers continued. A design decision could raise a product question. A product requirement could change an interaction. A technical possibility could open up a different solution.',
        },
        {
          kind: 'p',
          text: "This meant I wasn't simply translating wireframes into polished screens. I was continuing to shape the product while designing it.",
        },
        { kind: 'p', text: 'I was continuously asking:' },
        {
          kind: 'list',
          items: [
            'Does this interaction make sense for someone who is standing, moving and working out?',
            'Can the product make this feel natural without making the user stop and learn how it works?',
          ],
        },
        { kind: 'p', text: 'That became an important principle throughout the design.' },
        {
          kind: 'image-grid',
          images: [
            {
              src: `${IMG}/screens/wf-select-exercises.webp`,
              caption: 'Select exercises',
              alt: 'Wireframe of the exercise picker: filter chips for exercise type and body part above a grid of exercise cards.',
            },
            {
              src: `${IMG}/screens/wf-create-workout.webp`,
              caption: 'Create workout',
              alt: 'Wireframe of workout creation: a list of exercises, each with rows of mode, reps, weight and rest per set.',
            },
            {
              src: `${IMG}/screens/wf-class1.webp`,
              caption: 'Class',
              alt: 'Wireframe of a class page: a video area, class details and the list of exercises with a Start button.',
            },
            {
              src: `${IMG}/screens/wf-summary.webp`,
              caption: 'Workout summary',
              alt: 'Wireframe of the workout summary: totals for sets, reps and weight, a per-mode summary and a power-exerted chart.',
            },
          ],
        },
      ],
    },
    {
      number: '05',
      title: 'Finding the visual direction',
      blocks: [
        {
          kind: 'p',
          text: 'I needed to establish how UltraGym Pro should look and feel before scaling the UI across the product.',
        },
        {
          kind: 'p',
          text: 'I looked for UI inspiration and created a mood board to explore different visual directions. From there, I moved into mockups and tried multiple variations before settling on the visual style, color direction and reusable design components.',
        },
        {
          kind: 'p',
          text: 'I explored roughly 3–4 variations for the key screens, particularly the Home, Workout Player and Strength Test, before finalizing the direction and applying the system across the rest of the product.',
        },
        {
          kind: 'steps',
          items: ['Inspiration', 'Moodboard', 'UI exploration', 'Final direction', 'Visual language + components'],
        },
        { kind: 'subheading', text: 'Designing UltraGym Pro' },
        {
          kind: 'p',
          text: 'With the structure and visual direction established, I moved into designing the complete software experience for UltraGym Pro — from getting started and discovering exercises to creating workouts, training, testing strength and tracking progress.',
        },
        {
          kind: 'image-grid',
          images: [
            {
              src: `${IMG}/screens/final-home.webp`,
              caption: 'Home',
              alt: 'Final Home screen: a featured workout carousel, weekly training data, feature tiles and a strength trend panel.',
            },
            {
              src: `${IMG}/screens/final-get-position.webp`,
              caption: 'Workout player',
              alt: 'Final workout player: the exercise demo on the machine with a large countdown timer to get into position.',
            },
            {
              src: `${IMG}/screens/final-lower-body-strength.webp`,
              caption: 'Strength test',
              alt: 'Final strength test detail: a radar chart of strength qualities, a muscle map and the list of exercises in the test.',
            },
          ],
        },
      ],
    },
    {
      number: '06',
      title: "Home screen: the problem wasn't a lack of features",
      blocks: [
        {
          kind: 'p',
          text: 'UltraGym Pro had several ways for someone to start working out — Exercise Library, Create Workout, Generate Workout, Classes, My Library, Strength Test and Quick Train.',
        },
        {
          kind: 'p',
          text: 'The easy answer would have been to make all of them equally prominent. But a commercial user may arrive with a very simple intention and limited attention. Giving every option the same weight would turn capability into decision fatigue.',
        },
        {
          kind: 'callout',
          label: 'The design question',
          text: 'How do I make all the workout options available without making the Home screen overwhelming?',
        },
        {
          kind: 'p',
          text: "I explored how the home screen could stay visually simple while still making the product's breadth discoverable. I also considered how the system could eventually use a user's workout preference to bring a relevant recommendation higher in the hierarchy.",
        },
        {
          kind: 'note',
          label: "Principle · Hick's Law",
          text: 'As the number of choices increases, the time required to make a decision also increases.',
        },
        {
          kind: 'image-grid',
          images: [
            {
              src: `${IMG}/screens/home-variation-1.webp`,
              caption: 'Variation 1',
              note: 'Progress-first dashboard; the ways to start a workout sit behind tabs.',
              alt: 'Home variation 1: a light dashboard led by progress charts and a strength trend, with workout options in tabs below.',
            },
            {
              src: `${IMG}/screens/home-variation-2.webp`,
              caption: 'Variation 2',
              note: 'Every entry point visible at once, all with similar weight.',
              alt: 'Home variation 2: an exercise grid, a body-map workout finder, shortcut pills and classes, all on one screen.',
            },
            {
              src: `${IMG}/screens/final-home.webp`,
              caption: 'Final design',
              note: 'One featured workout up top; the other options become distinct, scannable tiles.',
              alt: 'Final Home screen: a featured workout carousel, weekly training data, feature tiles and a strength trend panel.',
            },
          ],
        },
        { kind: 'highlight', text: "The goal wasn't to reduce the number of choices. It was to reduce the effort required to choose." },
        {
          kind: 'p',
          text: 'I also deliberately varied how different features were represented so the interface did not become a wall of identical cards. The goal was to create enough visual rhythm for users to scan without making the interface feel busy.',
        },
      ],
    },
    {
      number: '07',
      title: 'Designing around the rhythm of a workout',
      blocks: [
        {
          kind: 'p',
          text: 'I initially thought the Pro player should expose more metrics because the product could support them. But when I looked at the context in which UltraGym Pro would be used, I realized that capability and attention are different problems.',
        },
        {
          kind: 'p',
          text: "The people using the machine wouldn't all have the same goals. A beginner might primarily want to follow the exercise, understand the reps and sets, and complete the workout. An experienced user might already know the movements and care more about their performance. An athlete could be using the machine for endurance or performance training, where progression, tempo, range of motion and other performance metrics become more important than simply completing the prescribed reps.",
        },
        {
          kind: 'callout',
          label: 'UX problem',
          text: 'How do I design a single workout experience that adapts to different user intents without overwhelming everyone with the same level of information?',
        },
        {
          kind: 'p',
          text: 'I sat with the Fitness Manager and discussed what information would actually be useful for these different users. I also discussed with developers what could realistically be pulled from the machine and system.',
        },
        {
          kind: 'p',
          text: 'The resulting set could include video, reps, sets, weight, range of motion, power, left/right performance and tempo.',
        },
        {
          kind: 'image-grid',
          images: [
            {
              src: `${IMG}/screens/player-variation-1.webp`,
              caption: 'Variation 1',
              note: 'Metrics packed into one dense panel under the trainer video.',
              alt: 'Player variation 1: the exercise video on a teal background with a dense panel of metrics and controls below.',
            },
            {
              src: `${IMG}/screens/player-variation-2.webp`,
              caption: 'Variation 2',
              note: 'Video-first, with metrics reduced to a floating bar.',
              alt: 'Player variation 2: a full-screen trainer video with a small floating bar of stats and weight controls.',
            },
            {
              src: `${IMG}/screens/player-variation-3.webp`,
              caption: 'Variation 3',
              note: 'Every metric on one screen — graphs, tempo and a power dial.',
              alt: 'Player variation 3: the exercise on the machine surrounded by graphs, tempo bars and a circular power gauge.',
            },
          ],
        },
        {
          kind: 'p',
          text: 'The player needed to support two very different intentions: someone who simply wants to follow the trainer and someone who actively wants performance metrics.',
        },
        {
          kind: 'note',
          label: 'Insight',
          text: 'Progressive disclosure was not a UX pattern I added because it sounded good. It emerged from the physical context of the workout.',
        },
        {
          kind: 'p',
          text: 'The second view could contain richer information without forcing every user to process graphs and numbers during a movement. This was my way of keeping the system powerful while keeping the default interaction calm.',
        },
        {
          kind: 'image-grid',
          images: [
            {
              src: `${IMG}/screens/default-screen.webp`,
              caption: 'Default screen',
              note: 'Follow the trainer, with sets, reps and weight controls.',
              alt: 'Default player screen: the exercise demo with sets, reps and calories at the top and left/right weight controls below.',
            },
            {
              src: `${IMG}/screens/detailed-metric.webp`,
              caption: 'Detailed metric screen',
              note: 'Range of motion, power and left/right performance, one swipe away.',
              alt: 'Detailed metric screen: range-of-motion waves, power bars per rep and a real-time weight chart for left and right sides.',
            },
          ],
        },
        { kind: 'subheading', eyebrow: 'Live resistance', text: 'A design assumption became an engineering question' },
        {
          kind: 'p',
          text: 'Initially, changing resistance meant pausing the workout, adjusting the weight and continuing. That was a natural assumption until we questioned the interruption it created.',
        },
        {
          kind: 'p',
          text: 'I discussed the interaction with developers. They asked for time to investigate whether live adjustment was technically possible. The answer was positive.',
        },
        {
          kind: 'p',
          text: 'That feasibility result changed the UX: resistance could now be adjusted while the workout remained active, removing an unnecessary interruption.',
        },
        { kind: 'highlight', text: "Engineering feasibility didn't just validate the design. It created a better design." },
        { kind: 'subheading', eyebrow: 'Tempo', text: 'Guiding each rep, not just measuring it' },
        {
          kind: 'p',
          text: "The initial discussion was to visually show the user's tempo — essentially showing how fast they were lifting during each repetition.",
        },
        {
          kind: 'p',
          text: 'But when I looked at natural behaviour in a gym, I questioned whether simply showing a tempo value would actually help. Someone who is new to fitness may not know what the right tempo should be, or when they should lift and lower the weight. Even in a gym, a trainer would usually guide the person on the pace to follow depending on the type of training.',
        },
        {
          kind: 'callout',
          label: 'UX problem',
          text: 'Instead of only showing users how they are performing, can the product guide them on how they should perform each repetition?',
        },
        {
          kind: 'p',
          text: "So I raised a question in our discussion with the team: instead of only measuring and showing the user's tempo, could we provide the expected tempo from our side and guide the user to follow it during every repetition?",
        },
        {
          kind: 'p',
          text: 'From those discussions, we found that this was technically possible to provide using scientifically established tempo guidance.',
        },
        {
          kind: 'image-grid',
          dark: true,
          images: [
            {
              src: `${IMG}/tempo/tempo-variation-1.webp`,
              caption: 'Variation 1',
              alt: 'Tempo variation 1: two vertical tracks comparing the trainer figure with the user figure.',
            },
            {
              src: `${IMG}/tempo/tempo-variation-2.webp`,
              caption: 'Variation 2',
              alt: 'Tempo variation 2: a horizontal track with dots falling onto it as tempo points.',
            },
            {
              src: `${IMG}/tempo/tempo-variation-3.webp`,
              caption: 'Variation 3',
              alt: 'Tempo variation 3: a vertical progress bar beside a staircase of dots showing tempo match.',
            },
            {
              src: `${IMG}/tempo/tempo-final.webp`,
              caption: 'Final design',
              alt: 'Final tempo design: two tall bars, green for the left side and orange for the right, filling with each rep.',
            },
          ],
        },
        {
          kind: 'p',
          text: 'This changed the role of tempo in the experience — from simply showing a number to helping the user understand how they should perform the movement.',
        },
      ],
    },
    {
      number: '08',
      title: 'An assessment that adapts to the user',
      blocks: [
        {
          kind: 'p',
          text: 'My initial instinct was to build on the existing UltraGym strength-test model: a fixed sequence of exercises, user-entered weights, and a final 5RM/1RM calculation.',
        },
        {
          kind: 'p',
          text: 'But UltraGym Pro was intended to support users with different strength levels and different reasons for testing. Some users may want to understand their maximum strength, while others may be more interested in how they perform across repetitions.',
        },
        {
          kind: 'p',
          text: "This made me question whether the same fixed sequence should be used for everyone. How could the assessment account for differences in the user's strength and performance?",
        },
        {
          kind: 'callout',
          label: 'UX problem',
          text: "How can the strength assessment adapt to the user's performance instead of making every user follow the same rigid sequence?",
        },
        { kind: 'subheading', eyebrow: 'Testing', text: 'We tested the idea before treating it as solved' },
        {
          kind: 'p',
          text: 'After developing the concept, we tested it with real users in two groups: one using a rigid resistance sequence and the other using adaptive resistance.',
        },
        {
          kind: 'p',
          text: 'The goal was to understand how users responded to each progression and how effectively they could reach their 1RM. We found that users in the adaptive-resistance group were able to reach and identify their 1RM faster and more efficiently than those following the rigid sequence.',
        },
        {
          kind: 'p',
          text: "The testing also exposed where the resistance progression felt too aggressive, helping us identify points where the system needed to adapt more closely to the user's performance.",
        },
        {
          kind: 'note',
          label: 'Edge case',
          text: 'If the resistance kept increasing, what happens when the user cannot complete the movement? The interaction needed a graceful response rather than treating that moment as a dead end — so I defined when a rep counts as failed, and what happens next.',
        },
        { kind: 'subheading', eyebrow: 'The assessment logic', text: 'Seven movement patterns, never more than seven reps in a row' },
        {
          kind: 'p',
          text: 'The assessment was designed around 7 movement patterns, with an overarching rule that the user would not be required to perform more than 7 consecutive reps, irrespective of the weight.',
        },
        {
          kind: 'flow',
          steps: [
            { title: 'Warm-up', text: 'A relevant warm-up for the movement pattern.' },
            { title: 'Starting weight', text: 'The user sets the weight to start from.' },
            { title: 'Countdown', text: 'A countdown before the resistance begins.' },
            {
              title: 'Monitored reps',
              text: "Each rep is tracked and the resistance increases automatically with the user's performance.",
            },
            {
              title: 'Rest & next attempt',
              text: 'The next weight is increased, kept the same or reduced, by exercise and progression logic.',
            },
          ],
          loop: 'Repeats across the 7 movement patterns',
          branch: {
            title: 'A rep fails when',
            conditions: [
              'The user does not attempt the rep',
              'The user attempts the lift but does not complete it within the required time',
              'The user disengages the resistance',
            ],
            outcome: 'The motor disengages and the user moves into a 2–3 minute rest period.',
          },
          note: 'The assessment logic was complex, but the interaction needed to remain understandable while the user was physically performing the exercise.',
        },
        {
          kind: 'image-grid',
          images: [
            {
              src: `${IMG}/screens/history-screen.webp`,
              caption: 'Strength history',
              note: 'Past tests by date, with the change in maximum weight lifted.',
              alt: 'Strength history screen: the exercise on the machine above a dated list of past tests showing start and max weight.',
            },
            {
              src: `${IMG}/screens/live-test.webp`,
              caption: 'Live rep test',
              note: 'The current weight stays large, with a timer bar for completing the rep.',
              alt: 'Live rep test screen: a large current-weight tile of 24 kg above the exercise demo and a timer bar to complete the rep.',
            },
          ],
        },
      ],
    },
  ],
  reflection: {
    paragraphs: [
      'UltraGym Pro taught me to think about the entire product environment, not just the interface. The hardware, physical space, user context, and every interaction had to work together as one experience.',
      'It also pushed me to look closely at human behavior and psychology during workouts — the small habits, decisions, hesitations, and patterns that shape how people actually exercise.',
      'The biggest takeaway was learning to design around people in their real context, rather than designing for a screen in isolation.',
    ],
  },
}
