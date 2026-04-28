'use client'

import { ChevronLeft, Moon, Zap, Footprints, Info, ArrowRight, Salad, Brain, Users, TrendingDown, TrendingUp } from 'lucide-react'
import type { Screen, VitalityPillar } from '@/lib/vitality-types'

interface Props {
  onNavigate: (s: Screen) => void
  pillar: VitalityPillar
}

const pillarInsights = {
  sleep: {
    title: 'Sleep',
    Icon: Moon,
    tile: 'bg-tile-sleep',
    text: 'text-pillar-sleep',
    metricLabel: 'Last night',
    metric: '5h 40m',
    targetLabel: 'Target',
    target: '7 - 9h',
    trend: 'Trending down for 5 days - 1.3h below your personal baseline',
    trendDown: true,
    values: [7.2, 6.8, 5.5, 5.1, 6.0, 6.4, 5.7],
    targetMin: 7,
    max: 9,
    unit: 'h',
    goodLabel: 'On target',
    lowLabel: 'Below target',
    why: 'Consistently sleeping below 7 hours affects cognitive function, immune response, and heart health. Even a 30-minute improvement can meaningfully impact your recovery score and mood the following day.',
    recommendations: [
      'Set a consistent wind-down time - aim for 10pm',
      'Avoid screens 60 minutes before bed',
      'Keep your room cool and dark',
      'Limit caffeine after 2pm',
    ],
    activities: [
      { name: 'Evening Breathwork Session', time: 'Tonight · 20 min', tag: 'Recovery', tile: 'bg-tile-recovery', text: 'text-pillar-recovery' },
      { name: 'Sleep Optimisation Workshop', time: 'Wed · 45 min webinar', tag: 'Sleep', tile: 'bg-tile-sleep', text: 'text-pillar-sleep' },
      { name: 'Sunset Stretch Class', time: 'Daily · 30 min', tag: 'Movement', tile: 'bg-tile-movement', text: 'text-pillar-movement' },
    ],
  },
  recovery: {
    title: 'Recovery',
    Icon: Zap,
    tile: 'bg-tile-recovery',
    text: 'text-pillar-recovery',
    metricLabel: 'Readiness',
    metric: '62%',
    targetLabel: 'Target',
    target: '75%+',
    trend: 'Recovery is down three days in a row - today is better suited to light effort',
    trendDown: true,
    values: [78, 74, 70, 65, 62, 68, 64],
    targetMin: 75,
    max: 100,
    unit: '%',
    goodLabel: 'Ready',
    lowLabel: 'Needs care',
    why: 'Recovery reflects how prepared your body is for stress. When it dips, lighter movement, hydration, and calmer evenings help you avoid stacking fatigue.',
    recommendations: [
      'Keep training effort below moderate today',
      'Add 10 minutes of mobility or breathwork',
      'Hydrate early and include electrolytes',
      'Protect your wind-down window tonight',
    ],
    activities: [
      { name: 'Guided Recovery Flow', time: 'Today · 15 min', tag: 'Recovery', tile: 'bg-tile-recovery', text: 'text-pillar-recovery' },
      { name: 'Light Mobility Class', time: 'Tomorrow · 25 min', tag: 'Movement', tile: 'bg-tile-movement', text: 'text-pillar-movement' },
      { name: 'Sleep Reset Routine', time: 'Tonight · 10 min', tag: 'Sleep', tile: 'bg-tile-sleep', text: 'text-pillar-sleep' },
    ],
  },
  movement: {
    title: 'Movement',
    Icon: Footprints,
    tile: 'bg-tile-movement',
    text: 'text-pillar-movement',
    metricLabel: 'Today',
    metric: '4,200',
    targetLabel: 'Target',
    target: '10,000',
    trend: 'You are 5,800 steps from target - a light walk can close the gap',
    trendDown: true,
    values: [9200, 8700, 5100, 4200, 6100, 7600, 5700],
    targetMin: 8000,
    max: 10000,
    unit: '',
    goodLabel: 'On pace',
    lowLabel: 'Below pace',
    why: 'Regular low-intensity movement supports metabolic health, mood, sleep quality, and cardiovascular resilience without overloading recovery.',
    recommendations: [
      'Take a 20-minute walk after lunch',
      'Break up sitting with 3 movement snacks',
      'Keep intensity easy while recovery is low',
      'Invite a circle member to join you',
    ],
    activities: [
      { name: 'Neighbourhood Recovery Walk', time: 'Today · 20 min', tag: 'Movement', tile: 'bg-tile-movement', text: 'text-pillar-movement' },
      { name: 'Sunset Stretch Class', time: 'Daily · 30 min', tag: 'Movement', tile: 'bg-tile-movement', text: 'text-pillar-movement' },
      { name: 'Weekend Park Walk', time: 'Sat · 45 min', tag: 'Social', tile: 'bg-tile-social', text: 'text-pillar-social' },
    ],
  },
  nutrition: {
    title: 'Nutrition',
    Icon: Salad,
    tile: 'bg-tile-nutrition',
    text: 'text-pillar-nutrition',
    metricLabel: 'Logged',
    metric: '1,840 kcal',
    targetLabel: 'Protein',
    target: '82%',
    trend: 'Balanced day so far - one colorful meal would complete the pattern',
    trendDown: false,
    values: [72, 78, 66, 82, 74, 80, 69],
    targetMin: 75,
    max: 100,
    unit: '%',
    goodLabel: 'Balanced',
    lowLabel: 'Needs balance',
    why: 'Consistent nutrition stabilizes energy, supports muscle preservation, and gives recovery systems the raw materials they need.',
    recommendations: [
      'Add 25-35g protein to your next meal',
      'Include two colors of plants today',
      'Hydrate before your afternoon coffee',
      'Keep dinner lighter if sleep is a priority',
    ],
    activities: [
      { name: 'Longevity Meal Prep', time: 'Sun · 60 min', tag: 'Nutrition', tile: 'bg-tile-nutrition', text: 'text-pillar-nutrition' },
      { name: 'Protein Planning Workshop', time: 'Thu · 30 min', tag: 'Nutrition', tile: 'bg-tile-nutrition', text: 'text-pillar-nutrition' },
      { name: 'Hydration Challenge', time: 'Today', tag: 'Recovery', tile: 'bg-tile-recovery', text: 'text-pillar-recovery' },
    ],
  },
  mental: {
    title: 'Mental',
    Icon: Brain,
    tile: 'bg-tile-mental',
    text: 'text-pillar-mental',
    metricLabel: 'Mood',
    metric: 'Good',
    targetLabel: 'Check-ins',
    target: '5 / 7',
    trend: 'Mood is stable - short resets can help protect focus through the evening',
    trendDown: false,
    values: [68, 72, 75, 70, 76, 74, 78],
    targetMin: 70,
    max: 100,
    unit: '%',
    goodLabel: 'Stable',
    lowLabel: 'Low',
    why: 'Mental steadiness influences sleep, decision quality, social connection, and your ability to keep health habits consistent.',
    recommendations: [
      'Do a two-minute breathing reset',
      'Write one stressor and one next action',
      'Schedule a no-notification block',
      'Log mood before bed to spot patterns',
    ],
    activities: [
      { name: 'Two-Minute Reset', time: 'Now · 2 min', tag: 'Mental', tile: 'bg-tile-mental', text: 'text-pillar-mental' },
      { name: 'Focus Breathwork', time: 'Afternoon · 10 min', tag: 'Recovery', tile: 'bg-tile-recovery', text: 'text-pillar-recovery' },
      { name: 'Brain Health Webinar', time: 'Thu · 45 min', tag: 'Mental', tile: 'bg-tile-mental', text: 'text-pillar-mental' },
    ],
  },
  social: {
    title: 'Social',
    Icon: Users,
    tile: 'bg-tile-social',
    text: 'text-pillar-social',
    metricLabel: 'Circle touchpoints',
    metric: '3',
    targetLabel: 'Target',
    target: '4',
    trend: 'One supportive check-in would complete today\'s circle rhythm',
    trendDown: false,
    values: [4, 3, 2, 3, 5, 4, 3],
    targetMin: 4,
    max: 5,
    unit: '',
    goodLabel: 'Connected',
    lowLabel: 'Quiet',
    why: 'Supportive relationships are strongly linked to longevity, stress regulation, habit adherence, and emotional resilience.',
    recommendations: [
      'Send one encouraging nudge to your circle',
      'Invite someone to a light walk',
      'Share one honest energy update',
      'Join the Sunday Vital Sync ceremony',
    ],
    activities: [
      { name: 'Family Vital Sync', time: 'Sunday · 6PM', tag: 'Social', tile: 'bg-tile-social', text: 'text-pillar-social' },
      { name: 'Weekend Reset Walk', time: 'Sun · 9AM', tag: 'Movement', tile: 'bg-tile-movement', text: 'text-pillar-movement' },
      { name: 'Office Wellness Check-in', time: 'Fri · 15 min', tag: 'Social', tile: 'bg-tile-social', text: 'text-pillar-social' },
    ],
  },
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function InsightScreen({ onNavigate, pillar }: Props) {
  const insight = pillarInsights[pillar]
  const TrendIcon = insight.trendDown ? TrendingDown : TrendingUp
  const maxValue = insight.max

  return (
    <div className="pb-24 pt-2">
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          aria-label="Back"
          className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
      </div>

      <div className="px-5 pt-2 pb-4">
        <p className="text-sm text-muted-foreground">Health Insight</p>
        <div className="flex items-center gap-3 mt-1">
          <div className={`w-11 h-11 rounded-2xl ${insight.tile} flex items-center justify-center`}>
            <insight.Icon size={20} className={insight.text} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-[1.05]">{insight.title}</h1>
        </div>
      </div>

      <div className={`mx-5 mb-5 rounded-3xl ${insight.tile} p-5`}>
        <div className="flex items-end gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{insight.metricLabel}</p>
            <span className="text-3xl font-semibold tracking-tight text-foreground">{insight.metric}</span>
          </div>
          <div className="mb-1 ml-auto text-right">
            <p className="text-xs text-muted-foreground">{insight.targetLabel}</p>
            <p className="text-sm font-semibold text-foreground">{insight.target}</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 ${insight.text}`}>
          <TrendIcon size={14} />
          <p className="text-xs font-medium">{insight.trend}</p>
        </div>
      </div>

      <div className="px-5 mb-5">
        <h2 className="text-[11px] font-semibold text-muted-foreground mb-4">This week</h2>
        <div className="flex items-end gap-2 h-28">
          {insight.values.map((value, index) => {
            const good = value >= insight.targetMin
            const height = Math.max((value / maxValue) * 80, 12)
            return (
              <div key={days[index]} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-muted-foreground">{value}{insight.unit}</span>
                <div className="w-full flex flex-col justify-end" style={{ height: '80px' }}>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${good ? 'bg-primary' : insight.tile}`}
                    style={{ height: `${height}px` }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground">{days[index]}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[10px] text-muted-foreground">{insight.goodLabel}</span></div>
          <div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${insight.tile} border border-border`} /><span className="text-[10px] text-muted-foreground">{insight.lowLabel}</span></div>
        </div>
      </div>

      <div className="mx-5 mb-5 p-4 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Info size={14} className="text-primary" />
          <h3 className="text-base font-semibold text-foreground tracking-tight">Why this matters</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{insight.why}</p>
      </div>

      <div className="px-5 mb-5">
        <h2 className="text-[11px] font-semibold text-muted-foreground mb-3">
          Personalised recommendations
        </h2>
        <div className="space-y-2">
          {insight.recommendations.map((rec, i) => (
            <div key={rec} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
              <div className="mt-0.5 w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                <span className="text-[10px] font-semibold text-primary">{i + 1}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-semibold text-muted-foreground">
            Activities that may help
          </h2>
          <button onClick={() => onNavigate('activities')} className="text-xs font-semibold text-primary flex items-center gap-1">
            See all <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {insight.activities.map(({ name, tag, time, tile, text }) => (
            <div key={name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
              </div>
              <span className={`text-[10px] font-semibold ${text} ${tile} rounded-full px-2.5 py-1 shrink-0`}>
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
