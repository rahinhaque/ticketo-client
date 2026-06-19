"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

import { useSession } from "@/lib/auth-client";

import { fetchMyBookings } from "@/lib/api/bookings/data";

import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from "@heroui/react";
import TicketsTable from "@/components/TicketsTable";
import DashboardHeading from "@/components/DashboardHeading";

export default function AttendeeTicketsPage() {
  const { data: session } = useSession();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function loadBookings() {
      if (!session?.user?.email) return;

      const data = await fetchMyBookings(session.user.email);

      setBookings(data);
    }

    loadBookings();
  }, [session]);

  // console.log(session);

  // console.log(bookings);

  return (
    <div>
      <DashboardHeading title="Tickets" description="Your tickets" />


      <TicketsTable bookings={bookings} />
    </div>
  );
}
