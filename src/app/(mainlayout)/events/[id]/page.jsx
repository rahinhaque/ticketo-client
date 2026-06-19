import { getEventDescription } from "@/lib/api/events/data";
import { auth } from "@/lib/auth"; // adjust to your actual server auth export
import { headers } from "next/headers";
import Link from "next/link";
import { MapPin, Calendar, Tag, ArrowLeft, Mail } from "lucide-react";
import TicketCard from "./TicketCard"; // adjust path as needed

const EventDetails = async ({ params }) => {
  const { id } = await params;
  const event = await getEventDescription(id);

  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user || null;
  const isOrganizer = user?.role === "organizer";

  const formattedDate = event?.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBA";

  const shortDate = event?.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "TBA";

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

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute top-5 left-5">
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white bg-black/30 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-xl transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Events
          </Link>
        </div>

        {event?.category && (
          <span className="absolute top-5 right-5 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10">
            {event.category}
          </span>
        )}
      </div>

      <div className="relative -mt-24 max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: Event Info ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
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

            <div className="border-t border-white/5" />

            <div>
              <h2 className="text-base font-bold text-slate-300 uppercase tracking-wider mb-3">
                About this Event
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm whitespace-pre-line">
                {event?.description || "No description provided."}
              </p>
            </div>

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
            <TicketCard
              price={event?.price}
              seats={event?.seats}
              date={shortDate}
              location={event?.location}
              isOrganizer={isOrganizer}
              eventId={event?._id}
              eventTitle={event?.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
