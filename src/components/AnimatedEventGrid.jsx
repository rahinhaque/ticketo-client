"use client";

import Link from "next/link";
import { MapPin, Calendar, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function statusClass(status) {
  if (status === "approved") return "bg-green-500/10 text-green-400 border-green-500/20";
  if (status === "rejected") return "bg-red-500/10 text-red-400 border-red-500/20";
  return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
}

export default function AnimatedEventGrid({ events }) {
  if (!events || events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <p className="text-slate-400 font-medium text-lg">No events found</p>
        <p className="text-slate-600 text-sm mt-1">Try adjusting your filters or search term</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {events.map((event) => (
        <motion.div
          key={event._id}
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex flex-col rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-xl overflow-hidden hover:border-pink-500/30 hover:shadow-pink-500/8 hover:shadow-2xl transition-colors duration-200"
        >
          {/* Banner */}
          <div className="relative h-44 w-full overflow-hidden bg-slate-800">
            {event.banner ? (
              <img
                src={event.banner}
                alt={event.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-600 text-sm">
                No Image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            <span
              className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusClass(event.status)}`}
            >
              {event.status || "pending"}
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            <h2 className="text-white font-bold text-lg leading-snug line-clamp-1">{event.title}</h2>

            <div className="flex flex-col gap-1.5 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar size={13} className="text-pink-400 shrink-0" />
                {event.date
                  ? new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "TBA"}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-pink-400 shrink-0" />
                {event.location || "Location TBA"}
              </span>
              <span className="flex items-center gap-2">
                <Tag size={13} className="text-pink-400 shrink-0" />
                {event.category || "General"}
              </span>
            </div>

            <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{event.description}</p>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-green-400 font-bold text-sm">
                {event.price == 0 ? "Free" : `$${event.price}`}
              </span>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/events/${event._id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-indigo-600 px-3 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md shadow-pink-500/15"
                >
                  View Details <ArrowRight size={12} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
