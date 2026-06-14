import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (v: number) => void
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-text">{label}</span>
        <span className="font-mono text-lg font-semibold tabular-nums text-heading">
          {value.toLocaleString('en-US')}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full"
        style={{ accentColor: 'var(--brand)' }}
      />
    </label>
  )
}

export function RoiSection() {
  const sectionRef = useReveal<HTMLElement>()
  const [members, setMembers] = useState(5)
  const [hours, setHours] = useState(10)
  const [rate, setRate] = useState(40)

  const annualManualCost = members * hours * rate * 52
  const annualSavings = annualManualCost * 0.8 // automation removes ~80% of the manual work
  const buildCost = clamp(Math.round((members * hours * 120 + 2000) / 500) * 500, 2500, 25000)
  const paybackMonths = annualSavings > 0 ? buildCost / (annualSavings / 12) : 0

  return (
    <section className="section-shell" id="roi" ref={sectionRef}>
      <SectionHeader
        eyebrow="ROI calculator"
        title="What manual work is costing you."
        description="Three numbers in. Your annual cost, the cost to automate it, and how fast it pays for itself — out."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:items-stretch">
        <div data-reveal className="glass-card flex flex-col justify-center gap-6 rounded-2xl p-6 md:p-8">
          <Slider label="Team members on manual work" value={members} min={1} max={50} onChange={setMembers} />
          <Slider label="Manual hours per person / week" value={hours} min={1} max={40} suffix="h" onChange={setHours} />
          <Slider label="Average hourly cost" value={rate} min={15} max={150} suffix="/h" onChange={setRate} />
        </div>

        <div
          data-reveal
          className="relative overflow-hidden rounded-2xl border border-border-strong bg-[linear-gradient(150deg,var(--surface-2),var(--surface))] p-6 md:p-8"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">
            ▸ the math
          </span>
          <div className="mt-4">
            <div className="font-mono text-4xl font-semibold tabular-nums text-gradient md:text-5xl">
              {usd(annualManualCost)}
            </div>
            <div className="mt-1 text-sm text-muted">spent on this manual work every year</div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="font-mono text-xl font-semibold tabular-nums text-heading">{usd(buildCost)}</div>
              <div className="mt-1 text-xs text-muted">rough cost to automate</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="font-mono text-xl font-semibold tabular-nums text-heading">{usd(annualSavings)}</div>
              <div className="mt-1 text-xs text-muted">saved / year after</div>
            </div>
            <div className="col-span-2 rounded-xl border border-[color-mix(in_srgb,var(--brand)_30%,transparent)] bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] p-4">
              <div className="font-mono text-xl font-semibold tabular-nums text-heading">
                {paybackMonths < 1 ? 'under a month' : `~${paybackMonths.toFixed(1)} months`}
              </div>
              <div className="mt-1 text-xs text-muted">to pay for itself</div>
            </div>
          </div>

          <div className="mt-6">
            <Button href="#contact" withArrow>
              Put a number on it — book a call
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
