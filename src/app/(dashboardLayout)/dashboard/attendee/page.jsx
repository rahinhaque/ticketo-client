"use server";

import DashboardHeading from "@/components/DashboardHeading";
import { Card } from "@heroui/react";
import Link from "next/link";
import React from "react";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaTicketAlt,
  FaCompass,
  FaClock,
} from "react-icons/fa";

const AttendeeOverviewPage = async () => {
  // Replace these with database values later
  const stats = {
    totalTickets: 8,
    upcomingEvents: 3,
    totalSpent: 420,
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <DashboardHeading
        title="Attendee Overview"
        description={
          <>
            Manage your <span className="text-pink-400/80">tickets</span> •
            track your <span className="text-pink-400/80">upcoming events</span>{" "}
            • view <span className="text-pink-400/80">payments</span> • never
            miss an <span className="text-pink-400/80">experience</span>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Tickets Purchased
              </p>

              <h2 className="text-3xl font-extrabold text-white mt-1">
                {stats.totalTickets}
              </h2>
            </div>

            <div className="p-3.5 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <FaTicketAlt size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Upcoming Events
              </p>

              <h2 className="text-3xl font-extrabold text-white mt-1">
                {stats.upcomingEvents}
              </h2>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FaCalendarAlt size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Total Spent
              </p>

              <h2 className="text-3xl font-extrabold text-white mt-1">
                ${stats.totalSpent.toFixed(2)}
              </h2>
            </div>

            <div className="p-3.5 rounded-2xl bg-green-500/10 text-green-400 border border-green-500/20">
              <FaDollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card
        className="border border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 via-blue-600/5 to-transparent"
        radius="lg"
      >
        <div className="p-8 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaCompass className="text-cyan-400" />
              Discover Your Next Event
            </h3>

            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              Explore concerts, workshops, festivals, sports, and many more
              exciting events happening around you. Secure your seats before
              they sell out.
            </p>
          </div>

          <Link
            href="/events"
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-white whitespace-nowrap self-start md:self-center"
          >
            Browse Events
          </Link>
        </div>
      </Card>

      {/* Upcoming Reminder */}
      <Card
        className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent"
        radius="lg"
      >
        <div className="p-8 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <FaClock className="text-yellow-400 text-xl" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              Upcoming Event Reminder
            </h3>

            <p className="text-slate-400 text-sm mt-1">
              You have{" "}
              <span className="text-yellow-400 font-semibold">
                {stats.upcomingEvents}
              </span>{" "}
              upcoming event{stats.upcomingEvents !== 1 && "s"}. Don't forget to
              check your tickets and arrive on time.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendeeOverviewPage;
