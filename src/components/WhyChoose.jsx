"use client";

import { motion } from "framer-motion";
import { FaAward, FaShieldAlt, FaUsers } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const features = [
  {
    icon: FaAward,
    color: "pink",
    title: "Premium Events Only",
    desc: "Every event created is moderated by administrators to guarantee maximum platform authenticity and top-tier event experiences.",
  },
  {
    icon: FaShieldAlt,
    color: "indigo",
    title: "100% Secure Checkout",
    desc: "Ticket transactions and package upgrades are integrated directly with Stripe Checkout, keeping payments fast and secure.",
  },
  {
    icon: FaUsers,
    color: "purple",
    title: "Organizer Analytics",
    desc: "Organizers receive dedicated dashboards containing detailed tables of attendees, ticket sales tracking, and real-time revenue stats.",
  },
];

const colorMap = {
  pink: {
    icon: "bg-pink-500/10 text-pink-400",
    border: "hover:border-pink-500/40",
    glow: "group-hover:shadow-pink-500/10",
  },
  indigo: {
    icon: "bg-indigo-500/10 text-indigo-400",
    border: "hover:border-indigo-500/40",
    glow: "group-hover:shadow-indigo-500/10",
  },
  purple: {
    icon: "bg-purple-500/10 text-purple-400",
    border: "hover:border-purple-500/40",
    glow: "group-hover:shadow-purple-500/10",
  },
};

export default function WhyChoose() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full">
      <motion.div
        className="text-center mb-16"
        variants={headingVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        <h2 className="text-3xl font-bold text-white md:text-4xl">Why Choose Ticketo</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm mt-3">
          Delivering an elite and state-of-the-art event management system that empowers everyone.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {features.map(({ icon: Icon, color, title, desc }) => {
          const c = colorMap[color];
          return (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group glass p-8 rounded-2xl border border-white/5 ${c.border} ${c.glow} hover:shadow-2xl transition-all duration-300`}
            >
              <motion.div
                className={`${c.icon} p-4 rounded-xl inline-block mb-6`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon size={28} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
