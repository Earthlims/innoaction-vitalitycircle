import type { ReactNode } from 'react'

interface DiagnosticStepProps {
  step: number
  tool: string
  title: string
  description: string
  children?: ReactNode
}

export default function DiagnosticStep({ step, tool, title, description, children }: DiagnosticStepProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Step header */}
      <div className="flex items-start gap-4 p-5 pb-4">
        {/* Step number */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
          <span className="text-xs font-bold text-primary">{step}</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Tool badge */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-semibold text-primary bg-primary/8 border border-primary/15 rounded-full px-2 py-0.5 uppercase tracking-wide">
              {tool}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Code block slot */}
      {children && (
        <div className="border-t border-border">
          {children}
        </div>
      )}
    </div>
  )
}
