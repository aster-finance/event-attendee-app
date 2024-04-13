import Link from "next/link";

const events = [
  { id: 1, name: "Event 1", date: "2022-10-10" },
  { id: 2, name: "Event 2", date: "2022-11-15" },
  { id: 3, name: "Event 3", date: "2022-12-20" },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen justify-center bg-background p-12">
      <div className="container flex flex-col gap-12">
        <h1 className="text-text text-5xl font-semibold">Luma Saver</h1>
        <div className="flex w-[30rem] flex-col gap-6">
          {events.map((event) => (
            <Link href={`/event/${event.id}`} key={event.id}>
              <div className="hover:border-text w-full gap-1 rounded-xl border border-white bg-card p-3 pl-4 transition-all duration-300 hover:border-opacity-[.16] hover:shadow">
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
