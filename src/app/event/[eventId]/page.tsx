import Link from "next/link";
import { redirect } from "next/navigation";
import { ExportButton } from "./ExportButton";
import { linkedinLogo, twitterLogo } from "./logos";
import { fetchConsentedAttendeesForUser, fetchEventById } from "~/supabase";
import { formatDate } from "~/utils";

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
          {event?.cover_url && (
            <img
              src={event.cover_url}
              className="aspect-square w-full self-center rounded-xl max-sm:w-3/5"
            />
          )}
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-end justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{event.name}</h1>
              <p className="text-lg text-subtext">{formatDate(event.start_at)}</p>
            </div>
            <ExportButton eventName={event.name ?? event.start_at ?? ""} attendees={attendees}/>
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
                          <img
                            src={
                              attendee.avatar_url ??
                              "https://cdn.lu.ma/avatars-default/avatar_21.png"
                            }
                          />
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
