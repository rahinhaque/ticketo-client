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
      <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
        <div className="p-0 overflow-x-auto">
          <Table aria-label="My Tickets Table" removeWrapper>
            <TableContent>
              <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                <TableColumn
                  className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20"
                  isRowHeader
                >
                  EVENT NAME
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  DATE
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  QUANTITY
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  TOTAL PAID
                </TableColumn>
                <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                  STATUS
                </TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={
                  <p className="text-slate-500 py-10 text-center font-medium">
                    No ticket passes booked yet. Explore Browse Events!
                  </p>
                }
              >
                {bookings.map((booking) => (
                  <TableRow
                    key={booking._id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                  >
                    <TableCell className="py-4 px-6 align-middle font-bold text-white">
                      <Link
                        href={`/events/${booking.eventId}`}
                        className="hover:text-pink-500 hover:underline"
                      >
                        {booking.eventName}
                      </Link>
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                      {new Date(booking.eventDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                      {booking.quantity} ticket(s)
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">
                      ${booking.totalPrice?.toFixed(2)}
                    </TableCell>
                    <TableCell className="py-4 px-6 align-middle">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          booking.paymentStatus === "failed"
                            ? "danger"
                            : "success"
                        }
                        className="font-bold uppercase text-[10px] tracking-wider border border-white/5 px-2"
                      >
                        {booking.status}
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContent>
          </Table>
        </div>
      </Card>
    </div>
  );
}
