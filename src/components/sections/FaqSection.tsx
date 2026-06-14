import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeader } from '../ui/SectionHeader'

// Real objections we hear on discovery calls (#19) — answering them shows experience.
const faqs = [
  {
    q: 'Will this break if we change our workflow?',
    a: 'No. We build automations to be edited, not frozen — clear logic, version control, and alerting so when something changes, you (or we) adjust it in minutes, not start over.',
  },
  {
    q: 'Who maintains it after you build it?',
    a: 'You own everything we build. We hand over documentation and offer a maintenance retainer, but nothing is locked to us — your team or any developer can take it forward.',
  },
  {
    q: "What if my team doesn't adopt it?",
    a: 'Adoption is part of the design. We automate the work people already hate, keep humans in the loop where it matters, and roll out gradually so it feels like relief, not disruption.',
  },
  {
    q: 'How long does a typical automation take to build?',
    a: 'Most first automations ship in 2–4 weeks. We start with the single highest-pain workflow so you see value fast, then expand from there.',
  },
  {
    q: 'Do we have to replace our current tools?',
    a: 'Almost never. We build on top of what you already use — your CRM, inbox, spreadsheets, and accounting tools — connecting them rather than ripping them out.',
  },
  {
    q: 'Is our data safe?',
    a: 'Yes. We follow least-privilege access, keep credentials server-side, and can work within your security and compliance requirements. Your data stays in your tools.',
  },
]

export function FaqSection() {
  const sectionRef = useReveal<HTMLElement>()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-shell" id="faq" ref={sectionRef}>
      <SectionHeader
        eyebrow="Discovery-call questions"
        title="The questions we get on every call."
        description="The real objections teams raise before working with us — answered up front."
      />

      <div data-reveal className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={faq.q} className="bg-surface/40">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display font-semibold text-heading">{faq.q}</span>
                <svg
                  className={`size-5 shrink-0 text-brand-soft transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-7 text-muted">{faq.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
