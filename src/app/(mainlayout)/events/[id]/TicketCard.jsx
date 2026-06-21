"use client";

import { useState } from "react";
import { MapPin, Calendar, Users, Ticket } from "lucide-react";

export default function TicketCard({
  price,
  seats,
  date,
  location,
  isOrganizer,
  eventId,
  eventTitle
}) {
  const [quantity, setQuantity] = useState(1);

  const isFree = !price || Number(price) === 0;
  const isSoldOut = Number(seats) <= 0;
  const totalPrice = isFree ? 0 : Number(price) * quantity;

  const handleQuantityChange = (e) => {
    let value = Number(e.target.value);
    if (Number.isNaN(value)) value = 1;
    value = Math.max(1, Math.min(value, Number(seats) || 1));
    setQuantity(value);
  };


  const handleBookTicket = async () => {
    if (isFree) {
      // separate endpoint that just creates a ticket/RSVP directly, no Stripe involved
      const res = await fetch("/api/tickets/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, quantity }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = `/events/${eventId}/payment-succes?free=true`;
      }
      return;
    }

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "booking", eventId, quantity }),
    });

    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  };


  return (
    <div className="lg:sticky lg:top-6 rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Price header */}
      <div className="bg-gradient-to-r from-pink-500/20 to-indigo-600/20 border-b border-white/5 p-6">
        <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
          {!isFree && quantity > 1 ? "Total Amount" : "Ticket Price"}
        </p>
        <p className="text-4xl font-extrabold text-white">
          {isFree ? (
            "Free"
          ) : (
            <>
              <span className="text-2xl font-semibold text-slate-400 mr-1">
                $
              </span>
              {totalPrice.toFixed(2)}
            </>
          )}
        </p>
        {!isFree && quantity > 1 && (
          <p className="text-xs text-slate-400 mt-1">
            ${Number(price).toFixed(2)} × {quantity} tickets
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-400">
            <Users size={14} className="text-indigo-400" />
            Available Seats
          </span>
          {isSoldOut ? (
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              Sold Out
            </span>
          ) : (
            <span className="font-bold text-white">
              {Number(seats).toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-400">
            <Calendar size={14} className="text-indigo-400" />
            Date
          </span>
          <span className="font-bold text-white text-right max-w-[140px] leading-snug">
            {date}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-slate-400">
            <MapPin size={14} className="text-indigo-400" />
            Location
          </span>
          <span className="font-bold text-white">{location}</span>
        </div>

        {!isSoldOut && !isOrganizer && (
          <div className="flex items-center justify-between text-sm">
            <label
              htmlFor="quantity"
              className="flex items-center gap-2 text-slate-400"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={seats}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 bg-slate-900/50 border border-white/10 rounded-lg text-center text-white font-bold py-1.5 focus:outline-none focus:border-pink-500/50"
            />
          </div>
        )}

        <div className="border-t border-white/5 pt-4">
          {isSoldOut ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 font-bold py-3 rounded-xl text-sm cursor-not-allowed"
            >
              Sold Out
            </button>
          ) : isOrganizer ? (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-white/5 text-slate-500 font-bold py-3 rounded-xl text-sm cursor-not-allowed"
            >
              Organizers Can't Book Tickets
            </button>
          ) : (
            <button
              onClick={handleBookTicket}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-indigo-600 hover:opacity-90 transition-opacity text-white font-bold py-3 rounded-xl shadow-lg shadow-pink-500/10 text-sm"
            >
              <Ticket size={16} />
              {isFree
                ? "Reserve a Spot"
                : `Buy ${quantity > 1 ? `${quantity} Tickets` : "Ticket"}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
