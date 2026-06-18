import { site, socialLinks } from '../../data/site'
import { useReveal } from '../../hooks/useReveal'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { ContactForm } from './ContactForm'

function CalendarEmbed() {
  if (site.calendarUrl) {
    return (
      <div className="h-136 overflow-hidden rounded-2xl border border-border bg-bg">
        <iframe src={site.calendarUrl} title="Book a call" className="h-full w-full" />
      </div>
    )
  }
  // Fallback until a Cal.com / Calendly link is added (see data/site.ts).
  return (
    <div className="glass-card grid h-136 place-items-center rounded-2xl p-8 text-center">
      <div className="flex max-w-xs flex-col items-center gap-4">
        <span className="grid size-12 place-items-center rounded-2xl border border-border-strong bg-surface text-brand-soft">
          <svg className="size-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="4.5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 9h18M8 3v3M16 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <h3 className="font-display text-lg font-semibold text-heading">Pick a time that works</h3>
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

export function ContactSection() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section className="section-shell" id="contact" ref={sectionRef}>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 md:p-10">
        <div className="relative z-10">
          <div className="max-w-2xl">
            <p data-reveal className="eyebrow">
              Contact
            </p>
            <h2
              data-reveal
              className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.1] text-heading md:text-5xl"
            >
              Let's automate something <span className="serif text-[1.1em] font-normal">intelligent.</span>
            </h2>
            <p data-reveal className="mt-5 text-base leading-8 text-muted md:text-lg">
              Book a call to talk through it live, or send a message — we usually reply within two
              business days.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start">
            <div data-reveal>
              <CalendarEmbed />
            </div>
            <div data-reveal>
              <ContactForm />
            </div>
          </div>

          <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-text transition hover:border-border-strong hover:text-heading"
            >
              <svg className="size-4 text-brand-soft" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                  className="grid size-10 place-items-center rounded-full border border-border text-muted transition hover:border-border-strong hover:text-heading"
                >
                  <Icon name={social.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
