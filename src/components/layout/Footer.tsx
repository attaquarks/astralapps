import { navItems, site, socialLinks } from '../../data/site'
import { services } from '../../data/services'
import { Icon } from '../ui/Icon'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border">
      {/* gradient hairline accent along the top edge */}
      <div className="absolute inset-x-0 -top-px h-px bg-[linear-gradient(90deg,transparent,var(--brand),var(--accent),transparent)]" />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="#hero" className="flex items-center gap-2.5" aria-label="AstralApps — home">
              <img src="/favicon.svg" alt="" width={28} height={27} className="size-7" />
              <span className="font-display text-lg font-semibold tracking-tight text-heading">
                Astral<span className="text-gradient">Apps</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-7 text-muted">{site.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid size-10 place-items-center rounded-full border border-border text-muted transition hover:border-border-strong hover:text-heading"
                >
                  <Icon name={social.icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer — explore">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-muted">Explore</h3>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-text transition-colors hover:text-heading"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — services">
            <h3 className="font-display text-xs uppercase tracking-[0.2em] text-muted">Services</h3>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="text-sm text-text transition-colors hover:text-heading"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="text-sm text-muted transition-colors hover:text-heading">
              {site.email}
            </a>
            <a href="#hero" className="text-sm text-muted transition-colors hover:text-heading">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
