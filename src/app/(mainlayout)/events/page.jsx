import baseUrl from "@/lib/api/baseUrl";
import Link from "next/link";
import { MapPin, Calendar, Tag, ArrowRight } from "lucide-react";
import { fetchEvents } from "@/lib/api/events/data";



const EventsPage = async () => {
  const events = await fetchEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">All Events</h1>
      <p className="text-slate-400 mb-8">
        Browse and discover upcoming experiences
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event) => (
          <div
            key={event._id}
            className="flex flex-col rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-xl overflow-hidden hover:border-pink-500/30 transition-colors duration-200"
          >
            {/* Banner */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-800">
              {event.banner ? (
                <img
                  src={event.banner}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-600 text-sm">
                  No Image
                </div>
              )}
              {/* Status badge */}
              <span
                className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border
                  ${
                    event.status === "approved"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : event.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  }`}
              >
                {event.status || "pending"}
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5 gap-3">
              <h2 className="text-white font-bold text-lg leading-snug line-clamp-1">
                {event.title}
              </h2>

              <div className="flex flex-col gap-1.5 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <Calendar size={13} />
                  {event.date
                    ? new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "TBA"}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={13} />
                  {event.location || "Location TBA"}
                </span>
                <span className="flex items-center gap-2">
                  <Tag size={13} />
                  {event.category || "General"}
                </span>
              </div>

              <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                {event.description}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-green-400 font-bold text-sm">
                  {event.price == 0 ? "Free" : `$${event.price}`}
                </span>
                <Link
                  href={`/events/${event._id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-indigo-600 px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Details <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
