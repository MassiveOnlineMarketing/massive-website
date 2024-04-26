import React from "react";
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Account } from "@prisma/client";
import { cn } from "@/lib/utils";

const SteppedProgressBar = ({ accountDetails }: { accountDetails?: Account | null }) => {

    let searchAuthenticated
    let adsAuthenticated

    if (accountDetails?.scope) {
        searchAuthenticated = accountDetails.scope.includes('https://www.googleapis.com/auth/webmasters.readonly') ? true : false
        adsAuthenticated = accountDetails.scope.includes('https://www.googleapis.com/auth/adwords') ? true : false
    }

    return (
        <>
            <div className='mb-3 flex items-center justify-between text-base leading-6 font-normal text-gray-500'>
                <p className='flex-1 text-left'>Setup Google Account</p>
                <p className='flex-1 text-center'>Setup Google Search</p>
                <p className='flex-1 text-right'>Setup Google Ads</p>
            </div>
            <div className='flex items-center gap-5'>
                {accountDetails ? (
                    <CheckCircleIcon className="min-w-8 min-h-8 h-8 w-8 text-green-500" />
                ) : (
                    <GrayDot className='min-w-5 min-h-5 w-5 h-5' />
                )}

                <div className={cn(
                    'w-full h-[6px] rounded-full ',
                    searchAuthenticated ? 'bg-green-500' : (accountDetails ? 'bg-gradient-to-r from-green-500 to-gray-200' : 'bg-gray-200')
                )}></div>

                {searchAuthenticated ? (
                    <CheckCircleIcon className="min-w-8 min-h-8 h-8 w-8 text-green-500" />
                ) : (
                    <GrayDot className='min-w-5 min-h-5 w-5 h-5' />
                )}

                <div className={cn(
                    'w-full h-[6px] rounded-full ',
                    adsAuthenticated ? 'bg-green-500' : (searchAuthenticated ? 'bg-gradient-to-r from-green-500 to-gray-200' : 'bg-gray-200')
                )}></div>

                {adsAuthenticated ? (
                    <CheckCircleIcon className="min-w-8 min-h-8 h-8 w-8 text-green-500" />
                ) : (
                    <GrayDot className='min-w-5 min-h-5 w-5 h-5' />
                )}
            </div>
        </>
    );
};

export default SteppedProgressBar;


const GrayDot = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.09211" y="0.592105" width="18.8158" height="18.8158" rx="9.4079" fill="white" />
            <rect x="1.09211" y="0.592105" width="18.8158" height="18.8158" rx="9.4079" stroke="#D1D5DB" stroke-width="1.18421" stroke-linecap="round" />
            <circle cx="10.5" cy="9.99997" r="5.26316" fill="#D1D5DB" />
        </svg>
    )
}