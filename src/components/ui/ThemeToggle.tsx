import type { ThemeMode } from '../../App'

type ThemeToggleProps = {
  theme: ThemeMode
  onThemeChange: (theme: ThemeMode) => void
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const isLight = theme === 'light'

  return (
    <button
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="grid size-10 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-heading)] transition hover:border-cyan-300/60 hover:bg-[var(--color-surface-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
      type="button"
      onClick={() => onThemeChange(isLight ? 'dark' : 'light')}
    >
      {isLight ? (
        <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 14.6A7.8 7.8 0 0 1 9.4 4a8 8 0 1 0 10.6 10.6Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      ) : (
        <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2-1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
      )}
    </button>
  )
}
