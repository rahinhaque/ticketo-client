"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-indigo-600/15 via-slate-950 to-slate-950 -z-10" />

      {/* Animated floating glow orb */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 -z-10"
      />
      {/* Secondary animated orb */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-tl from-purple-500/8 to-pink-500/8 rounded-full blur-[100px] -z-10"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl text-center space-y-8"
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-400 text-xs font-semibold uppercase tracking-wider">
            <FaRocket /> Introducing Ticketo v2.0
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight"
        >
          Discover Premium Events &{" "}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Book Tickets
          </span>{" "}
          Seamlessly
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={item}
          className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Ticketo links passionate organizers with eager attendees. Browse local festivals, grand music nights, elite business seminars, and everything in between.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link href="/events">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-14 px-8 text-md shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all w-full sm:w-auto"
                radius="full"
              >
                Explore Events
              </Button>
            </motion.div>
          </Link>
          <Link href="/register">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="bordered"
                className="border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-14 px-8 text-md w-full sm:w-auto border-2"
                radius="full"
              >
                Create Organization
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;