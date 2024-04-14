import Link from "next/link";
import { Event, Scrape } from "~/types";

const events = [
  { id: 1, name: "Event 1", date: "2022-10-10" },
  { id: 2, name: "Event 2", date: "2022-11-15" },
  { id: 3, name: "Event 3", date: "2022-12-20" },
];

export default async function LumaUserPage({
  params,
}: {
  params: { lumaId: string };
}) {
  const db = await fetch("http:localhost:3000/db.json");
  const data = await db.json();
  const allScrapes = data.scrapes as Scrape[];
  const myScrapedEvents = allScrapes.filter(
    (scrape) => scrape.lumaId === params.lumaId,
  );
  // TODO: Handle no scrapes exist

  const allEvents = data.events as Event[];
  const myEvents = allEvents.filter((event) =>
    myScrapedEvents.some((scrape) => scrape.eventId === event.eventId),
  );

  return (
    <main className="flex min-h-screen justify-center bg-background">
      <div className="container flex flex-col gap-12">
        <h1 className="text-5xl font-semibold text-text">Luma Saver</h1>
        <div className="flex w-[30rem] flex-col gap-6">
          {myEvents.map((event) => (
            <Link
              href={`/event/${event.eventId}?lumaId=${params.lumaId}`}
              key={event.eventId}
            >
              <div className="w-full gap-1 rounded-xl border border-white bg-card p-3 pl-4 transition-all duration-300 hover:border-text hover:border-opacity-[.16] hover:shadow">
                <h2 className="text-2xl">{event.name}</h2>
                <p className="text-subtext">{event.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
