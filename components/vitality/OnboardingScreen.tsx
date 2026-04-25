'use client'

import { useState } from 'react'
import { ChevronRight, Heart, Activity, Watch, Smartphone, Check, Users } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

const goals = [
  'Better Sleep',
  'Lower Stress',
  'More Activity',
  'Healthy Ageing',
  'Mental Clarity',
  'Heart Health',
]

const sources = [
  { name: 'Apple Health', icon: Smartphone, color: 'bg-secondary text-primary' },
  { name: 'WHOOP',        icon: Activity,   color: 'bg-secondary text-primary' },
  { name: 'Garmin',       icon: Watch,      color: 'bg-secondary text-primary' },
  { name: 'Fitbit',       icon: Heart,      color: 'bg-secondary text-primary' },
]

const circleOptions = [
  { name: 'Close Friends',    desc: 'Your inner circle — share openly', members: 4 },
  { name: 'Office Wellness',  desc: 'Colleagues on a health journey together', members: 11 },
  { name: 'Weekend Reset',    desc: 'Sunday routines and recovery activities', members: 7 },
]

interface Props { onNavigate: (s: Screen) => void }

export default function OnboardingScreen({ onNavigate }: Props) {
  const [step, setStep] = useState(0)
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [connectedSources, setConnectedSources] = useState<string[]>([])

  const toggleGoal = (g: string) =>
    setSelectedGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])

  const toggleSource = (s: string) =>
    setConnectedSources(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      {step === 0 && (
        /* Welcome */
        <div className="flex flex-col flex-1 px-6 pt-20 pb-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-14">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <Heart size={18} className="text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl text-foreground tracking-[0.04em]" style={{ fontFamily: 'var(--font-italiana)' }}>Vitality Circle</span>
          </div>

          <div className="flex-1">
            <h1 className="text-[2.8rem] leading-[1.12] text-foreground text-balance mb-5 tracking-[0.01em]" style={{ fontFamily: 'var(--font-italiana)' }}>
              Live well.<br /><span className="text-primary">Together.</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-10" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              Your health data becomes insight. Insight becomes action. And action becomes a lifestyle you share with people who matter.
            </p>

            <div className="space-y-3.5">
              {[
                { icon: Activity, label: 'Personalised wellness insights from your data' },
                { icon: Users2,   label: 'Small circles for shared motivation' },
                { icon: Compass2, label: 'Curated activities matched to your goals' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div className="mt-0.5 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <p className="text-foreground text-sm leading-relaxed" style={{ fontFamily: 'var(--font-dm-sans)' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-medium text-[15px] flex items-center justify-center gap-2 mt-10 transition-all duration-200 active:scale-[0.97] active:opacity-90"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Get Started <ChevronRight size={16} strokeWidth={2.5} />
          </button>
          <p className="text-center text-xs text-muted-foreground mt-4" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            No credit card required &middot; Free pilot access
          </p>
        </div>
      )}

      {step === 1 && (
        /* Connect sources */
        <div className="flex flex-col flex-1 px-6 pt-14 pb-10">
          <StepIndicator current={1} total={3} />
          <h2 className="text-[1.85rem] text-foreground mt-6 mb-2 tracking-[0.01em] leading-tight" style={{ fontFamily: 'var(--font-italiana)' }}>Connect your health data</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Link your wearable or health app to unlock personalised insights. You can skip this and connect later.
          </p>

          <div className="space-y-3 mb-auto">
            {sources.map(({ name, icon: Icon, color }) => {
              const connected = connectedSources.includes(name)
              return (
                <button
                  key={name}
                  onClick={() => toggleSource(name)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 active:scale-[0.98] ${
                    connected
                      ? 'border-primary/60 bg-primary/5'
                      : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                    <Icon size={18} />
                  </div>
                  <span className="font-medium text-foreground flex-1 text-left text-[15px]" style={{ fontFamily: 'var(--font-dm-sans)' }}>{name}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    connected ? 'bg-primary border-primary' : 'border-border'
                  }`}>
                    {connected && <Check size={11} className="text-primary-foreground" strokeWidth={3} />}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 space-y-2">
            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-medium text-[15px] transition-all duration-200 active:scale-[0.97]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              {connectedSources.length > 0 ? 'Continue' : 'Connect sources'}
            </button>
            <button onClick={() => setStep(2)} className="w-full text-muted-foreground text-sm py-2.5" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              Skip for now
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        /* Goals */
        <div className="flex flex-col flex-1 px-6 pt-14 pb-10">
          <StepIndicator current={2} total={3} />
          <h2 className="text-[1.85rem] text-foreground mt-6 mb-2 tracking-[0.01em] leading-tight" style={{ fontFamily: 'var(--font-italiana)' }}>What are your goals?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-7" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Select what matters most to you. We&apos;ll tailor your insights and activity recommendations.
          </p>

          {/* Compact premium chips */}
          <div className="flex flex-wrap gap-2 mb-auto">
            {goals.map(goal => {
              const selected = selectedGoals.includes(goal)
              return (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 active:scale-[0.95] ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                  }`}
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {goal}
                </button>
              )
            })}
          </div>

          <div className="mt-8 space-y-2">
            <button
              onClick={() => setStep(3)}
              disabled={selectedGoals.length === 0}
              className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-medium text-[15px] disabled:opacity-35 transition-all duration-200 active:scale-[0.97]"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            >
              Continue
            </button>
            <button onClick={() => setStep(3)} className="w-full text-muted-foreground text-sm py-2.5" style={{ fontFamily: 'var(--font-dm-sans)' }}>
              Skip for now
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        /* Join a Circle */
        <div className="flex flex-col flex-1 px-6 pt-14 pb-10">
          <StepIndicator current={3} total={3} />
          <h2 className="text-[1.85rem] text-foreground mt-6 mb-2 tracking-[0.01em] leading-tight" style={{ fontFamily: 'var(--font-italiana)' }}>Join a Circle</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8" style={{ fontFamily: 'var(--font-dm-sans)' }}>
            Circles are small groups of people you trust. Share progress, find activities, and keep each other on track.
          </p>

          <div className="space-y-3 mb-auto">
            {circleOptions.map(c => (
              <div key={c.name} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Users size={17} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm" style={{ fontFamily: 'var(--font-dm-sans)' }}>{c.name}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: 'var(--font-dm-sans)' }}>{c.desc} &middot; {c.members} members</p>
                </div>
                {/* Already-joined state — non-interactive */}
                <div className="flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1">
                  <Check size={11} className="text-primary" strokeWidth={2.5} />
                  <span className="text-xs font-medium text-primary" style={{ fontFamily: 'var(--font-dm-sans)' }}>Joined</span>
                </div>
              </div>
            ))}

            <button className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-primary/30 transition-colors active:scale-[0.98]">
              <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center">
                <span className="text-xl leading-none text-muted-foreground">+</span>
              </div>
              <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-dm-sans)' }}>Create your own Circle</span>
            </button>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="w-full bg-primary text-primary-foreground rounded-2xl py-4 font-medium text-[15px] mt-8 transition-all duration-200 active:scale-[0.97]"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Enter Vitality Circle
          </button>
        </div>
      )}
    </div>
  )
}

/* Step indicator */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] rounded-full transition-all duration-500 ${
            i < current
              ? 'bg-primary flex-1'
              : i === current - 1
              ? 'bg-primary flex-[2]'
              : 'bg-border flex-1'
          }`}
        />
      ))}
    </div>
  )
}

/* Inline icon aliases */
function Users2({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function Compass2({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}
