'use client'

import { Moon, Users, TrendingDown, BookOpen, Heart, ArrowRight, Sparkles } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const nudges = [
  {
    type: 'insight',
    icon: Moon,
    iconBg: 'bg-wellness-sky/20',
    iconColor: 'text-wellness-teal',
    title: 'Your sleep has dipped this week',
    body: 'Your average sleep has been 5.9h this week — about 1 hour below your personal baseline. Quality rest affects everything from mood to immune health.',
    actions: [
      { label: 'Explore sleep activities', screen: 'activities' as Screen },
      { label: 'View sleep insight', screen: 'insight' as Screen },
    ],
    tag: 'Sleep · Personalised',
  },
  {
    type: 'social',
    icon: Users,
    iconBg: 'bg-secondary',
    iconColor: 'text-primary',
    title: '3 people in your circle joined a recovery session',
    body: 'Anna, James, and Tom are attending Sunday Recovery Walk this weekend. Moving together is one of the most effective ways to build lasting habits.',
    actions: [
      { label: 'Join them', screen: 'activities' as Screen },
    ],
    tag: 'Circle · Social',
  },
  {
    type: 'pattern',
    icon: TrendingDown,
    iconBg: 'bg-wellness-sand',
    iconColor: 'text-wellness-teal',
    title: 'A pattern worth noticing',
    body: 'Your recovery score has trended downward for five consecutive days. This can happen during periods of high stress or disrupted sleep. A lighter week may help you reset.',
    actions: [
      { label: 'Try a recovery activity', screen: 'activities' as Screen },
    ],
    tag: 'Recovery · Pattern',
  },
  {
    type: 'professional',
    icon: Heart,
    iconBg: 'bg-wellness-blush/50',
    iconColor: 'text-wellness-slate',
    title: 'A deeper health review may be worthwhile',
    body: 'Based on your recent patterns — reduced sleep, lower recovery, and lower activity — a conversation with a health professional could offer useful perspective. This is a gentle suggestion, not a diagnosis.',
    actions: [
      { label: 'Learn more', screen: 'home' as Screen },
      { label: 'Find a specialist', screen: 'home' as Screen },
    ],
    tag: 'Wellbeing · Professional Care',
    important: true,
  },
]

const articles = [
  {
    icon: BookOpen,
    title: 'Why sleep quality matters more than quantity',
    read: '3 min read',
    tag: 'Sleep',
  },
  {
    icon: Sparkles,
    title: 'The science of recovery — what your body needs',
    read: '4 min read',
    tag: 'Recovery',
  },
  {
    icon: Heart,
    title: 'How social connection supports longevity',
    read: '5 min read',
    tag: 'Wellbeing',
  },
]

export default function GuidanceScreen({ onNavigate }: Props) {
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Smart Guidance</p>
        <h1 className="font-serif text-2xl font-medium text-foreground">Nudges &amp; insights</h1>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Supportive suggestions based on your data — never prescriptive, always personal.
        </p>
      </div>

      {/* Nudge cards */}
      <div className="px-5 space-y-4 mb-6">
        {nudges.map((nudge, i) => {
          const Icon = nudge.icon
          return (
            <div
              key={i}
              className={`rounded-3xl border p-5 bg-card ${nudge.important ? 'border-wellness-blush/60 bg-wellness-blush/10' : 'border-border'}`}
            >
              {/* Tag row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-medium text-muted-foreground">{nudge.tag}</span>
                {nudge.important && (
                  <span className="text-[10px] font-semibold text-wellness-slate bg-wellness-blush/50 rounded-full px-2 py-0.5">
                    Gentle suggestion
                  </span>
                )}
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-2xl ${nudge.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon size={18} className={nudge.iconColor} />
                </div>
                <h2 className="font-semibold text-foreground text-base leading-snug flex-1">{nudge.title}</h2>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{nudge.body}</p>

              <div className="flex flex-wrap gap-2">
                {nudge.actions.map((action, j) => (
                  <button
                    key={j}
                    onClick={() => onNavigate(action.screen)}
                    className={`flex items-center gap-1.5 text-xs font-semibold rounded-full px-4 py-2 ${
                      j === 0
                        ? 'bg-primary text-white'
                        : 'bg-card border border-border text-foreground'
                    }`}
                  >
                    {action.label}
                    {j === 0 && <ArrowRight size={11} />}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Disclaimer */}
      <div className="mx-5 mb-6 p-4 rounded-2xl bg-muted border border-border">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">How guidance works:</span> Vitality Circle surfaces patterns from your data to offer supportive nudges. This is not medical advice. Always consult a qualified professional for health decisions.
        </p>
      </div>

      {/* Educational micro-reads */}
      <div className="px-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Learn more</h2>
        <div className="space-y-2">
          {articles.map(({ icon: Icon, title, read, tag }) => (
            <div key={title} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
                <p className="text-xs text-muted-foreground">{read}</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <span className="text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">{tag}</span>
                <button className="text-xs font-semibold text-primary">Read</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
