import type { Blueprint } from '../../lib/api'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'

const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

export function BlueprintResult({ blueprint, onReset }: { blueprint: Blueprint; onReset: () => void }) {
  return (
    <div className="channel animate-pop p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="data flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-brand">
          <span className="inline-block size-1.5 bg-brand" aria-hidden="true" />
          automation_blueprint
        </span>
        {blueprint.demo && <Tag>demo preview</Tag>}
      </div>

      <h3 className="mt-4 text-2xl normal-case">{blueprint.title}</h3>
      <p className="mt-2 max-w-2xl leading-7 text-muted">{blueprint.summary}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Workflow — the trigger and its numbered steps */}
        <div>
          <p className="data text-[0.7rem] uppercase tracking-[0.18em] text-muted">Workflow</p>
          <div className="mt-3 border border-border">
            <div className="flex items-center gap-2.5 border-b border-border bg-surface-2 px-3.5 py-3">
              <span className="mark-punched size-2" aria-hidden="true" />
              <span className="text-sm text-heading">
                <span className="text-muted">Trigger · </span>
                {blueprint.trigger}
              </span>
            </div>
            <ol>
              {blueprint.steps.map((step, i) => (
                <li key={i} className="relative flex gap-3 px-3.5 py-2.5">
                  {i < blueprint.steps.length - 1 && (
                    <span className="absolute left-[1.7rem] top-10 h-[calc(100%-1rem)] w-px bg-border" />
                  )}
                  <span className="data z-10 grid size-6 shrink-0 place-items-center border border-border-strong bg-bg text-xs text-brand">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-6 text-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Measured result + stack */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-border bg-surface p-4">
              <div className="data text-2xl font-medium text-brand">{blueprint.hoursSavedPerWeek}h</div>
              <div className="mt-1 text-xs text-muted">saved / week</div>
            </div>
            <div className="border border-border bg-surface p-4">
              <div className="data text-2xl font-medium text-heading">{blueprint.complexity}</div>
              <div className="mt-1 text-xs text-muted">complexity</div>
            </div>
            <div className="col-span-2 border border-border bg-surface p-4">
              <div className="data text-xl font-medium text-heading">
                {usd(blueprint.estimatedCostUsd.min)}
                <span className="text-muted"> – </span>
                {usd(blueprint.estimatedCostUsd.max)}
              </div>
              <div className="mt-1 text-xs text-muted">estimated to build</div>
            </div>
          </div>

          <div>
            <p className="data text-[0.7rem] uppercase tracking-[0.18em] text-muted">Stack</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {blueprint.tools.map((tool) => (
                <span key={tool} className="data border border-border bg-surface px-2.5 py-1 text-xs text-text">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Want us to actually build this for you?</p>
        <div className="flex items-center gap-4">
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
