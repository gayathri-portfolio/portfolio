import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { SectionLabel } from './SectionLabel'
import { faqs } from '../data/projects'
import { cn } from '../lib/cn'

export function Faq() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 translate-x-1/3 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          Questions people actually ask
        </h2>

        <AccordionPrimitive.Root type="single" collapsible className="glass-strong mt-12 divide-y divide-border/60 rounded-3xl px-6 sm:px-8">
        {faqs.map((item, i) => (
          <AccordionPrimitive.Item key={i} value={`item-${i}`} className="py-1">
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger
                className={cn(
                  'group flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-medium text-text transition-colors hover:text-accent',
                )}
              >
                {item.question}
                <ChevronDown className="h-4 w-4 shrink-0 text-text-faint transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden text-text-muted data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <p className="pb-6 pr-10">{item.answer}</p>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
