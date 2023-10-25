import { type UseChatHelpers } from 'ai/react'
import * as React from 'react'

import { ButtonScrollToBottom } from './button-scroll-to-bottom'
import { FooterText } from './footer'
import { PromptForm } from './prompt-form'
import { Button } from './ui/button'
import { IconRefresh, IconStop } from './ui/icons'

export interface ChatPanelProps extends Pick<UseChatHelpers, 'append' | 'isLoading' | 'reload' | 'messages' | 'stop' | 'input' | 'setInput'> {
    id?: string
}

export function ChatPanel({ id, isLoading, stop, append, reload, input, setInput, messages }: ChatPanelProps) {
    return (
        <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
            <ButtonScrollToBottom />
            {/* Tamanho da div que contem formulário e botões de criar nova resposta */}
            <div className="mx-auto sm:max-w-2xl sm:px-4">
                <div className="flex h-10 items-center justify-center">
                    {isLoading ? (
                        <Button variant="outline" onClick={() => stop()} className="bg-background">
                            <IconStop className="mr-2" />
                            Parar geração de resposta
                        </Button>
                    ) : (
                        messages?.length > 0 && (
                            <Button variant="outline" onClick={() => reload()} className="bg-background">
                                <IconRefresh className="mr-2" />
                                Refazer resposta
                            </Button>
                        )
                    )}
                </div>
                <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                    <PromptForm
                        onSubmit={async (value) => {
                            await append({
                                id,
                                content: value,
                                role: 'user',
                            })
                        }}
                        input={input}
                        setInput={setInput}
                        isLoading={isLoading}
                    />
                    <FooterText />
                </div>
            </div>
        </div>
    )
}
