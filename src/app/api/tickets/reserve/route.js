import { NextResponse } from "next/server";
import { getUser } from "@/lib/api/session";
import { getEventDescription } from "@/lib/api/events/data";

export async function POST(request) {
  try {
    const { eventId, quantity } = await request.json();
    const qty = Math.max(1, Number(quantity) || 1);

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const event = await getEventDescription(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const isFree = !event.price || Number(event.price) === 0;
    if (!isFree) {
      return NextResponse.json(
        { error: "This event isn't free" },
        { status: 400 },
      );
    }

    const bookingRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          userEmail: user.email,
          quantity: qty,
          totalPrice: 0,
          status: "confirmed",
        }),
      },
    );

    const data = await bookingRes.json();
    if (!bookingRes.ok) {
      return NextResponse.json(
        { error: data.error || "Could not reserve" },
        { status: bookingRes.status },
      );
    }

    return NextResponse.json({ booking: data.booking });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
