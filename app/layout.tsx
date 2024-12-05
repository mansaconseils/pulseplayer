import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/layout/navbar'
import { Toaster } from '@/components/ui/sonner'
import { MobileNav } from '@/components/layout/mobile-nav'
import { ResponsiveContainer } from '@/components/layout/responsive-container'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlayerPulse - Football Player Analytics',
  description: 'Track and analyze football player performance across sports, social media, and press coverage.',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="PlayerPulse" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PlayerPulse" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ResponsiveContainer>
            <div className="min-h-screen bg-background">
              <div className="hidden md:block">
                <Navbar />
              </div>
              <div className="md:hidden">
                <MobileNav />
              </div>
              <main className="container mx-auto px-4 py-4 md:py-8">
                {children}
              </main>
            </div>
            <Toaster />
          </ResponsiveContainer>
        </ThemeProvider>
      </body>
    </html>
  )
}