'use client'

import { useState } from 'react'
import { ChevronRight, Heart, Activity, Watch, Smartphone, Check, Users, X } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

const goals = [
  { label: 'Better Sleep',    emoji: '🌙', tile: 'bg-tile-sleep',     text: 'text-pillar-sleep' },
  { label: 'Lower Stress',    emoji: '🧘', tile: 'bg-tile-mental',    text: 'text-pillar-mental' },
  { label: 'More Activity',   emoji: '⚡', tile: 'bg-tile-movement',  text: 'text-pillar-movement' },
  { label: 'Healthy Ageing',  emoji: '✨', tile: 'bg-tile-social',    text: 'text-pillar-social' },
  { label: 'Mental Clarity',  emoji: '🧠', tile: 'bg-tile-mental',    text: 'text-pillar-mental' },
  { label: 'Heart Health',    emoji: '❤️', tile: 'bg-tile-recovery',  text: 'text-pillar-recovery' },
]

const sources = [
  { name: 'Apple Health', icon: Smartphone, tile: 'bg-tile-movement', text: 'text-pillar-movement' },
  { name: 'WHOOP',        icon: Activity,   tile: 'bg-tile-recovery', text: 'text-pillar-recovery' },
  { name: 'Garmin',       icon: Watch,      tile: 'bg-tile-sleep',    text: 'text-pillar-sleep' },
  { name: 'Fitbit',       icon: Heart,      tile: 'bg-tile-nutrition', text: 'text-pillar-nutrition' },
]

const circleOptions = [
  { name: 'Close Friends',    desc: 'Your inner circle — share openly', members: 4 },
  { name: 'Office Wellness',  desc: 'Colleagues on a health journey together', members: 11 },
  { name: 'Weekend Reset',    desc: 'Sunday routines and recovery activities', members: 7 },
]

const mockContacts = ['Anna K', 'James T', 'Mia L', 'Tom R', 'Priya M', 'Alex C']

interface Props { onNavigate: (s: Screen) => void }

interface CreatedCircle {
  name: string
  desc: string
  members: number
}

export default function OnboardingScreen({ onNavigate }: Props) {
  const [step, setStep] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [connectedSources, setConnectedSources] = useState<string[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newMembers, setNewMembers] = useState<string[]>([])
  const [customCircles, setCustomCircles] = useState<CreatedCircle[]>([])
  const [createSuccess, setCreateSuccess] = useState(false)

  const toggleGoal = (g: string) =>
    setSelectedGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])

  const toggleSource = (s: string) =>
    setConnectedSources(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const toggleMember = (name: string) =>
    setNewMembers(prev => prev.includes(name) ? prev.filter(member => member !== name) : [...prev, name])

  const resetCreateCircle = () => {
    setNewName('')
    setNewMembers([])
    setCreateSuccess(false)
  }

  const handleCreateCircle = () => {
    const trimmedName = newName.trim()
    if (!trimmedName || newMembers.length === 0 || createSuccess) return

    setCustomCircles(prev => [
      ...prev,
      {
        name: trimmedName,
        desc: 'Created by you',
        members: newMembers.length + 1,
      },
    ])
    setCreateSuccess(true)
    setTimeout(() => {
      setCreateOpen(false)
      resetCreateCircle()
    }, 1500)
  }

  return (
    <div className="min-h-dvh flex flex-col">

      {/* ── STEP 0: Welcome ───────────────────────────────────────────────── */}
      {step === 0 && (
        <div className="flex flex-col flex-1 px-6 pt-16 pb-10 relative overflow-hidden">

          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, oklch(0.90 0.10 65 / 0.55) 0%, transparent 70%)' }} />
          <div className="absolute top-40 -left-24 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, oklch(0.92 0.08 295 / 0.45) 0%, transparent 70%)' }} />
          <div className="absolute bottom-40 -right-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, oklch(0.93 0.08 155 / 0.40) 0%, transparent 70%)' }} />

          {/* Logo */}
          <div className="relative z-10 mb-14 flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-2xl bg-accent shadow-sm ring-1 ring-white/80">
              <img
                src="/brand/vitality-circle-mark.png"
                alt="Vitality Circle"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">Longevity social wellness</p>
              <p className="text-[17px] font-semibold tracking-tight text-foreground">Vitality Circle</p>
            </div>
          </div>

          {/* Hero text */}
          <div className="flex-1 relative z-10">
            <h1 className="text-5xl font-semibold tracking-tight text-foreground leading-[1.05] mb-5">
              Live well.<br /><span className="text-primary">Together.</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-10">
              Your health data becomes insight. Insight becomes action. And action becomes a lifestyle you share with people who matter.
            </p>

            {/* Feature rows */}
            <div className="space-y-3.5">
              {[
                { icon: Activity, label: 'Personalised wellness insights from your data', tile: 'bg-tile-recovery', text: 'text-pillar-recovery' },
                { icon: Users2,   label: 'Small circles for shared motivation',            tile: 'bg-tile-social',  text: 'text-pillar-social'  },
                { icon: Compass2, label: 'Curated activities matched to your goals',        tile: 'bg-tile-mental', text: 'text-pillar-mental'  },
              ].map(({ icon: Icon, label, tile, text }) => (
                <div key={label} className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl ${tile} flex items-center justify-center shrink-0`}>
                    <Icon size={17} className={text} />
                  </div>
                  <p className="text-foreground text-[14px] leading-snug font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => setStep(1)}
              className="w-full bg-primary text-white rounded-2xl py-4 font-semibold text-[15px] flex items-center justify-center gap-2 mt-10 active:scale-[0.97] transition-transform"
              style={{ boxShadow: '0 4px 20px oklch(0.52 0.13 68 / 0.4)' }}
            >
              Get Started <ChevronRight size={16} strokeWidth={2.5} />
            </button>
            <p className="text-center text-xs text-muted-foreground mt-4">
              No credit card required · Free pilot access
            </p>
          </div>
        </div>
      )}

      {/* ── STEP 1: Connect sources ───────────────────────────────────────── */}
      {step === 1 && (
        <div className="flex flex-col flex-1 px-6 pt-14 pb-10">
          <StepIndicator current={1} total={3} />
          <h2 className="text-3xl font-semibold tracking-tight text-foreground mt-6 mb-2 leading-tight">Connect your health data</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Link your wearable or health app to unlock personalised insights. You can skip this and connect later.
          </p>

          <div className="space-y-3 mb-auto">
            {sources.map(({ name, icon: Icon, tile, text }) => {
              const connected = connectedSources.includes(name)
              return (
                <button
                  key={name}
                  onClick={() => toggleSource(name)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 active:scale-[0.98] ${
                    connected ? 'border-primary/50 bg-primary/5' : 'border-border bg-white'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl ${tile} flex items-center justify-center`}>
                    <Icon size={18} className={text} />
                  </div>
                  <span className="font-semibold text-foreground flex-1 text-left text-[15px]">{name}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    connected ? 'bg-primary border-primary' : 'border-border'
                  }`}>
                    {connected && <Check size={11} className="text-white" strokeWidth={3} />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 space-y-2">
            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary text-white rounded-2xl py-4 font-semibold text-[15px] active:scale-[0.97] transition-transform"
              style={{ boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.35)' }}
            >
              {connectedSources.length > 0 ? 'Continue' : 'Connect sources'}
            </button>
            <button onClick={() => setStep(2)} className="w-full text-muted-foreground text-sm py-2.5">
              Skip for now
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Goals ─────────────────────────────────────────────────── */}
      {step === 2 && (
        <div className="flex flex-col flex-1 px-6 pt-14 pb-10 relative overflow-hidden">

          {/* Decorative orbs — lighter for inner page */}
          <div className="absolute -top-10 -right-16 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, oklch(0.93 0.07 65 / 0.50) 0%, transparent 70%)' }} />
          <div className="absolute bottom-32 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, oklch(0.94 0.07 295 / 0.45) 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <StepIndicator current={2} total={3} />
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mt-6 mb-2 leading-tight">What are your goals?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-7">
              Select what matters most to you. We&apos;ll tailor your insights and activity recommendations.
            </p>

            {/* Goal chips with pillar colors */}
            <div className="flex flex-wrap gap-2.5 mb-auto">
              {goals.map(({ label, emoji, tile, text }) => {
                const selected = selectedGoals.includes(label)
                return (
                  <button
                    key={label}
                    onClick={() => toggleGoal(label)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[13px] font-semibold border transition-all duration-200 active:scale-[0.95] ${
                      selected
                        ? `${tile} ${text} border-transparent shadow-sm`
                        : 'bg-white text-muted-foreground border-border'
                    }`}
                  >
                    <span className="text-sm leading-none">{emoji}</span>
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Selected count hint */}
            {selectedGoals.length > 0 && (
              <p className="text-xs text-primary font-semibold mt-5">
                {selectedGoals.length} goal{selectedGoals.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          <div className="mt-8 space-y-2 relative z-10">
            <button
              onClick={() => setStep(3)}
              disabled={selectedGoals.length === 0}
              className="w-full bg-primary text-white rounded-2xl py-4 font-semibold text-[15px] disabled:opacity-35 active:scale-[0.97] transition-transform"
              style={selectedGoals.length > 0 ? { boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.35)' } : {}}
            >
              Continue
            </button>
            <button onClick={() => setStep(3)} className="w-full text-muted-foreground text-sm py-2.5">
              Skip for now
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Join a Circle ─────────────────────────────────────────── */}
      {step === 3 && (
        <div className="flex flex-col flex-1 px-6 pt-14 pb-10">
          <StepIndicator current={3} total={3} />
          <h2 className="text-3xl font-semibold tracking-tight text-foreground mt-6 mb-2 leading-tight">Join a Circle</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Circles are small groups of people you trust. Share progress, find activities, and keep each other on track.
          </p>

          <div className="space-y-3 mb-auto">
            {[...circleOptions, ...customCircles].map(c => (
              <div key={c.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border" style={{ boxShadow: '0 1px 3px oklch(0 0 0 / 0.05)' }}>
                <div className="w-10 h-10 rounded-2xl bg-tile-social flex items-center justify-center">
                  <Users size={17} className="text-pillar-social" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.desc} · {c.members} members</p>
                </div>
                <div className="flex items-center gap-1.5 bg-tile-movement rounded-full px-3 py-1">
                  <Check size={11} className="text-pillar-movement" strokeWidth={2.5} />
                  <span className="text-xs font-semibold text-pillar-movement">Joined</span>
                </div>
              </div>
            ))}

            <button
              onClick={() => setCreateOpen(true)}
              className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-border text-muted-foreground active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                <span className="text-xl leading-none text-muted-foreground">+</span>
              </div>
              <span className="text-sm font-semibold">Create your own Circle</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-primary text-white rounded-2xl py-4 font-semibold text-[15px] mt-8 active:scale-[0.97] transition-transform"
            style={{ boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.35)' }}
          >
            Enter Vitality Circle
          </button>
        </div>
      )}

      {createOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => !createSuccess && setCreateOpen(false)} />
          <div className="absolute inset-0 flex flex-col justify-end pointer-events-none" style={{ maxWidth: '430px', margin: '0 auto' }}>
            <div
              className="relative rounded-t-3xl p-6 pb-10 pointer-events-auto"
              style={{
                background: 'radial-gradient(ellipse at top left, oklch(0.97 0.04 65 / 0.7) 0%, transparent 55%), radial-gradient(ellipse at top right, oklch(0.96 0.05 295 / 0.6) 0%, transparent 55%), white',
              }}
            >
              <button
                onClick={() => {
                  setCreateOpen(false)
                  resetCreateCircle()
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                aria-label="Close create circle"
              >
                <X size={16} className="text-muted-foreground" />
              </button>

              <div className="mb-5">
                <div className="w-11 h-11 rounded-2xl bg-tile-social flex items-center justify-center mb-3">
                  <Users size={19} className="text-pillar-social" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">Create your Circle</h3>
                <p className="text-sm text-muted-foreground mt-1">Invite a few people who make healthy habits easier to keep.</p>
              </div>

              <label className="block text-[11px] font-semibold text-muted-foreground mb-2">Name your Circle</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Running Buddies"
                className="w-full px-4 py-3 rounded-2xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground mb-5 outline-none"
              />

              <div className="mb-6">
                <p className="text-[11px] font-semibold text-muted-foreground mb-2">Add members</p>
                <div className="flex flex-wrap gap-2">
                  {mockContacts.map(contact => {
                    const selected = newMembers.includes(contact)
                    return (
                      <button
                        key={contact}
                        onClick={() => toggleMember(contact)}
                        className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-all active:scale-[0.96] ${
                          selected
                            ? 'bg-primary text-white'
                            : 'bg-white text-muted-foreground'
                        }`}
                        style={!selected ? { boxShadow: '0 1px 3px oklch(0 0 0 / 0.06)' } : {}}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${selected ? 'bg-white/20 text-white' : 'bg-tile-social text-pillar-social'}`}>
                          {contact.split(' ').map(part => part[0]).join('')}
                        </span>
                        {contact}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={handleCreateCircle}
                disabled={!newName.trim() || newMembers.length === 0}
                className="w-full py-3.5 rounded-2xl bg-primary text-white font-semibold text-sm disabled:opacity-35 active:scale-[0.97] transition-transform"
                style={newName.trim() && newMembers.length > 0 ? { boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.4)' } : {}}
              >
                Create Circle
              </button>

              {createSuccess && (
                <div
                  className="success-fade absolute inset-0 rounded-t-3xl flex flex-col items-center justify-center gap-4 z-10"
                  style={{
                    background: 'radial-gradient(ellipse at top, oklch(0.94 0.08 65 / 0.8) 0%, white 60%)',
                  }}
                >
                  <div
                    className="check-scale w-20 h-20 rounded-full bg-primary flex items-center justify-center"
                    style={{ boxShadow: '0 8px 32px oklch(0.52 0.13 68 / 0.45)' }}
                  >
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                      <path d="M8 18l7 7 13-13" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-semibold text-foreground tracking-tight">Circle created</p>
                    <p className="text-sm text-muted-foreground mt-1">Your new group is ready</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] rounded-full transition-all duration-500 ${
            i < current ? 'bg-primary flex-1' : i === current - 1 ? 'bg-primary flex-[2]' : 'bg-border flex-1'
          }`}
        />
      ))}
    </div>
  )
}

function Users2({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function Compass2({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}
