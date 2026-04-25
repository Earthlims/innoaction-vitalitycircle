import type { ReactNode } from 'react'

interface ReportSectionProps {
  number: string
  title: string
  description: string
  children: ReactNode
}

export default function ReportSection({ number, title, description, children }: ReportSectionProps) {
  return (
    <section className="mb-14">
      {/* Section heading */}
      <div className="flex items-start gap-4 mb-6">
        <span
          className="text-[1.1rem] text-primary/60 leading-none mt-1 select-none"
          style={{ fontFamily: 'var(--font-italiana)' }}
        >
          {number}
        </span>
        <div>
          <h2
            className="text-[1.65rem] leading-tight text-foreground tracking-[0.01em] mb-2"
            style={{ fontFamily: 'var(--font-italiana)' }}
          >
            {title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      {children}

      {/* Section divider */}
      <div className="mt-12 h-px bg-border" />
    </section>
  )
}
