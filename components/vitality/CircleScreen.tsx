'use client'

import { useState, useEffect } from 'react'
import { Camera, Flame, MapPin, Heart, Sparkles, X, CheckCircle, CalendarDays, BarChart2, Trophy, Zap, Star, Crown, Settings, ChevronDown, Bell } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void; openSnap?: boolean; onSnapOpened?: () => void }

// ── Data ──────────────────────────────────────────────────────────────────────

type CircleId = 'family' | 'friends' | 'office'

const circles: Array<{ id: CircleId; name: string; members: number; initials: string; color: string }> = [
  { id: 'family', name: 'Family Circle', members: 5, initials: 'FC', color: 'bg-tile-social text-pillar-social' },
  { id: 'friends', name: 'Close Friends', members: 4, initials: 'CF', color: 'bg-tile-mental text-pillar-mental' },
  { id: 'office', name: 'Office Wellness', members: 11, initials: 'OW', color: 'bg-tile-nutrition text-pillar-nutrition' },
]

const initialPosts = [
  { id: 1, name: 'MOM',  initials: 'M',  color: 'bg-tile-mental text-pillar-mental',       status: 'CELEBRATING VITALITY', caption: '"POST-NAD PROTOCOL FLOW."',                       image: '/images/activity-meal.jpg' },
  { id: 2, name: 'ALEX', initials: 'AL', color: 'bg-tile-movement text-pillar-movement',   status: 'MORNING WIN',           caption: '"10K steps before 9am. Feeling unstoppable."',     image: '/images/activity-walk.jpg' },
  { id: 3, name: 'MAYA', initials: 'MY', color: 'bg-tile-sleep text-pillar-sleep',         status: 'REST DAY',              caption: '"Sleep is the ultimate recovery tool."',             image: '/images/activity-sleep.jpg' },
]

const circleGroups = circles.map(circle => circle.name)

const circleContent = {
  family: {
    quest: { title: 'Hydration Wave', current: 842, goal: 1000, unit: 'L', note: 'Community volume logged', tile: 'bg-tile-movement', bar: 'bg-pillar-movement' },
    empathySummary: 'Warm and steady',
    empathyMembers: [
      { id: 1, name: 'MOM',  initials: 'M',  mood: 'Radiant', status: 'POST-NAD GLOW',        energy: 88, sentiment: 'positive' as const, color: 'bg-tile-recovery text-pillar-recovery', action: 'Celebrate' },
      { id: 2, name: 'ALEX', initials: 'AL', mood: 'Peak',    status: 'MORNING RUN HIGH',     energy: 82, sentiment: 'positive' as const, color: 'bg-tile-movement text-pillar-movement', action: 'Cheer' },
      { id: 3, name: 'MAYA', initials: 'MY', mood: 'Drained', status: 'LOW SLEEP NIGHT',      energy: 34, sentiment: 'negative' as const, color: 'bg-tile-sleep text-pillar-sleep', action: 'Send care' },
      { id: 4, name: 'SAM',  initials: 'S',  mood: 'Good',    status: 'STEADY AND PRESENT',   energy: 70, sentiment: 'positive' as const, color: 'bg-tile-nutrition text-pillar-nutrition', action: 'Nudge' },
    ],
    activities: [
      { id: 1, title: 'Sunset Stretch Class', time: 'Today · 6:30pm', image: '/images/activity-stretch.jpg', members: ['M', 'AL'], memberCount: 2, tag: 'Movement' },
      { id: 2, title: 'Sunday Recovery Walk', time: 'Sun · 9:00am', image: '/images/activity-walk.jpg', members: ['M', 'AL', 'S'], memberCount: 3, tag: 'Recovery' },
      { id: 3, title: 'Brain Health Webinar', time: 'Thu · 6:00pm', image: '/images/activity-brain.jpg', members: ['MY'], memberCount: 1, tag: 'Brain Health' },
    ],
    mapPins: [
      { id: 1, label: 'Hyde Park', x: 30, y: 40, members: ['M', 'AL'], activity: 'Sunset Stretch' },
      { id: 2, label: "Regent's Park", x: 60, y: 25, members: ['M', 'AL', 'S'], activity: 'Recovery Walk' },
      { id: 3, label: 'Battersea', x: 50, y: 65, members: [], activity: 'Meal Prep' },
    ],
    posts: initialPosts,
    dailyMembers: ['MOM', 'ALEX', 'MAYA', 'SAM'],
  },
  friends: {
    quest: { title: 'Weekend Reset', current: 6, goal: 8, unit: 'sessions', note: 'Group recovery sessions completed', tile: 'bg-tile-recovery', bar: 'bg-pillar-recovery' },
    empathySummary: 'High energy, low recovery',
    empathyMembers: [
      { id: 1, name: 'ANNA', initials: 'AK', mood: 'Excited', status: 'BOOKED SATURDAY HIKE', energy: 86, sentiment: 'positive' as const, color: 'bg-tile-movement text-pillar-movement', action: 'Cheer' },
      { id: 2, name: 'JAMES', initials: 'JT', mood: 'Tense', status: 'WORK DEADLINE MODE', energy: 46, sentiment: 'negative' as const, color: 'bg-tile-mental text-pillar-mental', action: 'Send care' },
      { id: 3, name: 'MIA', initials: 'ML', mood: 'Playful', status: 'READY FOR RESET DAY', energy: 78, sentiment: 'positive' as const, color: 'bg-tile-social text-pillar-social', action: 'Invite' },
    ],
    activities: [
      { id: 1, title: 'Saturday Park Hike', time: 'Sat · 8:30am', image: '/images/activity-walk.jpg', members: ['AK', 'ML'], memberCount: 2, tag: 'Movement' },
      { id: 2, title: 'Cold Plunge + Sauna', time: 'Fri · 7:00pm', image: '/images/activity-stretch.jpg', members: ['JT'], memberCount: 1, tag: 'Recovery' },
      { id: 3, title: 'Healthy Brunch Table', time: 'Sun · 11:00am', image: '/images/activity-meal.jpg', members: ['AK', 'JT', 'ML'], memberCount: 3, tag: 'Nutrition' },
    ],
    mapPins: [
      { id: 1, label: 'Primrose Hill', x: 34, y: 30, members: ['AK', 'ML'], activity: 'Park Hike' },
      { id: 2, label: 'Soho Recovery', x: 58, y: 55, members: ['JT'], activity: 'Sauna Reset' },
      { id: 3, label: 'Marylebone', x: 44, y: 72, members: ['AK', 'JT', 'ML'], activity: 'Brunch Table' },
    ],
    posts: [
      { id: 11, name: 'ANNA', initials: 'AK', color: 'bg-tile-movement text-pillar-movement', status: 'HIKE READY', caption: '"Saturday reset crew, assemble."', image: '/images/activity-walk.jpg' },
      { id: 12, name: 'MIA', initials: 'ML', color: 'bg-tile-social text-pillar-social', status: 'SOCIAL CHARGE', caption: '"Brunch and sunlight fixed my whole mood."', image: '/images/activity-meal.jpg' },
    ],
    dailyMembers: ['ANNA', 'JAMES', 'MIA'],
  },
  office: {
    quest: { title: 'Focus Sprint', current: 18, goal: 24, unit: 'blocks', note: 'Team deep-work blocks protected', tile: 'bg-tile-mental', bar: 'bg-pillar-mental' },
    empathySummary: 'Focused but stretched',
    empathyMembers: [
      { id: 1, name: 'PRIYA', initials: 'PM', mood: 'Focused', status: 'DEEP WORK MORNING', energy: 76, sentiment: 'positive' as const, color: 'bg-tile-mental text-pillar-mental', action: 'Respect focus' },
      { id: 2, name: 'TOM', initials: 'TR', mood: 'Flat', status: 'BACK-TO-BACK CALLS', energy: 38, sentiment: 'negative' as const, color: 'bg-tile-recovery text-pillar-recovery', action: 'Send care' },
      { id: 3, name: 'NINA', initials: 'NS', mood: 'Calm', status: 'WALKING MEETING DONE', energy: 72, sentiment: 'positive' as const, color: 'bg-tile-nutrition text-pillar-nutrition', action: 'Cheer' },
      { id: 4, name: 'DAVID', initials: 'DK', mood: 'Sharp', status: 'PRESENTATION READY', energy: 80, sentiment: 'positive' as const, color: 'bg-tile-social text-pillar-social', action: 'Nudge' },
    ],
    activities: [
      { id: 1, title: 'Walking 1:1 Route', time: 'Today · 3:00pm', image: '/images/activity-walk.jpg', members: ['PM', 'NS'], memberCount: 2, tag: 'Movement' },
      { id: 2, title: 'Desk Mobility Reset', time: 'Daily · 2:15pm', image: '/images/activity-stretch.jpg', members: ['TR', 'DK'], memberCount: 2, tag: 'Recovery' },
      { id: 3, title: 'Focus Nutrition Lunch', time: 'Thu · 12:30pm', image: '/images/activity-meal.jpg', members: ['PM'], memberCount: 1, tag: 'Nutrition' },
    ],
    mapPins: [
      { id: 1, label: 'Office HQ', x: 46, y: 44, members: ['PM', 'TR', 'DK'], activity: 'Desk Reset' },
      { id: 2, label: 'Canal Path', x: 68, y: 34, members: ['PM', 'NS'], activity: 'Walking 1:1' },
      { id: 3, label: 'Market Hall', x: 36, y: 68, members: ['PM'], activity: 'Focus Lunch' },
    ],
    posts: [
      { id: 21, name: 'PRIYA', initials: 'PM', color: 'bg-tile-mental text-pillar-mental', status: 'FOCUS WIN', caption: '"Two quiet blocks before noon. Miracle."', image: '/images/activity-brain.jpg' },
      { id: 22, name: 'TOM', initials: 'TR', color: 'bg-tile-recovery text-pillar-recovery', status: 'NEEDS RESET', caption: '"Stretch break saved my afternoon."', image: '/images/activity-stretch.jpg' },
    ],
    dailyMembers: ['PRIYA', 'TOM', 'NINA', 'DAVID'],
  },
} satisfies Record<CircleId, {
  quest: { title: string; current: number; goal: number; unit: string; note: string; tile: string; bar: string }
  empathySummary: string
  empathyMembers: Array<{ id: number; name: string; initials: string; mood: string; status: string; energy: number; sentiment: 'positive' | 'negative'; color: string; action: string }>
  activities: Array<{ id: number; title: string; time: string; image: string; members: string[]; memberCount: number; tag: string }>
  mapPins: Array<{ id: number; label: string; x: number; y: number; members: string[]; activity: string }>
  posts: typeof initialPosts
  dailyMembers: string[]
}>

// ── Sub-component prop interfaces ────────────────────────────────────────────

interface FamilyTabProps {
  circle: typeof circleContent[CircleId]
  setSnapSheetOpen: (open: boolean) => void
  setSnapStep: (step: 1 | 2 | 3) => void
  hasSetupIntegration: boolean
}

interface DiscoverTabProps {
  circle: typeof circleContent[CircleId]
  onNavigate: (s: Screen) => void
}

interface MapTabProps {
  circle: typeof circleContent[CircleId]
}

interface SnapSheetProps {
  snapStep: 1 | 2 | 3
  setSnapStep: (step: 1 | 2 | 3) => void
  selectedCircles: string[]
  setSelectedCircles: (fn: (prev: string[]) => string[]) => void
  caption: string
  setCaption: (v: string) => void
  setSnapSheetOpen: (open: boolean) => void
  setPosts: (fn: (prev: typeof initialPosts) => typeof initialPosts) => void
  setStreak: (fn: (prev: number) => number) => void
  onIntegrationDone: () => void
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FamilyTab({ circle, setSnapSheetOpen, setSnapStep, hasSetupIntegration }: FamilyTabProps) {
  const [nudgedMemberId, setNudgedMemberId] = useState<number | null>(null)
  const questProgress = Math.min((circle.quest.current / circle.quest.goal) * 100, 100)
  const averageEnergy = Math.round(circle.empathyMembers.reduce((sum, member) => sum + member.energy, 0) / circle.empathyMembers.length)
  const energyFace = averageEnergy >= 76 ? '☺' : averageEnergy >= 58 ? '•‿•' : '•︵•'
  const energyFaceTone = averageEnergy >= 76
    ? 'bg-tile-nutrition text-pillar-nutrition'
    : averageEnergy >= 58
    ? 'bg-tile-social text-pillar-social'
    : 'bg-tile-recovery text-pillar-recovery'
  const lowEnergyCount = circle.empathyMembers.filter(member => member.sentiment === 'negative').length
  const handleNudge = (memberId: number) => {
    setNudgedMemberId(memberId)
    setTimeout(() => setNudgedMemberId(current => current === memberId ? null : current), 1200)
  }

  return (
    <>
      {/* Circle Quest card */}
      <div className={`mx-5 mb-5 rounded-3xl ${circle.quest.tile} p-5`}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shadow-sm shrink-0">
            <CheckCircle size={18} className="text-pillar-movement" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-foreground/60 mb-0.5">Circle quest</p>
            <h2 className="text-lg font-semibold text-foreground tracking-tight leading-tight">{circle.quest.title}</h2>
          </div>
        </div>
        <p className="text-3xl font-semibold tracking-tight text-foreground">
          {circle.quest.current} <span className="text-sm font-semibold text-foreground/60">/ {circle.quest.goal} {circle.quest.unit}</span>
        </p>
        <p className="text-xs text-foreground/60 mb-3">{circle.quest.note}</p>
        <div className="h-2 bg-white/60 rounded-full overflow-hidden">
          <div className={`h-full ${circle.quest.bar} rounded-full`} style={{ width: `${questProgress}%` }} />
        </div>
      </div>

      {/* Shared Empathy */}
      <div className="px-5 space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground">Shared empathy</p>
            <h2 className="text-xl font-semibold tracking-tight text-foreground mt-0.5">Circle pulse</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-primary" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
            {circle.empathySummary}
          </span>
        </div>

        <div className="rounded-3xl bg-white p-4" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${energyFaceTone} flex items-center justify-center text-lg font-semibold shadow-sm`}>
                {energyFace}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground">Emotional energy</p>
                <p className="text-2xl font-semibold tracking-tight text-foreground">{averageEnergy}%</p>
              </div>
            </div>
            <div className="flex -space-x-1.5 shrink-0">
              {circle.empathyMembers.map(member => (
                <div key={member.id} className={`w-8 h-8 rounded-full ${member.color} border-2 border-white flex items-center justify-center text-[10px] font-semibold`}>
                  {member.initials}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${averageEnergy}%`,
                background: 'linear-gradient(90deg, var(--color-pillar-nutrition) 0%, var(--color-pillar-social) 64%, var(--color-pillar-recovery) 100%)',
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {lowEnergyCount > 0 ? `${lowEnergyCount} member${lowEnergyCount > 1 ? 's' : ''} could use care today.` : 'Everyone feels steady today.'}
          </p>
        </div>

        <div className="space-y-2">
          {circle.empathyMembers.map(member => {
            const nudged = nudgedMemberId === member.id
            return (
            <div
              key={member.id}
              className={`rounded-3xl bg-white p-3.5 transition-transform ${nudged ? 'scale-[1.015]' : ''}`}
              style={{
                boxShadow: nudged
                  ? '0 4px 18px oklch(0.52 0.13 68 / 0.18)'
                  : '0 1px 3px oklch(0 0 0 / 0.06)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${member.color} flex items-center justify-center text-xs font-semibold shrink-0`}>
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground tracking-tight">{member.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${member.sentiment === 'positive' ? 'bg-tile-nutrition text-pillar-nutrition' : 'bg-tile-recovery text-pillar-recovery'}`}>
                      {member.mood}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium tracking-wider mt-0.5">{member.status}</p>
                </div>
                <button
                  onClick={() => handleNudge(member.id)}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform ${member.sentiment === 'positive' ? 'bg-tile-nutrition' : 'bg-tile-recovery'}`}
                >
                  {member.sentiment === 'positive' ? (
                    <Sparkles size={16} className={`text-pillar-nutrition ${nudged ? 'emoji-pop' : ''}`} />
                  ) : (
                    <Heart size={16} className={`text-pillar-recovery ${nudged ? 'emoji-pop' : ''}`} />
                  )}
                  {nudged && (
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary/35"
                      style={{ animation: 'emoji-burst 0.5s ease-out forwards' }}
                    />
                  )}
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${member.sentiment === 'positive' ? 'bg-pillar-nutrition' : 'bg-pillar-recovery'}`} style={{ width: `${member.energy}%` }} />
                </div>
                <button
                  onClick={() => handleNudge(member.id)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-semibold active:scale-95 transition-all ${
                    nudged
                      ? 'bg-primary text-white'
                      : 'bg-accent text-primary'
                  }`}
                >
                  {nudged ? 'Sent' : member.action}
                </button>
              </div>
            </div>
            )
          })}
        </div>
      </div>

      {/* Vital Daily CTA */}
      <div className="mx-5 mt-5">
        <div
          className="rounded-3xl p-5 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, oklch(0.52 0.13 68) 0%, oklch(0.45 0.15 55) 100%)', boxShadow: '0 4px 20px oklch(0.52 0.13 68 / 0.35)' }}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
            <Camera size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-base tracking-tight">Snap your moment</p>
            <p className="text-white/75 text-xs mt-0.5">Share today&apos;s vitality with your circle</p>
          </div>
          <button
            onClick={() => { setSnapSheetOpen(true); setSnapStep(hasSetupIntegration ? 2 : 1) }}
            className="bg-white rounded-full px-4 py-2.5 text-xs font-bold shrink-0"
            style={{ color: 'oklch(0.52 0.13 68)' }}
          >
            Snap
          </button>
        </div>
      </div>
    </>
  )
}

function DiscoverTab({ circle, onNavigate }: DiscoverTabProps) {
  return (
    <div className="px-5 space-y-3">
      <p className="text-[11px] font-semibold text-muted-foreground mb-1">Circled activities</p>
      {circle.activities.map(act => {
        const tagTile =
          act.tag === 'Movement'     ? 'bg-tile-movement text-pillar-movement' :
          act.tag === 'Recovery'     ? 'bg-tile-recovery text-pillar-recovery' :
          act.tag === 'Brain Health' ? 'bg-tile-mental text-pillar-mental' :
                                       'bg-accent text-primary'
        return (
          <div key={act.id} className="rounded-3xl bg-white overflow-hidden" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
            <div className="h-32 bg-muted overflow-hidden">
              <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-foreground tracking-tight">{act.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{act.time}</p>
                </div>
                <span className={`text-[10px] font-semibold ${tagTile} rounded-full px-2 py-1 shrink-0`}>{act.tag}</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex -space-x-2">
                  {act.members.map(m => (
                    <div key={m} className="w-6 h-6 rounded-full bg-accent border-2 border-white flex items-center justify-center text-[8px] font-bold text-primary">
                      {m[0]}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold text-primary">
                  {act.memberCount} circle member{act.memberCount !== 1 ? 's' : ''} joining
                </span>
              </div>
              <button
                className="mt-3 w-full py-3 rounded-2xl bg-primary text-white text-sm font-semibold"
                onClick={() => onNavigate('activities')}
              >
                Join them
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MapTab({ circle }: MapTabProps) {
  return (
    <div className="px-5">
      <p className="text-[11px] font-semibold text-muted-foreground mb-3">Activity locations</p>
      {/* Static map container */}
      <div
        className="w-full rounded-3xl overflow-hidden relative"
        style={{
          height: '280px',
          boxShadow: '0 1px 3px oklch(0 0 0 / 0.07)',
          background: 'linear-gradient(160deg, oklch(0.92 0.04 148) 0%, oklch(0.88 0.05 140) 40%, oklch(0.85 0.04 155) 100%)',
          backgroundImage: `
            linear-gradient(oklch(0.5 0.06 140 / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.5 0.06 140 / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100%, 30px 30px, 30px 30px',
        }}
      >
        {circle.mapPins.map(pin => (
          <div
            key={pin.id}
            className="absolute flex flex-col items-center"
            style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -100%)' }}
          >
            {pin.members.length > 0 && (
              <div className="flex -space-x-1 mb-1">
                {pin.members.map(m => (
                  <div key={m} className="w-5 h-5 rounded-full bg-primary border border-white flex items-center justify-center text-[7px] font-bold text-white">
                    {m[0]}
                  </div>
                ))}
              </div>
            )}
            <MapPin size={20} className="text-primary drop-shadow-md" style={{ fill: 'var(--color-primary)' }} />
            <div className="bg-white rounded-lg px-2 py-0.5 shadow-sm mt-0.5 max-w-[80px]">
              <p className="text-[9px] font-bold text-foreground text-center truncate">{pin.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-2">
        {circle.mapPins.map(pin => (
          <div key={pin.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.07)' }}>
            <MapPin size={14} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{pin.label}</p>
              <p className="text-xs text-muted-foreground">{pin.activity}</p>
            </div>
            {pin.members.length > 0 && (
              <span className="text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                {pin.members.length} joining
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const REACTIONS = ['🔥', '💪', '🎉', '❤️', '✨']

interface VitalDailyTabProps {
  posts: typeof initialPosts
  setPosts: (fn: (prev: typeof initialPosts) => typeof initialPosts) => void
  dailyMembers: string[]
  reactions: Record<number, string>
  setReactions: (fn: (prev: Record<number, string>) => Record<number, string>) => void
  setSnapSheetOpen: (open: boolean) => void
  setSnapStep: (step: 1 | 2 | 3) => void
}

function VitalDailyTab({ posts, setPosts: _setPosts, dailyMembers, reactions, setReactions, setSnapSheetOpen, setSnapStep }: VitalDailyTabProps) {
  const [calendarSynced, setCalendarSynced] = useState(false)
  const [setupExpanded, setSetupExpanded] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>(dailyMembers)
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['Movement', 'Sleep', 'Nutrition', 'Recovery'])
  const [reminderTime, setReminderTime] = useState('08:00')

  return (
    <div className="px-5 space-y-5">

      {/* SET UP VITAL DAILY */}
      <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.07)' }}>
        {/* Header — tappable to expand/collapse */}
        <button
          className="w-full flex items-center justify-between p-4 bg-white"
          onClick={() => setSetupExpanded(v => !v)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center">
              <Settings size={18} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground tracking-tight">Customise your Vital Daily</p>
              <p className="text-xs text-muted-foreground">Personalise your family recap</p>
            </div>
          </div>
          <ChevronDown size={16} className={`text-muted-foreground transition-transform ${setupExpanded ? 'rotate-180' : ''}`} />
        </button>

        {setupExpanded && (
          <div className="bg-white border-t border-border px-4 pb-5 space-y-5">

            {/* Calendar sync toggle */}
            <div
              className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer mt-4 ${calendarSynced ? 'bg-tile-movement' : 'bg-secondary'}`}
              onClick={() => setCalendarSynced(v => !v)}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${calendarSynced ? 'bg-white/70' : 'bg-tile-mental'}`}>
                <CalendarDays size={18} className={calendarSynced ? 'text-pillar-movement' : 'text-pillar-mental'} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Sync Google Calendar</p>
                <p className="text-xs text-muted-foreground">{calendarSynced ? 'Connected' : 'Pull wellness events into Vital Daily'}</p>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors relative ${calendarSynced ? 'bg-primary' : 'bg-muted-foreground/25'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${calendarSynced ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </div>

            {/* Family members */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-2">Circle members to include</p>
              <div className="flex flex-wrap gap-2">
                {dailyMembers.map(member => (
                  <button
                    key={member}
                    onClick={() => setSelectedMembers(prev => prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member])}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedMembers.includes(member)
                        ? 'bg-primary text-white'
                        : 'bg-white border border-border text-muted-foreground'
                    }`}
                  >
                    {member}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity types */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-2">Activity types to show</p>
              <div className="flex flex-wrap gap-2">
                {['Movement', 'Sleep', 'Nutrition', 'Recovery', 'Mental', 'Social'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedActivities(prev => prev.includes(type) ? prev.filter(a => a !== type) : [...prev, type])}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedActivities.includes(type)
                        ? 'bg-primary text-white'
                        : 'bg-white border border-border text-muted-foreground'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Daily reminder time */}
            <div>
              <p className="text-[11px] font-semibold text-muted-foreground mb-2">Daily reminder</p>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-secondary">
                <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center">
                  <Bell size={16} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground flex-1">Remind me to snap at</p>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={e => setReminderTime(e.target.value)}
                  className="text-sm font-bold text-primary bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Save button */}
            <button className="w-full py-3 rounded-2xl bg-primary text-white font-semibold text-sm">
              Save preferences
            </button>
          </div>
        )}
      </div>

      {/* Prompt to post today */}
      <div className="p-4 rounded-3xl border-2 border-dashed border-primary/30 flex items-center gap-3 bg-white/40">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <Camera size={18} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground tracking-tight">Snap your moment</p>
          <p className="text-xs text-muted-foreground">Your circle is ready to hear from you 👀</p>
        </div>
        <button
          onClick={() => { setSnapSheetOpen(true); setSnapStep(2) }}
          className="text-xs font-semibold text-primary bg-accent rounded-full px-3 py-1.5"
        >
          Snap
        </button>
      </div>

      {/* Posts feed */}
      {posts.map(post => (
        <div key={post.id} className="rounded-3xl bg-white overflow-hidden" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
          <div className="h-48 bg-muted overflow-hidden">
            <img src={post.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className={`w-9 h-9 rounded-full ${post.color} flex items-center justify-center text-xs font-bold shrink-0`}>
                {post.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground tracking-tight">{post.name}</p>
                <p className="text-[10px] text-muted-foreground font-medium tracking-widest">{post.status}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed mb-3">{post.caption}</p>
            {/* Emoji reactions row */}
            <div className="flex gap-2">
              {REACTIONS.map(emoji => {
                const picked = reactions[post.id] === emoji
                return (
                  <button
                    key={emoji}
                    onClick={() => setReactions(prev => ({ ...prev, [post.id]: picked ? '' : emoji }))}
                    className={`relative flex-1 py-2 rounded-2xl text-base transition-colors active:scale-95 ${
                      picked ? 'bg-primary/15' : 'bg-muted/60'
                    }`}
                  >
                    <span
                      key={picked ? `${post.id}-${emoji}-on` : `${post.id}-${emoji}-off`}
                      className={picked ? 'emoji-pop inline-block' : 'inline-block'}
                    >
                      {emoji}
                    </span>
                    {picked && (
                      <span
                        key={`burst-${post.id}-${emoji}`}
                        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary/40"
                        style={{ animation: 'emoji-burst 0.5s ease-out forwards' }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SnapSheet({
  snapStep,
  setSnapStep,
  selectedCircles,
  setSelectedCircles,
  caption,
  setCaption,
  setSnapSheetOpen,
  setPosts,
  setStreak,
  onIntegrationDone,
}: SnapSheetProps) {
  const [integrations, setIntegrations] = useState<string[]>([])
  const [snapSuccess, setSnapSuccess] = useState(false)

  return (
    <div className="fixed inset-0 z-50">
      {/* Full-viewport backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={() => !snapSuccess && setSnapSheetOpen(false)} />
      {/* Constrained sheet container */}
      <div className="absolute inset-0 flex flex-col justify-end pointer-events-none" style={{ maxWidth: '430px', margin: '0 auto' }}>
        <div
          className="relative rounded-t-3xl p-6 pb-10 pointer-events-auto"
          style={{
            background: 'radial-gradient(ellipse at top left, oklch(0.97 0.04 65 / 0.7) 0%, transparent 55%), radial-gradient(ellipse at top right, oklch(0.96 0.05 295 / 0.6) 0%, transparent 55%), white',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setSnapSheetOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X size={16} className="text-muted-foreground" />
          </button>

          {/* Step indicators */}
          <div className="flex gap-2 mb-5">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full ${s <= snapStep ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>

          {/* STEP 1 */}
          {snapStep === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">1</div>
                <h2 className="font-bold text-lg text-foreground">Personalized Integration</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-5">Connect your data before you snap</p>
              <div className="space-y-3">
                <div
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[oklch(0.97_0_0)] cursor-pointer"
                  onClick={() => setIntegrations(prev =>
                    prev.includes('calendar') ? prev.filter(i => i !== 'calendar') : [...prev, 'calendar']
                  )}
                >
                  <div className="w-10 h-10 rounded-2xl bg-tile-mental flex items-center justify-center">
                    <CalendarDays size={20} className="text-pillar-mental" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Integrate Google Calendar</p>
                    <p className="text-xs text-muted-foreground">Sync your wellness schedule</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                    integrations.includes('calendar')
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground/30 bg-card'
                  }`}>
                    {integrations.includes('calendar') && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                <div
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-[oklch(0.97_0_0)] cursor-pointer"
                  onClick={() => setIntegrations(prev =>
                    prev.includes('dashboard') ? prev.filter(i => i !== 'dashboard') : [...prev, 'dashboard']
                  )}
                >
                  <div className="w-10 h-10 rounded-2xl bg-tile-social flex items-center justify-center">
                    <BarChart2 size={20} className="text-pillar-social" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Dashboard Integration</p>
                    <p className="text-xs text-muted-foreground">Share your VQ stats with your snap</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                    integrations.includes('dashboard')
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground/30 bg-card'
                  }`}>
                    {integrations.includes('dashboard') && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
              <button onClick={() => { onIntegrationDone(); setSnapStep(2) }} className="mt-5 w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-sm">
                NEXT →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {snapStep === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">2</div>
                <h2 className="font-bold text-lg text-foreground">Select your Circles</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-5">Choose who sees your moment</p>
              <div className="grid grid-cols-2 gap-3">
                {circleGroups.map(cg => (
                  <button
                    key={cg}
                    onClick={() => setSelectedCircles(prev =>
                      prev.includes(cg) ? prev.filter(c => c !== cg) : [...prev, cg]
                    )}
                    className={`p-4 rounded-2xl border-2 text-sm font-semibold transition-all ${
                      selectedCircles.includes(cg)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-[oklch(0.97_0_0)] text-muted-foreground'
                    }`}
                  >
                    {cg}
                  </button>
                ))}
              </div>
              <button onClick={() => setSnapStep(3)} className="mt-5 w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-sm">
                NEXT →
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {snapStep === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">3</div>
                <h2 className="font-bold text-lg text-foreground">Snap Moment</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Your circle is ready to hear from you 👀</p>
              {/* Camera preview placeholder */}
              <div className="w-full rounded-2xl bg-muted flex flex-col items-center justify-center gap-2 mb-4" style={{ height: '140px' }}>
                <Camera size={28} className="text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Tap to take your snap</p>
              </div>
              {/* Caption input */}
              <input
                type="text"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Add a caption..."
                className="w-full px-4 py-3 rounded-2xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground mb-4 outline-none"
              />
              {/* Publish button */}
              <button
                onClick={() => {
                  const newPost = {
                    id: Date.now(),
                    name: 'Sarawut',
                    initials: 'SK',
                    color: 'bg-tile-social text-pillar-social',
                    status: 'FRESH SNAP',
                    caption: caption ? `"${caption}"` : '"Just showing up."',
                    image: '/images/activity-stretch.jpg',
                  }
                  setPosts(prev => [newPost, ...prev])
                  setStreak(prev => prev + 1)
                  setSnapSuccess(true)
                  setTimeout(() => {
                    setSnapSheetOpen(false)
                    setCaption('')
                    setSelectedCircles(() => [])
                    setSnapStep(1)
                    setSnapSuccess(false)
                  }, 1800)
                }}
                className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm"
                style={{ boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.4)' }}
              >
                Publish to Circle
              </button>
            </div>
          )}

          {/* ── Success overlay ── */}
          {snapSuccess && (
            <div className="success-fade absolute inset-0 rounded-t-3xl flex flex-col items-center justify-center gap-4 z-10"
              style={{
                background: 'radial-gradient(ellipse at top, oklch(0.94 0.08 65 / 0.8) 0%, white 60%)',
              }}
            >
              <div className="check-scale w-20 h-20 rounded-full bg-primary flex items-center justify-center"
                style={{ boxShadow: '0 8px 32px oklch(0.52 0.13 68 / 0.45)' }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M8 18l7 7 13-13" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold text-foreground tracking-tight">Snapped! 🔥</p>
                <p className="text-sm text-muted-foreground mt-1">Your circle can see it now</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Streak milestones config ──────────────────────────────────────────────────

const MILESTONES = [
  { days: 7,   label: 'On a Roll',         emoji: '🔥', Icon: Flame   },
  { days: 14,  label: 'Two Weeks Strong',  emoji: '💪', Icon: Zap     },
  { days: 21,  label: 'Habit Former',      emoji: '⚡', Icon: Star    },
  { days: 30,  label: 'Monthly Champion',  emoji: '🏆', Icon: Trophy  },
  { days: 60,  label: 'Two Month Legend',  emoji: '👑', Icon: Crown   },
  { days: 90,  label: 'Vitality Master',   emoji: '🌟', Icon: Star    },
]

function StreakCard({ streak }: { streak: number }) {
  const unlocked    = MILESTONES.filter(m => streak >= m.days)
  const next        = MILESTONES.find(m => streak < m.days)
  const current     = [...unlocked].pop()
  const daysToNext  = next ? next.days - streak : null

  // Arc progress toward next milestone
  const prevMilestone = current ? current.days : 0
  const rangeSize     = next ? next.days - prevMilestone : 30
  const progress      = Math.min((streak - prevMilestone) / rangeSize, 1)
  const radius        = 34
  const circ          = 2 * Math.PI * radius
  const dash          = circ * progress
  const gap           = circ - dash

  return (
    <div
      className="mx-5 mb-4 rounded-3xl p-4 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, oklch(0.96 0.08 55) 0%, oklch(0.93 0.10 35) 100%)',
      }}
    >
      {/* Decorative glow blob */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.88 0.14 55 / 0.5) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex items-center gap-4">
        {/* Arc progress ring */}
        <div className="relative flex-shrink-0" style={{ width: 80, height: 80 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Track */}
            <circle cx="40" cy="40" r={radius} fill="none" stroke="oklch(0.75 0.10 55 / 0.35)" strokeWidth="6" />
            {/* Progress */}
            <circle
              cx="40" cy="40" r={radius}
              fill="none"
              stroke="oklch(0.52 0.13 68)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${gap}`}
              transform="rotate(-90 40 40)"
            />
          </svg>
          {/* Center number */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-foreground leading-none tracking-tight">{streak}</span>
            <span className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider mt-0.5">days</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Flame size={14} className="text-primary flex-shrink-0" />
            <span className="text-[11px] font-semibold text-foreground/70 uppercase tracking-wider">Daily Streak</span>
          </div>

          {/* Current badge */}
          {current && (
            <div className="inline-flex items-center gap-1.5 bg-white/60 rounded-full px-2.5 py-1 mb-2">
              <span className="text-sm leading-none">{current.emoji}</span>
              <span className="text-[12px] font-semibold text-foreground">{current.label}</span>
            </div>
          )}
          {!current && (
            <p className="text-[12px] font-semibold text-foreground mb-2">Keep going! 🔥</p>
          )}

          {/* Next milestone hint */}
          {daysToNext && (
            <p className="text-[11px] text-foreground/60 leading-snug">
              <span className="font-semibold text-foreground/80">{daysToNext} days</span> to {next?.emoji} {next?.label}
            </p>
          )}
          {!daysToNext && (
            <p className="text-[11px] text-foreground/60">You&apos;ve hit all milestones! 🌟</p>
          )}
        </div>
      </div>

      {/* Milestone dot track */}
      <div className="relative z-10 mt-3 flex items-center gap-0">
        {MILESTONES.map((m, i) => {
          const done = streak >= m.days
          const isCurrent = current?.days === m.days
          return (
            <div key={m.days} className="flex items-center flex-1">
              {/* connector line */}
              {i > 0 && (
                <div className={`flex-1 h-[2px] ${streak >= m.days ? 'bg-primary' : 'bg-foreground/15'}`} />
              )}
              {i === 0 && <div className="flex-1" />}
              {/* dot */}
              <div className="relative flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all text-[10px] ${
                  isCurrent
                    ? 'bg-primary text-white shadow-md scale-110'
                    : done
                    ? 'bg-primary/30 text-primary'
                    : 'bg-foreground/10 text-foreground/30'
                }`}>
                  {done ? <span>{m.emoji}</span> : <span className="font-semibold">{m.days}</span>}
                </div>
                {isCurrent && (
                  <div className="absolute -bottom-4 text-[8px] font-semibold text-primary whitespace-nowrap">YOU</div>
                )}
              </div>
              {/* connector line after last dot */}
              {i === MILESTONES.length - 1 && <div className="flex-1" />}
            </div>
          )
        })}
      </div>
      <div className="h-5" /> {/* space for "YOU" label */}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CircleScreen({ onNavigate, openSnap = false, onSnapOpened }: Props) {
  const [activeTab, setActiveTab]             = useState<'FAMILY' | 'DISCOVER' | 'MAP' | 'VITAL DAILY'>('FAMILY')
  const [activeCircleId, setActiveCircleId]   = useState<CircleId>('family')
  const [circleSwitcherOpen, setCircleSwitcherOpen] = useState(false)
  const [streak, setStreak]                   = useState(14)
  const [snapSheetOpen, setSnapSheetOpen]     = useState(false)
  const [snapStep, setSnapStep]               = useState<1 | 2 | 3>(1)

  useEffect(() => {
    if (openSnap) {
      setSnapSheetOpen(true)
      setSnapStep(3)
      onSnapOpened?.()
    }
  }, [openSnap])
  const [selectedCircles, setSelectedCircles] = useState<string[]>([])
  const [caption, setCaption]                 = useState('')
  const [postsByCircle, setPostsByCircle]     = useState<Record<CircleId, typeof initialPosts>>({
    family: circleContent.family.posts,
    friends: circleContent.friends.posts,
    office: circleContent.office.posts,
  })
  const [reactions, setReactions]             = useState<Record<number, string>>({})
  const [hasSetupIntegration, setHasSetupIntegration] = useState(false)
  const activeCircle = circles.find(circle => circle.id === activeCircleId) ?? circles[0]
  const activeCircleContent = circleContent[activeCircle.id]
  const activePosts = postsByCircle[activeCircle.id]
  const setActivePosts = (fn: (prev: typeof initialPosts) => typeof initialPosts) => {
    setPostsByCircle(prev => ({
      ...prev,
      [activeCircle.id]: fn(prev[activeCircle.id]),
    }))
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="pb-24 pt-2">

      {/* HEADER */}
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="font-semibold text-white text-xs">SK</span>
        </div>
        <button
          onClick={() => { setSnapSheetOpen(true); setSnapStep(hasSetupIntegration ? 2 : 1) }}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Snap moment"
        >
          <Camera size={18} className="text-white" />
        </button>
      </div>

      <div className="px-5 pt-2 pb-3">
        <p className="text-sm text-muted-foreground">Community</p>
        <button
          onClick={() => setCircleSwitcherOpen(open => !open)}
          className="mt-0.5 mb-4 flex max-w-full items-center gap-2 active:scale-[0.98] transition-transform"
          aria-expanded={circleSwitcherOpen}
          aria-label="Switch circle"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-[1.05] truncate">{activeCircle.name}</h1>
          <ChevronDown size={20} className={`text-muted-foreground shrink-0 transition-transform ${circleSwitcherOpen ? 'rotate-180' : ''}`} />
        </button>

        {circleSwitcherOpen && (
          <div className="mb-4 rounded-3xl bg-white p-2" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
            {circles.map(circle => {
              const active = circle.id === activeCircleId
              return (
                <button
                  key={circle.id}
                  onClick={() => {
                    setActiveCircleId(circle.id)
                    setCircleSwitcherOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors ${active ? 'bg-accent' : 'hover:bg-secondary'}`}
                >
                  <div className={`w-10 h-10 rounded-2xl ${circle.color} flex items-center justify-center text-xs font-semibold shrink-0`}>
                    {circle.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground tracking-tight truncate">{circle.name}</p>
                    <p className="text-xs text-muted-foreground">{circle.members} members</p>
                  </div>
                  {active && <CheckCircle size={18} className="text-primary shrink-0" />}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <StreakCard streak={streak} />

      {/* TAB BAR */}
      <div className="px-5 mt-3">
        <div className="flex gap-1 p-1 rounded-full bg-white border border-border">
          {(['FAMILY', 'DISCOVER', 'MAP', 'VITAL DAILY'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-[11px] font-semibold rounded-full transition-all ${
                activeTab === tab
                  ? 'bg-foreground text-white'
                  : 'text-muted-foreground'
              }`}
            >
              {tab === 'VITAL DAILY' ? 'Vital Daily' : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="pt-5">
        {activeTab === 'FAMILY'      && <FamilyTab circle={activeCircleContent} setSnapSheetOpen={setSnapSheetOpen} setSnapStep={setSnapStep} hasSetupIntegration={hasSetupIntegration} />}
        {activeTab === 'DISCOVER'    && <DiscoverTab circle={activeCircleContent} onNavigate={onNavigate} />}
        {activeTab === 'MAP'         && <MapTab circle={activeCircleContent} />}
        {activeTab === 'VITAL DAILY' && (
          <VitalDailyTab
            key={activeCircle.id}
            posts={activePosts}
            setPosts={setActivePosts}
            dailyMembers={activeCircleContent.dailyMembers}
            reactions={reactions}
            setReactions={setReactions}
            setSnapSheetOpen={setSnapSheetOpen}
            setSnapStep={setSnapStep}
          />
        )}
      </div>

      {/* SNAP BOTTOM SHEET */}
      {snapSheetOpen && (
        <SnapSheet
          snapStep={snapStep}
          setSnapStep={setSnapStep}
          selectedCircles={selectedCircles}
          setSelectedCircles={setSelectedCircles}
          caption={caption}
          setCaption={setCaption}
          setSnapSheetOpen={setSnapSheetOpen}
          setPosts={setActivePosts}
          setStreak={setStreak}
          onIntegrationDone={() => setHasSetupIntegration(true)}
        />
      )}
    </div>
  )
}
