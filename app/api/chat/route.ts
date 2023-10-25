import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, type CreateChatCompletionRequest, OpenAIApi } from 'openai-edge'

import { systemPrompt } from '@/lib/role-texts'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
    const json = await req.json()
    const { messages }: CreateChatCompletionRequest = json

    //? Não é necessário estar logado para isso.
    //   const userId = (await auth())?.user.id

    //   if (!userId) {
    //     return new Response('Unauthorized', {
    //       status: 401
    //     })
    //   }

    // if (previewToken) {
    //     configuration.apiKey = previewToken
    // }

    const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: systemPrompt,
            },
            ...messages
        ],
        temperature: 0.4,
        max_tokens: 1000,
        stream: true,
    })

    const stream = OpenAIStream(res, {
        async onCompletion(completion) {
            //! nenhum desses campos estao sendo salvos atualmente.
            const title = json.messages[0].content.substring(0, 100)
            const id = json.id ?? nanoid()
            const createdAt = Date.now()
            const path = `/chat/${id}`
            const payload = {
                id,
                title,
                createdAt,
                path,
                messages: [
                    ...messages,
                    {
                        role: 'system',
                        content: systemPrompt,
                    },
                    {
                        role: 'assistant',
                        content: completion,
                    },
                ],
            }
        },
    })

    return new StreamingTextResponse(stream)
}
