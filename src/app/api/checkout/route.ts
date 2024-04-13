import Stripe from "stripe";
import { env } from "~/env";

const stripe = new Stripe(
  env.STRIPE_SECRET_KEY
);

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  const customerId = formData.get('customerId');
  if (!customerId || typeof customerId != "string") throw new Error('customerId is required');
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of
              // the product you want to sell
              price: 'price_1P4xzxIzfeJM2nkEjFqf5v2r',
              quantity: 1,
            },
          ],
          mode: 'subscription',
          success_url:
            `http://localhost:3001/return?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:3001/cancel',
        });

        return Response.redirect(session.url ?? "");

}

export async function GET(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url); 
        const session_id = searchParams.get('session_id');
        if (!session_id) throw new Error('session_id is required');
        const session =
          await stripe.checkout.sessions.retrieve(session_id);

        return Response.json({
          status: session.status,
          customer_email: session.customer_details?.email
        });
      } catch (err) {
        return Response.json({error: "Error" + err});
      }
    }