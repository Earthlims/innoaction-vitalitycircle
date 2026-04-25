import type { ReactNode } from 'react'

interface FixCardProps {
  cause: string
  fix: string
  steps: string[]
  children?: ReactNode
}

export default function FixCard({ cause, fix, steps, children }: FixCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">
          Root cause: {cause}
        </p>
        <h3 className="text-base font-semibold text-foreground">{fix}</h3>
      </div>

      {/* Steps */}
      <div className="px-5 py-4">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Steps</p>
        <ol className="flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary border border-border flex items-center justify-center mt-0.5">
                <span className="text-[10px] font-bold text-secondary-foreground">{i + 1}</span>
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Code slot */}
      {children && (
        <div className="border-t border-border">
          {children}
        </div>
      )}
    </div>
  )
}
