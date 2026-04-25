type Severity = 'critical' | 'high' | 'medium' | 'low'

interface CauseCardProps {
  severity: Severity
  category: string
  title: string
  description: string
}

const severityConfig: Record<Severity, { label: string; dot: string; badge: string; text: string }> = {
  critical: {
    label: 'Critical',
    dot: 'bg-destructive',
    badge: 'bg-destructive/10 border-destructive/25',
    text: 'text-destructive',
  },
  high: {
    label: 'High',
    dot: 'bg-wellness-teal',
    badge: 'bg-wellness-teal/10 border-wellness-teal/25',
    text: 'text-wellness-teal',
  },
  medium: {
    label: 'Medium',
    dot: 'bg-wellness-gold',
    badge: 'bg-wellness-gold/10 border-wellness-gold/25',
    text: 'text-wellness-gold',
  },
  low: {
    label: 'Low',
    dot: 'bg-muted-foreground',
    badge: 'bg-muted border-border',
    text: 'text-muted-foreground',
  },
}

export default function CauseCard({ severity, category, title, description }: CauseCardProps) {
  const cfg = severityConfig[severity]

  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{category}</span>
        <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 border ${cfg.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
          <span className={`text-[10px] font-semibold ${cfg.text}`}>{cfg.label}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-foreground leading-snug">{title}</h3>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
