'use client';

import { useToast } from '@/website/features/toast/use-toast';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { manageStripeBuyOneTimeProductAction } from '../actions/stripe-one-time';

interface BuyOneTimeProductButtonProps {
    userId: string;
    email: string;
    stripePriceId: string;
}

export default function BuyOneTimeProductButton({
    userId,
    email,
    stripePriceId
}: BuyOneTimeProductButtonProps) {
    const [isPending, startTransition] = React.useTransition();
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(async () => {
            try {
                const session = await manageStripeBuyOneTimeProductAction({
                    userId,
                    email,
                    stripePriceId
                });

                if (session) {
                    window.location.href = session.url ?? '/app/billing';
                }
            } catch (err) {
                console.error((err as Error).message);
                toast({
                    description: "Somehting went wrong, please try again later.",
                    variant: "destructive",
                    duration: 3000,
                })
            }
        });
    };   

    return (
        <form onSubmit={handleSubmit}>
            <button
                type="submit"
                disabled={isPending}
            >
                {isPending ? <Loader2 className='mr-2 w-4 h-4 animate-spin' /> : 'Buy'}
            </button>
        </form>
    );
}