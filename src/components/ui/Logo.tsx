/*
 * Brand lockup: the AstralApps mark + condensed wordmark. Solid colors only —
 * the second half carries the violet tint, never a gradient.
 */
export function Logo() {
  return (
    <a className="flex items-center gap-2.5" href="#hero" aria-label="AstralApps — home">
      <img src="/favicon.svg" alt="" width={26} height={25} className="size-6.5" />
      <span className="font-display text-xl font-semibold uppercase tracking-[0.08em] text-heading">
        Astral<span className="text-brand">Apps</span>
      </span>
    </a>
  )
}
