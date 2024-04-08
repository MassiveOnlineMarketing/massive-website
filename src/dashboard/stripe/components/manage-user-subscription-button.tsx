'use client';

import React from 'react';
import { manageStripeSubscriptionAction } from '../actions/stripe';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/website/features/toast/use-toast';

interface ManageUserSubscriptionButtonProps {
    userId: string;
    email: string;
    isCurrentPlan: boolean;
    isSubscribed: boolean;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string;
}

export default function ManageUserSubscriptionButton({
    userId,
    email,
    isCurrentPlan,
    isSubscribed,
    stripeCustomerId,
    stripeSubscriptionId,
    stripePriceId
}: ManageUserSubscriptionButtonProps) {
    const [isPending, startTransition] = React.useTransition();
    const { toast } = useToast();
    // console.log('isCurrentPlan', isCurrentPlan)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(async () => {
            try {
                const session = await manageStripeSubscriptionAction({
                    userId,
                    email,
                    isCurrentPlan,
                    isSubscribed,
                    stripeCustomerId,
                    stripeSubscriptionId,
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
        <>
            <form onSubmit={handleSubmit}>
                <button
                    disabled={isPending}
                    type="submit"
                >
                    {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    {isCurrentPlan ? 'Manage Subscription' : 'Subscribe'}
                </button>
            </form>
        </>
    );
}