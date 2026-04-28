'use client'

import { useState } from 'react'
import { Camera } from 'lucide-react'
import type { Screen, VitalityPillar } from '@/lib/vitality-types'

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
  const [insightPillar, setInsightPillar] = useState<VitalityPillar>('sleep')
  const [animKey, setAnimKey] = useState(0)
  const [fabSnap, setFabSnap] = useState(false)

  const navigate = (s: Screen) => {
    setFabSnap(false)
    setScreen(s)
    setAnimKey(k => k + 1)
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }))
  }

  // FAB skips setup — opens snap camera directly (step 3)
  const handleFab = () => {
    setFabSnap(true)
    setScreen('circle')
    setAnimKey(k => k + 1)
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0 }))
  }

  const openInsight = (pillar: VitalityPillar) => {
    setInsightPillar(pillar)
    navigate('insight')
  }

  const showNav = NAV_SCREENS.includes(screen)

  return (
    <div className="relative min-h-dvh bg-background overflow-hidden">
      <div key={animKey} className="min-h-dvh overflow-y-auto screen-enter">
        {screen === 'onboarding'    && <OnboardingScreen   onNavigate={navigate} />}
        {screen === 'home'          && <HomeScreen          onNavigate={navigate} onOpenInsight={openInsight} />}
        {screen === 'insight'       && <InsightScreen       onNavigate={navigate} pillar={insightPillar} />}
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
          {/* FAB — Snap your moment pill CTA */}
          <button
            onClick={handleFab}
            aria-label="Snap your moment"
            className="fab-pulse fixed bg-primary text-white flex items-center gap-2 active:scale-95 transition-transform z-40"
            style={{
              bottom: 90,
              right: 16,
              borderRadius: 999,
              paddingLeft: 16,
              paddingRight: 20,
              paddingTop: 12,
              paddingBottom: 12,
              boxShadow: '0 4px 20px oklch(0.52 0.13 68 / 0.5)',
            }}
          >
            <Camera size={18} />
            <span className="text-sm font-semibold tracking-tight">Snap</span>
          </button>
        </>
      )}
    </div>
  )
}
