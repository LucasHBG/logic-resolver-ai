import { AppProps } from 'next/app'
import Head from 'next/head'
import { Suspense } from 'react'
import 'tailwindcss/tailwind.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (<>
    
    <Head>
                <title>Logic Resolver</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <Suspense>
                <Component {...pageProps} />
            </Suspense>
    </>
    )
}