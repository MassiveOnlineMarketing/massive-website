import { auth } from "@/auth/auth";
import { db } from "../../lib/db";
import { storeSubcsriptionPlans } from "./constants/subscriptions";
import { stripe } from "./stripe";

export async function getUserSubscriptionPlan() {
    const session = await auth()

    if (!session || !session.user) throw new Error('User not found')

    const user = await db.user.findFirst({
        where: {
            id: session.user.id
        }
    })

    if (!user) throw new Error('User not found')
    // console.log('stripe/subscription.ts: user', user)

    const isSubscribed = 
        user.stripePriceId &&
        user.stripeCurrentPeriodEnd &&
        user.stripeCurrentPeriodEnd.getTime() + 84_400_000> Date.now()

    const plan = isSubscribed 
        ? storeSubcsriptionPlans.find(plan => plan.stripePriceId === user.stripePriceId)
        : null

    let isCanceled = false;
    if (isSubscribed && user.stripeSubscriptionId) {
        const stripePlan = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)

        isCanceled = stripePlan.cancel_at_period_end
    }

    return {
        ...plan,
        stripeSubscriptionId: user.stripeSubscriptionId,
        stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
        stripeCustomerId: user.stripeCustomerId,
        isSubscribed,
        isCanceled
    }
}