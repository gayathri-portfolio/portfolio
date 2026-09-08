import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { SectionLabel } from './SectionLabel'
import { faqs } from '../data/projects'
import { cn } from '../lib/cn'

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 sm:py-32">
      <SectionLabel className="justify-center">FAQ</SectionLabel>
      <h2 className="mt-4 text-center font-display text-3xl font-semibold tracking-tight sm:text-5xl">
        Questions people actually ask
      </h2>

      <AccordionPrimitive.Root type="single" collapsible className="mt-12 divide-y divide-border border-y border-border">
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
    </section>
  )
}
