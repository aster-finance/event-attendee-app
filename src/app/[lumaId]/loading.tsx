import { EventCardLoading } from "../EventCard";

export default function LumaIdLoading() {
  return (
    <main className="flex min-h-screen justify-center bg-background px-2 py-4">
      <div className="flex max-w-5xl flex-col gap-8 py-4">
        <h1 className="text-4xl font-semibold text-text">Who was at</h1>
        <div className="flex w-full max-w-[40rem] flex-col gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <EventCardLoading key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
