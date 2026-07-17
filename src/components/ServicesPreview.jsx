"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ServiceCard from "./ServiceCard";

export default function ServicesPreview() {
  const services = [
    {
      icon: <Microscope size={30} />,
      title: "Diagnostic Equipment",
      description:
        "Advanced diagnostic systems designed for accurate and efficient healthcare testing.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Laboratory Solutions",
      description:
        "Reliable laboratory instruments and biomedical support for modern medical environments.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Maintenance Support",
      description:
        "Professional technical support and maintenance for biomedical systems.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Healthcare Consultation",
      description:
        "Expert guidance and consultation for healthcare and biomedical operations.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-br from-[#FFFCF8] via-[#F8F3EC] to-[#F2E8DC]">

      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#C49A6C]/15 blur-[140px]" />
        <div className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-[#8B5A2B]/10 blur-[140px]" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#D8B28A]/10 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">

          <SectionTitle
            badge="Our Services"
            title="Premium Diagnostic & Biomedical Services"
            description="Providing advanced healthcare technologies, laboratory systems, and trusted biomedical solutions for modern diagnostics."
            center
          />

          <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 60,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{
                once: true,
              }}
            >

              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}