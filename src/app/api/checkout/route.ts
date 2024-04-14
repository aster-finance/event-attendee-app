import Stripe from "stripe";
import { env } from "~/env";
import { fetchSubscriptionData } from "~/supabase";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  const lumaId = formData.get("lumaId");

  if (!lumaId || typeof lumaId != "string")
    throw new Error("lumaId is required");

  let customerId = "";

  const hasCustomerId = await stripe.customers.search({
    query: `metadata[lumaId]:${lumaId}`,
    limit: 1,
  });

  if (!hasCustomerId.data || !hasCustomerId.data[0]){
    const customer = await stripe.customers.create({
      metadata: { lumaId: lumaId },
    });
    customerId = customer.id;
  } else {
    customerId = hasCustomerId.data[0].id;
  }

  const [subscription] = await fetchSubscriptionData(lumaId);
  if (subscription && subscription.status === "active") {
    //already subscribed
    return Response.redirect(env.APP_BASE_URL + "/" + lumaId);
  }
 
  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: "price_1P4xzxIzfeJM2nkEjFqf5v2r",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${env.APP_BASE_URL}/${lumaId}?customerId=${customerId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: env.APP_BASE_URL,
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
