import Link from "next/link";
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

export default function EventPage() {
  return (
    <main className="flex min-h-screen justify-center bg-background p-4 sm:p-12">
      <div className="container flex flex-col gap-12">
        {user && (
          <Link href={`/${user}`}>
            <p className="text-subtext hover:font-medium">&lsaquo; Back</p>
          </Link>
        )}
        <div className="max-xs:flex-col flex w-full items-end justify-between ">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-text text-3xl font-semibold">
                {eventInfo.name}
              </h1>
              <a
                href={eventInfo.url}
                target="_blank"
                className="text-text text-xl"
              >
                &#x1F310;
              </a>
            </div>
            <p className="text-subtext">{eventInfo.date}</p>
            <div className="flex gap-1">
              <p className="badge badge-outline text-text">92</p>
              <p className="badge badge-outline text-text">70</p>
              <p className="badge badge-outline text-text">23</p>
            </div>
          </div>
          <ExportButton eventName={eventInfo.name} attendees={superAttendees} />
        </div>
        <div className="border-text overflow-auto rounded-xl border border-opacity-[.16]">
          <table className="table-zebra table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>LinkedIn</th>
                <th>Twitter</th>
              </tr>
            </thead>
            <tbody>
              {superAttendees.map((attendee, index) => (
                <tr key={index}>
                  <td>
                    <div className="avatar">
                      <div className="w-12 rounded-xl">
                        <img src="https://cdn.lu.ma/avatars-default/avatar_21.png" />
                      </div>
                    </div>
                  </td>
                  <td>{attendee.name}</td>
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
        <div className="text-text flex w-full items-center">
          <p>Create an account to save</p>
        </div>
      </div>
    </main>
  );
}
