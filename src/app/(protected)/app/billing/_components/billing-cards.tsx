import BuyOneTimeProductButton from "@/dashboard/stripe/components/buy-one-time-product-button";
import ManageUserSubscriptionButton from "@/dashboard/stripe/components/manage-user-subscription-button";
import { OneTimeProduct } from "@/dashboard/stripe/constants/one-time-products";
import { SubscriptionPlanProps } from "@/dashboard/stripe/constants/subscriptions";
import { UserSubscriptionPlan } from "@/dashboard/stripe/subscription";
import { User } from "next-auth";


const SubscriptionCard = ({ plan, user, subscriptionPlan, selectedPlan }: { plan: SubscriptionPlanProps, user: User, subscriptionPlan: UserSubscriptionPlan, selectedPlan: 'monthly' | 'yearly' }) => {
  return (
    <div className='p-4 border rounded-md border-primary-500'>
      <PlanDetails plan={plan} title={selectedPlan === 'monthly' ? 'Credits Montly' : 'Credits Yearly'} />
      <ManageUserSubscriptionButton
        userId={user.id || ''}
        email={user.email || ''}
        isCurrentPlan={subscriptionPlan?.name === plan.name}
        isSubscribed={!!subscriptionPlan.isSubscribed}
        stripeCustomerId={subscriptionPlan?.stripeCustomerId}
        stripeSubscriptionId={subscriptionPlan?.stripeSubscriptionId}
        stripePriceId={plan.stripePriceId}
      />
    </div>
  )
}

const OneTimePurchaseCard = ({ plan, user }: { plan: OneTimeProduct, user: User }) => {
  return (
    <div className='p-4 border rounded-md border-primary-500'>
      <PlanDetails plan={plan} title="Credits"/>
      <BuyOneTimeProductButton
        userId={user.id || ''}
        email={user.email || ''}
        stripePriceId={plan.stripePriceId}
      />
    </div>
  )
}


const PlanDetails = ({ plan, title }: { plan: SubscriptionPlanProps, title: string }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl text-gray-800 font-semibold text-center">{plan.credits.toLocaleString()}</h2>
      <h3 className="text-2xl text-gray-800 text-center">{title}</h3>
      <p>{plan.description}</p>
      <p className="text-3xl text-gray-800 text-center">€{plan.price}</p>
      <p className="text-center">
        <span>€{(plan.price / plan.credits * 1000).toFixed(2)}</span>
        <span> per 1000</span>
      </p>
    </div>
  )
}

export { SubscriptionCard, OneTimePurchaseCard };