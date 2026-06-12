import DashboardHeading from "@/components/DashboardHeading";
import React from "react";

const Attendee = () => {
  return (
    <div>
      <DashboardHeading
        title="Attendee Management"
        description={
          <>
            Track guest <span className="text-pink-400/80">registrations</span>{" "}
            • verify <span className="text-pink-400/80">tickets</span> • manage{" "}
            <span className="text-pink-400/80">check-ins</span> • view{" "}
            <span className="text-pink-400/80">user profiles</span>
          </>
        }
      />

      {/* Your Attendee Table / Guest List Components Will Go Here */}
    </div>
  );
};

export default Attendee;
