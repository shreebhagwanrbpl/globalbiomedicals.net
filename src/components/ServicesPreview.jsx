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
      title: "Diagnostic Equipment Supply",
      description:
        "Top-grade blood analyzers and clinical testing machines delivered right to your facility.",
    },
    {
      icon: <FlaskConical size={30} />,
      title: "Reagents & Lab Supplies",
      description:
        "High-purity chemical reagents and everyday lab supplies kept in controlled cold storage.",
    },
    {
      icon: <ShieldCheck size={30} />,
      title: "Equipment Repair & AMC",
      description:
        "Annual maintenance and fast breakdown repairs to make sure your lab never faces downtime.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "Complete Lab Setup",
      description:
        "Step-by-step assistance in planning, equipping, and launching new pathology labs.",
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
            badge="What We Offer"
            title="Complete Biomedical & Diagnostic Services"
            description="From initial setup to routine servicing, we take care of all your medical laboratory needs."
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