import Link from "next/link";
import { redirect } from "next/navigation";
import { Attendee, Event, EventAttendee } from "~/types";
import { ExportButton } from "./ExportButton";
import { linkedinLogo, twitterLogo } from "./logos";

const eventInfo = {
  name: "Event 1",
  date: "2022-10-10",
  url: "https://www.lu.ma",
};

const attendees = [
  {
    name: "John Doe",
    linkedin: undefined,
    twitter: "https://www.twitter.com",
  },
  {
    name: "Jane Smith",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.twitter.com",
  },
  {
    name: "Michael Johnson",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.twitter.com",
  },
  {
    name: "Emily Brown",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.twitter.com",
  },
  {
    name: "David Wilson",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.twitter.com",
  },
  {
    name: "Sarah Davis",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.twitter.com",
  },
  {
    name: "Daniel Taylor",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.twitter.com",
  },
  {
    name: "Olivia Martinez",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.twitter.com",
  },
  {
    name: "James Anderson",
    linkedin: "https://www.linkedin.com",
    twitter: "https://www.twitter.com",
  },
];

const superAttendees = [
  ...attendees,
  ...attendees,
  ...attendees,
  ...attendees,
  ...attendees,
];

const user = "hdusukehuireh";

export default async function EventPage({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams: { lumaId: string };
}) {
  const db = await fetch("http:localhost:3000/db.json");
  const data = await db.json();
  const allEvents = data.events as Event[];
  const thisEvent = allEvents.find((event) => event.eventId === params.eventId);

  if (!thisEvent) {
    //TODO: Handle event not found
    redirect("/404");
  }

  const eventAttendees = data.event_attendees as EventAttendee[];
  const thisEventAttendeesIds = eventAttendees
    .filter((eventAttendee) => eventAttendee.eventId === thisEvent.eventId)
    .map((eventAttendee) => eventAttendee.lumaId);

  const allAttendees = data.attendees as Attendee[];

  const thisEventAttendees = allAttendees.filter((attendee) =>
    thisEventAttendeesIds.includes(attendee.lumaId),
  );

  const backgroundColor = `bg-[${thisEvent.color}]`;

  return (
    <main className={`flex min-h-screen justify-center px-3 py-3 sm:py-6`}>
      <div className="flex w-full max-w-5xl gap-8 max-sm:flex-col">
        <div className="flex w-[45%] flex-col gap-4 max-sm:w-full">
          {searchParams.lumaId && (
            <Link href={`/${searchParams.lumaId}`}>
              <p className="text-subtext hover:font-medium">&lsaquo; Back</p>
            </Link>
          )}
          <img
            src={thisEvent.image}
            className="aspect-square w-full self-center rounded-xl max-sm:w-3/5"
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-end justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{thisEvent.name}</h1>
              <p>{thisEvent.date}</p>
            </div>
            <ExportButton
              eventName={eventInfo.name}
              attendees={thisEventAttendees}
            />
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
                {thisEventAttendees.map((attendee, index) => (
                  <tr key={index}>
                    <td>
                      <div className="avatar">
                        <div className="w-12 rounded-xl">
                          <img src="https://cdn.lu.ma/avatars-default/avatar_21.png" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href={`http://localhost:3000/user/${attendee.lumaId}?lumaId=${searchParams.lumaId}`}
                      >
                        {attendee.name}
                      </a>
                    </td>
                    <td>
                      <a href={attendee.linkedin} target="_blank">
                        {attendee.linkedin ? linkedinLogo : ""}
                      </a>
                    </td>
                    <td>
                      <a href={attendee.twitter} target="_blank">
                        {attendee.twitter ? twitterLogo : ""}
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
