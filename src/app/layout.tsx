import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'CannaZen — La référence du cannabis légal',
  description: 'Fleurs, résines, vapes & comestibles d\'exception. Magic Sauce, HEC-10, CBD, 10-OH+. Qualité premium, livraison 48h.',
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
