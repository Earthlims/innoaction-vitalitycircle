'use client'

import { useState, useEffect } from 'react'
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

  const navigate = (s: Screen) => {
    setScreen(s)
    setAnimKey(k => k + 1)
  }

  const showNav = NAV_SCREENS.includes(screen)

  return (
    <div className="relative min-h-dvh bg-background overflow-hidden">
      <div key={animKey} className="min-h-dvh overflow-y-auto screen-enter">
        {screen === 'onboarding'    && <OnboardingScreen   onNavigate={navigate} />}
        {screen === 'home'          && <HomeScreen          onNavigate={navigate} />}
        {screen === 'insight'       && <InsightScreen       onNavigate={navigate} />}
        {screen === 'circle'        && <CircleScreen        onNavigate={navigate} />}
        {screen === 'circle-detail' && <CircleDetailScreen  onNavigate={navigate} />}
        {screen === 'activities'    && <ActivityScreen      onNavigate={navigate} />}
        {screen === 'guidance'      && <GuidanceScreen      onNavigate={navigate} />}
        {screen === 'profile'       && <ProfileScreen       onNavigate={navigate} />}
      </div>

      {showNav && (
        <BottomNav
          active={screen}
          onNavigate={navigate}
        />
      )}
    </div>
  )
}
