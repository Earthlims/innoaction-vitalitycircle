'use client'

import { Moon, Zap, Footprints, ChevronRight, TrendingDown, AlertCircle, ArrowRight, Salad, Brain, Users, Calendar } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const pillarCards = [
  { icon: Moon,       label: 'SLEEP',     value: '5h 40m', note: 'Below 7h target',    color: 'bg-pillar-sleep/15',     iconColor: 'text-pillar-sleep',     dot: 'bg-pillar-sleep',     screen: 'insight' as const },
  { icon: Zap,        label: 'RECOVERY',  value: '62%',    note: 'Take it easy',        color: 'bg-pillar-recovery/15',  iconColor: 'text-pillar-recovery',  dot: 'bg-pillar-recovery' },
  { icon: Footprints, label: 'MOVEMENT',  value: '4,200',  note: 'Below weekly goal',   color: 'bg-pillar-movement/15',  iconColor: 'text-pillar-movement',  dot: 'bg-pillar-movement' },
  { icon: Salad,      label: 'NUTRITION', value: '1,840',  note: 'kcal logged today',   color: 'bg-pillar-nutrition/15', iconColor: 'text-pillar-nutrition', dot: 'bg-pillar-nutrition' },
  { icon: Brain,      label: 'MENTAL',    value: 'Good',   note: 'Mood check-in done',  color: 'bg-pillar-mental/15',    iconColor: 'text-pillar-mental',    dot: 'bg-pillar-mental' },
  { icon: Users,      label: 'SOCIAL',    value: '3',      note: 'Activities joined',   color: 'bg-pillar-social/15',    iconColor: 'text-pillar-social',    dot: 'bg-pillar-social' },
]

const attentionItems = [
  {
    icon: Moon,
    text: 'Your sleep has averaged 5.9h this week — 1h below your target.',
    color: 'text-notification-red',
    bg: 'bg-notification-red/10',
  },
  {
    icon: TrendingDown,
    text: 'Recovery score has trended down three days in a row.',
    color: 'text-pillar-recovery',
    bg: 'bg-pillar-recovery/15',
  },
  {
    icon: AlertCircle,
    text: 'Activity is 47% below your weekly movement goal.',
    color: 'text-pillar-movement',
    bg: 'bg-pillar-movement/15',
  },
]

const suggestions = [
  { label: 'Wind down by 10pm tonight', tag: 'Sleep', cta: 'Set reminder' },
  { label: 'Try a gentle recovery session', tag: 'Recovery', cta: 'Explore' },
  { label: 'Take a light 20-minute walk today', tag: 'Activity', cta: 'Find walks' },
]

export default function HomeScreen({ onNavigate }: Props) {
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="pb-24 pt-2">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{greeting}</p>
          <h1 className="text-[1.75rem] text-foreground tracking-[0.02em] leading-tight" style={{ fontFamily: 'var(--font-italiana)' }}>Sophie</h1>
        </div>
        <button
          onClick={() => onNavigate('profile')}
          aria-label="View profile"
          className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center transition-all duration-200 active:scale-90 active:bg-primary/25"
        >
          <span className="font-semibold text-primary text-sm">S</span>
        </button>
      </div>

      {/* Hexagon VQ Score Card */}
      <div className="mx-5 mb-5">
        <div className="rounded-3xl bg-card border border-border p-6 flex flex-col items-center">
          <svg viewBox="0 0 120 104" width="140" height="121" aria-label="VQ Score: 58" role="img">
            <polygon
              points="60,2 116,32 116,72 60,102 4,72 4,32"
              fill="var(--color-card)"
              stroke="var(--color-primary)"
              strokeWidth="3"
            />
            <text
              x="60"
              y="52"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-italiana)"
              fontSize="32"
              fill="var(--color-foreground)"
            >
              58
            </text>
            <text
              x="60"
              y="70"
              textAnchor="middle"
              fontFamily="var(--font-dm-sans)"
              fontSize="9"
              fill="var(--color-muted-foreground)"
              letterSpacing="2"
            >
              VQ SCORE
            </text>
          </svg>

          {/* Status badge */}
          <span className="mt-3 text-xs font-semibold bg-primary text-primary-foreground rounded-full px-3 py-1">
            Moderate
          </span>

          {/* Context text */}
          <p className="mt-2 text-sm text-muted-foreground text-center leading-relaxed">
            Sleep and recovery are impacting your readiness today.
          </p>
        </div>
      </div>

      {/* Longevity Missions */}
      <div className="px-5 mb-5">
        <h2 className="section-label mb-3">Longevity Missions</h2>
        <div className="space-y-3">
          {/* Personal mission card */}
          <div className="rounded-2xl bg-card border border-border p-4">
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
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 text-primary">Family: Vital Sync</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">Sunday 6PM Ceremony</p>
              <Calendar size={16} className="text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* 6-Pillar Grid */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-2 gap-3">
          {pillarCards.map(({ icon: Icon, label, value, note, color, iconColor, dot, screen }) => {
            const content = (
              <>
                <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center mb-2`}>
                  <Icon size={15} className={iconColor} />
                </div>
                <p className="font-semibold text-foreground text-base leading-tight">{value}</p>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">{label}</p>
                <div className="flex items-center gap-1 mt-2">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
                  <p className="text-[9px] text-muted-foreground leading-tight">{note}</p>
                </div>
              </>
            )
            return screen ? (
              <button
                key={label}
                onClick={() => onNavigate(screen)}
                className="rounded-2xl bg-card border border-border p-3.5 text-left active:scale-95 transition-transform"
              >
                {content}
              </button>
            ) : (
              <div key={label} className="rounded-2xl bg-card border border-border p-3.5 text-left">
                {content}
              </div>
            )
          })}
        </div>
      </div>

      {/* What needs attention */}
      <div className="px-5 mb-5">
        <h2 className="section-label mb-3">What needs attention today</h2>
        <div className="space-y-2">
          {attentionItems.map(({ icon: Icon, text, color, bg }) => (
            <div key={text} className="flex gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className={`mt-0.5 w-7 h-7 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={13} className={color} />
              </div>
              <p className="text-sm text-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested actions */}
      <div className="px-5 mb-5">
        <h2 className="section-label mb-3">Suggested for today</h2>
        <div className="space-y-2">
          {suggestions.map(({ label, tag, cta }) => (
            <div key={label} className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <span className="text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5 mt-1 inline-block">
                  {tag}
                </span>
              </div>
              <button
                onClick={() => onNavigate('activities')}
                className="text-xs font-semibold text-primary flex items-center gap-1 shrink-0"
              >
                {cta} <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick nav to insight */}
      <div className="px-5">
        <button
          onClick={() => onNavigate('insight')}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border"
        >
          <div>
            <p className="text-sm font-medium text-foreground">View Sleep Insight</p>
            <p className="text-xs text-muted-foreground">See what&apos;s affecting your rest</p>
          </div>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
