"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Statistics({ stats }) {
  const items = [
    { value: `${stats.totalEvents}+`, label: "Premium Events Held" },
    { value: `${stats.totalAttendees.toLocaleString()}+`, label: "Happy Attendees" },
    { value: `${stats.totalOrgs}+`, label: "Vetted Organizations" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-pink-900/10 via-indigo-900/10 to-transparent border-t border-white/5 w-full">
      <motion.div
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {items.map(({ value, label }) => (
          <motion.div key={label} variants={statVariants} className="space-y-2">
            <motion.span
              className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text block"
              whileInView={{ opacity: [0, 1] }}
              viewport={{ once: true }}
            >
              {value}
            </motion.span>
            <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
