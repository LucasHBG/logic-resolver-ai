import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { Button, buttonVariants } from './ui/button'
import { IconQuestionMark, IconSendRight } from './ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export interface PromptProps extends Pick<UseChatHelpers, 'input' | 'setInput'> {
    onSubmit: (value: string) => Promise<void>
    isLoading: boolean
}

export function PromptForm({ onSubmit, input, setInput, isLoading }: PromptProps) {
    const [helpDialog, setHelpDialog] = React.useState<boolean>(false)
    const inputRef = React.useRef<HTMLTextAreaElement>(null)

    const { formRef, onKeyDown } = useEnterSubmit()

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    // a submit function that will execute upon form submission
    async function submitedQuestionCallback(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!input?.trim()) {
            return
        }
        setInput('')
        await onSubmit(input)
    }

    return (
        <>
            <form onSubmit={submitedQuestionCallback} ref={formRef}>
                <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setHelpDialog(true)
                                }}
                                className={cn(
                                    buttonVariants({ size: 'sm', variant: 'outline' }),
                                    'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
                                )}
                            >
                                <IconQuestionMark />
                                <span className="sr-only">Como perguntar</span>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>Como perguntar</TooltipContent>
                    </Tooltip>
                    <ReactTextareaAutosize
                        name="input"
                        id="input"
                        placeholder="Pergunte aqui..."
                        autoFocus={true}
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        ref={inputRef}
                        onKeyDown={onKeyDown}
                        className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                        rows={1}
                        tabIndex={0}
                        spellCheck={false}
                    />
                    <div className="absolute right-0 top-4 sm:right-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="submit" size={'icon'} disabled={isLoading || input === ''}>
                                    <IconSendRight />
                                    <span className="sr-only">Enviar pergunta</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Enviar pergunta</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </form>

            <Dialog open={helpDialog} onOpenChange={setHelpDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Como perguntar</DialogTitle>
                        <DialogDescription className="space-y-2">
                            A inteligência artificial deste projeto atua como um professor especialista na matéria de Lógica Matemática. No entanto,
                            para responder da forma mais assertiva, ele requer que sua dúvida seja escrita o mais detalhado possível.
                            <br />
                            <h3 className="text-base font-medium">Exemplo:</h3>
                            <ul
                                role="list"
                                className="mt-4 flex flex-col items-start space-y-2 [&>li>span]:font-bold [&>li]:text-sm [&>li]:text-muted-foreground"
                            >
                                <li className="h-auto p-0 text-base">
                                    <span>1.</span> Qual é a diferença entre uma proposição simples e uma proposição composta?
                                </li>
                                <li className="h-auto p-0 text-base">
                                    <span>2.</span> Como posso determinar se um argumento é válido ou inválido usando tabelas verdade?
                                </li>
                                <li className="h-auto p-0 text-base">
                                    <span>3.</span> Quais são as principais leis lógicas que podem ser aplicadas na simplificação de expressões
                                    lógicas?
                                </li>
                                <li className="h-auto p-0 text-base">
                                    <span>4.</span> Como posso converter uma expressão lógica em sua forma normal conjuntiva (FNC)?
                                </li>
                                <li className="h-auto p-0 text-base">
                                    <span>5.</span> Quais são as principais regras de inferência que podem ser usadas para derivar conclusões a partir
                                    de premissas em um argumento lógico?
                                </li>
                            </ul>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={() => setHelpDialog(false)}>Fechar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
