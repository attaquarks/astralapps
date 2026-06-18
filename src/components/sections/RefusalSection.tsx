import { useReveal } from '../../hooks/useReveal'

// #20 — exclusivity flips the dynamic. TODO: tune to your real ideal client.
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

function Item({ children, ok }: { children: string; ok: boolean }) {
  return (
    <li className="flex gap-3 text-sm leading-6 text-text">
      <span
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${
          ok ? 'border-[color-mix(in_srgb,var(--accent)_50%,transparent)] text-brand-soft' : 'border-border text-muted'
        }`}
      >
        {ok ? (
          <svg className="size-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 13l4 4L20 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="size-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        )}
      </span>
      {children}
    </li>
  )
}

export function RefusalSection() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section className="section-shell" id="fit" ref={sectionRef}>
      <div className="glass-card rounded-3xl p-6 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal>
            <p className="eyebrow">Honest fit</p>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.12] text-heading md:text-4xl">
              We don't take every project.
            </h2>
            <p className="mt-4 leading-8 text-muted">
              We work best with a specific kind of team — and we'll tell you early if that's not you.
              It keeps our work sharp and your money well spent.
            </p>
          </div>

          <div data-reveal className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-soft">We're a fit if</p>
              <ul className="mt-4 space-y-3">
                {fit.map((item) => (
                  <Item key={item} ok>
                    {item}
                  </Item>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Probably not if</p>
              <ul className="mt-4 space-y-3">
                {notFit.map((item) => (
                  <Item key={item} ok={false}>
                    {item}
                  </Item>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
