'use client'

import { ChevronLeft, UserPlus, Calendar, TrendingUp } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const members = [
  { name: 'Anna K',    initials: 'AK', color: 'bg-wellness-blush text-wellness-slate',   role: 'Admin', steps: '7,200', sleep: '7.2h', streak: 14 },
  { name: 'James T',   initials: 'JT', color: 'bg-wellness-sky/70 text-wellness-teal',   role: 'Member', steps: '9,400', sleep: '6.8h', streak: 8 },
  { name: 'Mia L',     initials: 'ML', color: 'bg-secondary text-primary',                role: 'Member', steps: '6,100', sleep: '7.5h', streak: 21 },
  { name: 'Tom R',     initials: 'TR', color: 'bg-wellness-sand text-wellness-teal',      role: 'Member', steps: '5,800', sleep: '6.1h', streak: 5 },
  { name: 'Sophie (you)', initials: 'S', color: 'bg-primary text-primary-foreground',     role: 'You',   steps: '4,200', sleep: '5.7h', streak: 3 },
]

const upcoming = [
  { name: 'Sunday Recovery Walk',      time: 'Sun · 9:00am · Regent\'s Park', joining: 3, tag: 'Movement' },
  { name: 'Evening Breathwork',        time: 'Fri · 8:00pm · Online',         joining: 2, tag: 'Recovery' },
  { name: 'Sleep Optimisation Talk',   time: 'Wed · 7:30pm · Online',         joining: 2, tag: 'Sleep' },
]

const updates = [
  { who: 'Anna K',  initials: 'AK', color: 'bg-wellness-blush text-wellness-slate', text: 'completed her 14-day movement streak!', time: '1h ago' },
  { who: 'James T', initials: 'JT', color: 'bg-wellness-sky/70 text-wellness-teal', text: 'joined the Sunday Recovery Walk.', time: '3h ago' },
  { who: 'Mia L',   initials: 'ML', color: 'bg-secondary text-primary',              text: 'logged the best sleep week in a month.', time: 'Yesterday' },
]

export default function CircleDetailScreen({ onNavigate }: Props) {
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <button onClick={() => onNavigate('circle')} className="flex items-center gap-1 text-muted-foreground mb-4 -ml-1">
          <ChevronLeft size={20} /> <span className="text-sm">My Circles</span>
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-2xl font-medium text-foreground">Close Friends</h1>
            <p className="text-sm text-muted-foreground">4 members · Active this week</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-2">
            <UserPlus size={13} /> Invite
          </button>
        </div>
      </div>

      {/* Group stat strip */}
      <div className="mx-5 mb-5 rounded-2xl bg-primary p-4 text-white">
        <p className="text-white/70 text-xs mb-3 font-medium">Circle summary this week</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Avg steps', value: '6,540' },
            { label: 'Avg sleep', value: '6.7h' },
            { label: 'Activities joined', value: '7' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-serif text-xl font-medium">{value}</p>
              <p className="text-white/60 text-[10px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Members */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Members</h2>
          <div className="flex items-center gap-1 text-xs text-primary">
            <TrendingUp size={12} /> Progress
          </div>
        </div>
        <div className="space-y-2">
          {members.map(m => (
            <div key={m.name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center text-xs font-semibold shrink-0`}>
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{m.name}</p>
                  {m.role === 'You' && (
                    <span className="text-[9px] font-semibold bg-primary/10 text-primary rounded-full px-2 py-0.5">You</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{m.steps} steps · {m.sleep} sleep</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-semibold text-foreground">{m.streak}</p>
                <p className="text-[10px] text-muted-foreground">day streak</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming activities */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upcoming together</h2>
          <button onClick={() => onNavigate('activities')} className="text-xs font-semibold text-primary flex items-center gap-1">
            <Calendar size={12} /> Browse
          </button>
        </div>
        <div className="space-y-2">
          {upcoming.map(({ name, time, joining, tag }) => (
            <div key={name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
                <p className="text-[10px] text-primary font-medium mt-1">{joining} circle members joining</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <span className="text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2 py-0.5">{tag}</span>
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
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Circle updates</h2>
        <div className="space-y-3">
          {updates.map((u, i) => (
            <div key={i} className="flex gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className={`w-9 h-9 rounded-full ${u.color} flex items-center justify-center text-[11px] font-semibold shrink-0`}>
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
