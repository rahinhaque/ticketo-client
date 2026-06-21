"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { fetchMyBookings } from "@/lib/api/bookings/data";
import { Spinner } from "@heroui/react";
import TicketsTable from "@/components/TicketsTable";
import DashboardHeading from "@/components/DashboardHeading";

export default function AttendeeTicketsPage() {
  const { data: session, isPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      if (session?.user?.email) {
        try {
          const data = await fetchMyBookings(session.user.email);
          setBookings(data || []);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      } else if (!isPending) {
        setLoading(false);
      }
    }
    loadBookings();
  }, [session, isPending]);

  return (
    <div className="space-y-6">
      <DashboardHeading title="Tickets" description="Your tickets" />

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner color="secondary" label="Loading tickets..." />
        </div>
      ) : (
        <TicketsTable bookings={bookings} />
      )}
    </div>
  );
}
