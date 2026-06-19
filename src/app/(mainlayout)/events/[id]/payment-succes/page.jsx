// app/dashboard/tickets/success/page.jsx
import { stripe } from "@/lib/stripe";

export default async function TicketSuccessPage({ searchParams }) {
  const { session_id, free } = await searchParams;

  if (free === "true") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You're in! 🎟️</h1>
          <p className="text-slate-400 mt-2">Your free spot is reserved.</p>
        </div>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status !== "paid") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p>Payment not completed.</p>
      </div>
    );
  }

  const { type, eventId, userEmail, quantity } = session.metadata || {};

  if (type === "booking") {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        userEmail,
        quantity: Number(quantity) || 1,
        totalPrice: session.amount_total / 100,
        stripeSessionId: session.id,
        status: "confirmed",
      }),
    });
  }

  if (type === "premium") {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/upgrade-premium/${userEmail}`,
      {
        method: "PATCH",
      },
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold">You're in! 🎟️</h1>
        <p className="text-slate-400 mt-2">
          Paid ${(session.amount_total / 100).toFixed(2)} — confirmation is on
          its way.
        </p>
      </div>
    </div>
  );
}
