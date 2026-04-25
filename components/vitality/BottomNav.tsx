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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 pb-[env(safe-area-inset-bottom)]"
      style={{
        background: 'oklch(0.99 0.008 75 / 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid oklch(0.91 0.014 78 / 0.6)',
      }}
    >
      <div className="flex items-center justify-around h-[60px] px-1">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-label={label}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-250 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {/* Active pill indicator */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'oklch(0.52 0.09 72 / 0.08)' }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.0 : 1.6}
                className={`relative transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}
              />
              <span
                className={`relative text-[9.5px] font-medium leading-none tracking-wide transition-all duration-200 ${
                  isActive ? 'text-primary opacity-100' : 'text-muted-foreground opacity-70'
                }`}
                style={{ fontFamily: 'var(--font-dm-sans)' }}
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
