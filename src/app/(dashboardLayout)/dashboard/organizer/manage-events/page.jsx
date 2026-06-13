"use client";
import DashboardHeading from "@/components/DashboardHeading";
import getEvents from "@/lib/api/events/data";
import { useSession } from "@/lib/auth-client";
import { Card } from "@heroui/react";
import { Table } from "@heroui/react";
import {
  Chip,
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableContent,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useEffect, useState } from "react";

const ManageEventPage = () => {
  const { data: session } = useSession();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      const eventData = await getEvents(session?.user?.email);
      setEvents(eventData);
      setIsLoading(false);
    };

    loadEvents();
  }, [session]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "active":
        return "border-green-500/30 text-green-400 bg-green-500/10";
      case "pending":
        return "border-yellow-500/30 text-yellow-400 bg-yellow-500/10";
      case "rejected":
      case "cancelled":
        return "border-red-500/30 text-red-400 bg-red-500/10";
      default:
        return "border-slate-500/30 text-slate-400 bg-slate-500/10";
    }
  };

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

      <div className="mt-6">
        <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
          <div className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Spinner
                  size="lg"
                  color="secondary"
                  label="Loading events..."
                />
              </div>
            ) : (
              <Table aria-label="Manage Events Table" removeWrapper>
                <TableContent>
                  <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                    <TableColumn
                      className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20"
                      isRowHeader
                    >
                      EVENT
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      CATEGORY
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      DATE
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      TICKET PRICE
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      AVAILABLE SEATS
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      STATUS
                    </TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="No events found">
                    {events?.map((event) => (
                      <TableRow
                        key={event._id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                      >
                        <TableCell className="py-4 px-6 align-middle font-bold text-white">
                          <span className="line-clamp-1 truncate max-w-[150px]">
                            {event.title}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                          {event.category}
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                          {event.date
                            ? new Date(event.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "N/A"}
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">
                          {event.ticketPrice === 0 ? "Free" : `$${event.price}`}
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                          {event.seats}
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle">
                          <Chip
                            size="sm"
                            className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${getStatusColor(
                              event.status,
                            )}`}
                          >
                            {event.status || "Pending"}
                          </Chip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableContent>
              </Table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManageEventPage;
