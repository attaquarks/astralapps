import { useState } from 'react'
import { site, socialLinks } from '../../data/site'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { ContactForm } from './ContactForm'

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

const fit = [
  'You have a team doing real, repetitive manual work every week',
  'You use modern tools (CRM, cloud apps, spreadsheets, email)',
  'You want a system you own, not a person you depend on',
  'You can point to the workflow that hurts most',
]

const notFit = [
  'You want a quick Zapier zap you could build yourself',
  'There’s no repetitive work to remove yet',
  'You need it “done by tomorrow” with no discovery',
]

function CalendarEmbed() {
  if (site.calendarUrl) {
    return (
      <div className="channel h-[34rem] overflow-hidden p-0">
        <iframe src={site.calendarUrl} title="Book a call" className="h-full w-full" />
      </div>
    )
  }
  // Fallback until a Cal.com / Calendly link is added (see data/site.ts).
  return (
    <div className="channel grid h-[34rem] place-items-center p-8 text-center">
      <div className="flex max-w-xs flex-col items-center gap-4">
        <span className="grid size-12 place-items-center border border-border-strong bg-surface-2 text-brand">
          <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <h3 className="text-xl normal-case">Pick a time that works</h3>
        <p className="text-sm leading-6 text-muted">
          Grab a 30-minute slot and we'll walk through your workflow live.
        </p>
        <Button href={`mailto:${site.email}`} withArrow>
          Book via email
        </Button>
      </div>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div id="faq" data-reveal className="divide-y divide-border border-y border-border">
      {faqs.map((faq, i) => {
        const isOpen = open === i
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-display text-lg font-semibold normal-case text-heading">{faq.q}</span>
              <span className={`mark-flag shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-7 text-muted">{faq.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function HonestFit() {
  return (
    <div data-reveal className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="text-xl normal-case text-brand">We're a fit if</h3>
        <ul className="mt-4 space-y-3">
          {fit.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-text">
              <span className="mt-1 grid size-5 shrink-0 place-items-center border border-border-strong text-brand" aria-hidden="true">
                <svg className="size-3" viewBox="0 0 24 24" fill="none">
                  <path d="M4 13l4 4L20 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl normal-case text-muted">Probably not if</h3>
        <ul className="mt-4 space-y-3">
          {notFit.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
              <span className="mt-1 grid size-5 shrink-0 place-items-center border border-border text-muted" aria-hidden="true">
                <svg className="size-3" viewBox="0 0 24 24" fill="none">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/*
 * CH 06 — CONTACT. The close: honest fit, the questions we get on every
 * call, and the way in — a booked call or a message, under a fully formed
 * constellation.
 */
export function CloseCue() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section id="contact" data-cue="06" className="band wash-dawn" ref={sectionRef}>
      <div className="shell">
        <SectionHeader
          title="Let's chart your week."
          description="Book a call to talk through it live, or send a message — we usually reply within two business days."
        />

        <div data-reveal className="channel mt-12 p-6 md:p-10">
          <div className="border-b border-border pb-8">
            <h3 className="text-2xl md:text-3xl">We don't take every project.</h3>
            <p className="mt-3 max-w-2xl leading-8 text-muted">
              We work best with a specific kind of team — and we'll tell you early if that's not
              you. It keeps our work sharp and your money well spent.
            </p>
            <div className="mt-7">
              <HonestFit />
            </div>
          </div>

          <div className="pt-8">
            <h3 className="text-2xl md:text-3xl">The questions we get on every call.</h3>
            <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
              The real objections teams raise before working with us — answered up front.
            </p>
            <div className="mt-6">
              <Faq />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div data-reveal className="flex">
            <CalendarEmbed />
          </div>
          <div data-reveal className="flex">
            <ContactForm />
          </div>
        </div>

        <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2 text-sm text-text transition hover:border-border-strong hover:text-heading"
          >
            <svg className="size-4 text-brand" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 6h16v12H4zM4 7l8 6 8-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {site.email}
          </a>
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
                className="grid size-10 place-items-center border border-border text-muted transition hover:border-border-strong hover:text-heading"
              >
                <Icon name={social.icon} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
