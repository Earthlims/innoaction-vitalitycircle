'use client'

import { useState, useRef } from 'react'
import { X, Heart, MapPin, Clock, Globe } from 'lucide-react'
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
  },
]

const tagColors: Record<string, string> = {
  'Movement':     'bg-secondary text-primary',
  'Sleep':        'bg-wellness-sky/70 text-wellness-teal',
  'Recovery':     'bg-wellness-blush/60 text-wellness-slate',
  'Nutrition':    'bg-wellness-sand text-wellness-teal',
  'Brain Health': 'bg-wellness-champagne text-wellness-gold',
}

export default function ActivityScreen({ onNavigate: _onNavigate }: Props) {
  const [cards, setCards] = useState(activities)
  const [swipeAnim, setSwipeAnim] = useState<'left' | 'right' | null>(null)
  const [liked, setLiked] = useState<number[]>([])
  const startX = useRef(0)
  const isDragging = useRef(false)

  const current = cards[0]

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!current) return
    if (direction === 'right') setLiked(prev => [...prev, current.id])
    setSwipeAnim(direction)
    setTimeout(() => {
      setCards(prev => prev.slice(1))
      setSwipeAnim(null)
    }, 350)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    isDragging.current = true
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    const diff = e.changedTouches[0].clientX - startX.current
    isDragging.current = false
    if (Math.abs(diff) > 60) handleSwipe(diff > 0 ? 'right' : 'left')
  }

  const isOnline = current ? current.format.startsWith('Online') : false
  const locationName = current ? (current.format.split(' · ')[1] ?? current.format) : ''

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Discover</p>
        <h1 className="text-2xl font-bold text-foreground">Activities for you</h1>
        <p className="text-sm text-muted-foreground mt-1">Swipe right to join · swipe left to skip</p>
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
            className={`absolute inset-0 bg-white rounded-3xl overflow-hidden z-20 ${swipeAnim ? (swipeAnim === 'left' ? 'swipe-left' : 'swipe-right') : ''}`}
            style={{ boxShadow: '0 8px 32px oklch(0 0 0 / 0.12)' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
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
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-foreground mb-1">{current.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{current.desc}</p>

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
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 rounded-3xl bg-white flex flex-col items-center justify-center z-20" style={{ boxShadow: '0 8px 32px oklch(0 0 0 / 0.12)' }}>
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Heart size={24} className="text-primary" />
            </div>
            <p className="text-xl font-bold text-foreground mb-1">All caught up!</p>
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
            onClick={() => handleSwipe('left')}
            className="w-14 h-14 rounded-full bg-white border-0 flex items-center justify-center active:scale-90 transition-transform"
            style={{ boxShadow: '0 2px 8px oklch(0 0 0 / 0.10)' }}
            aria-label="Skip"
          >
            <X size={24} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => handleSwipe('right')}
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
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Joined · {liked.length}
          </h2>
          <div className="space-y-2">
            {activities
              .filter(a => liked.includes(a.id))
              .map(a => (
                <div key={a.id} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border-0" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.07)' }}>
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
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
