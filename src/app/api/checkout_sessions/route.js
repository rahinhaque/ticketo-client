import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "../../../lib/stripe";
import { getUser } from "@/lib/api/session";
import { getEventDescription } from "@/lib/api/events/data";

export async function POST(request) {
  try {
    const body = await request.json();
    const { type } = body;

    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (type === "premium") {
      const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        line_items: [{ price: "price_1TimIAGhSL7v1PI9Oyc2I46T", quantity: 1 }],
        mode: "subscription",
        success_url: `${origin}/dashboard/organizer/premium-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      });
      return NextResponse.json({ url: session.url });
    }

    if (type === "booking") {
      const { eventId, quantity } = body;
      const qty = Math.max(1, Number(quantity) || 1);

      // refetch from DB — don't trust price/title sent by the client
      const event = await getEventDescription(eventId);
      if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
      if (Number(event.seats) < qty) {
        return NextResponse.json(
          { error: "Not enough seats available" },
          { status: 400 },
        );
      }

      const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        mode: "payment",
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
        metadata: {
          type: "booking",
          eventId: String(eventId),
          userId: String(user.id),
          quantity: String(qty),
        },
        success_url: `${origin}/dashboard/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
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
