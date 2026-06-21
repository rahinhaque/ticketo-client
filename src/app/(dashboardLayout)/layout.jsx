"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import Logo from "@/components/Logo";
import { FaBars } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#020203]">
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-white/5 backdrop-blur-xl z-30">
        <Logo />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition focus:outline-none cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <FaBars size={18} />
        </button>
      </div>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out shrink-0`}
      >
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Content Area */}
      <div className="flex-1 px-6 py-10 max-w-5xl w-full mx-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
