"use client";
import {
  Microscope,
  FlaskConical,
  ShieldCheck,
  Stethoscope,
  Wrench,
  Activity,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const icons = [
    <Microscope size={30} />,
    <FlaskConical size={30} />,
    <ShieldCheck size={30} />,
    <Stethoscope size={30} />,
    <Wrench size={30} />,
    <Activity size={30} />,
  ];
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "globalbiomedicalsnet",
            "pages",
            "services"
          )
        );

        if (snap.exists()) {
          setServices(snap.data().services || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Services"
        subtitle="Delivering trusted biomedical and diagnostic services with innovation, precision, and healthcare excellence."
      />

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="What We Offer"
            title="Premium Biomedical Services"
            description="We provide innovative healthcare and biomedical solutions tailored to modern diagnostics and laboratory excellence."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-10 shadow-[0_15px_45px_rgba(111,78,55,0.10)]"
                >

                  {/* Icon Skeleton */}
                  <div className="mb-8 h-20 w-20 rounded-3xl bg-[#ECE4DA]" />

                  {/* Title Skeleton */}
                  <div className="mb-6 h-8 w-3/4 rounded-xl bg-[#ECE4DA]" />

                  {/* Description Skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 rounded bg-[#ECE4DA]" />
                    <div className="h-4 w-11/12 rounded bg-[#ECE4DA]" />
                    <div className="h-4 w-8/12 rounded bg-[#ECE4DA]" />
                  </div>

                </div>
              ))
              : services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={icons[index]}
                  title={service.title}
                  description={service.desc}
                />
              ))}

          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C49A6C]/15 blur-[130px]" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#8B5A2B]/10 blur-[130px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="How We Work"
            title="Simple & Professional Process"
            description="We follow a streamlined process to ensure reliable biomedical and healthcare solutions."
            center
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            {[
              {
                step: "01",
                title: "Consultation",
                desc: "Understanding healthcare requirements and diagnostics needs.",
              },
              {
                step: "02",
                title: "Implementation",
                desc: "Delivering biomedical equipment and technical setup.",
              },
              {
                step: "03",
                title: "Support",
                desc: "Providing maintenance and healthcare assistance.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group relative overflow-hidden rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-[0_15px_45px_rgba(111,78,55,0.10)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_25px_60px_rgba(111,78,55,0.18)]"
              >

                {/* Step Number */}
                <div className="absolute top-6 right-6 text-7xl font-extrabold text-[#E8D9C7] transition-all duration-500 group-hover:text-[#D4B08A]">
                  {item.step}
                </div>

                {/* Small Badge */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-lg font-bold text-[#8B5A2B] transition-all duration-500 group-hover:scale-110 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">
                  {item.step}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#2F241E] transition-colors duration-300 group-hover:text-[#8B5A2B]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-4 leading-8 text-[#6B5F55]">
                  {item.desc}
                </p>

                {/* Bottom Line */}
                <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}