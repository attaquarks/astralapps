import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'border-cyan-300/70 bg-cyan-300 text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.28)] hover:bg-cyan-200'
      : 'border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-heading)] hover:border-cyan-300/60 hover:bg-[var(--color-surface-strong)]'

  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${variantClass} ${className}`}
      {...props}
    >
      {children}
      <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h14m-6-6 6 6-6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </a>
  )
}
