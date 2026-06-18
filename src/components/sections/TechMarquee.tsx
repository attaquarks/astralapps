import { techMarquee } from '../../data/site'

/* Two identical groups inside the track so translateX(-50%) loops seamlessly. */
function MarqueeGroup() {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
      {techMarquee.map((name) => (
        <span
          key={name}
          className="whitespace-nowrap font-display text-lg font-medium text-muted"
        >
          {name}
        </span>
      ))}
    </div>
  )
}

export function TechMarquee() {
  return (
    <section aria-label="Technologies we work with" className="relative border-y border-border py-10">
      <p className="mb-7 text-center font-display text-xs uppercase tracking-[0.22em] text-muted">
        The modern stack we build on
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup />
        </div>
      </div>
    </section>
  )
}
