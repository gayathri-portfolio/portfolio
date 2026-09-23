import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const paragraphs = [
  {
    text: "Architecture taught me that people don't read floor plans, they just walk through them. If they have to stop and figure out where to go, the design has already failed. I carried that into product design. Over the last 2.5 years I've designed UltraGym, a fitness app that makes everyday workouts feel simple, and UltraGym Pro, a connected fitness platform built for commercial gyms.",
    weight: 'font-normal',
    size: 'text-[8px] sm:text-[20px]',
  },
  {
    text: 'The part I enjoy most is the messy middle: talking to people, working through constraints, and untangling the context until the answer feels obvious.',
    weight: 'font-bold',
    size: '',
  },
]

const totalWords = paragraphs.reduce((sum, p) => sum + p.text.split(' ').length, 0)

export function Intro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })

  let wordIndex = 0

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-5 py-24 sm:py-32">
      <div ref={ref} className="w-full space-y-6 text-center font-display text-[14px] leading-snug tracking-tight sm:text-[26px]">
        {paragraphs.map((paragraph, pi) => (
          <p key={pi} className={`${paragraph.weight} ${paragraph.size}`}>
            {paragraph.text.split(' ').map((word, wi) => {
              const start = wordIndex / totalWords
              const end = (wordIndex + 1) / totalWords
              wordIndex++
              return (
                <Word key={wi} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              )
            })}
          </p>
        ))}
      </div>
    </section>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block text-text">
      {children}
    </motion.span>
  )
}
