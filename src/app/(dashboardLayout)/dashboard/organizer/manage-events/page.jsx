import DashboardHeading from "@/components/DashboardHeading";
import React from "react";

const ManageEventPage = () => {
  return (
    <div>
      <DashboardHeading
        title="Manage Events"
        description={
          <>
            Track live <span className="text-pink-400/80">analytics</span> •{" "}
            monitor <span className="text-pink-400/80">ticket sales</span> •{" "}
            update <span className="text-pink-400/80">details</span> • view{" "}
            <span className="text-pink-400/80">attendees</span>
          </>
        }
      />

      {/* Your Event Management Control Panel / Table Will Go Here */}
    </div>
  );
};

export default ManageEventPage;
