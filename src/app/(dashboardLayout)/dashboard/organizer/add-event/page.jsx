import DashboardHeading from "@/components/DashboardHeading";
import React from "react";

const AddEventPage = () => {
  return (
    <div>
      <DashboardHeading
        title="Create New Event"
        description={
          <>
            Launch a new <span className="text-pink-400/80">experience</span> •{" "}
            configure <span className="text-pink-400/80">ticketing</span> • set{" "}
            <span className="text-pink-400/80">schedule</span> • manage{" "}
            <span className="text-pink-400/80">lineup</span>
          </>
        }
      />

      {/* Your Event Form Components Will Go Here */}
    </div>
  );
};

export default AddEventPage;
