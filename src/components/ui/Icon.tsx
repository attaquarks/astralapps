/*
 * Renders a symbol from the /public/icons.svg sprite (github, x, bluesky,
 * discord, etc.). Each symbol carries its own viewBox, so sizing is done
 * purely with className (e.g. "size-5").
 */
type IconProps = {
  /** symbol id without the leading hash, e.g. "github-icon" */
  name: string
  className?: string
}

export function Icon({ name, className = 'size-5' }: IconProps) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`/icons.svg#${name}`} />
    </svg>
  )
}
