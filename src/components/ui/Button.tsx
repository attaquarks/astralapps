import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  href?: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  withArrow?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
  ariaLabel?: string
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[0.95rem]',
}

const variants = {
  /* Ink inverts with the band: day text on blackout, ink fill on the day wash. */
  primary: 'border border-transparent bg-heading text-bg hover:opacity-85',
  secondary: 'border border-border-strong text-heading hover:bg-surface',
  ghost: 'border border-transparent text-muted hover:text-heading',
}

export function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  withArrow = false,
  disabled = false,
  onClick,
  className = '',
  target,
  rel,
  ariaLabel,
}: ButtonProps) {
  const classes = `group inline-flex min-h-11 items-center justify-center gap-2.5 uppercase tracking-[0.08em] font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizes[size]} ${variants[variant]} ${className}`

  const inner = (
    <>
      {children}
      {withArrow && (
        <svg
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12h14m-6-6 6 6-6 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      )}
    </>
  )

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel} aria-label={ariaLabel} onClick={onClick}>
        {inner}
      </a>
    )
  }

  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {inner}
    </button>
  )
}
