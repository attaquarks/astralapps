import { lazy, Suspense, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { projects } from '../../data/projects'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeader } from '../ui/SectionHeader'

const AstralScene = lazy(() =>
  import('../three/AstralScene').then((module) => ({ default: module.AstralScene })),
)

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.from('.project-card', {
        autoAlpha: 0,
        y: 38,
        rotationX: -6,
        transformOrigin: '50% 100%',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section className="section-shell relative overflow-hidden" id="projects" ref={sectionRef}>
      <Suspense fallback={<div className="absolute inset-0" />}>
        <AstralScene className="opacity-45" variant="projects" />
      </Suspense>
      <div className="relative z-10">
        <SectionHeader
          align="center"
          eyebrow="Featured Projects"
          title="A project galaxy for intelligent digital systems."
          description="These concept projects show the kind of product surfaces AstralApps is built to deliver: practical, polished, and ready for real operations."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {projects.map((project, index) => (
            <article
              className="project-card glass-card group flex min-h-[380px] flex-col justify-between p-6 transition duration-300 hover:-translate-y-2 hover:rotate-[0.6deg] hover:border-cyan-300/45"
              key={project.title}
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-cyan-300">{project.category}</span>
                  <span className="grid size-10 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] text-sm text-[var(--color-heading)]">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold leading-tight text-[var(--color-heading)]">
                  {project.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
                  {project.description}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-muted)]"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
