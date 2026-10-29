type SectionHeaderProps = {
  title: string
  description?: string
  align?: 'left' | 'center'
}

/*
 * Heading-first: the heading carries its own weight — no eyebrow label above
 * it. The chapter designation lives in the chart rail, not in the header.
 * The title enters as a masked line (data-mask); supporting copy fades in.
 */
export function SectionHeader({ title, description, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <h2 className="text-4xl md:text-[3.4rem]">
        <span className="mask-line">
          <span className="mask-inner" data-mask>
            {title}
          </span>
        </span>
      </h2>
      {description && (
        <p data-reveal className="mt-6 text-base leading-8 text-muted md:text-lg md:leading-9">
          {description}
        </p>
      )}
    </div>
  )
}
