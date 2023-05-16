import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
    return (
        <div className="flex w-full flex-col items-center px-20">
            <div className="flex w-full flex-row items-center ">
                <div className="w-full border-b border-b-blue-900" />
                <p className="mx-10 text-3xl leading-10">Foto</p>
                <div className="w-full border-b border-b-blue-900" />
            </div>

            <div className="h-full antialiased w-full">{children}</div>
        </div>
    )
}
