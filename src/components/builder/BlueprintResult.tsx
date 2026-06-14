import type { Blueprint } from '../../lib/api'
import { Button } from '../ui/Button'

const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

const complexityColor: Record<Blueprint['complexity'], string> = {
  Simple: 'text-emerald-300',
  Moderate: 'text-brand-soft',
  Advanced: 'text-amber-300',
}

export function BlueprintResult({ blueprint, onReset }: { blueprint: Blueprint; onReset: () => void }) {
  return (
    <div className="glass-card animate-pop rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">
          ▸ automation_blueprint
        </span>
        {blueprint.demo && (
          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            demo preview
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold text-heading">{blueprint.title}</h3>
      <p className="mt-2 max-w-2xl leading-7 text-muted">{blueprint.summary}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Workflow diagram */}
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">Workflow</p>
          <div className="mt-3 rounded-xl border border-border bg-surface p-2">
            <div className="flex items-center gap-2 rounded-lg bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] px-3 py-2.5">
              <span className="live-dot size-2 rounded-full bg-accent" />
              <span className="text-sm text-heading">
                <span className="text-muted">Trigger&nbsp;·&nbsp;</span>
                {blueprint.trigger}
              </span>
            </div>
            <ol className="mt-1">
              {blueprint.steps.map((step, i) => (
                <li key={i} className="relative flex gap-3 px-3 py-2.5">
                  {i < blueprint.steps.length - 1 && (
                    <span className="absolute left-[1.45rem] top-9 h-[calc(100%-1rem)] w-px bg-border" />
                  )}
                  <span className="z-10 grid size-6 shrink-0 place-items-center rounded-md border border-border-strong bg-bg font-mono text-xs text-brand-soft">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-6 text-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Stats + stack */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="font-mono text-2xl font-semibold tabular-nums text-gradient">
                {blueprint.hoursSavedPerWeek}h
              </div>
              <div className="mt-1 text-xs text-muted">saved / week</div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className={`font-mono text-2xl font-semibold ${complexityColor[blueprint.complexity]}`}>
                {blueprint.complexity}
              </div>
              <div className="mt-1 text-xs text-muted">complexity</div>
            </div>
            <div className="col-span-2 rounded-xl border border-border bg-surface p-4">
              <div className="font-mono text-xl font-semibold tabular-nums text-heading">
                {usd(blueprint.estimatedCostUsd.min)}
                <span className="text-muted"> – </span>
                {usd(blueprint.estimatedCostUsd.max)}
              </div>
              <div className="mt-1 text-xs text-muted">estimated to build</div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">Stack</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {blueprint.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Want us to actually build this for you?</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-muted transition hover:text-heading"
          >
            Try another
          </button>
          <Button href="#contact" withArrow>
            Book a call
          </Button>
        </div>
      </div>
    </div>
  )
}
