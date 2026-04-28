'use client'

import { Moon, Users, TrendingDown, BookOpen, Heart, ArrowRight, Sparkles, Clock, CheckCircle, ShieldCheck } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const guidanceStack = [
  {
    label: 'Do now',
    icon: Moon,
    iconBg: 'bg-tile-sleep',
    iconColor: 'text-pillar-sleep',
    title: 'Set a wind-down anchor',
    body: 'Your sleep average is below baseline, and recovery has dipped. A fixed 10pm wind-down gives tonight the highest leverage.',
    why: ['Sleep down 5 days', 'Recovery below target'],
    action: 'View sleep pattern',
    screen: 'insight' as Screen,
  },
  {
    label: 'Circle opportunity',
    icon: Users,
    iconBg: 'bg-tile-social',
    iconColor: 'text-pillar-social',
    title: 'Join the recovery walk with your circle',
    body: 'Anna, James, and Tom are already joining. A low-intensity social activity fits your recovery state better than a hard session.',
    why: ['3 circle members joining', 'Low intensity'],
    action: 'See activity',
    screen: 'activities' as Screen,
  },
  {
    label: 'Pattern detected',
    icon: TrendingDown,
    iconBg: 'bg-tile-recovery',
    iconColor: 'text-pillar-recovery',
    title: 'Keep effort light for 48 hours',
    body: 'Recovery trending down usually means stress is stacking. Treat this as a reset window, not a performance week.',
    why: ['5-day decline', 'Lower movement capacity'],
    action: 'Find recovery options',
    screen: 'activities' as Screen,
  },
]

const library = [
  {
    icon: BookOpen,
    title: 'Why sleep quality matters more than quantity',
    read: '3 min read',
    tag: 'Sleep',
    tile: 'bg-tile-sleep',
    tagText: 'text-pillar-sleep',
  },
  {
    icon: Sparkles,
    title: 'The science of recovery and downshifting',
    read: '4 min read',
    tag: 'Recovery',
    tile: 'bg-tile-recovery',
    tagText: 'text-pillar-recovery',
  },
  {
    icon: Heart,
    title: 'How social connection supports longevity',
    read: '5 min read',
    tag: 'Wellbeing',
    tile: 'bg-tile-social',
    tagText: 'text-pillar-social',
  },
]

export default function GuidanceScreen({ onNavigate }: Props) {
  return (
    <div className="pb-24 pt-2">
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="font-semibold text-white text-sm">SK</span>
        </div>
      </div>

      <div className="px-5 pt-2 pb-4">
        <p className="text-sm text-muted-foreground">Smart Guidance</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-[1.05] mt-0.5">Today&apos;s Guidance</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Your calm next-step coach, built from your patterns and circle activity.
        </p>
      </div>

      {/* Primary coach card */}
      <div className="mx-5 mb-5 rounded-3xl bg-white overflow-hidden" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
        <div
          className="p-5"
          style={{
            background: 'radial-gradient(ellipse at top left, oklch(0.95 0.06 65 / 0.75) 0%, transparent 55%), radial-gradient(ellipse at top right, oklch(0.95 0.05 265 / 0.55) 0%, transparent 52%), white',
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-primary shadow-sm">
                <Sparkles size={12} />
                Top priority
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground leading-tight">Protect recovery today</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Sleep, recovery, and movement are all softer than usual. The best move is not more effort, but a cleaner reset.
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-tile-recovery flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="text-pillar-recovery" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { label: 'Sleep', value: '5.9h', tile: 'bg-tile-sleep', text: 'text-pillar-sleep' },
              { label: 'Recovery', value: '62%', tile: 'bg-tile-recovery', text: 'text-pillar-recovery' },
              { label: 'Steps', value: '4.2k', tile: 'bg-tile-movement', text: 'text-pillar-movement' },
            ].map(item => (
              <div key={item.label} className={`${item.tile} rounded-2xl p-3`}>
                <p className={`text-[10px] font-semibold ${item.text}`}>{item.label}</p>
                <p className="text-lg font-semibold text-foreground tracking-tight mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('activities')}
            className="w-full rounded-2xl bg-foreground py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            Start recovery plan <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 mb-5">
        <h2 className="text-[11px] font-semibold text-muted-foreground mb-3">Guidance stack</h2>
        <div className="space-y-3">
          {guidanceStack.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-3xl bg-white p-4" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon size={18} className={item.iconColor} />
                    </div>
                    {index < guidanceStack.length - 1 && <div className="mt-2 h-8 w-[2px] rounded-full bg-border" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-primary">{item.label}</span>
                      <Clock size={13} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground tracking-tight leading-snug">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{item.body}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.why.map(reason => (
                        <span key={reason} className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                          {reason}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onNavigate(item.screen)}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-white active:scale-95 transition-transform"
                    >
                      {item.action} <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Care option */}
      <div className="mx-5 mb-6 rounded-3xl bg-white p-4" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-tile-mental flex items-center justify-center shrink-0">
            <Heart size={18} className="text-pillar-mental" />
          </div>
          <div className="flex-1">
            <span className="rounded-full bg-tile-mental px-2.5 py-1 text-[10px] font-semibold text-pillar-mental">
              Care option
            </span>
            <h2 className="mt-2 text-base font-semibold text-foreground tracking-tight">A deeper review may be worthwhile</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              If low sleep, recovery, and activity continue together, a qualified professional can help you interpret the pattern. This is a supportive prompt, not a diagnosis.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold text-white">
                Learn what to ask
              </button>
              <button className="rounded-full bg-white border border-border px-3.5 py-2 text-xs font-semibold text-foreground">
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guidance library */}
      <div className="px-5">
        <h2 className="text-[11px] font-semibold text-muted-foreground mb-3">Guidance library</h2>
        <div className="space-y-2">
          {library.map(({ icon: Icon, title, read, tag, tile, tagText }) => (
            <div key={title} className="flex items-center gap-3 p-4 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
              <div className={`w-10 h-10 rounded-2xl ${tile} flex items-center justify-center shrink-0`}>
                <Icon size={16} className={tagText} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-snug">{title}</p>
                <p className="text-xs text-muted-foreground">{read}</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <span className={`text-[10px] font-semibold ${tagText} ${tile} rounded-full px-2 py-0.5`}>{tag}</span>
                <button className="text-xs font-semibold text-primary">Read</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
