import Link from "next/link";
import { fetchConsentedEventsForUser } from "~/supabase";
import { formatDate } from "~/utils";
import ClientConsole from "./Client";
import EventCard from "../EventCard";

export default async function LumaUserPage({
  params,
}: {
  params: { lumaId: string };
}) {
  const events = await fetchConsentedEventsForUser(params.lumaId);

  return (
    <main className="flex min-h-screen justify-center bg-background px-2 py-4">
      <div className="max-w-5xl flex flex-col gap-8 py-4">
        <ClientConsole event={events} />
        <h1 className="text-4xl font-semibold text-text">Luma Saver</h1>
        <div className="flex max-w-[40rem] w-full flex-col gap-6">
          {events.map((event) => (
            <EventCard event={event} lumaId={params.lumaId} />
          ))}
        </div>
      </div>
    </main>
  );
}
