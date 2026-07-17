"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Microscope,
  HeartPulse,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Microscope size={30} />,
      title: "Advanced Technology",
      description:
        "Modern biomedical and diagnostic equipment for accurate healthcare solutions.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Trusted Quality",
      description:
        "Reliable and certified diagnostic systems with premium quality standards.",
    },
    {
      icon: <HeartPulse size={30} />,
      title: "Healthcare Focused",
      description:
        "Delivering healthcare-driven biomedical solutions with precision and care.",
    },
    {
      icon: <BadgeCheck size={30} />,
      title: "Expert Support",
      description:
        "Professional consultation and technical support for all medical needs.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C49A6C]/15 blur-[130px]" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#8B5A2B]/10 blur-[130px]" />

      <div className="container-custom relative z-10">

        {/* Section Title */}
        <SectionTitle
          badge="Why Choose Us"
          title="Trusted Biomedical Excellence"
          description="We deliver innovative diagnostic technologies and biomedical solutions with precision, trust, and unmatched service quality."
          center
        />

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{
                once: true,
              }}
              className="group rounded-[30px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_20px_50px_rgba(111,78,55,0.18)]"
            >

              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-[#8B5A2B] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">

                {item.icon}

              </div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-bold text-[#2F241E] transition-colors duration-300 group-hover:text-[#8B5A2B]">

                {item.title}

              </h3>

              {/* Description */}
              <p className="leading-8 text-[#6B5F55]">

                {item.description}

              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}