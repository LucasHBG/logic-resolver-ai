import { Configuration, OpenAIApi } from 'openai'
import { Fragment, useState } from 'react'

import MainLayout from './layout/MainLayout'

export default function HomeComponent(): JSX.Element {
    const [inputText, setInputText] = useState<string>('')
    const [outputText, setOutputText] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_SECRET,
    })
    const openai = new OpenAIApi(configuration)

    const helperText =
        "Tenho um sistema que resolve problemas de lógica matemática usando esses símbolos de lógica matemática: \
    \
    - Disjunção: v , OR , || , +\
    - Conjunção: ^ , AND , && , *\
    - Disjunção exclusiva: XNOR, ⊕ \
    - Negação: N , ~ , NOT , ¬\
    - Condicional: → \
    - Bicondicional: ↔ \
    \
    Além disso, nesse sistema será utilizada a tabela-verdade para representar as soluções. \
    \
    Ao se desenvolver a resposta deve ser levado em consideração a ordem de prioridade dos símbolos e parênteses na resolução. \
    \
    A ordem de prioridade é descrita na ordem a seguir:\
    \
    Parênteses, Negação, Disjunção, Conjunção, Condicional e, por fim, Bicondicional. Você deve usa-las somente se o usuário estiver colocado elas na pergunta.\
    \
    O usuário desse sistema tem a possibilidades de criar perguntas que utilizam proposições simples como: 'p', 'q', 'r' e 's'.\
    \ Use os símbolos listados acima para resolver as perguntas.\
    \
    Além disso, devem ser seguidos os três princípios da Lógica Clássica de Aristóteles:\
    \
    1° Identidade: O que é, é, ou seja, algo é idêntico a si mesmo; e um enunciado deve se manter igual a si mesmo. Simbolicamente, podemos dizer X = X.\
    \
    2° Não contradição: Algo não pode ser e não ser, ao mesmo tempo, ou seja, algo não pode ser e não ser a mesma coisa, no mesmo tempo e sob a mesma perspectiva ou aspecto; e um enunciado não pode ser ao mesmo tempo verdadeiro e falso. Simbolicamente, se X = X, então “X” não pode ser “não-X”.\
    \
    3° Terceiro excluído: Algo somente pode ser ou não ser, não havendo outra possibilidade, ou seja, algo ou é ou não é, só existindo esses dois modos de ser; e um enunciado ou é verdadeiro ou é falso, não existindo outra possibilidade. Simbolicamente, ou “X” ou “não-X”.\
    \
    A proposição sempre inicia com valor 0 (zero) e nunca com valor inicial 1 (um). Porém, se a proposição estiver negada ou com o símbolo de negação, então ela vai iniciar com 1. \
    \
    Assim que o usuário perguntar sobre resolver um problema, apresente uma tabela-verdade detalhada com o resultado, onde 0 receba F (falso) e 1 receba V (verdade). Use os símbolos listados acima para resolver as perguntas. Além disso, explique para o usuário como você chegou nesse resultado. Se, ao analisar a pergunta, verificar-se que não há necessidade de uma tabela verdade, gere um texto explicativo longo que explique como chegou na sua resposta.  \
    \
    Se a pergunta abaixo não tiver relação com a Lógica Matemática, retorne a seguinte resposta: 'Essa pergunta não está relacionada com o modelo no qual fui projetado.' \
    \
    Pergunta: "

    // a submit function that will execute upon form submission
    async function submitedQuestionCallback(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const promptValue = (event.currentTarget.elements.namedItem('inputText') as HTMLInputElement).value

        console.log(promptValue)

        setIsLoading(true)

        try {
            const res = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: helperText + promptValue,
                max_tokens: 1000,
            })

            if (res.data.choices[0].text) {
                setOutputText((oldValues) => [...oldValues, res.data.choices[0].text ?? ''])
                console.log('Resultado: ', outputText)
            }
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.status)
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <MainLayout>
            <div className="space-y-2">
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-700" htmlFor="output">
                        Resposta
                    </label>
                    <textarea
                        className="block w-full snap-y snap-center rounded border-blue-900 bg-gray-50 p-4 text-lg text-gray-900"
                        id="output"
                        rows={12}
                        autoFocus={false}
                        placeholder="Esperando pergunta..."
                        value={outputText.map((text, index) => {
                            return `\nPergunta Nº ${index + 1}:\n` + text
                        })}
                        disabled
                    ></textarea>
                </div>

                {isLoading && (
                    <button
                        type="button"
                        className="inline-flex w-full items-center justify-evenly rounded bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white transition delay-150 ease-in-out hover:bg-blue-800 focus:ring-1 focus:ring-blue-200 disabled:bg-blue-500 dark:focus:ring-blue-900"
                        disabled
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mr-3 h-6 w-6 animate-bounce"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                            />
                        </svg>
                        Carregando...
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mr-3 h-6 w-6 animate-bounce"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                            />
                        </svg>
                    </button>
                )}

                <form onSubmit={submitedQuestionCallback}>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-700" htmlFor="input">
                        Pergunta
                    </label>
                    <div className="flex w-full">
                        <input
                            name="inputText"
                            id="inputText"
                            type="text"
                            placeholder="Pergunte aqui..."
                            autoFocus={true}
                            onChange={(e) => setInputText(e.target.value)}
                            value={inputText}
                            disabled={isLoading}
                            className="block w-full snap-y snap-center rounded-l border border-blue-900 bg-gray-50 p-2 text-gray-900 focus:border-blue-900"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center rounded-r bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-1 focus:ring-blue-200 disabled:bg-blue-500 dark:focus:ring-blue-900"
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
                        </button>
                    </div>
                </form>

                {/* Conjunto 1 de botões */}
                <div className="pt-4 grid w-full items-center grid-cols-11 justify-center gap-4">
                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'p')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            p
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'q')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            q
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'r')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            r
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 's')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            s
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '&&')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            &&
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'AND')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            AND
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '∧')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            ∧
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '*')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            *
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'OR')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            OR
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '||')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            ||
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '+')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            +
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'v')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            v
                        </button>
                    </div>

                    {/* 
                </div>
                <div className="flex w-full flex-row items-center justify-around">
*/}

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'XOR')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            XOR
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '⊕')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            ⊕
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'N')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            N
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '~')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            ~
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'NOT')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            NOT
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '→')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            →
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + 'XNOR')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            XNOR
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + ')')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            )
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '(')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            (
                        </button>
                    </div>

                    <div className="flex w-full [&>button]:w-20">
                        <button
                            type="button"
                            onClick={() => setInputText(inputText + '↔')}
                            className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                        >
                            ↔
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
