import { pricingTiers } from '../../../data/pricing'
import { Button } from '../../ui/Button'

/* Prices verbatim from data/pricing.ts — the transparency is the product. */
export function PricingTable() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:items-start">
      {pricingTiers.map((tier) => (
        <article
          key={tier.name}
          data-reveal
          className={`channel channel-day relative flex flex-col p-6 md:p-7 ${
            tier.highlighted ? 'border-border-strong lg:-mt-3 lg:pb-9' : ''
          }`}
        >
          {tier.highlighted && (
            <span className="absolute -top-3 left-6 bg-heading px-3 py-1 data text-[0.65rem] uppercase tracking-[0.14em] text-bg">
              Most popular
            </span>
          )}
          <h3 className="text-xl normal-case">{tier.name}</h3>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="data text-4xl font-medium text-heading">{tier.price}</span>
            <span className="data text-xs text-muted">/ {tier.note}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{tier.tagline}</p>

          <ul className="mt-6 flex-1 space-y-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-sm leading-6 text-text">
                <span className="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Button href="#contact" variant={tier.highlighted ? 'primary' : 'secondary'} withArrow className="w-full">
              {tier.cta}
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}
