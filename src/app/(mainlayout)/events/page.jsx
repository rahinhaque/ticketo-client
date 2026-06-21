import Link from "next/link";
import { MapPin, Calendar, Tag, ArrowRight } from "lucide-react";
import { fetchEventsQuery } from "@/lib/api/events/data";
import { Suspense } from "react";
import EventFilters from "@/components/Eventfilters";
import AnimatedEventGrid from "@/components/AnimatedEventGrid";

const EventsPage = async ({ searchParams }) => {
  const { search, category, location, sort } = await searchParams;
  const events = await fetchEventsQuery({ search, category, location, sort });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">All Events</h1>
        <p className="text-slate-400 mb-6">Browse and discover upcoming experiences</p>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-11 mb-8 rounded-xl bg-slate-900/40 animate-pulse" />}>
        <EventFilters />
      </Suspense>

      {/* Results count */}
      <p className="text-xs text-slate-500 mb-4">
        {events.length} event{events.length !== 1 ? "s" : ""} found
      </p>

      <AnimatedEventGrid events={events} />
    </div>
  );
};

export default EventsPage;
