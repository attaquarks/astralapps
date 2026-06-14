import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/*
 * Lightweight CSS-only ambient background (blurred brand-colored blobs).
 * Used behind ambient sections so we don't pay for a second WebGL context —
 * the real Three.js scene is reserved for the hero's signature moment.
 */
type AuroraBackgroundProps = {
  className?: string
  /** dial the intensity down where the content needs more contrast */
  opacity?: number
}

export function AuroraBackground({ className = '', opacity = 0.5 }: AuroraBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const drift = prefersReducedMotion ? '' : 'animate-drift'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <div
        className={`aurora-blob ${drift}`}
        style={{
          width: '36rem',
          height: '36rem',
          top: '-12%',
          left: '-8%',
          background: 'radial-gradient(circle, var(--brand), transparent 68%)',
        }}
      />
      <div
        className={`aurora-blob ${drift}`}
        style={{
          width: '32rem',
          height: '32rem',
          bottom: '-18%',
          right: '-6%',
          background: 'radial-gradient(circle, var(--accent), transparent 70%)',
          animationDelay: '-7s',
        }}
      />
    </div>
  )
}
