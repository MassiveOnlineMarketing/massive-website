import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";

import { storeOneTimeProducts } from "@/dashboard/stripe/constants/one-time-products";
import { getUserSubscriptionPlan } from "@/dashboard/stripe/subscription";
import SubscriptionPlan from "./_components/subscription-plan";

import BuyOneTimeProductButton from "@/dashboard/stripe/components/buy-one-time-product-button";
import { OneTimePurchaseCard } from "./_components/billing-cards";

const page = async () => {
  const session = await auth();
  const subscriptionPlan = await getUserSubscriptionPlan();
  // console.log('subscriptionPlan', subscriptionPlan)

  if (!session) return redirect("/auth/login");

  // dayly spend

  return (
    <div className="p-6">


      <SubscriptionPlan subscriptionPlan={subscriptionPlan} user={session.user}/>


      {/* Buy One Time */}
      <div className="flex gap-4 py-4">
        {storeOneTimeProducts.map((product) => (
          <OneTimePurchaseCard key={product.id} plan={product} user={session.user} />
        ))}
      </div>
    </div>
  );
};

export default page;


