"use client";

import { motion } from "framer-motion";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4] py-28 lg:py-36">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#C49A6C]/20 blur-[120px]" />

      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#8B5A2B]/10 blur-[120px]" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-4xl text-center"
        >

          {/* Badge */}
          <span className="mb-6 inline-flex items-center rounded-full border border-[#D9C7B5] bg-[#FFF8F1] px-5 py-2 text-sm font-semibold text-[#8B5A2B] shadow-md">
            Premium Biomedical Solutions
          </span>

          {/* Title */}
          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-[#2F241E] lg:text-7xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#6B5F55]">
            {subtitle}
          </p>

          {/* Decorative Line */}
          <div className="mx-auto mt-10 h-1 w-28 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

        </motion.div>

      </div>

    </section>
  );
}