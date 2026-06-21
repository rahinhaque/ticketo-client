"use client";

import { useEffect, useState } from "react";
import DashboardHeading from "@/components/DashboardHeading";
import AttendeesTable from "@/components/AttendeesTable";
import { useSession } from "@/lib/auth-client";
import { getAttendeeList } from "@/lib/api/attendeeList/data";

const Attendee = () => {
  const { data: session } = useSession();
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    async function loadAttendees() {
      if (!session?.user?.email) return;

      const data = await getAttendeeList(session.user.email);

      setAttendees(data);
    }

    loadAttendees();
  }, [session]);

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

      <div>
        <AttendeesTable Attendees={attendees} />
      </div>
    </div>
  );
};

export default Attendee;
