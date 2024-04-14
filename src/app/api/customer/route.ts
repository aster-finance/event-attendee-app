import Stripe from "stripe";
import { env } from "~/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

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
      isSubscribed: isSubscribed,
    });
  } catch (err) {
    console.log("err", err);
    return Response.json({ error: "Error" + err });
  }
}
