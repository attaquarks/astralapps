import type { ReactNode } from 'react'
import { industries, type IndustryId } from '../../data/industries'
import { useIndustry } from '../../context/IndustryContext'

const iconProps = {
  className: 'size-4',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const icons: Record<IndustryId, ReactNode> = {
  recruiting: (
    <svg {...iconProps}>
      <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
      <circle cx="10" cy="8" r="3.2" />
      <path d="M19.5 20v-1.5a3.5 3.5 0 0 0-2.6-3.4M16 5.2a3.2 3.2 0 0 1 0 5.6" />
    </svg>
  ),
  marketing: (
    <svg {...iconProps}>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l4 3.5V6.5L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M15 8.5a4 4 0 0 1 0 7M18 5.5a8 8 0 0 1 0 13" />
    </svg>
  ),
  accounting: (
    <svg {...iconProps}>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M9 7h6M9 11h2M13 11h2M9 15h2M13 15h2" />
    </svg>
  ),
  realestate: (
    <svg {...iconProps}>
      <path d="M3 11l9-7 9 7M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9M9.5 20v-5h5v5" />
    </svg>
  ),
}

const base =
  'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition'
const activeCls =
  'border-[color-mix(in_srgb,var(--brand)_55%,transparent)] bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-heading'
const idleCls = 'border-border text-muted hover:border-border-strong hover:text-heading'

export function IndustrySelector({ className = '' }: { className?: string }) {
  const { industryId, setIndustryId } = useIndustry()

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="group" aria-label="Choose your industry">
      <button
        type="button"
        onClick={() => setIndustryId(null)}
        aria-pressed={industryId === null}
        className={`${base} ${industryId === null ? activeCls : idleCls}`}
      >
        All
      </button>
      {industries.map((industry) => (
        <button
          key={industry.id}
          type="button"
          onClick={() => setIndustryId(industry.id)}
          aria-pressed={industryId === industry.id}
          className={`${base} ${industryId === industry.id ? activeCls : idleCls}`}
        >
          <span className="text-brand-soft">{icons[industry.id]}</span>
          {industry.label}
        </button>
      ))}
    </div>
  )
}
