import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'

import { ThemeToggle } from './theme-toggle'
import { buttonVariants } from './ui/button'
import { IconGitHub, IconLogicResolverAi, IconSeparator } from './ui/icons'

export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
            <div className="flex items-center ">
                <Link href="/" target="_blank" rel="nofollow">
                    <IconLogicResolverAi className="mr-2 h-8 w-8 dark:hidden" inverted />
                    <IconLogicResolverAi className="mr-2 hidden h-8 w-8 dark:block" />
                </Link>
                <div className="flex items-center ">
                    <IconSeparator className="h-6 w-6 text-muted-foreground/50" />
                    <span>Logic Resolver AI</span>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <a
                    target="_blank"
                    href="https://github.com/LucasHBG/logic-resolver-ai"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: 'outline' }))}
                >
                    <IconGitHub />
                    <span className="ml-2 hidden md:flex">GitHub</span>
                </a>
                <ThemeToggle />
            </div>
        </header>
    )
}
