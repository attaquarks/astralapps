export function Logo() {
  return (
    <a className="group flex items-center gap-3" href="#hero" aria-label="AstralApps home">
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_0_32px_var(--color-glow-cyan)]">
        <span className="absolute size-5 rounded-full border border-cyan-300/70" />
        <span className="absolute h-7 w-px rotate-45 bg-violet-300/80" />
        <span className="size-2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
      </span>
      <span className="text-base font-semibold text-[var(--color-heading)]">AstralApps</span>
    </a>
  )
}
