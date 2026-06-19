import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { getUser } from "@/lib/api/session";
import { getEventDescription } from "@/lib/api/events/data";

export async function POST(request) {
  try {
    const { type, eventId, quantity } = await request.json();
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── Premium organizer subscription ──
    if (type === "premium") {
      const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [{ price: "price_1TimIAGhSL7v1PI9Oyc2I46T", quantity: 1 }],
        mode: "subscription",
        metadata: { type: "premium", userEmail: user.email },
        success_url: `${origin}/dashboard/organizer/premium-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      });
      return NextResponse.json({ url: session.url });
    }

    // ── Paid event ticket ──
    if (type === "booking") {
      const qty = Math.max(1, Number(quantity) || 1);
      const event = await getEventDescription(eventId);

      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      if (!event.price || Number(event.price) === 0) {
        return NextResponse.json(
          { error: "This event is free" },
          { status: 400 },
        );
      }

      const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: { name: event.title },
              unit_amount: Math.round(Number(event.price) * 100),
            },
            quantity: qty,
          },
        ],
        mode: "payment",
        metadata: {
          type: "booking",
          eventId,
          userEmail: user.email,
          quantity: String(qty),
        },
        success_url: `${origin}/events/${eventId}/payment-succes?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/events/${eventId}?canceled=true`,
      });
      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json(
      { error: "Invalid checkout type" },
      { status: 400 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
