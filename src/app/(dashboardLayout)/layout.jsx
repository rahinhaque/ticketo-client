"use client";

import DashboardSidebar from "@/components/DashboardSidebar";


const DashboardLayout = ({ children }) => {


  return (
    <div className="min-h-screen flex bg-[#020203]">
     <DashboardSidebar/>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
