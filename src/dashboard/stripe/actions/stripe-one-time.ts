"use server";

import { BASE_URL } from "../../../../routes";
import { stripe } from "../stripe";

interface ManageStripeBuyOneTimeProductActionProps {
  userId: string;
  email: string;
  stripePriceId: string;
}

export const manageStripeBuyOneTimeProductAction = async ({
  userId,
  email,
  stripePriceId,
}: ManageStripeBuyOneTimeProductActionProps) => {
  const billingUrl = `${BASE_URL}/app/billing`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "ideal", "paypal"],
    mode: "payment",
    line_items: [
      {
        price: stripePriceId,
        quantity: 1,
      },
    ],
    customer_email: email,
    success_url: billingUrl,
    cancel_url: billingUrl,
    metadata: {
      userId: userId,
      stripePriceId: stripePriceId,
    },
  });

  return { url: session.url };
};
