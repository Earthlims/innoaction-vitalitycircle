'use client'

import { ChevronLeft, UserPlus, Calendar, TrendingUp } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const members = [
  { name: 'Anna K',       initials: 'AK', color: 'bg-tile-recovery text-pillar-recovery',  role: 'Admin',  steps: '7,200', sleep: '7.2h', streak: 14 },
  { name: 'James T',      initials: 'JT', color: 'bg-tile-sleep text-pillar-sleep',         role: 'Member', steps: '9,400', sleep: '6.8h', streak: 8 },
  { name: 'Mia L',        initials: 'ML', color: 'bg-tile-nutrition text-pillar-nutrition', role: 'Member', steps: '6,100', sleep: '7.5h', streak: 21 },
  { name: 'Tom R',        initials: 'TR', color: 'bg-tile-movement text-pillar-movement',   role: 'Member', steps: '5,800', sleep: '6.1h', streak: 5 },
  { name: 'Sarawut (you)', initials: 'SK', color: 'bg-primary text-primary-foreground',      role: 'You',    steps: '4,200', sleep: '5.7h', streak: 3 },
]

const upcoming = [
  { name: 'Sunday Recovery Walk',    time: 'Sun · 9:00am · Regent\'s Park', joining: 3, tag: 'Movement', tile: 'bg-tile-movement', tagText: 'text-pillar-movement' },
  { name: 'Evening Breathwork',      time: 'Fri · 8:00pm · Online',         joining: 2, tag: 'Recovery', tile: 'bg-tile-recovery', tagText: 'text-pillar-recovery' },
  { name: 'Sleep Optimisation Talk', time: 'Wed · 7:30pm · Online',         joining: 2, tag: 'Sleep',    tile: 'bg-tile-sleep',    tagText: 'text-pillar-sleep' },
]

const updates = [
  { who: 'Anna K',  initials: 'AK', color: 'bg-tile-recovery text-pillar-recovery',  text: 'completed her 14-day movement streak!', time: '1h ago' },
  { who: 'James T', initials: 'JT', color: 'bg-tile-sleep text-pillar-sleep',         text: 'joined the Sunday Recovery Walk.',     time: '3h ago' },
  { who: 'Mia L',   initials: 'ML', color: 'bg-tile-nutrition text-pillar-nutrition', text: 'logged the best sleep week in a month.', time: 'Yesterday' },
]

export default function CircleDetailScreen({ onNavigate }: Props) {
  return (
    <div className="pb-24 pt-2">
      {/* Header */}
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('circle')}
          aria-label="Back"
          className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition-transform"
        >
          <ChevronLeft size={18} className="text-foreground" />
        </button>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-white border border-border rounded-full px-3 py-2">
          <UserPlus size={13} /> Invite
        </button>
      </div>

      <div className="px-5 pt-2 pb-4">
        <p className="text-sm text-muted-foreground">My Circles</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground leading-[1.05] mt-0.5">Close Friends</h1>
        <p className="text-sm text-muted-foreground mt-1">4 members · Active this week</p>
      </div>

      {/* Group stat strip */}
      <div className="mx-5 mb-5 rounded-3xl bg-foreground p-5 text-white">
        <p className="text-white/70 text-[11px] font-semibold mb-3">Circle summary this week</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Avg steps', value: '6,540' },
            { label: 'Avg sleep', value: '6.7h' },
            { label: 'Activities joined', value: '7' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <p className="text-white/60 text-[10px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Members */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-semibold text-muted-foreground">Members</h2>
          <div className="flex items-center gap-1 text-xs text-primary font-semibold">
            <TrendingUp size={12} /> Progress
          </div>
        </div>
        <div className="space-y-2">
          {members.map(m => (
            <div key={m.name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
              <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center text-xs font-bold shrink-0`}>
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{m.name}</p>
                  {m.role === 'You' && (
                    <span className="text-[9px] font-semibold bg-accent text-primary rounded-full px-2 py-0.5">You</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{m.steps} steps · {m.sleep} sleep</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-foreground">{m.streak}</p>
                <p className="text-[10px] text-muted-foreground">day streak</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming activities */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-semibold text-muted-foreground">Upcoming together</h2>
          <button onClick={() => onNavigate('activities')} className="text-xs font-semibold text-primary flex items-center gap-1">
            <Calendar size={12} /> Browse
          </button>
        </div>
        <div className="space-y-2">
          {upcoming.map(({ name, time, joining, tag, tile, tagText }) => (
            <div key={name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
                <p className="text-[10px] text-primary font-semibold mt-1">{joining} circle members joining</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <span className={`text-[10px] font-semibold ${tagText} ${tile} rounded-full px-2 py-0.5`}>{tag}</span>
                <button className="text-xs font-semibold text-white bg-primary rounded-full px-3 py-1">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Circle feed */}
      <div className="px-5">
        <h2 className="text-[11px] font-semibold text-muted-foreground mb-3">Circle updates</h2>
        <div className="space-y-2">
          {updates.map((u, i) => (
            <div key={i} className="flex gap-3 p-3.5 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
              <div className={`w-9 h-9 rounded-full ${u.color} flex items-center justify-center text-[11px] font-bold shrink-0`}>
                {u.initials}
              </div>
              <div>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{u.who}</span>{' '}{u.text}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{u.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
