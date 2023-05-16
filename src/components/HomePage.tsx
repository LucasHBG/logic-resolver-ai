import { Fragment, useState } from 'react'

import MainLayout from './layout/MainLayout'

export default function HomeComponent(): JSX.Element {
    const inputText = useState<string>('')

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
                        placeholder='Esperando pergunta...'
                        disabled
                    >
                        
                    </textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-gray-700" htmlFor="input">
                        Pergunta
                    </label>
                    <form >
                        <input
                            id="input"
                            autoFocus={true}
                            className="block w-full snap-y snap-center rounded border border-blue-900 bg-gray-50 p-2 text-gray-900 focus:border-blue-900"
                        />
                    </form>
                </div>

                <div className="flex w-full">
                    <button className="rounded border border-blue-900 bg-gray-50 p-2 text-gray-900">Botao</button>
                    <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
               </button>
                </div>
            </div>
        </MainLayout>
    )
}
