import { UseChatHelpers } from 'ai/react'

import { ExternalLink } from '@/components/external-link'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
    {
        heading: 'Faça perguntas diretas',
        message: `Me mostre a tabela verdade de P -> Q.`,
    },
    {
        heading: 'Peça por explicações sobre a matéria',
        message: `Explique como Q <-> R pode ser usado em uma frase.`,
    },
    {
        heading: 'Converse sobre exemplos que deseja ver',
        message: `Crie uma tabela verdade somente com disjunções e condicionais usando as seguintes proposições simples: P, Q e S`,
    },
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-lg border bg-background p-8">
                <h1 className="mb-2 text-base font-semibold sm:text-lg">Bem-vindo(a) ao Logic Resolver AI!</h1>
                <p className="mb-2 text-sm leading-normal text-muted-foreground sm:text-base">
                    Projeto open source que usou de referência o modelo de chatbot da <ExternalLink href="https://vercel.com">Vercel</ExternalLink> e
                    o framework <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>.
                </p>
                <p className="text-sm leading-normal text-muted-foreground sm:text-base">
                    Você pode começar uma conversa por aqui ou usando os seguintes exemplos:
                </p>
                <div className="mt-4 flex flex-col items-start space-y-2 ">
                    {exampleMessages.map((message, index) => (
                        <Button key={index} variant="link" className="h-auto p-0 text-sm sm:text-base" onClick={() => setInput(message.message)}>
                            <IconArrowRight className="mr-2 text-muted-foreground" />
                            {message.heading}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
