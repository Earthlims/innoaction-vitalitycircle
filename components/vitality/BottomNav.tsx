'use client'

import { Home, Users, Compass, Bell, User } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

const tabs: { id: Screen; label: string; icon: React.ElementType }[] = [
  { id: 'home',       label: 'Home',     icon: Home },
  { id: 'circle',     label: 'Circle',   icon: Users },
  { id: 'activities', label: 'Discover', icon: Compass },
  { id: 'guidance',   label: 'Guidance', icon: Bell },
  { id: 'profile',    label: 'Profile',  icon: User },
]

interface BottomNavProps {
  active: Screen
  onNavigate: (screen: Screen) => void
}

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 pb-[env(safe-area-inset-bottom)] px-3"
    >
      <div
        className="mx-auto mb-2 flex items-center justify-around h-[64px] px-2 rounded-full bg-white border border-border"
        style={{ boxShadow: '0 6px 24px oklch(0 0 0 / 0.08), 0 1px 3px oklch(0 0 0 / 0.05)' }}
      >
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-label={label}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-accent" aria-hidden="true" />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.7}
                className="relative"
              />
              <span
                className={`relative text-[10px] leading-none tracking-tight ${
                  isActive ? 'font-semibold' : 'font-medium'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
