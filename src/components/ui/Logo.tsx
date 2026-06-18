/*
 * Brand lockup: the real AstralApps mark (public/favicon.svg) + wordmark.
 * The mark is brand-colored, so it reads correctly on both dark and light.
 */
export function Logo() {
  return (
    <a
      className="group flex items-center gap-2.5"
      href="#hero"
      aria-label="AstralApps — home"
    >
      <span className="relative grid size-9 place-items-center">
        <span className="absolute inset-0 rounded-xl bg-brand opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40" />
        <img
          src="/favicon.svg"
          alt=""
          width={28}
          height={27}
          className="relative size-7 transition-transform duration-300 group-hover:scale-110"
        />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-heading">
        Astral<span className="text-gradient">Apps</span>
      </span>
    </a>
  )
}
