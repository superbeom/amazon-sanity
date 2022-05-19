import Stripe from "stripe";

import { exchangeImageUrl } from "../../lib/utils";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const cartItems = req.body;

      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: process.env.NEXT_PUBLIC_STRIPE_FREE_SHIPPING_ID },
          { shipping_rate: process.env.NEXT_PUBLIC_STRIPE_FAST_SHIPPING_ID },
        ],
        shipping_address_collection: {
          allowed_countries: ["KR"],
        },
        phone_number_collection: {
          enabled: true,
        },
        line_items: cartItems.map((item) => {
          const updatedImage = exchangeImageUrl(item.image[0].asset._ref);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [updatedImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.referer}`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
