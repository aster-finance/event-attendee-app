import Stripe from "stripe";
import { env } from "~/env";

const stripe = new Stripe(
  env.STRIPE_SECRET_KEY
);

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { lumaId, email } = body;
  // Create Checkout Sessions from body params.
  const customer = await stripe.customers.create({
    email: email,
    metadata: { lumaId: lumaId },
  });

  return Response.json({ stripeId: customer.id });
}

export async function GET(req: Request, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");
    console.log("customerId", customerId);
    if (!customerId) throw new Error("customerId is required");

    const customer = await stripe.customers.retrieve(customerId);

    if (customer.deleted) throw new Error("Customer not found");

    const isSubscribed = customer.subscriptions?.data
      ? customer.subscriptions.data.length > 0
      : false;
    return Response.json({
      email: customer.email,
      lumaId: customer.metadata.lumaId,
      isSubscribed: isSubscribed
    });
  } catch (err) {
    console.log("err", err);
    return Response.json({ error: "Error" + err});
  }
}
