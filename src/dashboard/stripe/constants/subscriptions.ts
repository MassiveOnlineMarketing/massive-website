export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  credits: number;
  price: number;
}

export const storeSubcsriptionPlans: SubscriptionPlan[] = [
  {
    id: "250-monthly",
    name: "250 Monthly",
    description:
      "Gets you started with improving and tracking your SEO performance",
    stripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_250_SUBSCRIPTION_PRICE_ID ?? "",
    credits: 8750,
    price: 15.75,
  },
  {
    id: "500-monthly",
    name: "500 Monthly",
    description:
      "Gets you started with improving and tracking your SEO performance",
    stripePriceId:
      process.env.NEXT_PUBLIC_STRIPE_500_SUBSCRIPTION_PRICE_ID ?? "",
    credits: 17500,
    price: 29,
  },
];
