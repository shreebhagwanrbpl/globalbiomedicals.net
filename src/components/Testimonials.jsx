"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Healthcare Specialist",
      review:
        "Central Biomedicals has consistently delivered reliable diagnostic equipment with outstanding support.",
    },
    {
      name: "Amit Sharma",
      role: "Lab Director",
      review:
        "Professional service, premium products, and excellent biomedical consultation experience.",
    },
    {
      name: "Neha Verma",
      role: "Research Head",
      review:
        "Their healthcare solutions improved our laboratory efficiency significantly.",
    },
  ];

  return (
    <section className="relative overflow-hidden section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C49A6C]/15 blur-[130px]" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#8B5A2B]/10 blur-[130px]" />

      <div className="container-custom relative z-10">

        <SectionTitle
          badge="Testimonials"
          title="What Our Clients Say"
          description="Trusted by healthcare professionals, laboratories, and biomedical institutions."
          center
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {reviews.map((item, index) => (

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
              className="group rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_20px_50px_rgba(111,78,55,0.18)]"
            >

              {/* Quote Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-3xl font-bold text-[#8B5A2B] transition-all duration-500 group-hover:scale-110 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">
                "
              </div>

              {/* Stars */}
              <div className="mb-5 flex gap-1 text-xl text-[#C49A6C]">
                ★★★★★
              </div>

              {/* Review */}
              <p className="leading-8 italic text-[#6B5F55]">
                "{item.review}"
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-[#C49A6C] via-[#E6D8C8] to-transparent" />

              {/* User */}
              <div>

                <h4 className="text-lg font-bold text-[#2F241E]">
                  {item.name}
                </h4>

                <p className="mt-1 text-[#8B5A2B]">
                  {item.role}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}