import { useEffect, useState } from 'react'
import type { ThemeMode } from '../../App'
import { navItems } from '../../data/site'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { ThemeToggle } from '../ui/ThemeToggle'
import { MobileMenu } from './MobileMenu'

const spyIds = ['hero', ...navItems.map((item) => item.href.slice(1))]

type HeaderProps = {
  theme: ThemeMode
  onThemeChange: (theme: ThemeMode) => void
}

export function Header({ theme, onThemeChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(spyIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-border bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 md:px-8 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.href.slice(1)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-heading' : 'text-muted hover:text-heading'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-px h-px bg-[linear-gradient(90deg,transparent,var(--brand),transparent)]" />
                  )}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="#contact" withArrow>
                Start a project
              </Button>
            </div>
            <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-border text-heading transition hover:border-border-strong md:hidden"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeId={activeId} />
    </>
  )
}
