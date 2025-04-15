import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gloss - Color Palette Designer',
  description: 'A tool for designing color palettes with precision and accessibility',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
