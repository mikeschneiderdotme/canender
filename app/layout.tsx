import type { Metadata } from 'next'
import '$/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Canender',
  description: 'An application for calculating insulin dosage',
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
