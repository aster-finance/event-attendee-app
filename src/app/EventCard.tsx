import Link from "next/link";
import { formatDate } from "~/utils";
import type { Event } from "../types";

export default function EventCard({
  event,
  lumaId,
}: {
  event: Event;
  lumaId: string;
}) {
  const city =
    event.geo_address_info !== null ? event.geo_address_info.city : "";
  return (
    <Link href={`/event/${event.id}?lumaId=${lumaId}`}>
      <div className="flex w-full gap-4 rounded-xl border border-white bg-card p-3 pl-4 transition-all duration-300 hover:border-text hover:border-opacity-[.16] hover:shadow">
        <div className="w-full">
          <p className="text-subtext">{formatDate(event.start_at)}</p>
          <h2 className="text-xl font-medium">{event.name}</h2>
          <p className="text-subtext">{city}</p>
        </div>
        <div className="w-3/12">
          <div className="flex aspect-square w-full items-center overflow-clip rounded-xl bg-gray-200">
            <img
              src={event.cover_url ?? ""}
              alt={event.name + " main image"}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function EventCardLoading() {
  return (
    <div className="flex w-full animate-pulse gap-4 rounded-xl border border-white bg-card p-3 pl-4 transition-all duration-300 hover:border-text hover:border-opacity-[.16] hover:shadow">
      <div className="w-3/12">
        <div className="flex aspect-square w-full items-center overflow-clip rounded-xl bg-card"></div>
      </div>
    </div>
  );
}
