import { getEventDescription } from "@/lib/api/events/data";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Tag,
  Users,
  ArrowLeft,
  Ticket,
  Mail,
} from "lucide-react";

const EventDetails = async ({ params }) => {
  const { id } = await params;
  const event = await getEventDescription(id);

  const formattedDate = event?.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBA";

  const isFree = !event?.price || Number(event.price) === 0;
  const isSoldOut = Number(event?.seats) <= 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
        {event?.banner ? (
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}

        {/* Gradient fade — image bleeds into page */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-5 left-5">
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white bg-black/30 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-xl transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Events
          </Link>
        </div>

        {/* Category badge */}
        {event?.category && (
          <span className="absolute top-5 right-5 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10">
            {event.category}
          </span>
        )}
      </div>

      {/* ── Main Content — overlaps hero via negative margin ── */}
      <div className="relative -mt-24 max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: Event Info ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Title block */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                {event?.title}
              </h1>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-pink-400" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-pink-400" />
                  {event?.location || "Location TBA"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag size={14} className="text-pink-400" />
                  {event?.category || "General"}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Description */}
            <div>
              <h2 className="text-base font-bold text-slate-300 uppercase tracking-wider mb-3">
                About this Event
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-line">
                {event?.description || "No description provided."}
              </p>
            </div>

            {/* Organizer */}
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-0.5">
                  Organized by
                </p>
                <p className="text-sm text-white font-medium">
                  {event?.organizerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Ticket Card ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Price header */}
              <div className="bg-gradient-to-r from-pink-500/20 to-indigo-600/20 border-b border-white/5 p-6">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Ticket Price
                </p>
                <p className="text-4xl font-extrabold text-white">
                  {isFree ? (
                    "Free"
                  ) : (
                    <>
                      <span className="text-2xl font-semibold text-slate-400 mr-1">
                        $
                      </span>
                      {event.price}
                    </>
                  )}
                </p>
              </div>

              {/* Stats */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Users size={14} className="text-indigo-400" />
                    Available Seats
                  </span>
                  {isSoldOut ? (
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      Sold Out
                    </span>
                  ) : (
                    <span className="font-bold text-white">
                      {Number(event?.seats).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Calendar size={14} className="text-indigo-400" />
                    Date
                  </span>
                  <span className="font-bold text-white text-right max-w-[140px] leading-snug">
                    {new Date(event?.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-400">
                    <MapPin size={14} className="text-indigo-400" />
                    Location
                  </span>
                  <span className="font-bold text-white">
                    {event?.location}
                  </span>
                </div>

                <div className="border-t border-white/5 pt-4">
                  {isSoldOut ? (
                    <button
                      disabled
                      className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 font-bold py-3 rounded-xl text-sm cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-indigo-600 hover:opacity-90 transition-opacity text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-500/10 text-sm">
                      <Ticket size={16} />
                      {isFree ? "Reserve a Spot" : "Buy Ticket"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
