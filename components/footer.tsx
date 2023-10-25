import React from 'react'

import { cn } from '@/lib/utils'

import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
    return (
        <p className={cn('px-2 text-center text-xs leading-normal text-muted-foreground', className)} {...props}>
            Projeto open source que usou de referência o modelo de chatbot da{' '}
            <ExternalLink href="https://vercel.com">Vercel</ExternalLink> e o framework <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>
            .
        </p>
    )
}
