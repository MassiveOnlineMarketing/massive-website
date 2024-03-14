import React from 'react'
import Image from 'next/image'
import { PAYLOAD_BACKEND_URL } from '../../../../../../routes'

import { Writer } from '@/payload/payload-types'

import { MassiveLogoColor } from '@/assets/branding' 
import { styles } from '@/styles/styles'
import { cn } from '@/lib/utils'

const AuthorsCard = ({ 
    authors, 
    containerStyles 
}:{
    authors: Writer[], 
    containerStyles?: string
}) => {

    return (
        <div className={cn(
            "z-10 max-w-[900px] mx-auto p-12 rounded-t-2xl rounded-b-4xl bg-gradient-to-b from-[#fff]/80 to-[#fff]/65 relative gradient-mask authors-card-gradient",
            containerStyles
        )} >
            {/* <div className='absolute rounded-b-4xl w-[92%] h-[70%] bottom-0 transform rotate-2  gradient-mask authors-card-gradient before:-z-10'></div>
            <div className='absolute rounded-b-4xl w-[90%] h-[70%] bottom-0 transform rotate-[4deg]  gradient-mask authors-card-gradient before:-z-10'></div> */}


            <h2 className="text-center pb-3 text-lg leading-7 font-medium text-gray-500">
                Auteur{authors.length > 1 ? "s" : ""}
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#7857FE]/0 via-50% via-[#A48DFF] to-[#7857FE]/0"></div>
            <div className="mb-6 md:mb-12 mt-6 flex flex-col gap-8">
                {authors.map((author: Writer) => {
                    return (
                        <div key={author.fullName} className="flex flex-col md:flex-row gap-3 md:gap-6">
                            {author.profilePicture && <Image src={
                                // @ts-ignore
                                `${PAYLOAD_BACKEND_URL}${author.profilePicture.url}`} alt={author.profilePicture.alt} width={58} height={58} className="rounded-full" 
                            />}
                            <div>
                                <p className="text-base leading-6 font-medium text-gray-700">{author.fullName}</p>
                                <p className="text-sm leading-5 font-normal text-gray-500 ">{author.bioGraphy}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <h2 className="text-center pb-3 text-lg leading-7 font-medium text-gray-500">Uitgever</h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#7857FE]/0 via-50% via-[#A48DFF] to-[#7857FE]/0"></div>

            <div className="mt-6 flex flex-col md:flex-row gap-2 md:gap-6">
                <div className={`${styles.glass} rounded-lg w-[58px] h-[58px] px-[9px] aspect-square flex items-center justify-center`}>
                    <MassiveLogoColor className="flex-1 aspect-square" />
                </div>
                <div>
                    <p className="text-base leading-6 font-medium text-gray-700">Massive Online Marketing</p>
                    <p className="text-sm leading-5 font-normal text-gray-500 ">Ik ben Julian en ik heb dit artikel getikt met mijn toetsenbord, artificial inteligentie en dit online geplaats</p>
                </div>
            </div>
        </div>
    )
}

export default AuthorsCard