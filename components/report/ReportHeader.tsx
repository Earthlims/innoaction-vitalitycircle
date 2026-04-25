export default function ReportHeader() {
  return (
    <header className="mb-12">
      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-6">
        <div className="flex items-center gap-1.5 bg-destructive/10 border border-destructive/20 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
          <span className="text-[11px] font-semibold text-destructive tracking-wide uppercase">Incident Report</span>
        </div>
        <span className="text-xs text-muted-foreground">Next.js · App Router</span>
      </div>

      {/* Title */}
      <h1
        className="text-[2.6rem] leading-[1.1] text-foreground mb-4 tracking-[0.01em] text-balance"
        style={{ fontFamily: 'var(--font-italiana)' }}
      >
        Blank White Page<br />After Launch
      </h1>

      {/* Sub-description */}
      <p className="text-base text-muted-foreground leading-relaxed max-w-xl mb-8">
        A systematic diagnostic report covering all known root causes, identification techniques, and targeted fixes for a website that renders nothing after deployment.
      </p>

      {/* Meta strip */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Severity', value: 'P0 — Site Down' },
          { label: 'Scope', value: 'All environments' },
          { label: 'Framework', value: 'Next.js 14 / 15' },
          { label: 'Affects', value: 'App Router · Pages Router' },
        ].map((m) => (
          <div key={m.label} className="bg-card border border-border rounded-xl px-4 py-2.5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">{m.label}</p>
            <p className="text-sm font-medium text-foreground">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-10 h-px bg-border" />
    </header>
  )
}
