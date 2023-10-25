import '@/app/globals.css'
import { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import Header from '@/components/header'
import { TailwindIndicator } from '@/components/tailwind-indicator'

import { Providers } from '../components/providers'

export const metadata: Metadata = {
    title: {
        default: 'Logic Resolver AI',
        template: `%s - Logic Resolver AI Chatbot`,
    },
    description: 'An AI-powered chatbot built with Next.js and Vercel to solve logic problems for students and eagle leaners.',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    icons: {
        icon: [
            {
                url: '/logic_ai_light.svg',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/logic_ai_dark.svg',
                media: '(prefers-color-scheme: dark)',
            },
        ],
    },
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <head />
            <body className={cn('font-sans antialiased', fontSans.variable, fontMono.variable)}>
                <Toaster />
                <Providers attribute="class" defaultTheme="system" enableSystem>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
                    </div>
                    <TailwindIndicator />
                </Providers>
            </body>
        </html>
    )
}
