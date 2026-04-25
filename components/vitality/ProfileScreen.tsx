'use client'

import { Activity, Moon, Footprints, ChevronRight, Watch, Settings } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const goals = ['Better Sleep', 'Lower Stress', 'More Activity']

const stats = [
  { icon: Footprints, label: 'Weekly steps', value: '31,400', sub: '+12% vs last week' },
  { icon: Moon,       label: 'Avg sleep',    value: '6.4h',   sub: 'Target: 7–9h' },
  { icon: Activity,   label: 'Active days',  value: '4/7',    sub: 'This week' },
]

export default function ProfileScreen({ onNavigate: _onNavigate }: Props) {
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Account</p>
          <h1 className="font-serif text-2xl font-medium text-foreground">Profile</h1>
        </div>
        <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <Settings size={17} className="text-muted-foreground" />
        </button>
      </div>

      {/* Profile card */}
      <div className="mx-5 mb-5 p-5 rounded-3xl bg-card border border-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <span className="font-serif text-2xl text-white font-medium">S</span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground text-lg">Sophie Wren</h2>
            <p className="text-sm text-muted-foreground">Member since March 2025</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {goals.map(g => (
            <span key={g} className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1.5">
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Your progress</h2>
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="rounded-2xl bg-card border border-border p-3 text-center">
              <div className="w-8 h-8 rounded-xl bg-secondary mx-auto mb-2 flex items-center justify-center">
                <Icon size={15} className="text-primary" />
              </div>
              <p className="font-semibold text-foreground text-base">{value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{label}</p>
              <p className="text-[9px] text-primary font-medium mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Connected sources */}
      <div className="px-5 mb-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Connected sources</h2>
        <div className="space-y-2">
          {[
            { name: 'Apple Health', status: 'Connected', icon: Activity },
            { name: 'WHOOP Band',   status: 'Connected', icon: Watch },
          ].map(({ name, status, icon: Icon }) => (
            <div key={name} className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <Icon size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{status} · Synced 2h ago</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-wellness-teal" />
            </div>
          ))}
        </div>
      </div>

      {/* Settings list */}
      <div className="px-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Settings</h2>
        <div className="rounded-2xl bg-card border border-border overflow-hidden divide-y divide-border">
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
