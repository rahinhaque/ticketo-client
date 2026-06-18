import Link from "next/link";
import { redirect } from "next/navigation";

import { stripe } from "../../../../../lib/stripe";
import { getUser } from "@/lib/api/session";

export default async function PremiumSuccess({ searchParams }) {
  const { session_id } = await searchParams;
  const user = await getUser();

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    redirect("/");
  }

  if (status === "complete") {
    return (
      <section
        id="success"
        className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />

        <div className="relative w-full max-w-md">
          {/* Ticket card */}
          <div className="relative bg-slate-900 rounded-2xl shadow-2xl shadow-yellow-500/10 border border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="bg-yellow-500 px-6 py-3 flex items-center justify-between">
              <span className="text-slate-950 font-black text-xs uppercase tracking-widest">
                Admission Confirmed
              </span>

              <span className="text-slate-950 font-black text-xs uppercase tracking-widest">
                Ticketo
              </span>
            </div>

            {/* Body */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-5">
                <svg
                  className="w-7 h-7 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h1 className="text-2xl font-black text-white tracking-tight mb-2">
                You're In, Premium Access
              </h1>

              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                Your pass to every premium feature on Ticketo is now active.
                Show this confirmation anytime—it's already on file.
              </p>
            </div>

            {/* Divider */}
            <div className="relative flex items-center px-2">
              <span className="absolute -left-3 w-6 h-6 bg-slate-950 rounded-full" />
              <div className="flex-1 border-t-2 border-dashed border-slate-700" />
              <span className="absolute -right-3 w-6 h-6 bg-slate-950 rounded-full" />
            </div>

            {/* Details */}
            <div className="px-8 py-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                  Issued To
                </span>

                <span className="text-white text-sm font-semibold truncate max-w-[200px]">
                  {customerEmail}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                  Plan
                </span>

                <span className="text-yellow-500 text-sm font-black uppercase tracking-wide">
                  Premium
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                  Confirmation
                </span>

                <span className="text-slate-300 text-xs font-mono">
                  {session_id.slice(-12).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-500 text-xs mt-6">
            A receipt is on its way to your inbox. Questions? Email{" "}
            <a
              href="mailto:orders@example.com"
              className="text-yellow-500 hover:text-yellow-400 underline underline-offset-2"
            >
              haquerahin743@gmail.com 
            </a>
          </p>

          {/* Back button */}
          <div className="flex justify-center mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black h-11 px-8 rounded-lg shadow-lg shadow-yellow-500/20 uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
            >
              Back to Ticketo
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return redirect("/");
}
