'use client'

import { useState } from 'react'
import { Camera, Flame, MapPin, Heart, Sparkles, X, CheckCircle, CalendarDays, BarChart2 } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

// ── Data ──────────────────────────────────────────────────────────────────────

const circleGroups = ['family circle', 'friend circle', 'office circle', 'school circle']

const empathyMembers = [
  { id: 1, name: 'MOM',  initials: 'M',  status: 'FEELING RADIANT', sentiment: 'positive' as const, color: 'bg-pillar-recovery/20 text-pillar-recovery' },
  { id: 2, name: 'ALEX', initials: 'AL', status: 'FEELING PEAK',    sentiment: 'positive' as const, color: 'bg-pillar-movement/20 text-pillar-movement' },
  { id: 3, name: 'MAYA', initials: 'MY', status: 'FEELING DRAINED', sentiment: 'negative' as const, color: 'bg-pillar-sleep/20 text-pillar-sleep' },
  { id: 4, name: 'SAM',  initials: 'S',  status: 'FEELING GOOD',    sentiment: 'positive' as const, color: 'bg-pillar-nutrition/20 text-pillar-nutrition' },
]

const circleActivities = [
  { id: 1, title: 'Sunset Stretch Class',   time: 'Today · 6:30pm', image: '/images/activity-stretch.jpg', members: ['AK', 'JT'],       memberCount: 2, tag: 'Movement' },
  { id: 2, title: 'Sunday Recovery Walk',   time: 'Sun · 9:00am',   image: '/images/activity-walk.jpg',    members: ['AK', 'JT', 'TR'], memberCount: 3, tag: 'Recovery' },
  { id: 3, title: 'Brain Health Webinar',   time: 'Thu · 6:00pm',   image: '/images/activity-brain.jpg',   members: ['PM'],             memberCount: 1, tag: 'Brain Health' },
]

const mapPins = [
  { id: 1, label: 'Hyde Park',       x: 30, y: 40, members: ['AK', 'JT'], activity: 'Sunset Stretch' },
  { id: 2, label: "Regent's Park",   x: 60, y: 25, members: ['AK', 'JT', 'TR'], activity: 'Recovery Walk' },
  { id: 3, label: 'Battersea',       x: 50, y: 65, members: [],           activity: 'Meal Prep' },
]

const initialPosts = [
  { id: 1, name: 'MOM',  initials: 'M',  color: 'bg-muted text-foreground',                   status: 'CELEBRATING VITALITY', caption: '"POST-NAD PROTOCOL FLOW."',                       image: '/images/activity-meal.jpg' },
  { id: 2, name: 'ALEX', initials: 'AL', color: 'bg-pillar-movement/20 text-pillar-movement', status: 'MORNING WIN',           caption: '"10K steps before 9am. Feeling unstoppable."',     image: '/images/activity-walk.jpg' },
  { id: 3, name: 'MAYA', initials: 'MY', color: 'bg-pillar-sleep/20 text-pillar-sleep',       status: 'REST DAY',              caption: '"Sleep is the ultimate recovery tool."',             image: '/images/activity-sleep.jpg' },
]

// ── Fix 6: Extract quest progress constants ───────────────────────────────────

const QUEST_PROGRESS = 84.2
const QUEST_GOAL = 100

// ── Sub-component prop interfaces (Fix 5) ────────────────────────────────────

interface FamilyTabProps {
  setSnapSheetOpen: (open: boolean) => void
  setSnapStep: (step: 1 | 2 | 3) => void
}

interface DiscoverTabProps {
  onNavigate: (s: Screen) => void
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

// ── Sub-components (Fix 5: module-level) ─────────────────────────────────────

function FamilyTab({ setSnapSheetOpen: _setSnapSheetOpen, setSnapStep: _setSnapStep }: FamilyTabProps) {
  return (
    <>
      {/* Circle Quest card */}
      <div className="mx-5 mb-5 p-4 rounded-3xl border border-border bg-card">
        <p className="section-label mb-1">CIRCLE QUEST</p>
        <h2 className="font-bold text-lg text-foreground">HYDRATION WAVE</h2>
        <p className="text-2xl font-black text-foreground mt-1">
          842 <span className="text-sm font-normal text-muted-foreground">/ {QUEST_GOAL}0L</span>
        </p>
        <p className="text-xs text-muted-foreground mb-2">COMMUNITY VOLUME LOGGED</p>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          {/* Fix 6: use style prop instead of dynamic Tailwind class */}
          <div className="h-full bg-pillar-movement rounded-full" style={{ width: `${QUEST_PROGRESS}%` }} />
        </div>
        {QUEST_PROGRESS > 80 && (
          <div className="flex justify-end mt-1">
            <CheckCircle size={16} className="text-pillar-movement" />
          </div>
        )}
      </div>

      {/* Shared Empathy */}
      <div className="px-5">
        <p className="section-label mb-3">SHARED EMPATHY</p>
        <div className="space-y-2">
          {empathyMembers.map(member => (
            <div key={member.id} className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border">
              <div className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-xs font-bold shrink-0`}>
                {member.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground tracking-wide">{member.name}</p>
                <p className="text-[10px] text-muted-foreground font-medium tracking-wider">{member.status}</p>
              </div>
              {member.sentiment === 'positive' ? (
                <button className="w-9 h-9 rounded-full bg-pillar-nutrition/15 flex items-center justify-center">
                  <Sparkles size={16} className="text-pillar-nutrition" />
                </button>
              ) : (
                <button className="w-9 h-9 rounded-full bg-pillar-recovery/15 flex items-center justify-center">
                  <Heart size={16} className="text-pillar-recovery" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function DiscoverTab({ onNavigate }: DiscoverTabProps) {
  return (
    <div className="px-5 space-y-3">
      <p className="section-label mb-1">CIRCLED ACTIVITIES</p>
      {circleActivities.map(act => (
        <div key={act.id} className="rounded-3xl bg-card border border-border overflow-hidden">
          <div className="h-32 bg-muted overflow-hidden">
            <img src={act.image} alt={act.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-foreground">{act.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{act.time}</p>
              </div>
              <span className="text-[10px] font-semibold bg-primary/10 text-primary rounded-full px-2 py-1">{act.tag}</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex -space-x-2">
                {act.members.map(m => (
                  <div key={m} className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[8px] font-bold text-primary">
                    {m[0]}
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold text-primary">
                {act.memberCount} circle member{act.memberCount !== 1 ? 's' : ''} joining
              </span>
            </div>
            {/* Fix 2: wire JOIN THEM button to navigate to activities */}
            <button
              className="mt-3 w-full py-2 rounded-2xl bg-primary text-white text-xs font-bold"
              onClick={() => onNavigate('activities')}
            >
              JOIN THEM
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function MapTab() {
  return (
    <div className="px-5">
      <p className="section-label mb-3">ACTIVITY LOCATIONS</p>
      {/* Static map container */}
      <div
        className="w-full rounded-3xl overflow-hidden border border-border relative"
        style={{
          height: '280px',
          background: 'linear-gradient(160deg, oklch(0.92 0.04 148) 0%, oklch(0.88 0.05 140) 40%, oklch(0.85 0.04 155) 100%)',
          backgroundImage: `
            linear-gradient(oklch(0.5 0.06 140 / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.5 0.06 140 / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100%, 30px 30px, 30px 30px',
        }}
      >
        {/* Note: gradient stops use raw oklch values — CSS var() not supported inside gradient() */}
        {mapPins.map(pin => (
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
            {/* Fix 3: replace raw oklch() fill prop with CSS var via style */}
            <MapPin size={20} className="text-primary drop-shadow-md" style={{ fill: 'var(--color-primary)' }} />
            <div className="bg-white rounded-lg px-2 py-0.5 shadow-sm mt-0.5 max-w-[80px]">
              <p className="text-[9px] font-bold text-foreground text-center truncate">{pin.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 space-y-2">
        {mapPins.map(pin => (
          <div key={pin.id} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border">
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

interface RecapTabProps {
  posts: typeof initialPosts
  setPosts: (fn: (prev: typeof initialPosts) => typeof initialPosts) => void
  reactions: Record<number, string>
  setReactions: (fn: (prev: Record<number, string>) => Record<number, string>) => void
  setSnapSheetOpen: (open: boolean) => void
  setSnapStep: (step: 1 | 2 | 3) => void
}

function RecapTab({ posts, setPosts: _setPosts, reactions, setReactions, setSnapSheetOpen, setSnapStep }: RecapTabProps) {
  const [calendarSynced, setCalendarSynced] = useState(false)

  return (
    <div className="px-5 space-y-5">

      {/* Set Up Recap */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden">
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <p className="section-label">SET UP RECAP</p>
          {calendarSynced && (
            <span className="text-[10px] font-bold text-pillar-movement bg-pillar-movement/10 rounded-full px-2 py-0.5">ACTIVE</span>
          )}
        </div>
        <div
          className={`mx-4 mb-4 flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-colors ${
            calendarSynced ? 'bg-pillar-movement/10' : 'bg-muted/50'
          }`}
          onClick={() => setCalendarSynced(v => !v)}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            calendarSynced ? 'bg-pillar-movement/20' : 'bg-pillar-mental/15'
          }`}>
            <CalendarDays size={20} className={calendarSynced ? 'text-pillar-movement' : 'text-pillar-mental'} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Sync Calendar</p>
            <p className="text-xs text-muted-foreground">
              {calendarSynced ? 'Google Calendar connected' : 'Pull your wellness events into Recap'}
            </p>
          </div>
          {/* Toggle pill */}
          <div
            className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
              calendarSynced ? 'bg-pillar-movement' : 'bg-muted-foreground/25'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              calendarSynced ? 'translate-x-5' : 'translate-x-0.5'
            }`} />
          </div>
        </div>

        {/* Upcoming events preview when synced */}
        {calendarSynced && (
          <div className="mx-4 mb-4 space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">UPCOMING FROM CALENDAR</p>
            {[
              { title: 'Morning Yoga', time: 'Today · 7:00am', color: 'bg-pillar-movement/15 text-pillar-movement' },
              { title: 'Breathwork Session', time: 'Tomorrow · 8:30pm', color: 'bg-pillar-sleep/15 text-pillar-sleep' },
              { title: 'Weekly Walk Club', time: 'Sun · 9:00am', color: 'bg-pillar-recovery/15 text-pillar-recovery' },
            ].map(ev => (
              <div key={ev.title} className="flex items-center gap-3 p-2.5 rounded-2xl bg-background border border-border">
                <div className={`w-2 h-2 rounded-full shrink-0 ${ev.color.split(' ')[0]}`} />
                <p className="text-sm font-medium text-foreground flex-1">{ev.title}</p>
                <p className="text-[10px] text-muted-foreground">{ev.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prompt to post today */}
      <div className="p-4 rounded-3xl border-2 border-dashed border-primary/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Camera size={18} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">Snap your moment</p>
          <p className="text-xs text-muted-foreground">Your circle is ready to hear from you 👀</p>
        </div>
        <button
          onClick={() => { setSnapSheetOpen(true); setSnapStep(2) }}
          className="text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1.5"
        >
          SNAP
        </button>
      </div>

      {/* Posts feed */}
      {posts.map(post => (
        <div key={post.id} className="rounded-3xl bg-card border border-border overflow-hidden">
          <div className="h-48 bg-muted overflow-hidden">
            <img src={post.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className={`w-9 h-9 rounded-full ${post.color} flex items-center justify-center text-xs font-bold shrink-0`}>
                {post.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground tracking-wide">{post.name}</p>
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
                    {/* Animated emoji — key changes on pick to force re-mount + replay animation */}
                    <span
                      key={picked ? `${post.id}-${emoji}-on` : `${post.id}-${emoji}-off`}
                      className={picked ? 'emoji-pop inline-block' : 'inline-block'}
                    >
                      {emoji}
                    </span>
                    {/* Burst ring on pick */}
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

  return (
    // Fix 4: split backdrop from constrained sheet
    <div className="fixed inset-0 z-50">
      {/* Full-viewport backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={() => setSnapSheetOpen(false)} />
      {/* Constrained sheet container */}
      <div className="absolute inset-0 flex flex-col justify-end pointer-events-none" style={{ maxWidth: '430px', margin: '0 auto' }}>
        <div className="relative bg-card rounded-t-3xl p-6 pb-10 pointer-events-auto">
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
                {/* Fix 1: Google Calendar row — clickable with toggle indicator */}
                <div
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/50 cursor-pointer"
                  onClick={() => setIntegrations(prev =>
                    prev.includes('calendar') ? prev.filter(i => i !== 'calendar') : [...prev, 'calendar']
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-pillar-mental/20 flex items-center justify-center">
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
                {/* Fix 1: Dashboard Integration row — clickable with toggle indicator */}
                <div
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/50 cursor-pointer"
                  onClick={() => setIntegrations(prev =>
                    prev.includes('dashboard') ? prev.filter(i => i !== 'dashboard') : [...prev, 'dashboard']
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-pillar-social/20 flex items-center justify-center">
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
                        : 'border-border bg-muted/50 text-muted-foreground'
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
                    name: 'YOU',
                    initials: 'S',
                    color: 'bg-primary/20 text-primary',
                    status: 'FRESH SNAP',
                    caption: caption ? `"${caption}"` : '"Just showing up."',
                    image: '/images/activity-stretch.jpg',
                  }
                  setPosts(prev => [newPost, ...prev])
                  setStreak(prev => prev + 1)
                  setSnapSheetOpen(false)
                  setCaption('')
                  setSelectedCircles(() => [])
                  setSnapStep(1)
                }}
                className="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-sm tracking-widest"
              >
                PUBLISH TO CIRCLE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CircleScreen({ onNavigate }: Props) {
  const [activeTab, setActiveTab]             = useState<'FAMILY' | 'DISCOVER' | 'MAP' | 'RECAP'>('FAMILY')
  const [streak, setStreak]                   = useState(14)
  const [snapSheetOpen, setSnapSheetOpen]     = useState(false)
  const [snapStep, setSnapStep]               = useState<1 | 2 | 3>(1)
  const [selectedCircles, setSelectedCircles] = useState<string[]>([])
  const [caption, setCaption]                 = useState('')
  const [posts, setPosts]                     = useState(initialPosts)
  const [reactions, setReactions]             = useState<Record<number, string>>({})
  const [hasSetupIntegration, setHasSetupIntegration] = useState(false)

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="pb-24">

      {/* HEADER */}
      <div className="px-5 pt-14 pb-0 flex items-start justify-between">
        <div>
          <p className="section-label">Community</p>
          <h1 style={{ fontFamily: 'var(--font-italiana)' }} className="text-3xl text-foreground mt-0.5">
            THE CIRCLE
          </h1>
          {/* Streak badge */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <Flame size={14} className="text-orange-500" />
            <span className="text-xs font-bold text-foreground">{streak} DAY STREAK</span>
            <Flame size={14} className="text-orange-500" />
          </div>
        </div>
        {/* Camera button */}
        <button
          onClick={() => { setSnapSheetOpen(true); setSnapStep(hasSetupIntegration ? 2 : 1) }}
          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1"
          aria-label="Snap moment"
        >
          <Camera size={20} className="text-primary" />
        </button>
      </div>

      {/* TAB BAR */}
      <div className="flex gap-0 mt-4 px-5 border-b border-border">
        {(['FAMILY', 'DISCOVER', 'MAP', 'RECAP'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-[11px] font-bold tracking-widest transition-all ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary -mb-px'
                : 'text-muted-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="pt-5">
        {activeTab === 'FAMILY'   && <FamilyTab setSnapSheetOpen={setSnapSheetOpen} setSnapStep={setSnapStep} />}
        {activeTab === 'DISCOVER' && <DiscoverTab onNavigate={onNavigate} />}
        {activeTab === 'MAP'      && <MapTab />}
        {activeTab === 'RECAP'    && (
          <RecapTab
            posts={posts}
            setPosts={setPosts}
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
          setPosts={setPosts}
          setStreak={setStreak}
          onIntegrationDone={() => setHasSetupIntegration(true)}
        />
      )}
    </div>
  )
}
