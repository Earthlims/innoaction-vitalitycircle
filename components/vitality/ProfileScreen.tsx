'use client'

import { useState } from 'react'
import { Activity, Moon, Footprints, ChevronRight, Watch, Settings, ChevronLeft } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const goals = ['Better Sleep', 'Lower Stress', 'More Activity']

const stats = [
  {
    id: 'steps',
    icon: Footprints,
    label: 'Weekly steps',
    value: '31,400',
    sub: '+12% vs last week',
    tile: 'bg-tile-movement',
    iconColor: 'text-pillar-movement',
    title: 'Weekly Steps',
    metricLabel: 'This week',
    target: 'Target 70,000',
    values: [4200, 5100, 3900, 7400, 6200, 8300, 6300],
    max: 10000,
    why: 'Steps are your simplest consistency signal. Small daily walks compound into better metabolic health, mood, and sleep pressure.',
    recommendations: ['Add a 10-minute walk after lunch', 'Use walking calls for low-stakes meetings', 'Invite a circle member for the final 2,000 steps'],
  },
  {
    id: 'sleep',
    icon: Moon,
    label: 'Avg sleep',
    value: '6.4h',
    sub: 'Target: 7-9h',
    tile: 'bg-tile-sleep',
    iconColor: 'text-pillar-sleep',
    title: 'Average Sleep',
    metricLabel: '7-day average',
    target: 'Target 7-9h',
    values: [7.2, 6.8, 5.5, 6.1, 6.0, 6.4, 6.7],
    max: 9,
    why: 'Average sleep smooths out one bad night and shows your true recovery trend. Raising it by even 30 minutes can improve readiness.',
    recommendations: ['Set a consistent wind-down time', 'Keep caffeine before 2pm', 'Dim screens 60 minutes before bed'],
  },
  {
    id: 'active',
    icon: Activity,
    label: 'Active days',
    value: '4/7',
    sub: 'This week',
    tile: 'bg-tile-recovery',
    iconColor: 'text-pillar-recovery',
    title: 'Active Days',
    metricLabel: 'This week',
    target: 'Target 5 days',
    values: [1, 1, 0, 1, 0, 1, 0],
    max: 1,
    why: 'Active days show rhythm, not intensity. A few easy movement days often beat one heroic workout for long-term consistency.',
    recommendations: ['Schedule two easy movement blocks', 'Make one active day social', 'Keep recovery days light but intentional'],
  },
]

export default function ProfileScreen({ onNavigate }: Props) {
  const [activeStatId, setActiveStatId] = useState<string | null>(null)
  const activeStat = stats.find(stat => stat.id === activeStatId)

  if (activeStat) {
    const Icon = activeStat.icon
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return (
      <div className="pb-24 pt-2">
        <div className="px-5 pt-12 pb-2">
          <button
            onClick={() => setActiveStatId(null)}
            aria-label="Back to profile"
            className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        </div>

        <div className="px-5 pt-2 pb-4">
          <p className="text-sm text-muted-foreground">Profile Insight</p>
          <div className="flex items-center gap-3 mt-1">
            <div className={`w-11 h-11 rounded-2xl ${activeStat.tile} flex items-center justify-center`}>
              <Icon size={20} className={activeStat.iconColor} />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-[1.05]">{activeStat.title}</h1>
          </div>
        </div>

        <div className={`mx-5 mb-5 rounded-3xl ${activeStat.tile} p-5`}>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{activeStat.metricLabel}</p>
              <p className="text-3xl font-semibold tracking-tight text-foreground">{activeStat.value}</p>
            </div>
            <p className="text-sm font-semibold text-foreground text-right">{activeStat.target}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-3">{activeStat.sub}</p>
        </div>

        <div className="px-5 mb-5">
          <h2 className="text-[11px] font-semibold text-muted-foreground mb-4">This week</h2>
          <div className="flex items-end gap-2 h-28">
            {activeStat.values.map((value, index) => {
              const height = Math.max((value / activeStat.max) * 80, 12)
              const filled = value > 0
              return (
                <div key={days[index]} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-muted-foreground">{activeStat.id === 'steps' ? `${Math.round(value / 1000)}k` : value}</span>
                  <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${filled ? 'bg-primary' : 'bg-secondary'}`}
                      style={{ height: `${height}px` }}
                    />
                  </div>
                  <span className="text-[9px] text-muted-foreground">{days[index]}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mx-5 mb-5 p-4 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
          <h2 className="text-base font-semibold text-foreground tracking-tight mb-2">Why this matters</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{activeStat.why}</p>
        </div>

        <div className="px-5">
          <h2 className="text-[11px] font-semibold text-muted-foreground mb-3">Recommended next steps</h2>
          <div className="space-y-2">
            {activeStat.recommendations.map((rec, index) => (
              <div key={rec} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-semibold text-primary">{index + 1}</span>
                </div>
                <p className="text-sm text-foreground">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24 pt-2">
      {/* Header */}
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          aria-label="Back"
          className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <button
          aria-label="Settings"
          className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition-transform"
        >
          <Settings size={16} className="text-foreground" />
        </button>
      </div>

      <div className="px-5 pt-2 pb-4">
        <p className="text-sm text-muted-foreground">Account</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground leading-[1.05] mt-0.5">Profile</h1>
      </div>

      {/* Profile card */}
      <div className="mx-5 mb-5 p-5 rounded-3xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xl text-white font-semibold">SK</span>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground tracking-tight">Sarawut K.</h2>
            <p className="text-sm text-muted-foreground">Member since March 2025</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {goals.map(g => (
            <span key={g} className="text-xs font-semibold bg-accent text-primary rounded-full px-3 py-1.5">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-5">
        <h2 className="text-[11px] font-semibold text-muted-foreground mb-2.5">Your progress</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {stats.map(({ id, icon: Icon, label, value, sub, tile, iconColor }) => (
            <button
              key={label}
              onClick={() => setActiveStatId(id)}
              className={`rounded-3xl ${tile} p-3.5 text-left aspect-[1/1.08] flex flex-col justify-between active:scale-95 transition-transform`}
            >
              <div className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center shadow-sm">
                <Icon size={16} className={iconColor} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-foreground leading-tight tracking-tight">{value}</p>
                <p className="text-[11px] text-foreground/70 mt-0.5 leading-tight">{label}</p>
                <p className="text-[10px] text-foreground/55 mt-0.5 leading-tight">{sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Connected sources */}
      <div className="px-5 mb-5">
        <h2 className="text-[11px] font-semibold text-muted-foreground mb-3">Connected sources</h2>
        <div className="space-y-2">
          {[
            { name: 'Apple Health', status: 'Connected', icon: Activity },
            { name: 'WHOOP Band',   status: 'Connected', icon: Watch },
          ].map(({ name, status, icon: Icon }) => (
            <div key={name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Icon size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{status} · Synced 2h ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-pillar-nutrition" />
            </div>
          ))}
        </div>
      </div>

      {/* Settings list */}
      <div className="px-5">
        <h2 className="text-[11px] font-semibold text-muted-foreground mb-3">Settings</h2>
        <div className="rounded-2xl bg-white overflow-hidden divide-y divide-border" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
          {['Notification preferences', 'Privacy & sharing', 'Goals & targets', 'Help & support'].map(item => (
            <button key={item} className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/40 transition-colors">
              <span className="text-sm text-foreground">{item}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
