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
  if (subscription?.external_customer_id) return Response.json({});

  // Create Checkout Sessions from body params.
  const customer = await stripe.customers.create({
    metadata: { lumaId: lumaId },
  });

  await insertSubscriptionData(lumaId, customer.id);

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of
        // the product you want to sell
        price: "price_1P4xzxIzfeJM2nkEjFqf5v2r",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3002/cancel",
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
