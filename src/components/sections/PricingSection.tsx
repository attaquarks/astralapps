import { pricingTiers } from '../../data/pricing'
import { useReveal } from '../../hooks/useReveal'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

export function PricingSection() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section className="section-shell" id="pricing" ref={sectionRef}>
      <SectionHeader
        align="center"
        eyebrow="Pricing"
        title="No “contact us for a quote.” Here it is."
        description="Most studios hide pricing. We show it — that's a signal of confidence. Final numbers depend on scope, but this is the real shape."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:items-start">
        {pricingTiers.map((tier) => (
          <article
            key={tier.name}
            data-reveal
            className={`glass-card relative flex flex-col rounded-2xl p-6 md:p-7 ${
              tier.highlighted
                ? 'border-[color-mix(in_srgb,var(--brand)_45%,transparent)] lg:-mt-3 lg:pb-9'
                : ''
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(100deg,var(--brand),var(--accent))] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-white">
                Most popular
              </span>
            )}
            <h3 className="font-display text-lg font-semibold text-heading">{tier.name}</h3>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-semibold tabular-nums text-heading">{tier.price}</span>
              <span className="font-mono text-xs text-muted">/ {tier.note}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{tier.tagline}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm leading-6 text-text">
                  <svg className="mt-1 size-3.5 shrink-0 text-brand-soft" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 13l4 4L20 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button
                href="#contact"
                variant={tier.highlighted ? 'primary' : 'secondary'}
                withArrow
                className="w-full"
              >
                {tier.cta}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
