import { Fragment, useState } from 'react'

import MainLayout from './layout/MainLayout'

export default function HomeComponent(): JSX.Element {
    const [inputText, setInputText] = useState<string>('')

    return (
        <MainLayout>
            <div className="space-y-2">
                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-700" htmlFor="output">
                        Resposta
                    </label>
                    <textarea
                        className="block w-full snap-y snap-center rounded border-blue-900 bg-gray-50 p-4 text-sm text-gray-900"
                        id="output"
                        rows={25}
                        autoFocus={false}
                        placeholder="Esperando pergunta..."
                        disabled
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-700" htmlFor="input">
                        Pergunta
                    </label>
                    <form>
                        <div className="flex w-full">
                            <input
                                id="inputText"
                                autoFocus={true}
                                className="block w-full snap-y snap-center rounded-l border border-blue-900 bg-gray-50 p-2 text-gray-900 focus:border-blue-900"
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center rounded-r bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
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
                </div>

                <div className="flex w-full [&>button]:w-20">
                    <button
                        type="button"
                        onClick={() => setInputText(inputText + '&')}
                        className="block items-center rounded border border-blue-900 p-2 text-center text-gray-900 hover:bg-gray-50 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900"
                    >
                        &
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}
