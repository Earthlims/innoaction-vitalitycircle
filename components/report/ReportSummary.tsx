export default function ReportSummary() {
  return (
    <footer className="mt-4">
      <div className="bg-card border border-border rounded-3xl p-7">
        <p
          className="text-[1.5rem] leading-[1.2] text-foreground tracking-[0.01em] mb-4 text-balance"
          style={{ fontFamily: 'var(--font-italiana)' }}
        >
          The blank page is always telling you something.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-lg">
          In every case, a blank white page is the result of an error that was either swallowed silently or never surfaced to the right place. The fix is always the same in principle: locate the real error message, understand why it was thrown, and eliminate the condition that caused it. The diagnostics above provide a reliable path from symptom to resolution.
        </p>

        {/* Key principles */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { num: '01', label: 'Read the error', detail: 'The error message is always present somewhere — console, server logs, or build output.' },
            { num: '02', label: 'Fix the root cause', detail: 'Do not mask errors with try/catch or conditional rendering. Fix the underlying issue.' },
            { num: '03', label: 'Gate your pipeline', detail: 'A CI build check costs seconds. A blank production page costs users and trust.' },
          ].map((p) => (
            <div key={p.num} className="bg-background rounded-2xl border border-border p-4">
              <p className="text-xs font-bold text-primary mb-1.5">{p.num}</p>
              <p className="text-sm font-semibold text-foreground mb-1">{p.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-[11px] text-muted-foreground mt-6">
        Next.js Diagnostic Report — applies to Next.js 13, 14, and 15 with both App Router and Pages Router
      </p>
    </footer>
  )
}
