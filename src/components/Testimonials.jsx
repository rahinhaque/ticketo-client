"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const testimonials = [
  {
    quote:
      '"Creating events with Ticketo has completely transformed how our organization connects with tech enthusiasts. Setting up ticket pricing and tracking seat availability takes seconds, and Stripe handles the checkout seamlessly."',
    name: "Sarah Jenkins",
    role: "Director, TechVibe Events",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    quote:
      '"As an attendee, I appreciate the modern, clean interface. Searching and filtering by category or location works instantly, and my dashboard keeps all my ticket barcodes and payment history perfectly organized."',
    name: "Marcus Brody",
    role: "Fervent Event Attendee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full">
      <motion.div
        className="text-center mb-16"
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <h2 className="text-3xl font-bold text-white md:text-4xl font-sans">Client Testimonials</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm mt-3">
          Don't just take our word for it. Hear from leading organizers and attendees enjoying the platform.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {testimonials.map(({ quote, name, role, avatar }) => (
          <motion.div
            key={name}
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(236,72,153,0.08)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="bg-slate-900/50 border border-white/5 backdrop-blur-xl hover:border-pink-500/30 transition-colors duration-300 p-8 rounded-2xl space-y-6 relative"
          >
            {/* Decorative quote mark */}
            <span className="absolute top-6 right-7 text-6xl text-pink-500/10 font-serif leading-none select-none">"</span>
            <p className="text-slate-300 italic text-md leading-relaxed">{quote}</p>
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400 }}>
                <Image
                  width={48}
                  height={48}
                  src={avatar}
                  className="rounded-full h-12 w-12 object-cover shrink-0 border-2 border-pink-500/30"
                  alt={name}
                />
              </motion.div>
              <div>
                <h4 className="text-white font-bold text-sm">{name}</h4>
                <p className="text-pink-500 text-xs font-semibold">{role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
