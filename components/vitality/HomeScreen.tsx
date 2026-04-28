'use client'

import { useState } from 'react'
import { Moon, Zap, Footprints, ArrowRight, Salad, Brain, Users, Calendar, Plus, Bell, Flame, Star, CheckCircle, TrendingDown } from 'lucide-react'
import type { Screen, VitalityPillar } from '@/lib/vitality-types'

interface Props {
  onNavigate: (s: Screen) => void
  onOpenInsight: (pillar: VitalityPillar) => void
}

const pillarCards = [
  {
    icon: Moon,
    label: 'Sleep',
    pillar: 'sleep' as const,
    value: '5h 40m',
    note: 'Below target',
    tile: 'bg-tile-sleep',
    iconColor: 'text-pillar-sleep',
    progress: 58,
    quest: 'Wind-down quest',
    detail: 'Your sleep debt is the biggest reason the score is held back today.',
    action: 'Open Sleep Insight',
  },
  {
    icon: Zap,
    label: 'Recovery',
    pillar: 'recovery' as const,
    value: '62%',
    note: 'Take it easy',
    tile: 'bg-tile-recovery',
    iconColor: 'text-pillar-recovery',
    progress: 62,
    quest: 'Recovery quest',
    detail: 'Choose lighter movement and protect your evening wind-down to rebound tomorrow.',
    action: 'Start recovery quest',
  },
  {
    icon: Footprints,
    label: 'Movement',
    pillar: 'movement' as const,
    value: '4,200',
    note: 'steps today',
    tile: 'bg-tile-movement',
    iconColor: 'text-pillar-movement',
    progress: 42,
    quest: 'Movement quest',
    detail: 'A short walk closes the gap without pushing recovery too hard.',
    action: 'Find a light walk',
  },
  {
    icon: Salad,
    label: 'Nutrition',
    pillar: 'nutrition' as const,
    value: '1,840',
    note: 'kcal logged',
    tile: 'bg-tile-nutrition',
    iconColor: 'text-pillar-nutrition',
    progress: 74,
    quest: 'Nutrition quest',
    detail: 'Protein and hydration are on track. Add one colorful meal to complete the day.',
    action: 'Log next meal',
  },
  {
    icon: Brain,
    label: 'Mental',
    pillar: 'mental' as const,
    value: 'Good',
    note: 'Mood logged',
    tile: 'bg-tile-mental',
    iconColor: 'text-pillar-mental',
    progress: 75,
    quest: 'Mental quest',
    detail: 'Mood is steady. A two-minute breathing reset can lock in the trend.',
    action: 'Do a reset',
  },
  {
    icon: Users,
    label: 'Social',
    pillar: 'social' as const,
    value: '3',
    note: 'Joined',
    tile: 'bg-tile-social',
    iconColor: 'text-pillar-social',
    progress: 68,
    quest: 'Circle quest',
    detail: 'Three circle touchpoints are logged. One supportive nudge can finish the social mission.',
    action: 'Send a nudge',
  },
]

const suggestions = [
  { label: 'Wind down by 10pm tonight', tag: 'Sleep Quest', cta: 'Set reminder', progress: 65, kind: 'reminder' },
  { label: 'Try a gentle recovery session', tag: 'Recovery Quest', cta: 'Explore', progress: 40, kind: 'navigate' },
  { label: 'Take a light 20-minute walk today', tag: 'Movement Quest', cta: 'Find walks', progress: 72, kind: 'navigate' },
]

export default function HomeScreen({ onNavigate, onOpenInsight }: Props) {
  const [activePillar, setActivePillar] = useState('Recovery')
  const [reminderSet, setReminderSet] = useState(false)
  const now = new Date()
  const hour = now.getHours()
  const greetingText = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const greetingEmoji = hour < 12 ? '☀️' : hour < 17 ? '🌤️' : '🌙'
  const selectedPillar = pillarCards.find(pillar => pillar.label === activePillar) ?? pillarCards[1]
  const SelectedIcon = selectedPillar.icon

  return (
    <div className="pb-48 pt-2">
      {/* Header — Withings-style: avatar left, actions right */}
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('profile')}
          aria-label="View profile"
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="font-semibold text-white text-sm">SK</span>
        </button>
        <div className="flex items-center gap-2">
          <button aria-label="Add" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition-transform">
            <Plus size={18} className="text-foreground" />
          </button>
          <button aria-label="Notifications" className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition-transform">
            <Bell size={16} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Big bold headline */}
      <div className="px-5 pt-2 pb-3">
        <p className="text-sm text-muted-foreground">{greetingText} {greetingEmoji}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground leading-[1.05] mt-0.5">
          Sarawut K. <span className="inline-block">👋</span>
        </h1>
      </div>

      {/* VQ Score */}
      <div className="mx-5 mb-6 bg-white rounded-3xl px-5 pt-5 pb-6 flex flex-col items-center" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
        <div className="w-full flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold text-muted-foreground border border-border rounded-full px-2.5 py-0.5">Vitality+</span>
            <h2 className="text-xl font-semibold text-foreground tracking-tight mt-3">Vitality Score</h2>
            <p className="text-sm text-muted-foreground mt-0.5 leading-snug">Sleep and recovery are the two biggest opportunities today.</p>
          </div>
          <div className="rounded-2xl bg-tile-recovery px-3 py-2 shrink-0">
            <div className="flex items-center justify-end gap-1 text-pillar-recovery">
              <TrendingDown size={12} strokeWidth={2.4} />
              <p className="text-[10px] font-semibold">3 lower</p>
            </div>
            <p className="text-[10px] text-foreground/55 text-right">vs yesterday</p>
          </div>
        </div>

        <div className="relative mt-4 mb-1" style={{ width: 280, height: 280 }}>
          <svg viewBox="0 0 280 280" width="280" height="280" aria-label="Vitality Score 58 out of 100">
            <defs>
              <radialGradient id="vq-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.97 0.03 230)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="vq-fill" x1="64" y1="46" x2="218" y2="226">
                <stop offset="0%" stopColor="var(--color-pillar-sleep)" stopOpacity="0.20" />
                <stop offset="45%" stopColor="var(--color-pillar-social)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--color-pillar-nutrition)" stopOpacity="0.22" />
              </linearGradient>
            </defs>

            <circle cx="140" cy="140" r="104" fill="url(#vq-glow)" />

            {(() => {
              const cx = 140, cy = 140
              const maxR = 86
              const pillars = [
                { key: 'sleep',     label: 'SLEEP',     value: 66, color: 'var(--color-pillar-sleep)'     },
                { key: 'recovery',  label: 'RECOVERY',  value: 70, color: 'var(--color-pillar-recovery)'  },
                { key: 'nutrition', label: 'NUTRITION', value: 82, color: 'var(--color-pillar-nutrition)' },
                { key: 'social',    label: 'SOCIAL',    value: 76, color: 'var(--color-pillar-social)'    },
                { key: 'mental',    label: 'MENTAL',    value: 82, color: 'var(--color-pillar-mental)'    },
                { key: 'movement',  label: 'MOVEMENT',  value: 72, color: 'var(--color-pillar-movement)'  },
              ]
              const angleFor = (i: number) => (i / 6) * Math.PI * 2 - Math.PI / 2
              const point = (i: number, r: number) => ({
                x: cx + Math.cos(angleFor(i)) * r,
                y: cy + Math.sin(angleFor(i)) * r,
              })

              return (
                <g>
                  {[0.25, 0.5, 0.75, 1].map(scale => (
                    <polygon
                      key={scale}
                      points={pillars.map((_, i) => {
                        const p = point(i, maxR * scale)
                        return `${p.x},${p.y}`
                      }).join(' ')}
                      fill="none"
                      stroke="oklch(0.92 0 0)"
                      strokeWidth="1"
                      opacity={scale === 1 ? 0.78 : 0.42}
                    />
                  ))}

                  {pillars.map((_, i) => {
                    const p = point(i, maxR)
                    return (
                      <line
                        key={i}
                        x1={cx} y1={cy} x2={p.x} y2={p.y}
                        stroke="oklch(0.92 0 0)"
                        strokeWidth="1"
                        opacity="0.55"
                      />
                    )
                  })}

                  <polygon
                    points={pillars.map((p, i) => {
                      const pt = point(i, maxR * (p.value / 100))
                      return `${pt.x},${pt.y}`
                    }).join(' ')}
                    fill="url(#vq-fill)"
                    stroke="oklch(0.46 0.055 250)"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />

                  {pillars.map((p, i) => {
                    const pt = point(i, maxR * (p.value / 100))
                    return (
                      <circle
                        key={i}
                        cx={pt.x} cy={pt.y} r="4.5"
                        fill="white"
                        stroke={p.color}
                        strokeWidth="2.5"
                      />
                    )
                  })}

                  {pillars.map((p, i) => {
                    const pt = point(i, maxR + 24)
                    return (
                      <text
                        key={i}
                        x={pt.x} y={pt.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill={p.color}
                        style={{ letterSpacing: '0.04em' }}
                      >
                        {p.label}
                      </text>
                    )
                  })}
                </g>
              )
            })()}

            {Array.from({ length: 48 }).map((_, i) => {
              const angle = (i / 48) * Math.PI * 2
              const radius = 124 + (i % 2) * 2
              const x = 140 + Math.cos(angle) * radius
              const y = 140 + Math.sin(angle) * radius
              const palette = [
                'var(--color-pillar-sleep)',
                'var(--color-pillar-recovery)',
                'var(--color-pillar-movement)',
                'var(--color-pillar-nutrition)',
                'var(--color-pillar-mental)',
                'var(--color-pillar-social)',
              ]
              return <circle key={i} cx={x} cy={y} r="1.8" fill={palette[i % palette.length]} opacity={0.38} />
            })}

            <circle cx="140" cy="140" r="36" fill="white" opacity="0.96" />
            <circle cx="140" cy="140" r="36" fill="none" stroke="oklch(0.92 0 0)" strokeWidth="1" />
            <text
              x="140" y="134"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="44"
              fontWeight="600"
              fill="var(--color-foreground)"
              style={{ letterSpacing: '-0.04em' }}
            >
              58
            </text>
            <text x="140" y="160" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="var(--color-muted-foreground)" style={{ letterSpacing: '0.05em' }}>
              OUT OF 100
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full mt-1">
          <div className="rounded-2xl bg-tile-sleep px-3 py-2.5">
            <p className="text-[10px] font-semibold text-pillar-sleep">Needs focus</p>
            <p className="text-sm font-semibold text-foreground">Sleep rhythm</p>
          </div>
          <div className="rounded-2xl bg-tile-nutrition px-3 py-2.5">
            <p className="text-[10px] font-semibold text-pillar-nutrition">Best support</p>
            <p className="text-sm font-semibold text-foreground">Mental steady</p>
          </div>
        </div>
      </div>

      {/* Longevity Missions */}
      <div className="px-5 mb-5">
        <h2 className="section-label mb-3">Longevity Missions</h2>
        <div className="space-y-3">
          {/* Personal mission card */}
          <div className="bg-secondary rounded-2xl p-3.5">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1">Me: Daily Step Target</p>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">Progress: 7,420 / 10,000</p>
              <span className="text-pillar-movement text-base leading-none">&#10003;</span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-pillar-movement rounded-full w-[74.2%]" />
            </div>
          </div>

          {/* Circle mission card */}
          <div className="rounded-2xl p-4 bg-foreground">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 text-white">Family: Vital Sync</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Sunday 6PM Ceremony</p>
              <Calendar size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* 6-Pillar pastel tiles */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-3 gap-2.5">
          {pillarCards.map(({ icon: Icon, label, pillar, value, note, tile, iconColor }) => {
            const active = selectedPillar.label === label
            return (
              <button
                key={label}
                onClick={() => onOpenInsight(pillar)}
                className={`${tile} rounded-3xl p-3.5 text-left aspect-[1/1.08] flex flex-col justify-between active:scale-95 transition-transform ${active ? 'ring-2 ring-foreground/15' : ''}`}
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center mb-2 shadow-sm">
                    <Icon size={16} className={iconColor} />
                  </div>
                  <p className="text-[15px] font-semibold text-foreground leading-tight tracking-tight">{label}</p>
                  <p className="text-[12px] font-semibold text-foreground/80 mt-0.5">{value}</p>
                  <p className="text-[10px] text-foreground/55 mt-0.5 leading-tight">{note}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Pillar detail */}
      <div className="px-5 mb-7">
        <div className="rounded-3xl bg-white p-4" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
          <div className="flex items-start gap-3">
            <div className={`w-11 h-11 rounded-2xl ${selectedPillar.tile} flex items-center justify-center shrink-0`}>
              <SelectedIcon size={19} className={selectedPillar.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground">Pillar focus</p>
                  <h2 className="text-lg font-semibold text-foreground tracking-tight">{selectedPillar.label}</h2>
                </div>
                <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-primary">{selectedPillar.quest}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{selectedPillar.detail}</p>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground">Mission charge</span>
                  <span className="text-[10px] font-semibold text-foreground">{selectedPillar.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${selectedPillar.progress}%` }} />
                </div>
              </div>
              <div className="mt-4 flex justify-start">
                <button
                  onClick={() => onOpenInsight(selectedPillar.pillar)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold text-white active:scale-95 transition-transform"
                >
                  View in-depth <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested actions */}
      <div className="px-5 mb-5">
        <h2 className="section-label mb-3">Suggested for today</h2>
        <div className="space-y-3">
          {suggestions.map(({ label, tag, cta, progress, kind }, index) => {
            const isReminder = kind === 'reminder'
            const armed = isReminder && reminderSet
            return (
              <div
                key={label}
                className={`rounded-3xl bg-white p-4 ${armed ? 'animate-pulse' : ''}`}
                style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.07)' }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    index === 0 ? 'bg-tile-sleep' : index === 1 ? 'bg-tile-recovery' : 'bg-tile-movement'
                  }`}>
                    {armed ? (
                      <CheckCircle size={18} className="text-pillar-nutrition" />
                    ) : index === 0 ? (
                      <Moon size={18} className="text-pillar-sleep" />
                    ) : index === 1 ? (
                      <Flame size={18} className="text-pillar-recovery" />
                    ) : (
                      <Star size={18} className="text-pillar-movement" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-semibold text-primary bg-accent rounded-full px-2 py-0.5">{tag}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground tracking-tight">{label}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${armed ? 100 : progress}%` }} />
                      </div>
                      <button
                        onClick={() => isReminder ? setReminderSet(true) : onNavigate('activities')}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold active:scale-95 transition-transform ${
                          armed ? 'bg-tile-nutrition text-pillar-nutrition' : 'bg-foreground text-white'
                        }`}
                      >
                        {armed ? 'Reminder set' : cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
