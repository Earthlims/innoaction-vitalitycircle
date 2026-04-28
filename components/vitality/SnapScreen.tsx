'use client'

import { useState } from 'react'
import { X, Camera, CalendarDays, BarChart2, ChevronLeft } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const circleGroups = ['Family Circle', 'Close Friends', 'Office Wellness']

export default function SnapScreen({ onNavigate }: Props) {
  const [step, setStep]                     = useState<1 | 2 | 3>(1)
  const [integrations, setIntegrations]     = useState<string[]>([])
  const [selectedCircles, setSelectedCircles] = useState<string[]>([])
  const [caption, setCaption]               = useState('')
  const [success, setSuccess]               = useState(false)

  const toggleIntegration = (key: string) =>
    setIntegrations(prev => prev.includes(key) ? prev.filter(i => i !== key) : [...prev, key])

  const toggleCircle = (name: string) =>
    setSelectedCircles(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name])

  const publish = () => {
    setSuccess(true)
    setTimeout(() => onNavigate('circle'), 1800)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: 'radial-gradient(ellipse at top left, oklch(0.97 0.06 65 / 0.9) 0%, transparent 50%), radial-gradient(ellipse at bottom right, oklch(0.96 0.05 295 / 0.7) 0%, transparent 50%), white',
        maxWidth: '430px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 shrink-0">
        <button
          onClick={() => onNavigate('circle')}
          className="w-10 h-10 rounded-full bg-white/80 border border-border flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Back"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-1 w-8 rounded-full transition-all duration-300 ${s <= step ? 'bg-primary' : 'bg-black/10'}`}
            />
          ))}
        </div>
        <div className="w-10" /> {/* spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-10">

        {/* ── STEP 1 — Integrations ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Step 1 of 3</p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-tight">Personalise your snap</h1>
              <p className="text-sm text-muted-foreground mt-1">Connect your data before you share</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => toggleIntegration('calendar')}
                className={`w-full flex items-center gap-4 p-4 rounded-3xl text-left transition-all ${
                  integrations.includes('calendar')
                    ? 'bg-tile-mental border-2 border-pillar-mental/30'
                    : 'bg-white border-2 border-transparent'
                }`}
                style={{ boxShadow: '0 1px 4px oklch(0 0 0 / 0.06)' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-tile-mental flex items-center justify-center shrink-0">
                  <CalendarDays size={22} className="text-pillar-mental" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Google Calendar</p>
                  <p className="text-xs text-muted-foreground">Sync your wellness schedule</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  integrations.includes('calendar') ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                }`}>
                  {integrations.includes('calendar') && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
              </button>

              <button
                onClick={() => toggleIntegration('dashboard')}
                className={`w-full flex items-center gap-4 p-4 rounded-3xl text-left transition-all ${
                  integrations.includes('dashboard')
                    ? 'bg-tile-social border-2 border-pillar-social/30'
                    : 'bg-white border-2 border-transparent'
                }`}
                style={{ boxShadow: '0 1px 4px oklch(0 0 0 / 0.06)' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-tile-social flex items-center justify-center shrink-0">
                  <BarChart2 size={22} className="text-pillar-social" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">VQ Dashboard</p>
                  <p className="text-xs text-muted-foreground">Share your vitality stats with your snap</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  integrations.includes('dashboard') ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                }`}>
                  {integrations.includes('dashboard') && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl bg-primary text-white font-semibold text-sm"
              style={{ boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.35)' }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── STEP 2 — Select circles ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Step 2 of 3</p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-tight">Who sees this?</h1>
              <p className="text-sm text-muted-foreground mt-1">Select the circles to share your moment with</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {circleGroups.map(name => (
                <button
                  key={name}
                  onClick={() => toggleCircle(name)}
                  className={`w-full p-4 rounded-3xl text-left transition-all ${
                    selectedCircles.includes(name)
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-white border-2 border-transparent'
                  }`}
                  style={{ boxShadow: '0 1px 4px oklch(0 0 0 / 0.06)' }}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${selectedCircles.includes(name) ? 'text-primary' : 'text-foreground'}`}>
                      {name}
                    </p>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedCircles.includes(name) ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                    }`}>
                      {selectedCircles.includes(name) && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-2xl bg-white border border-border text-foreground font-semibold text-sm"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-[2] py-4 rounded-2xl bg-primary text-white font-semibold text-sm"
                style={{ boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.35)' }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Snap ── */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Step 3 of 3</p>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-tight">Snap your moment</h1>
              <p className="text-sm text-muted-foreground mt-1">Your circle is ready to hear from you 👀</p>
            </div>

            {/* Camera preview */}
            <div
              className="w-full rounded-3xl flex flex-col items-center justify-center gap-3 bg-white"
              style={{ height: 260, boxShadow: '0 2px 16px oklch(0 0 0 / 0.07)' }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera size={28} className="text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Tap to take your snap</p>
            </div>

            {/* Caption */}
            <input
              type="text"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Add a caption..."
              className="w-full px-4 py-4 rounded-2xl bg-white border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none"
              style={{ boxShadow: '0 1px 4px oklch(0 0 0 / 0.06)' }}
            />

            {selectedCircles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCircles.map(c => (
                  <span key={c} className="text-xs font-semibold bg-primary/10 text-primary rounded-full px-3 py-1.5">
                    {c}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 rounded-2xl bg-white border border-border text-foreground font-semibold text-sm"
              >
                Back
              </button>
              <button
                onClick={publish}
                className="flex-[2] py-4 rounded-2xl bg-primary text-white font-semibold text-sm"
                style={{ boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.35)' }}
              >
                Publish to Circle
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Success overlay ── */}
      {success && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10"
          style={{
            background: 'radial-gradient(ellipse at top, oklch(0.94 0.08 65 / 0.85) 0%, white 65%)',
          }}
        >
          <div
            className="check-scale w-24 h-24 rounded-full bg-primary flex items-center justify-center"
            style={{ boxShadow: '0 8px 40px oklch(0.52 0.13 68 / 0.45)' }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M9 20l8 8 14-14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-foreground tracking-tight">Snapped! 🔥</p>
            <p className="text-sm text-muted-foreground mt-1">Your circle can see it now</p>
          </div>
        </div>
      )}
    </div>
  )
}
