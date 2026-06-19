"use client";
import DashboardHeading from "@/components/DashboardHeading";
import React, { useEffect, useState } from "react";

import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@heroui/react";
import PaymentsTable from "@/components/PaymentsTable";
import { useSession } from "@/lib/auth-client";
import { fetchMyPayments } from "@/lib/api/bookings/data";

const AttendeePaymentPage = () => {
  const { data: session } = useSession();

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function loadPayments() {
      if (!session?.user?.email) return;

      const data = await fetchMyPayments(session.user.email);

      setPayments(data);
    }

    loadPayments();
  }, [session]);

  console.log(session);

  console.log(payments);

  return (
    <div>
      <DashboardHeading title="Payment" description="Your payments" />

      <PaymentsTable payments={payments}/>
    </div>
  );
};

export default AttendeePaymentPage;
