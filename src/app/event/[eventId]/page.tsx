import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchConsentedAttendeesForUser, fetchEventById } from "~/supabase";
import { defaultAvatar, formatDate } from "~/utils";
import { ExportButton } from "./ExportButton";
import { linkedinLogo, twitterLogo } from "./logos";

export default async function EventPage({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams: { lumaId: string };
}) {
  const { eventId } = params;
  const { lumaId } = searchParams;

  const [event] = await fetchEventById(eventId);
  const attendees = await fetchConsentedAttendeesForUser(lumaId, eventId);

  if (!event) return redirect("/404");

  const backgroundColor = `bg-[${event.tint_color}]`;

  return (
    <main className={`flex min-h-screen justify-center px-3 py-3 sm:py-6`}>
      <div className="flex w-full max-w-5xl gap-8 max-sm:flex-col">
        <div className="flex w-[45%] flex-col gap-4 max-sm:w-full">
          {searchParams.lumaId && (
            <Link href={`/${searchParams.lumaId}`}>
              <p className="text-subtext hover:font-medium">&lsaquo; Back</p>
            </Link>
          )}
          <div className="flex aspect-square w-full items-center self-center overflow-clip rounded-xl bg-gray-200 max-sm:w-3/5">
            <img
              src={event.cover_url ?? defaultAvatar}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex gap-2 text-lg text-subtext max-sm:self-center">
            <p>{attendees.length} Attendees</p>
            <p>&bull;</p>
            <p>
              {attendees.filter((a) => !!a.linkedin_handle).length} Linkedins
            </p>
          </div>
          <ExportButton eventName={event.name ?? ""} attendees={attendees} />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-3xl font-bold">{event.name}</h1>
            <div className="flex gap-2 text-xl text-subtext max-sm:self-center">
              <h2>{formatDate(event.start_at)}</h2>
              {event.geo_address_info["city"] && <h2>&bull;</h2>}
              <h2>{event.geo_address_info["city"]}</h2>
            </div>
          </div>
          <div className="overflow-auto rounded-xl border border-text border-opacity-[.16]">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>LinkedIn</th>
                  <th>Twitter</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr key={index}>
                    <td>
                      <div className="avatar">
                        <div className="w-12 rounded-xl">
                          <img src={attendee.avatar_url ?? defaultAvatar} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href={`/user/${attendee.id}?lumaId=${searchParams.lumaId}`}
                      >
                        {attendee.name}
                      </a>
                    </td>
                    <td>
                      <a
                        href={`https://linkedin.com/${attendee.linkedin_handle}`}
                        target="_blank"
                      >
                        {attendee.linkedin_handle ? linkedinLogo : ""}
                      </a>
                    </td>
                    <td>
                      <a
                        href={`https://x.com/${attendee.twitter_handle}`}
                        target="_blank"
                      >
                        {attendee.twitter_handle ? twitterLogo : ""}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
