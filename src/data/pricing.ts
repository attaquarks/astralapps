/*
 * PRICING (#14) — shown openly; transparency builds trust.
 * TODO: replace these placeholder prices and deliverables with your real ones.
 */

export type Tier = {
  name: string
  price: string
  note: string
  tagline: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export const pricingTiers: Tier[] = [
  {
    name: 'Starter',
    price: '$2.5k',
    note: 'one-off',
    tagline: 'One painful manual task, automated and shipped.',
    features: [
      'A single end-to-end automation',
      'Integrated with your existing tools',
      'Monitoring + alerting',
      '2–3 week delivery',
      '30 days of support',
    ],
    cta: 'Start here',
  },
  {
    name: 'Growth',
    price: '$6k',
    note: 'project',
    tagline: 'A connected set of automations across a whole workflow.',
    features: [
      'Everything in Starter',
      '3–5 automations working together',
      'Custom dashboard / control panel',
      'AI features (classification, drafting, routing)',
      '90 days of support',
    ],
    highlighted: true,
    cta: 'Most popular',
  },
  {
    name: 'Scale',
    price: 'Custom',
    note: 'retainer',
    tagline: 'An ongoing automation partner for the whole business.',
    features: [
      'Everything in Growth',
      'A roadmap of automations, prioritised',
      'Dedicated build + maintenance',
      'Quarterly ROI reviews',
      'Priority support & SLAs',
    ],
    cta: 'Talk to us',
  },
]
