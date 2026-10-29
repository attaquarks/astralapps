import type { ReactNode } from 'react'

/*
 * Data tag: the mono micro-label used for honesty markers ("illustrative —
 * demo data"), machine output names, and measurement units.
 */
export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`data inline-flex items-center gap-1.5 border border-border px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.12em] text-muted ${className}`}
    >
      {children}
    </span>
  )
}
