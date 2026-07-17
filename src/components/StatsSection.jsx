"use client";

import { motion } from "framer-motion";
import {
  Users,
  FlaskConical,
  BadgeCheck,
  Building2,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <Building2 size={34} />,
      number: "10+",
      label: "Years Experience",
    },
    {
      icon: <FlaskConical size={34} />,
      number: "500+",
      label: "Biomedical Products",
    },
    {
      icon: <Users size={34} />,
      number: "200+",
      label: "Trusted Clients",
    },
    {
      icon: <BadgeCheck size={34} />,
      number: "100%",
      label: "Quality Assurance",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C49A6C]/15 blur-[130px]" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#8B5A2B]/10 blur-[130px]" />

      <div className="container-custom relative z-10">

        <div className="rounded-[40px] border border-[#E6D8C8] bg-[#FFFDF9] p-10 shadow-[0_20px_60px_rgba(111,78,55,0.12)] lg:p-16">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            {stats.map((item, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 50,
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
                className="group text-center"
              >

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-[#8B5A2B] shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">

                  {item.icon}

                </div>

                {/* Number */}
                <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-5xl font-extrabold text-transparent">

                  {item.number}

                </h3>

                {/* Label */}
                <p className="mt-3 text-lg font-medium text-[#6B5F55]">

                  {item.label}

                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}