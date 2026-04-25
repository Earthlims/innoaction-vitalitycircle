'use client'

import { ChevronLeft, Moon, TrendingDown, Info, ArrowRight } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const weekData = [
  { day: 'Mon', hours: 7.2, good: true },
  { day: 'Tue', hours: 6.8, good: true },
  { day: 'Wed', hours: 5.5, good: false },
  { day: 'Thu', hours: 5.1, good: false },
  { day: 'Fri', hours: 6.0, good: false },
  { day: 'Sat', hours: 6.4, good: false },
  { day: 'Sun', hours: 5.7, good: false },
]

const maxHours = 9

const recommendations = [
  'Set a consistent wind-down time — aim for 10pm',
  'Avoid screens 60 minutes before bed',
  'Keep your room cool and dark',
  'Limit caffeine after 2pm',
]

const relatedActivities = [
  { name: 'Evening Breathwork Session', tag: 'Recovery', time: 'Tonight · 20 min' },
  { name: 'Sleep Optimisation Workshop', tag: 'Sleep', time: 'Wed · 45 min webinar' },
  { name: 'Sunset Stretch Class', tag: 'Movement', time: 'Daily · 30 min' },
]

export default function InsightScreen({ onNavigate }: Props) {
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 text-muted-foreground mb-5 -ml-1"
        >
          <ChevronLeft size={20} /> <span className="text-sm">Dashboard</span>
        </button>

        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-wellness-sky/30 flex items-center justify-center">
            <Moon size={20} className="text-wellness-teal" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Health Insight</p>
            <h1 className="font-serif text-2xl font-medium text-foreground">Sleep</h1>
          </div>
        </div>
      </div>

      {/* Score card */}
      <div className="mx-5 mb-5 rounded-3xl bg-wellness-teal/10 border border-wellness-teal/20 p-5">
        <div className="flex items-end gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Last night</p>
            <div className="flex items-end gap-1">
              <span className="font-serif text-4xl font-medium text-foreground">5h 40m</span>
            </div>
          </div>
          <div className="mb-1 ml-auto text-right">
            <p className="text-xs text-muted-foreground">Target</p>
            <p className="text-sm font-semibold text-foreground">7 – 9h</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-wellness-teal">
          <TrendingDown size={14} />
          <p className="text-xs font-medium">Trending down for 5 days — 1.3h below your personal baseline</p>
        </div>
      </div>

      {/* Weekly bar chart */}
      <div className="px-5 mb-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">This week</h2>
        <div className="flex items-end gap-2 h-28">
          {weekData.map(({ day, hours, good }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] text-muted-foreground">{hours}h</span>
              <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${good ? 'bg-primary' : 'bg-wellness-champagne'}`}
                  style={{ height: `${(hours / maxHours) * 80}px` }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[10px] text-muted-foreground">On target</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-wellness-champagne border border-border" /><span className="text-[10px] text-muted-foreground">Below target</span></div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="mx-5 mb-5 p-4 rounded-2xl bg-card border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Info size={14} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Why this matters</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Consistently sleeping below 7 hours affects cognitive function, immune response, and heart health. Even a 30-minute improvement can meaningfully impact your recovery score and mood the following day.
        </p>
      </div>

      {/* Recommendations */}
      <div className="px-5 mb-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Personalised recommendations
        </h2>
        <div className="space-y-2">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-primary">{i + 1}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related activities */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Activities that may help
          </h2>
          <button onClick={() => onNavigate('activities')} className="text-xs font-semibold text-primary flex items-center gap-1">
            See all <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {relatedActivities.map(({ name, tag, time }) => (
            <div key={name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
              </div>
              <span className="text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1 shrink-0">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
