import { UseChatHelpers } from 'ai/react'
import { Configuration, OpenAIApi } from 'openai'
import * as React from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { systemPrompt } from '@/lib/role-texts'

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export interface PromptProps extends Pick<UseChatHelpers, 'input' | 'setInput'> {
    onSubmit: (value: string) => Promise<void>
    isLoading: boolean
}

export function PromptForm({ onSubmit, input, setInput, isLoading }: PromptProps) {
    const [inputText, setInputText] = React.useState<string>('')
    const [outputText, setOutputText] = React.useState<string[]>([])

    const inputRef = React.useRef<HTMLTextAreaElement>(null)

    const { formRef, onKeyDown } = useEnterSubmit()

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_SECRET,
    })
    const openai = new OpenAIApi(configuration)

    // a submit function that will execute upon form submission
    async function submitedQuestionCallback(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!input?.trim()) {
            return
        }
        setInput('')
        await onSubmit(input)

        const userInputText = (event.currentTarget.elements.namedItem('inputText') as HTMLInputElement).value

        const prompt = `\n<tag> \n' ${userInputText} + '\n </tag>'`
        console.log(userInputText)

        try {
            const res = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt,
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.2,
                max_tokens: 1000,
                stop: ['\n\n'],
            })

            if (res.data.choices[0].message) {
                setOutputText((oldValues) => [...oldValues, res.data.choices[0].message?.content ?? ''])
                console.log('Resultado: ', outputText)
            }
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.status)
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
    }

    return (
        // <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
        //     <div>
        //         <label className="block text-sm font-medium text-gray-900 dark:text-gray-700" htmlFor="output">
        //             Resposta
        //         </label>
        //         <Textarea
        //             className="block w-full snap-y snap-center rounded border-blue-900 bg-gray-50 p-4 text-lg text-gray-900"
        //             id="output"
        //             rows={12}
        //             autoFocus={false}
        //             spellCheck={false}
        //             placeholder="Esperando pergunta..."
        //             value={outputText.map((text, index) => {
        //                 return `\nPergunta Nº ${index + 1}:\n` + text
        //             })}
        //             disabled
        //         ></Textarea>
        //     </div>

        <form onSubmit={submitedQuestionCallback} ref={formRef}>
            <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                <ReactTextareaAutosize
                    name="inputText"
                    id="inputText"
                    placeholder="Pergunte aqui..."
                    autoFocus={true}
                    onChange={(e) => setInputText(e.target.value)}
                    value={inputText}
                    // className="block w-full snap-y snap-center rounded-l border border-blue-900 bg-gray-50 p-2 text-gray-900 focus:border-blue-900"
                    ref={inputRef}
                    onKeyDown={onKeyDown}
                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                    rows={1}
                    tabIndex={0}
                    spellCheck={false}
                />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="submit"
                            disabled={isLoading || inputText === ''}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                            <span className="sr-only">Enviar pergunta</span>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Enviar pergunta</TooltipContent>
                </Tooltip>
            </div>
        </form>

        // {/* Conjunto 1 de botões */}
        // <div className="grid w-full grid-cols-11 items-center justify-center gap-4 pt-4">
        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'p')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             p
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'q')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             q
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'r')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             r
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 's')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             s
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '&&')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             &&
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'AND')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             AND
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '∧')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             ∧
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '*')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             *
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'OR')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             OR
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '||')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             ||
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '+')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             +
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'v')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             v
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'XOR')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             XOR
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '⊕')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             ⊕
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'N')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             N
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '~')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             ~
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'NOT')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             NOT
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '→')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             →
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + 'XNOR')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             XNOR
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + ')')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             )
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '(')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             (
        //         </button>
        //     </div>

        //     <div className="flex w-full [&>button]:w-20">
        //         <button
        //             type="button"
        //             onClick={() => setInputText(inputText + '↔')}
        //             className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
        //         >
        //             ↔
        //         </button>
        //     </div>
        // </div>
        // </div>
    )
}
