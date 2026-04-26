'use client'

import { useState } from 'react'
import { Camera } from 'lucide-react'
import type { Screen } from '@/lib/vitality-types'

import BottomNav from '@/components/vitality/BottomNav'
import OnboardingScreen from '@/components/vitality/OnboardingScreen'
import HomeScreen from '@/components/vitality/HomeScreen'
import InsightScreen from '@/components/vitality/InsightScreen'
import CircleScreen from '@/components/vitality/CircleScreen'
import CircleDetailScreen from '@/components/vitality/CircleDetailScreen'
import ActivityScreen from '@/components/vitality/ActivityScreen'
import GuidanceScreen from '@/components/vitality/GuidanceScreen'
import ProfileScreen from '@/components/vitality/ProfileScreen'

const NAV_SCREENS: Screen[] = ['home', 'circle', 'activities', 'guidance', 'profile']

export default function VitalityApp() {
  const [screen, setScreen] = useState<Screen>('onboarding')
  const [animKey, setAnimKey] = useState(0)
  const [fabSnap, setFabSnap] = useState(false)

  const navigate = (s: Screen) => {
    setFabSnap(false)
    setScreen(s)
    setAnimKey(k => k + 1)
  }

  const handleFab = () => {
    setFabSnap(true)
    setScreen('circle')
    setAnimKey(k => k + 1)
  }

  const showNav = NAV_SCREENS.includes(screen)

  return (
    <div className="relative min-h-dvh bg-background overflow-hidden">
      <div key={animKey} className="min-h-dvh overflow-y-auto screen-enter">
        {screen === 'onboarding'    && <OnboardingScreen   onNavigate={navigate} />}
        {screen === 'home'          && <HomeScreen          onNavigate={navigate} />}
        {screen === 'insight'       && <InsightScreen       onNavigate={navigate} />}
        {screen === 'circle'        && <CircleScreen        onNavigate={navigate} openSnap={fabSnap} />}
        {screen === 'circle-detail' && <CircleDetailScreen  onNavigate={navigate} />}
        {screen === 'activities'    && <ActivityScreen      onNavigate={navigate} />}
        {screen === 'guidance'      && <GuidanceScreen      onNavigate={navigate} />}
        {screen === 'profile'       && <ProfileScreen       onNavigate={navigate} />}
      </div>

      {showNav && (
        <>
          <BottomNav
            active={screen}
            onNavigate={navigate}
          />
          {/* Floating Action Button — opens Vital Daily snap flow */}
          <button
            onClick={handleFab}
            aria-label="Snap your moment"
            className="fab-pulse fixed bg-primary text-white rounded-full flex items-center justify-center active:scale-90 transition-transform z-40"
            style={{
              width: 52,
              height: 52,
              bottom: 84,
              right: 20,
              boxShadow: '0 4px 16px oklch(0.52 0.13 68 / 0.45)',
            }}
          >
            <Camera size={22} />
          </button>
        </>
      )}
    </div>
  )
}
