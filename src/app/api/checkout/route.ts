import Stripe from "stripe";
import { env } from "~/env";
import { fetchSubscriptionData, insertSubscriptionData } from "~/supabase";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  const lumaId = formData.get("lumaId");

  if (!lumaId || typeof lumaId != "string")
    throw new Error("lumaId is required");

  const [subscription] = await fetchSubscriptionData(lumaId);
  let customerId;
  if (subscription && subscription.status === "active") {
    //already subscribed
    return Response.json({});
  } else if (subscription) {
    customerId = subscription.external_customer_id;
  } else {
    // Create Checkout Sessions from body params.
    const { id } = await stripe.customers.create({
      metadata: { lumaId: lumaId },
    });
    customerId = id;
  }

  // await insertSubscriptionData(lumaId, customer.id);

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of
        // the product you want to sell
        price: "price_1P4xzxIzfeJM2nkEjFqf5v2r",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.APP_BASE_URL}/${lumaId}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_BASE_URL}/cancel`,
  });

  return Response.redirect(session.url ?? "");
}

export async function GET(req: Request, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");
    if (!session_id) throw new Error("session_id is required");
    const session = await stripe.checkout.sessions.retrieve(session_id);

    return Response.json({
      status: session.status,
      customer_email: session.customer_details?.email,
    });
  } catch (err) {
    return Response.json({ error: "Error" + err });
  }
}
