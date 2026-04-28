'use client'

import { useState } from 'react'
import { Camera, ChevronLeft } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const circleGroups = [
  { name: 'Family Circle',    color: 'bg-tile-social text-pillar-social' },
  { name: 'Close Friends',    color: 'bg-tile-mental text-pillar-mental' },
  { name: 'Office Wellness',  color: 'bg-tile-nutrition text-pillar-nutrition' },
]

export default function SnapScreen({ onNavigate }: Props) {
  const [selectedCircles, setSelectedCircles] = useState<string[]>([])
  const [caption, setCaption]               = useState('')
  const [success, setSuccess]               = useState(false)

  const toggleCircle = (name: string) =>
    setSelectedCircles(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    )

  const publish = () => {
    setSuccess(true)
    setTimeout(() => onNavigate('circle'), 1800)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        maxWidth: '430px',
        margin: '0 auto',
        background: 'radial-gradient(ellipse at top left, oklch(0.97 0.06 65 / 0.8) 0%, transparent 50%), radial-gradient(ellipse at bottom right, oklch(0.96 0.05 295 / 0.6) 0%, transparent 50%), white',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2 shrink-0 snap-fade-up" style={{ animationDelay: '0ms' }}>
        <button
          onClick={() => onNavigate('circle')}
          className="w-10 h-10 rounded-full bg-white/80 border border-border flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Back"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <p className="text-sm font-semibold text-muted-foreground tracking-wide">Snap Moment</p>
        <div className="w-10" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-3 pb-10 flex flex-col gap-5">

        {/* Headline */}
        <div className="snap-fade-up" style={{ animationDelay: '60ms' }}>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-tight">
            Your circle is ready<br />to hear from you 👀
          </h1>
        </div>

        {/* Camera preview */}
        <div
          className="w-full rounded-3xl flex flex-col items-center justify-center gap-3 snap-fade-up"
          style={{
            height: 240,
            animationDelay: '120ms',
            background: 'linear-gradient(145deg, oklch(0.96 0.03 265 / 0.4) 0%, oklch(0.96 0.03 65 / 0.3) 100%)',
            border: '1.5px dashed oklch(0.75 0.04 265 / 0.4)',
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
            <Camera size={26} className="text-primary" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Tap to take your snap</p>
        </div>

        {/* Circle selector */}
        <div className="snap-fade-up" style={{ animationDelay: '180ms' }}>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Share with</p>
          <div className="flex flex-wrap gap-2">
            {circleGroups.map(({ name, color }) => (
              <button
                key={name}
                onClick={() => toggleCircle(name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  selectedCircles.includes(name)
                    ? `${color} ring-2 ring-offset-1 ring-primary/40 scale-105`
                    : 'bg-white border border-border text-muted-foreground'
                }`}
                style={{ boxShadow: selectedCircles.includes(name) ? '0 2px 8px oklch(0.52 0.13 68 / 0.2)' : '0 1px 3px oklch(0 0 0 / 0.06)' }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div className="snap-fade-up" style={{ animationDelay: '240ms' }}>
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Caption</p>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="How are you feeling right now..."
            rows={3}
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
            style={{ boxShadow: '0 1px 4px oklch(0 0 0 / 0.06)' }}
          />
        </div>

        {/* Publish button */}
        <div className="snap-fade-up" style={{ animationDelay: '300ms' }}>
          <button
            onClick={publish}
            disabled={selectedCircles.length === 0}
            className="w-full py-4 rounded-2xl bg-primary text-white font-semibold text-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: selectedCircles.length > 0 ? '0 4px 20px oklch(0.52 0.13 68 / 0.4)' : 'none' }}
          >
            {selectedCircles.length === 0
              ? 'Select a circle to publish'
              : `Publish to ${selectedCircles.length === 1 ? selectedCircles[0] : `${selectedCircles.length} circles`}`}
          </button>
        </div>
      </div>

      {/* Success overlay */}
      {success && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10"
          style={{
            background: 'radial-gradient(ellipse at top, oklch(0.94 0.08 65 / 0.9) 0%, white 65%)',
            animation: 'snapSuccessFade 0.35s ease-out forwards',
          }}
        >
          <div
            className="w-24 h-24 rounded-full bg-primary flex items-center justify-center"
            style={{
              boxShadow: '0 8px 40px oklch(0.52 0.13 68 / 0.45)',
              animation: 'check-scale 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M9 20l8 8 14-14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center" style={{ animation: 'snap-fade-in 0.4s ease-out 0.2s both' }}>
            <p className="text-2xl font-semibold text-foreground tracking-tight">Snapped! 🔥</p>
            <p className="text-sm text-muted-foreground mt-1">Your circle can see it now</p>
          </div>
        </div>
      )}
    </div>
  )
}
