import EventCard from "~/app/EventCard";
import {
  instagramLogo,
  linkedinLogo,
  twitterLogo,
} from "~/app/event/[eventId]/logos";
import { fetchConsentedSharedEvents, fetchUserById } from "~/supabase";
import { defaultAvatar } from "~/utils";

export default async function UserPage({
  params,
  searchParams,
}: {
  params: { friendId: string };
  searchParams: { lumaId: string; sessionId?: string; customerId?: string };
}) {
  const { friendId } = params;
  const { lumaId } = searchParams;

  const events = await fetchConsentedSharedEvents(lumaId, friendId);
  const friend = await fetchUserById(friendId);

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-white">
      <div className="flex flex-col items-center justify-center gap-4 bg-[#FEF8FA] p-8">
        <div className="object-clip aspect-square w-32 overflow-clip rounded-xl">
          <img src={friend.avatar_url ?? defaultAvatar} className="w-full" />
        </div>
        <h1 className="text-3xl font-semibold text-text">{friend.name}</h1>
        <div className="flex gap-2">
          {friend.linkedin_handle && (
            <a
              href={`https://linkedin.com${friend.linkedin_handle}`}
              target="_blank"
            >
              {linkedinLogo}
            </a>
          )}
          {friend.twitter_handle && (
            <a href={`https://x.com/${friend.twitter_handle}`} target="_blank">
              {twitterLogo}
            </a>
          )}
          {friend.instagram_handle && (
            <a
              href={`https://instagram.com${friend.instagram_handle}`}
              target="_blank"
            >
              {instagramLogo}
            </a>
          )}
        </div>
      </div>
      <div className="flex w-full max-w-5xl flex-col items-start gap-6 self-center px-4">
        <h2 className="text-2xl font-bold text-text">Shared Events</h2>
        <div className="flex flex-col gap-4 px-4">
          {events.map((event) => (
            <EventCard event={event} lumaId={lumaId} key={event.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
