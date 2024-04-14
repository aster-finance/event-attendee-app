import Link from "next/link";
import EventCard from "~/app/EventCard";
import { fetchConsentedSharedEvents } from "~/supabase";

export default async function UserPage({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: { lumaId: string };
}) {
  const { userId } = params;
  const { lumaId } = searchParams;

  const events = await fetchConsentedSharedEvents(lumaId, userId);

  return (
    <main className="flex flex-col min-h-screen bg-background gap-6">
      <div className="bg-pink-300 flex flex-col items-center justify-center p-8 gap-4">
        <div className="w-40 aspect-square rounded-xl bg-gray-300 object-clip">
        <img src={"avatar"} className="w-full" />
        </div>
        <h1 className="text-2xl font-bold text-text">{userId}</h1>
        <div className="flex gap-2">
          <p>Linkedin</p>
          <p>Twitter</p>
          <p>IG</p>
          </div>
      </div>
      <div className="flex flex-col max-w-5xl self-center items-start w-full">
        <h2 className="text-2xl text-text font-bold">Shared Events</h2>
        <div className="flex flex-col w-full gap-4">

        {events.map((event) => <EventCard event={event} lumaId={lumaId} />)}
        </div>
        </div>
    </main>
  );
}
