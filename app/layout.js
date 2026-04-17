import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import ScrollReveal from '@/components/scroll-reveal'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-heading',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        {/* Preload critical above-the-fold assets */}
        <link rel="preload" href="/navbarlogoblue.svg" as="image" type="image/svg+xml" />
        {/* Geo meta tags for local SEO — Moga, Punjab */}
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Moga, Punjab, India" />
        <meta name="geo.position" content="30.8216;75.1580" />
        <meta name="ICBM" content="30.8216, 75.1580" />
      </head>
      <body className={sourceSans.className} suppressHydrationWarning>
        {/* Skip to main content — accessibility */}
        <a href="#main-content" className="sr-only" style={{
          position: 'absolute', left: '-9999px', top: 'auto',
          width: '1px', height: '1px', overflow: 'hidden',
        }}>
          Skip to main content
        </a>
        {children}
        <ScrollReveal />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
