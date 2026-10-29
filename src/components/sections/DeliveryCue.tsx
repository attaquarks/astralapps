import { projects, type Project } from '../../data/projects'
import { techMarquee } from '../../data/site'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { RoiMeter } from './tools/RoiMeter'
import { PricingTable } from './tools/PricingTable'

/* Case-study card — Loom embed when a URL exists, honest placeholder until then. */
function LoomCard({ project }: { project: Project }) {
  const embed = project.loomUrl?.replace('/share/', '/embed/')
  return (
    <article data-reveal className="channel channel-day overflow-hidden">
      {embed ? (
        <div className="aspect-video w-full bg-bg-2">
          <iframe src={embed} title={`${project.title} walkthrough`} allowFullScreen className="h-full w-full" />
        </div>
      ) : (
        <div className="grid aspect-video w-full place-items-center border-b border-border bg-bg-2">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="grid size-11 place-items-center border border-border-strong bg-surface text-brand">
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="data text-[0.65rem] uppercase tracking-[0.14em] text-muted">walkthrough coming soon</span>
          </div>
        </div>
      )}
      <div className="p-5">
        <span className="data text-xs font-medium uppercase tracking-[0.14em] text-brand">{project.industry}</span>
        <h3 className="mt-2 font-display text-lg font-semibold normal-case text-heading">{project.title}</h3>
        <p className="mt-1.5 text-sm text-muted">{project.result}</p>
      </div>
    </article>
  )
}

/*
 * CH 05 — ORBIT. The automated week, in full light: shipped systems,
 * the cost meter, and the printed prices. The one opaque light band of the
 * chart — the dawn payoff state.
 */
export function DeliveryCue() {
  const sectionRef = useReveal<HTMLElement>()
  const recent = projects.slice(0, 3)

  return (
    <section
      id="work"
      data-cue="05"
      className="band-day band"
      style={{ background: 'linear-gradient(180deg, #e4def4 0%, #e9e5f4 46%, #e2ddf0 100%)' }}
      ref={sectionRef}
    >
      <div className="shell">
        <SectionHeader
          title="Shipped, measured, priced."
          description="What comes out of the studio, what it saves, and what it costs — in full light, because that's the confidence we're selling."
        />

        {/* Shipped archive */}
        <div data-reveal className="channel channel-day mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <span className="data flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-muted">
              <span className="mark-punched size-1.5" aria-hidden="true" />
              last shipped
            </span>
            <Tag>concept systems — illustrative</Tag>
          </div>
          <ul>
            {recent.map((project) => (
              <li
                key={project.title}
                className="flex flex-col gap-2 border-b border-border px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="data border border-border bg-bg-2 px-2 py-0.5 text-[0.65rem] uppercase text-brand">
                    {project.category}
                  </span>
                  <div>
                    <p className="font-medium text-heading">{project.title}</p>
                    <p className="text-xs text-muted">{project.industry}</p>
                  </div>
                </div>
                <div className="data flex items-center gap-4 pl-9 text-xs text-muted sm:pl-0">
                  <span className="text-brand">+{project.hoursSavedPerWeek}h/wk</span>
                  <span>built in {project.buildTime}</span>
                  <span className="text-heading">{project.shipped}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <p data-reveal className="data text-xs uppercase tracking-[0.18em] text-muted">
            Watch a build — 2-min case studies
          </p>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {recent.map((project) => (
              <LoomCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        {/* The cost meter */}
        <div data-reveal className="mt-20">
          <h3 className="text-2xl md:text-3xl">What manual work is costing you.</h3>
          <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
            Three numbers in. Your annual cost, the cost to automate it, and how fast it pays for
            itself — out.
          </p>
          <div className="mt-8">
            <RoiMeter />
          </div>
        </div>

        {/* Prices, printed */}
        <div data-reveal id="pricing" className="mt-20 scroll-mt-24">
          <h3 className="text-2xl md:text-3xl">No “contact us for a quote.” Here it is.</h3>
          <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
            Most studios hide pricing. We show it — that's a signal of confidence. Final numbers
            depend on scope, but this is the real shape.
          </p>
          <div className="mt-8">
            <PricingTable />
          </div>
        </div>

        {/* The stack we run */}
        <div data-reveal className="mt-20 border-t border-border pt-10">
          <p className="data text-center text-xs uppercase tracking-[0.2em] text-muted">
            The modern stack we build on
          </p>
          <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="marquee-track">
              <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
                {techMarquee.map((name) => (
                  <span key={name} className="whitespace-nowrap font-display text-lg font-medium text-muted">
                    {name}
                  </span>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
                {techMarquee.map((name) => (
                  <span key={name} className="whitespace-nowrap font-display text-lg font-medium text-muted">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
