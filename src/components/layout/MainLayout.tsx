import Image from 'next/image'
import React from 'react'

import LRA_logo from '../../../public/LRA_logo.png'

type Props = {
    children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
    return (
        <div className="flex w-full flex-col items-center px-4 py-4 sm:px-10 lg:px-20">
            <div className="flex w-full flex-row items-center ">
                <div className="w-full border-b border-b-blue-900 " />
                <div className="mx-10 animate-pulse transition ease-in-out">
                    <Image src={LRA_logo} alt="Logic Resolver Ai" width={195} height={195} />
                </div>
                <div className="w-full border-b border-b-blue-900" />
            </div>

            <div className="h-full w-full antialiased">{children}</div>
        </div>
    )
}
