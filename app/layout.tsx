import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: `Conway's Game of Life`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='h-screen bg-slate-50'>{children}</body>
    </html>
  )
}
