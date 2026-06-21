"use client";

import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

const DEFAULT_EVENT = {
  _id: "default-event",
  title: "Tech Innovation Summit 2026",
  category: "Conference",
  banner: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
  date: "October 24, 2026",
  location: "Silicon Valley, CA",
  ticketPrice: 99.0,
};

export default function EventCard({ event = DEFAULT_EVENT, buttonText = "View Details", index = 0 }) {
  const currentEvent = event || DEFAULT_EVENT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card
        className="bg-slate-900/50 border border-white/5 backdrop-blur-xl hover:border-pink-500/30 transition-all duration-300 h-full flex flex-col p-0 overflow-hidden hover:shadow-2xl hover:shadow-pink-500/8"
        radius="lg"
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={
              currentEvent.banner &&
              (currentEvent.banner.startsWith("http") || currentEvent.banner.startsWith("/"))
                ? currentEvent.banner
                : "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
            }
            alt={currentEvent.title}
            fill
            className="object-cover transform group-hover:scale-110 transition duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay gradient on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-pink-400 font-bold text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border border-pink-500/20 z-10">
            {currentEvent.category}
          </span>
        </div>
        <div className="p-6 flex-grow space-y-4">
          <h3 className="text-xl font-bold text-white hover:text-pink-500 transition-colors line-clamp-1">
            {currentEvent.title}
          </h3>
          <div className="space-y-2 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-pink-500/80 shrink-0" />
              <span>{currentEvent.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-500/80 shrink-0" />
              <span className="truncate">{currentEvent.location}</span>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 pt-3 flex justify-between items-center border-t-2 border-white/5 mt-auto">
          <span className="text-pink-400 font-extrabold text-lg">
            {currentEvent.ticketPrice === 0
              ? "Free"
              : `$${Number(currentEvent.ticketPrice).toFixed(2)}`}
          </span>
          <Link href={`/events/${currentEvent._id}`}>
            <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold h-9 px-4 text-xs shadow-md shadow-pink-500/20"
              >
                {buttonText}
              </Button>
            </motion.div>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
