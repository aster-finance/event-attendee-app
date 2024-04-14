import Stripe from "stripe";
import { env } from "~/env";
import {
  fetchConsentedEventsForUser,
  insertSubscriptionData,
} from "~/supabase";
import EventCard from "../EventCard";
import SubscribeAlert from "./SubscribeAlert";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export default async function LumaUserPage({
  params,
  searchParams,
}: {
  params: { lumaId: string };
  searchParams: { sessionId?: string; customerId?: string };
}) {
  const events = await fetchConsentedEventsForUser(params.lumaId);
  const { sessionId, customerId } = searchParams;

  if (customerId && sessionId) {
    await handleSuccessfulPremium(params.lumaId, customerId, sessionId);
  }

  return (
    <>
      {sessionId && customerId && <SubscribeAlert />}
      <main className="flex min-h-screen justify-center bg-background px-2 py-4">
        <div className="flex max-w-5xl flex-col gap-8 py-4">
          <h1 className="text-4xl font-semibold text-text">Who was at</h1>
          <div className="flex w-full max-w-[40rem] flex-col gap-6">
            {events.map((event) => (
              <EventCard event={event} lumaId={params.lumaId} key={event.id} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

async function handleSuccessfulPremium(
  lumaId: string,
  customerId: string,
  sessionId: string,
) {
  console.log("Successful premium purchase");
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session) await insertSubscriptionData(lumaId, customerId, true);
  } catch (error) {
    console.error(error);
  }
}
