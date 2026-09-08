import type { CaseStudyContent } from './caseStudyTypes'

const IMG = '/case-studies/ultragym-pro'

export const ultragymPro: CaseStudyContent = {
  slug: 'ultragym-pro',
  title: 'UltraGym Pro',
  tagline: 'On-device touchscreen for a 120kg commercial strength machine',
  intro:
    'UltraGym Pro is a commercial strength-training system with up to 120kg of digital resistance, bringing workout guidance, strength assessment, and real-time training feedback directly onto the machine. The challenge wasn\'t simply designing a touchscreen — it was designing for a user who is standing, moving, pulling, exerting force, and looking at the screen from constantly changing positions. I designed the 21.5-inch vertical interface around that physical context, making every interaction glanceable, legible, and easy to act on under exertion.',
  heroImage: `${IMG}/hero-product.webp`,
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
      title: 'What happens to people who need more than 70kg?',
      blocks: [
        {
          kind: 'callout',
          label: 'The product question',
          text: 'What happens to people who need more than 70kg?',
        },
        {
          kind: 'p',
          text: "The original UltraGym topped out at 70kg — enough for home users, not enough for commercial, semi-commercial and serious home-gym users. The founder's direction was to explore a Pro version with 120kg of resistance and a screen integrated into the machine, opening up more possibilities for how it could be used.",
        },
        {
          kind: 'p',
          text: 'The product was designed to make better use of the machine through different attachment and positioning possibilities — including column and floor outputs — letting users perform more exercise types and make fuller use of the equipment.',
        },
        { kind: 'image', src: `${IMG}/page-02.webp`, caption: 'Ultragym (70kg, home) → Ultragym Pro (120kg, commercial / semi-commercial / home)' },
      ],
    },
    {
      number: '02',
      title: 'Going outside the product before designing it',
      blocks: [
        {
          kind: 'callout',
          label: 'The challenge',
          text: "How do you design a sophisticated fitness experience for someone who is standing and moving in front of a 21-inch touchscreen, viewed from roughly a metre away and touched from about two feet?",
        },
        {
          kind: 'p',
          text: "I started with a BRD and listed the features I knew would be necessary. But I didn't want to design the software on assumptions alone, so I went outside the product — into gym context and trainer perspectives, user and product conversations, and a competitor study of connected-fitness products like Speediance and Tonal.",
        },
        {
          kind: 'p',
          text: 'I brought those observations back into the product discussion with the CEO/founder and Fitness Manager, and kept refining direction before moving into user flows and wireframes. The process was never linear — product, design, fitness expertise and engineering discussions continuously influenced the experience as it evolved.',
        },
        { kind: 'image', src: `${IMG}/page-03.webp`, caption: 'Research → product discussion → flows → UI → testing → developer handoff — a loop, not a line' },
      ],
    },
    {
      number: '03',
      title: 'Designing for a body in motion',
      blocks: [
        {
          kind: 'p',
          text: 'UltraGym Pro uses a 21-inch portrait touchscreen at 1080×1920px. Unlike a phone or laptop, the user stands in front of the machine rather than sitting close to the screen.',
        },
        {
          kind: 'quote',
          text: 'Without any cues, people naturally positioned themselves around the middle of the platform, roughly one metre from the screen.',
        },
        {
          kind: 'p',
          text: "That observation shaped the interface: it needed to stay legible from about a metre away, while interactions still had to work comfortably when someone moved in to around two feet. It also shaped the physical product — I pushed for markers on the platform to establish the right standing position for different use cases, so users wouldn't have to figure it out themselves.",
        },
        { kind: 'image', src: `${IMG}/page-04.webp`, caption: 'Scale & distance: 1 metre viewing distance, 2 feet interaction distance' },
        {
          kind: 'p',
          text: "This was a new screen size for me, and at first I struggled to visualize how large elements should actually be — some early attempts made everything too large because I was designing for the canvas, not for the way the user would actually see it. Paper sketches helped me explore layout and spatial relationships before Figma, and I kept revisiting scale, spacing and proportion as a 21-inch portrait screen viewed from a metre away, not as a rectangle on my monitor.",
        },
        { kind: 'image', src: `${IMG}/page-05.webp`, caption: 'Paper sketches ↔ Figma wireframes, back and forth until the scale felt right' },
      ],
    },
    {
      number: '04',
      title: 'From wireframes to a visual system',
      blocks: [
        {
          kind: 'p',
          text: "Wireframes gave me structure, but they weren't the final answer. As I worked through screens, discussions with the founder, Fitness Manager and developers continued — a design decision could raise a product question, a product requirement could change an interaction, a technical possibility could open a different solution. I wasn't simply translating wireframes into polished screens; I was continuing to shape the product while designing it.",
        },
        {
          kind: 'list',
          items: [
            'Does this interaction make sense for someone who is standing, moving and working out?',
            'Can the product make this feel natural without making the user stop and learn how it works?',
          ],
        },
        { kind: 'image', src: `${IMG}/page-06.webp`, caption: 'Early wireframes across home, workout creation, exercise detail and strength assessment' },
        {
          kind: 'p',
          text: 'Before scaling the UI across the product, I needed to establish how UltraGym Pro should look and feel — a mood board, several mockup directions, and 3–4 variations of the key screens (Home, Workout Player, Strength Test) before settling on visual style, color direction and reusable components.',
        },
        { kind: 'image', src: `${IMG}/page-07.webp`, caption: 'Inspiration → moodboard → UI exploration → final direction → visual language and components' },
      ],
    },
    {
      number: '05',
      title: "Home screen: the problem wasn't a lack of features",
      blocks: [
        {
          kind: 'p',
          text: 'UltraGym Pro had several ways to start a workout — Exercise Library, Create Workout, Generate Workout, Classes, My Library, Strength Test and Quick Train. The easy answer would have been to give all of them equal weight. But a commercial user may arrive with a simple intention and limited attention, and giving every option the same prominence turns capability into decision fatigue.',
        },
        {
          kind: 'callout',
          label: 'The design question',
          text: 'How do I make all the workout options available without making the Home screen overwhelming?',
        },
        {
          kind: 'quote',
          text: "Hick's Law: as the number of choices increases, the time required to make a decision also increases.",
        },
        {
          kind: 'p',
          text: "The goal wasn't to reduce the number of choices — it was to reduce the effort required to choose. I also deliberately varied how different features were represented so the interface didn't become a wall of identical cards, creating enough visual rhythm to scan without feeling busy.",
        },
        { kind: 'image', src: `${IMG}/page-08.webp`, caption: 'Variation 1 → Variation 2 → Final design' },
      ],
    },
    {
      number: '06',
      title: 'Designing around the rhythm of a workout',
      blocks: [
        {
          kind: 'p',
          text: "I initially thought the Pro player should expose more metrics, simply because the hardware could support them. But capability and attention are different problems — a beginner mostly wants to follow the exercise and finish the workout; an experienced user cares more about performance; an athlete training for endurance needs progression, tempo and range of motion.",
        },
        {
          kind: 'callout',
          label: 'UX problem',
          text: 'How do I design a single workout experience that adapts to different user intents without overwhelming everyone with the same level of information?',
        },
        {
          kind: 'p',
          text: 'I sat with the Fitness Manager to define what information would actually help each type of user, and with developers on what the machine could realistically surface: video, reps, sets, weight, range of motion, power, left/right performance and tempo.',
        },
        { kind: 'image', src: `${IMG}/page-09.webp`, caption: 'Three variations of the workout player' },
        {
          kind: 'quote',
          text: 'Progressive disclosure was not a UX pattern I added because it sounded good — it emerged from the physical context of the workout.',
        },
        {
          kind: 'p',
          text: 'The default screen stays calm; a second, richer view carries the graphs and numbers for anyone who wants them — without forcing every user to process that data mid-movement.',
        },
        { kind: 'image', src: `${IMG}/page-10.webp`, caption: 'Final design — default screen vs. detailed metric screen' },
        {
          kind: 'p',
          text: "Initially, changing resistance meant pausing the workout, adjusting the weight and continuing — a natural assumption until we questioned the interruption it created. I raised it with developers, who investigated whether live adjustment was technically possible. It was. Resistance could now change while the workout stayed active, removing an interruption that nobody had actually asked to keep.",
        },
        {
          kind: 'highlight',
          text: "Engineering feasibility didn't just validate the design. It created a better one.",
        },
      ],
    },
    {
      number: '07',
      title: 'Tempo, guided instead of just measured',
      blocks: [
        {
          kind: 'p',
          text: "The initial idea was to show the user's tempo — how fast they were lifting each rep. But watching natural gym behaviour, I questioned whether a raw number would actually help: someone new to fitness may not know what tempo they should be aiming for at all, the way a trainer would normally guide their pace.",
        },
        {
          kind: 'callout',
          label: 'UX problem',
          text: 'Instead of only showing users how they are performing, can the product guide them on how they should perform each repetition?',
        },
        {
          kind: 'p',
          text: 'That question led to a different feature: providing the expected tempo from the system side, using scientifically established tempo guidance, and having the user follow it during every repetition — turning tempo from a number to watch into direction to follow.',
        },
        { kind: 'image', src: `${IMG}/page-11.webp`, caption: 'Tempo variations, from a raw value to guided left/right tempo bars' },
      ],
    },
    {
      number: '08',
      title: 'A strength assessment that adapts to you',
      blocks: [
        {
          kind: 'p',
          text: 'My first instinct was to extend the existing UltraGym strength-test model — a fixed sequence, user-entered weights, a final 5RM/1RM calculation. But Pro needed to support very different users and very different reasons for testing: some want their maximum strength, others care more about how they perform across repetitions.',
        },
        {
          kind: 'callout',
          label: 'Problem',
          text: "How can the strength assessment adapt to the user's performance instead of making everyone follow the same rigid sequence?",
        },
        {
          kind: 'p',
          text: 'The assessment is built around 7 movement patterns, with one rule throughout: never more than 7 consecutive reps, regardless of weight. After a warm-up and a starting weight set by the user, the system monitors every rep and automatically progresses resistance based on performance — increasing, holding or reducing the next weight depending on the exercise and how the user is trending.',
        },
        { kind: 'image', src: `${IMG}/page-12.webp`, caption: 'Assessment flow across 7 movement patterns' },
        {
          kind: 'p',
          text: 'We tested it with real users in two groups — one on a rigid resistance sequence, one on adaptive resistance. The adaptive group reached and identified their 1RM faster and more efficiently, and testing also surfaced points where progression felt too aggressive.',
        },
        {
          kind: 'quote',
          text: 'If the resistance kept increasing, what happens when the user simply cannot complete the movement? The interaction needed a graceful response, not a dead end.',
        },
        {
          kind: 'list',
          items: [
            'The user does not attempt the rep',
            'The user attempts the lift but does not complete it in time',
            'The user disengages the resistance',
          ],
        },
        {
          kind: 'p',
          text: 'Any of those counts as a failed rep: the motor disengages and the user moves into a 2–3 minute rest period. The logic underneath was complex, but the interaction on screen had to stay understandable while someone was physically mid-exercise.',
        },
        { kind: 'image', src: `${IMG}/page-13.webp`, caption: 'Rigid vs. adaptive resistance testing, and the rep-fail rest flow' },
      ],
    },
  ],
  reflection:
    'UltraGym Pro taught me to think about the entire product environment, not just the interface — hardware, physical space, user context and every interaction had to work together as one experience. It also pushed me to look closely at human behaviour and psychology during workouts: the small habits, hesitations and decisions that shape how people actually exercise.',
  learnings:
    'Designing around people in their real context, rather than designing for a screen in isolation.',
}
