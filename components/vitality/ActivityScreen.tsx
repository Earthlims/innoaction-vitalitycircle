'use client'

import { useState, useRef } from 'react'
import { X, Heart, MapPin, Clock, Globe, Users, ChevronLeft, CheckCircle, Sparkles } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

interface Props { onNavigate: (s: Screen) => void }

const activities = [
  {
    id: 1,
    title: 'Sunset Stretch Class',
    desc: 'A calming 30-minute full-body stretch as the day winds down. Perfect after a high-stress day.',
    image: '/images/activity-stretch.jpg',
    time: 'Today · 6:30pm',
    format: 'In-person · Hyde Park',
    tag: 'Movement',
    friends: ['AK', 'JT'],
    friendNames: 'Anna and James are joining',
    fit: 86,
    reasons: ['Recovery-friendly', 'Circle members nearby', 'Low intensity'],
    attendees: [
      { name: 'Anna K.', initials: 'AK', note: 'Going after work', color: 'bg-tile-movement text-pillar-movement' },
      { name: 'James T.', initials: 'JT', note: 'Booked already', color: 'bg-tile-recovery text-pillar-recovery' },
    ],
    host: 'Vitality Movement Coach',
    detail: 'A guided stretch session designed to downshift your nervous system, release desk tension, and support better sleep pressure tonight.',
  },
  {
    id: 2,
    title: 'Sleep Optimisation Workshop',
    desc: 'Evidence-based strategies to improve sleep quality, from circadian rhythm basics to sleep hygiene habits.',
    image: '/images/activity-sleep.jpg',
    time: 'Wed · 7:30pm',
    format: 'Online · 45 min',
    tag: 'Sleep',
    friends: ['ML'],
    friendNames: 'Mia is attending',
    fit: 92,
    reasons: ['Sleep score priority', 'Online tonight', 'Matches your goals'],
    attendees: [
      { name: 'Mia L.', initials: 'ML', note: 'Wants screen-free routine tips', color: 'bg-tile-sleep text-pillar-sleep' },
    ],
    host: 'Dr. Lena Morris',
    detail: 'A practical workshop covering circadian rhythm, evening light exposure, caffeine timing, bedroom temperature, and a simple wind-down template.',
  },
  {
    id: 3,
    title: 'Sunday Recovery Walk',
    desc: 'A gentle group walk through the park. Low intensity, great for active recovery and social connection.',
    image: '/images/activity-walk.jpg',
    time: 'Sun · 9:00am',
    format: 'In-person · Regent\'s Park',
    tag: 'Recovery',
    friends: ['AK', 'JT', 'TR'],
    friendNames: '3 circle members joining',
    fit: 88,
    reasons: ['Social recovery', 'Easy pace', 'Weekend rhythm'],
    attendees: [
      { name: 'Anna K.', initials: 'AK', note: 'Bringing coffee after', color: 'bg-tile-movement text-pillar-movement' },
      { name: 'James T.', initials: 'JT', note: 'Keeping it gentle', color: 'bg-tile-recovery text-pillar-recovery' },
      { name: 'Tom R.', initials: 'TR', note: 'First recovery walk', color: 'bg-tile-social text-pillar-social' },
    ],
    host: 'Vitality Circle',
    detail: 'A low-intensity group walk for active recovery and connection. The route is flat, conversational, and built for nervous-system downshifting.',
  },
  {
    id: 4,
    title: 'Healthy Meal Prep Session',
    desc: 'Learn how to plan and prepare a week of nutritious meals in under two hours with a wellness chef.',
    image: '/images/activity-meal.jpg',
    time: 'Sat · 11:00am',
    format: 'In-person · Battersea',
    tag: 'Nutrition',
    friends: [],
    friendNames: '',
    fit: 74,
    reasons: ['Nutrition balance', 'Weekend prep', 'Skill-building'],
    attendees: [],
    host: 'Chef Amelia Wong',
    detail: 'Learn a repeatable meal-prep system for high-protein, colorful meals that support energy, recovery, and long-term metabolic health.',
  },
  {
    id: 5,
    title: 'Brain Health Webinar',
    desc: 'Explore the latest research on cognitive longevity — nutrition, sleep, exercise, and mental stimulation.',
    image: '/images/activity-brain.jpg',
    time: 'Thu · 6:00pm',
    format: 'Online · 60 min',
    tag: 'Brain Health',
    friends: ['PM'],
    friendNames: 'Priya is attending',
    fit: 81,
    reasons: ['Mental pillar', 'Longevity topic', 'Online'],
    attendees: [
      { name: 'Priya M.', initials: 'PM', note: 'Interested in memory routines', color: 'bg-tile-mental text-pillar-mental' },
    ],
    host: 'Cognitive Longevity Lab',
    detail: 'A research-backed session on cognitive longevity: movement, sleep, nutrition, learning, and social engagement as protective routines.',
  },
  {
    id: 6,
    title: 'Evening Breathwork',
    desc: 'Guided breathwork session to reduce cortisol and ease your nervous system into a restful evening.',
    image: '/images/activity-breathwork.jpg',
    time: 'Fri · 8:00pm',
    format: 'Online · 20 min',
    tag: 'Recovery',
    friends: ['JT', 'ML'],
    friendNames: 'James and Mia are joining',
    fit: 89,
    reasons: ['Evening reset', 'Short session', 'Recovery boost'],
    attendees: [
      { name: 'James T.', initials: 'JT', note: 'Joining from home', color: 'bg-tile-recovery text-pillar-recovery' },
      { name: 'Mia L.', initials: 'ML', note: 'Uses this before sleep', color: 'bg-tile-sleep text-pillar-sleep' },
    ],
    host: 'Nervous System Studio',
    detail: 'A short guided breathwork practice to reduce arousal, lower stress, and prepare your body for an easier transition into sleep.',
  },
]

const tagColors: Record<string, string> = {
  'Movement':     'bg-tile-movement text-pillar-movement',
  'Sleep':        'bg-tile-sleep text-pillar-sleep',
  'Recovery':     'bg-tile-recovery text-pillar-recovery',
  'Nutrition':    'bg-tile-nutrition text-pillar-nutrition',
  'Brain Health': 'bg-tile-mental text-pillar-mental',
}

export default function ActivityScreen({ onNavigate: _onNavigate }: Props) {
  const [cards, setCards] = useState(activities)
  const [liked, setLiked] = useState<number[]>([])
  const [selectedActivity, setSelectedActivity] = useState<typeof activities[number] | null>(null)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)
  const startX = useRef(0)

  const current = cards[0]
  const SWIPE_THRESHOLD = 100

  const commitSwipe = (direction: 'left' | 'right') => {
    if (!current) return
    if (direction === 'right') setLiked(prev => [...prev, current.id])
    setExiting(direction)
    setDragging(false)
    // After exit animation completes, advance the stack
    setTimeout(() => {
      setCards(prev => prev.slice(1))
      setExiting(null)
      setDragX(0)
    }, 320)
  }

  const handleStart = (clientX: number) => {
    if (exiting) return
    startX.current = clientX
    setDragging(true)
  }
  const handleMove = (clientX: number) => {
    if (!dragging || exiting) return
    setDragX(clientX - startX.current)
  }
  const handleEnd = () => {
    if (!dragging || exiting) return
    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      commitSwipe(dragX > 0 ? 'right' : 'left')
    } else {
      // Snap back to center
      setDragging(false)
      setDragX(0)
    }
  }

  // Top card transform based on drag or exit state
  const topCardTransform = (() => {
    if (exiting === 'left')  return 'translateX(-130%) rotate(-18deg)'
    if (exiting === 'right') return 'translateX(130%) rotate(18deg)'
    if (dragX !== 0) return `translateX(${dragX}px) rotate(${dragX * 0.06}deg)`
    return 'translateX(0) rotate(0)'
  })()
  const topCardTransition = (dragging && !exiting)
    ? 'none'
    : 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.32s ease'

  // JOIN / SKIP overlay opacity (fades in as user drags)
  const joinOpacity = Math.max(0, Math.min(1, dragX / SWIPE_THRESHOLD))
  const skipOpacity = Math.max(0, Math.min(1, -dragX / SWIPE_THRESHOLD))

  const isOnline = current ? current.format.startsWith('Online') : false
  const locationName = current ? (current.format.split(' · ')[1] ?? current.format) : ''

  if (selectedActivity) {
    const joined = liked.includes(selectedActivity.id)
    const online = selectedActivity.format.startsWith('Online')

    return (
      <div className="pb-24 pt-2">
        <div className="px-5 pt-12 pb-2">
          <button
            onClick={() => setSelectedActivity(null)}
            aria-label="Back to discover"
            className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronLeft size={18} className="text-foreground" />
          </button>
        </div>

        <div className="mx-5 mt-2 rounded-3xl bg-white overflow-hidden" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' }}>
          <div className="relative h-56 bg-muted overflow-hidden">
            <img src={selectedActivity.image} alt={selectedActivity.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <span className={`absolute top-4 right-4 text-xs font-semibold rounded-full px-3 py-1.5 ${tagColors[selectedActivity.tag] ?? 'bg-secondary text-primary'}`}>
              {selectedActivity.tag}
            </span>
            <div className="absolute left-4 right-4 bottom-4">
              <p className="text-white/80 text-xs font-semibold mb-1">{selectedActivity.host}</p>
              <h1 className="text-2xl font-semibold tracking-tight text-white leading-tight">{selectedActivity.title}</h1>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{selectedActivity.fit}% match</span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">{joined ? 'Joined' : 'Open'}</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{selectedActivity.detail}</p>

            <div className="grid grid-cols-2 gap-2 mb-5">
              <div className="rounded-2xl bg-secondary p-3">
                <Clock size={15} className="text-primary mb-2" />
                <p className="text-sm font-semibold text-foreground">{selectedActivity.time}</p>
              </div>
              <div className="rounded-2xl bg-secondary p-3">
                {online ? <Globe size={15} className="text-primary mb-2" /> : <MapPin size={15} className="text-primary mb-2" />}
                <p className="text-sm font-semibold text-foreground">{selectedActivity.format}</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-[11px] font-semibold text-muted-foreground mb-2">Why recommended</p>
              <div className="flex flex-wrap gap-2">
                {selectedActivity.reasons.map(reason => (
                  <span key={reason} className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-primary">
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Users size={15} className="text-primary" />
                <p className="text-[11px] font-semibold text-muted-foreground">Who is joining</p>
              </div>
              <div className="space-y-2">
                {selectedActivity.attendees.length > 0 ? selectedActivity.attendees.map(attendee => (
                  <div key={attendee.initials} className="flex items-center gap-3 rounded-2xl bg-secondary p-3">
                    <div className={`w-9 h-9 rounded-full ${attendee.color} flex items-center justify-center text-xs font-semibold`}>
                      {attendee.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{attendee.name}</p>
                      <p className="text-xs text-muted-foreground">{attendee.note}</p>
                    </div>
                    <CheckCircle size={16} className="text-pillar-nutrition" />
                  </div>
                )) : (
                  <div className="rounded-2xl bg-secondary p-3">
                    <p className="text-sm font-semibold text-foreground">Be the first from your circle</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Joining will make this visible to your circle.</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setLiked(prev => prev.includes(selectedActivity.id) ? prev : [...prev, selectedActivity.id])
              }}
              className="w-full rounded-2xl bg-primary py-3.5 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
              style={{ boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.35)' }}
            >
              {joined ? 'Joined' : 'Join activity'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="font-semibold text-white text-sm">S</span>
        </div>
      </div>
      <div className="px-5 pt-2 pb-4">
        <p className="text-sm text-muted-foreground">Discover</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground leading-[1.05] mt-0.5">Activities for you</h1>
        <p className="text-sm text-muted-foreground mt-2">Swipe right to join · swipe left to skip</p>
      </div>

      {/* Card stack */}
      <div className="relative mx-5 mb-6" style={{ height: '470px' }}>
        {/* Background cards */}
        {cards.slice(1, 3).map((card, idx) => (
          <div
            key={card.id}
            className="absolute inset-0 bg-white rounded-3xl overflow-hidden"
            style={{
              transform: `scale(${1 - (idx + 1) * 0.04}) translateY(${(idx + 1) * 10}px)`,
              zIndex: 10 - idx,
              boxShadow: '0 2px 8px oklch(0 0 0 / 0.06)',
            }}
          />
        ))}

        {/* Top card */}
        {current ? (
          <div
            key={current.id}
            className="absolute inset-0 bg-white rounded-3xl overflow-hidden z-20 select-none"
            style={{
              boxShadow: '0 8px 32px oklch(0 0 0 / 0.12)',
              transform: topCardTransform,
              transition: topCardTransition,
              opacity: exiting ? 0 : 1,
              touchAction: 'pan-y',
              cursor: dragging ? 'grabbing' : 'grab',
            }}
            onTouchStart={e => handleStart(e.touches[0].clientX)}
            onTouchMove={e => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
            onMouseDown={e => handleStart(e.clientX)}
            onMouseMove={e => dragging && handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={() => dragging && handleEnd()}
          >
            {/* JOIN / SKIP stamps */}
            <div
              className="absolute top-8 left-6 z-30 px-4 py-2 rounded-xl border-4 pointer-events-none"
              style={{
                opacity: skipOpacity,
                borderColor: 'oklch(0.55 0.18 25)',
                color: 'oklch(0.55 0.18 25)',
                transform: 'rotate(-12deg)',
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: '0.1em',
              }}
            >
              SKIP
            </div>
            <div
              className="absolute top-8 right-6 z-30 px-4 py-2 rounded-xl border-4 pointer-events-none"
              style={{
                opacity: joinOpacity,
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                transform: 'rotate(12deg)',
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: '0.1em',
              }}
            >
              JOIN
            </div>
            {/* Image */}
            <div className="relative h-52 bg-muted overflow-hidden">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {/* Tag */}
              <span className={`absolute top-4 right-4 text-xs font-semibold rounded-full px-3 py-1.5 ${tagColors[current.tag] ?? 'bg-secondary text-primary'}`}>
                {current.tag}
              </span>
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-primary">
                {current.fit}% match
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-foreground tracking-tight mb-1">{current.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{current.desc}</p>

              <div className="mb-4 rounded-2xl bg-accent p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-primary" />
                  <p className="text-xs font-semibold text-primary">Recommended because</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.reasons.slice(0, 3).map(reason => (
                    <span key={reason} className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-foreground/70">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={13} />
                  <span>{current.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin size={13} />
                  <span>{current.format}</span>
                </div>
                {current.friends.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {current.friends.map(f => (
                        <div key={f} className="w-5 h-5 rounded-full bg-primary/20 border border-white flex items-center justify-center text-[8px] font-bold text-primary">
                          {f[0]}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-primary font-medium">{current.friendNames}</span>
                  </div>
                )}
              </div>

              {/* Location tile */}
              {isOnline ? (
                <div className="mt-3 rounded-2xl overflow-hidden" style={{ height: '80px' }}>
                  {/* gradient stops use raw oklch values — CSS var() not supported inside gradient() */}
                  <div
                    className="w-full h-full relative flex flex-col items-center justify-center gap-1"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.92 0.04 240) 0%, oklch(0.88 0.06 250) 100%)',
                    }}
                  >
                    <Globe size={18} className="relative text-pillar-sleep drop-shadow-sm" />
                    <span className="relative text-xs font-semibold text-foreground">Online Session</span>
                    <span className="relative text-[10px] text-muted-foreground">{current.format.split(' · ')[1] ?? ''}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-3 rounded-2xl overflow-hidden" style={{ height: '80px' }}>
                  {/* gradient stops use raw oklch values — CSS var() not supported inside gradient() */}
                  <div
                    className="w-full h-full relative flex flex-col items-center justify-center gap-1"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.92 0.03 155) 0%, oklch(0.88 0.04 148) 50%, oklch(0.85 0.05 140) 100%)',
                      backgroundImage: `
                        radial-gradient(circle at 20% 50%, oklch(0.90 0.04 155 / 0.6) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, oklch(0.95 0.02 100 / 0.4) 0%, transparent 40%)
                      `,
                    }}
                  >
                    {/* subtle grid lines to suggest a map */}
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'linear-gradient(oklch(0.5 0.1 155 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.5 0.1 155 / 0.3) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }} />
                    <MapPin size={18} className="relative text-pillar-movement drop-shadow-sm" />
                    <span className="relative text-xs font-semibold text-foreground">{locationName}</span>
                    <span className="relative text-[10px] text-muted-foreground">In-person</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedActivity(current)}
                className="mt-3 w-full rounded-2xl bg-foreground py-3 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
              >
                View details
              </button>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 rounded-3xl bg-white flex flex-col items-center justify-center z-20" style={{ boxShadow: '0 8px 32px oklch(0 0 0 / 0.12)' }}>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Heart size={24} className="text-primary" />
            </div>
            <p className="text-xl font-semibold text-foreground mb-1">All caught up!</p>
            <p className="text-sm text-muted-foreground text-center px-8">You&apos;ve reviewed all activities. Check back soon for more.</p>
            <button
              onClick={() => setCards(activities)}
              className="mt-6 bg-primary text-white rounded-2xl px-6 py-3 text-sm font-semibold"
            >
              Start over
            </button>
          </div>
        )}
      </div>

      {/* Swipe actions */}
      {current && (
        <div className="flex items-center justify-center gap-8 mb-6">
          <button
            onClick={() => commitSwipe('left')}
            className="w-14 h-14 rounded-full bg-white border-0 flex items-center justify-center active:scale-90 transition-transform"
            style={{ boxShadow: '0 2px 8px oklch(0 0 0 / 0.10)' }}
            aria-label="Skip"
          >
            <X size={24} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => commitSwipe('right')}
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-md active:scale-90 transition-transform"
            aria-label="Join"
          >
            <Heart size={26} className="text-white" fill="white" />
          </button>
        </div>
      )}

      {/* Progress */}
      {cards.length > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          {cards.length} of {activities.length} activities remaining
        </p>
      )}

      {/* Joined activities */}
      {liked.length > 0 && (
        <div className="px-5 mt-6">
          <h2 className="text-[11px] font-semibold text-muted-foreground mb-3">
            Joined · {liked.length}
          </h2>
          <div className="space-y-2">
            {activities
              .filter(a => liked.includes(a.id))
              .map(a => (
                <button
                  key={a.id}
                  onClick={() => setSelectedActivity(a)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white border-0 text-left active:scale-[0.98] transition-transform"
                  style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.07)' }}
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Heart size={14} className="text-primary" fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                  <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 shrink-0 ${tagColors[a.tag] ?? ''}`}>
                    {a.tag}
                  </span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
