import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VCell Smart Assistant',
  description: 'Explore VCell DB with NLP',
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
