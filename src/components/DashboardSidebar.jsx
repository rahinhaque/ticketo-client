import Logo from "@/components/Logo";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaDollarSign,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

const DashboardSidebar = () => {
  //Getting the role from the session
  const { data: session } = useSession();

  //Organizer Menu==============================================================
  const organizerMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaUsers,
      href: "/dashboard/organizer",
    },
    {
      key: "organization",
      label: "Organization",
      icon: FaBuilding,
      href: "/dashboard/organizer/organization",
    },
    {
      key: "add-event",
      label: "Add Event",
      icon: FaPlus,
      href: "/dashboard/organizer/add-event",
    },
    {
      key: "manage-events",
      label: "Manage Events",
      icon: FaCalendarAlt,
      href: "/dashboard/organizer/manage-events",
    },
    {
      key: "attendees",
      label: "Attendees",
      icon: FaUsers,
      href: "/dashboard/organizer/attendees",
    },
  ];
  //attendee Menu==============================================================
  const attendeeMenu = [
    {
      key: "home",
      label: "Home",
      icon: FaHome,
      href: "/dashboard/attendee",
    },
    {
      key: "tickets",
      label: "My Tickets",
      icon: FaCalendarAlt,
      href: "/dashboard/tickets",
    },
    {
      key: "payment",
      label: "Payment",
      icon: FaDollarSign,
      href: "/dashboard/payment",
    }
  ];

  //Admin Menu==============================================================
  const adminMenu = [
    {
      key: "users",
      label: "Users",
      icon: FaUsers,
      href: "/dashboard/users",
    },
    {
      key: "events",
      label: "Events",
      icon: FaCalendarAlt,
      href: "/dashboard/events",
    },
    {
      key : "transactions",
      label: "Transactions",
      icon: FaDollarSign,
      href: "/dashboard/transactions",
    }
  ];
  // const role = "admin"; //For Testing
  // const role = "attendee"; //For Testing
  const role = session?.user?.role;


  const menuItems = role === "organizer" ? organizerMenu : role === "attendee" ? attendeeMenu : adminMenu;



  //handleLogout
  const handleLogout = () => {
    alert("Sign Out Clicked! (Design Only)");
  };

  return (
    <aside className="w-64 h-screen border-r border-white/5">
      <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
        {/* Brand / Logo */}
        <div className="px-6 py-5 border-b border-white/5">
          <Logo />
        </div>

        {/* User Profile */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
              <Image
                width={40}
                height={40}
                src={
                  session?.user?.image ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || "Jane Doe")}&background=7c3aed&color=fff&bold=true`
                }
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-bold truncate leading-tight">
                {session?.user?.name || "Jane Doe"}
              </p>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "organizer" ? "text-indigo-400" : "text-pink-400"}`}
              >
                {role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">
            Navigation
          </p>
          {menuItems?.map(({ key, label, icon: Icon, href }) => {
            return (
              <Link
                key={key}
                href={href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left cursor-pointer
          text-slate-400 hover:text-white
          ${role === "admin" ? "hover:bg-yellow-500/10" : role === "organizer" ? "hover:bg-indigo-500/10" : "hover:bg-pink-500/10"}
        `}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors text-white shadow-md
            ${role === "admin" ? "bg-yellow-500/20 shadow-yellow-500/20" : role === "organizer" ? "bg-indigo-500/20 shadow-indigo-500/20" : "bg-pink-500/20 shadow-pink-500/20"}
          `}
                >
                  <Icon size={20} />
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaHome size={13} />
            </span>
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <FaSignOutAlt size={13} />
            </span>
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};;

export default DashboardSidebar;
