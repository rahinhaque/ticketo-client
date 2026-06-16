"use server";
import DashboardHeading from "@/components/DashboardHeading";
import UpgradePremiumButton from "@/components/UpgradePremiumButton";
import { getUser } from "@/lib/api/session";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { Card } from "@heroui/react";
import { headers } from "next/headers";
import React from "react";
import {
  FaCalendarAlt,
  FaCrown,
  FaDollarSign,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const OrganizerOverviewPage = async () => {
  const stats = {
    totalEvents: 15,
    totalAttendees: 450,
    totalRevenue: 25000,
    totalSoldTickets: 780,
  };

  const user = await getUser();
  // console.log(user);
  const isPremium = user?.isPremium;
  // const isPremium = true;



  return (
    <div className="space-y-6">
      {/* Neon Cyberpunk Heading Section */}
      <DashboardHeading
        title="Organizer Overview"
        description={
          <>
            Track platform <span className="text-pink-400/80">metrics</span> •{" "}
            analyze <span className="text-pink-400/80">revenue stream</span> •{" "}
            monitor <span className="text-pink-400/80">ticket velocity</span> •{" "}
            scale your <span className="text-pink-400/80">brand</span>
          </>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Hosted Events
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.totalEvents}
              </h2>
            </div>
            <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">
              <FaCalendarAlt size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Ticket Sales
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {stats.totalAttendees}
              </h2>
            </div>
            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
              <FaUsers size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Accumulated Revenue
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {`$${stats.totalRevenue.toFixed(2)}`}
              </h2>
            </div>
            <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
              <FaDollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Premium Upgrade Alert Banner */}
      {/* Premium Banner — shows based on isPremium */}
      {isPremium ? (
        <Card
          className="border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-green-600/5 to-transparent relative overflow-hidden"
          radius="lg"
        >
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />{" "}
                You're a Premium Member
              </h3>
              <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                Enjoy{" "}
                <strong className="text-emerald-400">
                  unlimited event creation
                </strong>{" "}
                and all premium perks. Your audience is waiting — go ahead and
                create something amazing.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-3 shrink-0">
              <FaCheckCircle className="text-emerald-400 text-lg" />
              <span className="text-emerald-300 font-bold text-sm uppercase tracking-wider">
                Premium Active
              </span>
            </div>
          </div>
        </Card>
      ) : (
        <Card
          className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent relative overflow-hidden"
          radius="lg"
        >
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />{" "}
                Unlock Unlimited Event Creation
              </h3>
              <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
                Standard organizer accounts are limited to{" "}
                <strong className="text-amber-400">3 events</strong>. Upgrade to
                our Premium Package for{" "}
                <strong className="text-amber-400">$49.00</strong> to host
                unlimited events.
              </p>
            </div>
            <UpgradePremiumButton/>
          </div>
        </Card>
      )}
    </div>
  );
};

export default OrganizerOverviewPage;
