import Link from "next/link";
import { Event } from "../types";
import { formatDate } from "~/utils";

export default function EventCard({
  event,
  lumaId,
}: {
  event: Event;
  lumaId: string;
}) {
  return (
    <Link href={`/event/${event.id}?lumaId=${lumaId}`} key={event.id}>
      <div className="flex w-full gap-4 rounded-xl border border-white bg-card p-3 pl-4 transition-all duration-300 hover:border-text hover:border-opacity-[.16] hover:shadow">
        <div className="w-full">
          <p className="text-subtext">{formatDate(event.start_at)}</p>
          <h2 className="text-xl font-medium">{event.name}</h2>
          <p className="text-subtext">{event.geo_address_info ? "city" : ""}</p>
        </div>
        <div className="w-3/12">
          <div className="flex aspect-square w-full items-center overflow-clip rounded-xl bg-gray-200">
            <img
              src={event.cover_url ?? ""}
              alt={event.name + " main image"}
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
