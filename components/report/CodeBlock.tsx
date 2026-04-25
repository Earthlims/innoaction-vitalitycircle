import type { ReactNode } from 'react'

interface CodeBlockProps {
  language: string
  children: ReactNode
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  return (
    <div className="bg-foreground/[0.03] rounded-none">
      {/* Language label */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-widest">
          {language}
        </span>
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
          <span className="w-2.5 h-2.5 rounded-full bg-border" />
        </div>
      </div>

      {/* Code content */}
      <pre className="px-4 py-4 overflow-x-auto">
        <code className="font-mono text-[11.5px] leading-[1.7] text-foreground/80 whitespace-pre">
          {children}
        </code>
      </pre>
    </div>
  )
}
