import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from '@/components/site-footer'
import { Toaster } from '@/components/ui/toaster'
const inter = Inter({ subsets: ['latin'] })
import Head from 'next/head'
export const metadata: Metadata = {
  title: 'Leave System',
  description: 'Platform for youtubers to monetize their content',
  icons:{
    icon:"/logo.ico"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
          </ThemeProvider>
          <Toaster/>
        </body>
    </html>
  )
}
