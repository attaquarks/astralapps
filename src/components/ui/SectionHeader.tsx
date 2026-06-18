type SectionHeaderProps = {
  title: string
  eyebrow: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ title, eyebrow, description, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p data-reveal className="eyebrow">
        {eyebrow}
      </p>
      <h2
        data-reveal
        className="mt-4 text-balance text-3xl font-semibold leading-[1.1] text-heading md:text-[2.75rem]"
      >
        {title}
      </h2>
      {description && (
        <p data-reveal className="mt-5 text-base leading-8 text-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
