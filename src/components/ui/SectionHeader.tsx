type SectionHeaderProps = {
  title: string
  eyebrow: string
  description: string
  align?: 'left' | 'center'
}

export function SectionHeader({ title, eyebrow, description, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-[var(--color-heading)] md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
        {description}
      </p>
    </div>
  )
}
