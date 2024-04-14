import Link from "next/link";
import { Event } from "../types";
import { formatDate } from "~/utils";

export default function EventCard({ event, lumaId }: { event: Event, lumaId: string }) {
  return (
    <Link
              href={`/event/${event.id}?lumaId=${lumaId}`}
              key={event.id}
            >
              <div className="w-full gap-4 rounded-xl border border-white bg-card p-3 pl-4 transition-all duration-300 hover:border-text hover:border-opacity-[.16] hover:shadow flex">
                <div className="w-full">
                <p className="text-subtext">{formatDate(event.start_at)}</p>
                <h2 className="text-xl font-medium">{event.name}</h2>
                <p className="text-subtext">{event.geo_address_info ? (event.geo_address_info["city"] ?? "") :  ""}</p>
                </div>
                <div className="w-3/12">
                  <div className="bg-gray-200 w-full aspect-square rounded-xl flex items-center overflow-clip">
                  <img src={event.cover_url ?? ""} alt={event.name + " main image"} className="object-cover w-full"/>
                    </div>
                </div>
              </div>
            </Link>
  );
}