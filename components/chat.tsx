'use client'

import { type Message, useChat } from 'ai/react'
import { toast } from 'react-hot-toast'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'

import { ChatPanel } from './chat-panel'

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
}

export default function ChatComponent({ id, initialMessages, className }: ChatProps): JSX.Element {
    const [previewToken, setPreviewToken] = useLocalStorage<string | null>('ai-token', null)

    const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
        initialMessages,
        id,
        body: {
            id,
            previewToken,
        },
        onResponse(response) {
            if (response.status === 401) {
                toast.error(response.statusText)
            }
        },
    })

    return (
        <>
            <ChatPanel
                id={id}
                isLoading={isLoading}
                stop={stop}
                append={append}
                reload={reload}
                messages={messages}
                input={input}
                setInput={setInput}
            />
        </>
    )
}
