import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Inter, DM_Sans, Cormorant_Garamond, Italiana } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const italiana = Italiana({
  subsets: ['latin'],
  variable: '--font-italiana',
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vitality Circle — Longevity Wellness Platform',
  description:
    'A premium wellness and longevity community platform. Health data becomes insight. Insight becomes action.',
  generator: 'v0.app',
  icons: {
    icon: '/brand/vitality-circle-mark.png',
    apple: '/brand/vitality-circle-mark.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#b98527',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${cormorant.variable} ${italiana.variable} bg-background`}>
      <body>
        <div id="app-shell">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
