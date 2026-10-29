import { useState } from 'react'
import { Button } from '../../ui/Button'

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
        <span className="data text-lg font-medium text-heading">
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
      />
    </label>
  )
}

/* The light meter: the ROI math is unchanged — three sliders in, the annual cost of manual work out. */
export function RoiMeter() {
  const [members, setMembers] = useState(5)
  const [hours, setHours] = useState(10)
  const [rate, setRate] = useState(40)

  const annualManualCost = members * hours * rate * 52
  const annualSavings = annualManualCost * 0.8 // automation removes ~80% of the manual work
  const buildCost = clamp(Math.round((members * hours * 120 + 2000) / 500) * 500, 2500, 25000)
  const paybackMonths = annualSavings > 0 ? buildCost / (annualSavings / 12) : 0

  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
      <div className="channel channel-day flex flex-col justify-center gap-7 p-6 md:p-8">
        <Slider label="Team members on manual work" value={members} min={1} max={50} onChange={setMembers} />
        <Slider label="Manual hours per person / week" value={hours} min={1} max={40} suffix="h" onChange={setHours} />
        <Slider label="Average hourly cost" value={rate} min={15} max={150} suffix="/h" onChange={setRate} />
      </div>

      <div className="channel channel-day p-6 md:p-8">
        <span className="data flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted">
          <span className="inline-block size-1.5 bg-brand" aria-hidden="true" />
          the math
        </span>
        <div className="mt-4">
          <div className="data text-4xl font-medium text-heading md:text-5xl">{usd(annualManualCost)}</div>
          <div className="mt-1 text-sm text-muted">spent on this manual work every year</div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="border border-border bg-bg-2 p-4">
            <div className="data text-xl font-medium text-heading">{usd(buildCost)}</div>
            <div className="mt-1 text-xs text-muted">rough cost to automate</div>
          </div>
          <div className="border border-border bg-bg-2 p-4">
            <div className="data text-xl font-medium text-heading">{usd(annualSavings)}</div>
            <div className="mt-1 text-xs text-muted">saved / year after</div>
          </div>
          <div className="col-span-2 border border-border-strong bg-bg-2 p-4">
            <div className="data text-xl font-medium text-brand">
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
  )
}
