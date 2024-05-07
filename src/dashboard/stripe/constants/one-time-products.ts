export interface OneTimeProduct {
  id: string;
  name: string;
  description: string;
  stripePriceId: string;
  credits: number;
  price: number;
}

export const storeOneTimeProducts: OneTimeProduct[] = [
  {
    id: "250-one-time",
    name: "250 One Time",
    description:
      "Gets you started with improving and tracking your SEO performance",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_250_ONE_TIME_PRICE_ID ?? "",
    credits: 8750,
    price: 17.5,
  },
  {
    id: "500-one-time",
    name: "500 One Time",
    description:
      "Gets you started with improving and tracking your SEO performance",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_500_ONE_TIME_PRICE_ID ?? "",
    credits: 17500,
    price: 32.0,
  },
  {
    id: "1000-one-time",
    name: "1000 One Time",
    description:
      "Gets you started with improving and tracking your SEO performance",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_1000_ONE_TIME_PRICE_ID ?? "",
    credits: 35000,
    price: 58.0,
  },
  {
    id: "2000-one-time",
    name: "2000 One Time",
    description:
      "Gets you started with improving and tracking your SEO performance",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_2000_ONE_TIME_PRICE_ID ?? "",
    credits: 70000,
    price: 104.0,
  },
];
