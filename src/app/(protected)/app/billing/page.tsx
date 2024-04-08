import { auth } from '@/auth/auth'
import BuyOneTimeProductButton from '@/dashboard/stripe/components/buy-one-time-product-button'
import ManageUserSubscriptionButton from '@/dashboard/stripe/components/manage-user-subscription-button'
import { storeOneTimeProducts } from '@/dashboard/stripe/constants/one-time-products'
import { storeSubcsriptionPlans } from '@/dashboard/stripe/constants/subscriptions'
import { getUserSubscriptionPlan } from '@/dashboard/stripe/subscription'
import { getUserStripeId } from '@/dashboard/stripe/user'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await auth()
  const subscriptionPlan = await getUserSubscriptionPlan()
  // console.log('subscriptionPlan', subscriptionPlan)

  if (!session) return redirect('/auth/login')

  // dayly spend 

  return (
    <>
    <p>

    </p>
      {/* Subscription */}
      {/* <div className='flex gap-4'>
        {storeSubcsriptionPlans.map((plan) => (
          <div key={plan.id} className='p-4 border rounded-md border-primary-500'>
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
            <p>{plan.price}</p>
            <p>price per 1000 credits: 
              <span className='font-bold'>{(plan.price/plan.credits*1000).toFixed(2)}</span>
            </p>
            <ManageUserSubscriptionButton
              userId={session.user.id || ''}
              email={session.user.email || ''}
              isCurrentPlan={subscriptionPlan?.name === plan.name}
              isSubscribed={!!subscriptionPlan.isSubscribed}
              stripeCustomerId={subscriptionPlan?.stripeCustomerId}
              stripeSubscriptionId={subscriptionPlan?.stripeSubscriptionId}
              stripePriceId={plan.stripePriceId}
            />
          </div>
        ))}
      </div> */}

      {/* Buy One Time */}
      <div className='flex gap-4 mt-4'>
        {storeOneTimeProducts.map((product) => (
          <div key={product.id} className='p-4 border rounded-md border-primary-500'>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>price per 1000 credits:
              <span className='font-bold'>{(product.price / product.credits * 1000).toFixed(2)}</span>
            </p>
            <BuyOneTimeProductButton
              userId={session.user.id || ''}
              email={session.user.email || ''}
              stripePriceId={product.stripePriceId}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default page