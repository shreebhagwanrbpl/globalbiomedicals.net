"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  Clock, 
  Users, 
  Target, 
  CheckCircle2, 
  Microscope, 
  Wrench, 
  Building2, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  HeartPulse
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export default function AboutClient() {
  const stats = [
    { label: "Years Serving Healthcare", value: "10+", icon: <Clock className="w-6 h-6 text-[#8B5A2B]" /> },
    { label: "Machines Installed", value: "500+", icon: <Microscope className="w-6 h-6 text-[#8B5A2B]" /> },
    { label: "Partner Healthcare Units", value: "250+", icon: <Building2 className="w-6 h-6 text-[#8B5A2B]" /> },
    { label: "Equipment Reliability Rate", value: "99.8%", icon: <TrendingUp className="w-6 h-6 text-[#8B5A2B]" /> },
  ];

  const coreValues = [
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: "Our Mission",
      desc: "To make advanced medical testing tools easy to access and simple to maintain for clinics of all sizes.",
      gradient: "from-[#6F4E37] to-[#8B5A2B]"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      title: "Our Vision",
      desc: "To be the most trusted and hassle-free biomedical partner across the region, making modern health diagnostics affordable for everyone.",
      gradient: "from-[#8B5A2B] to-[#C49A6C]"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "Quality Guarantee",
      desc: "We inspect every instrument thoroughly, perform exact calibrations, and use only genuine manufacturer components.",
      gradient: "from-[#2F241E] to-[#6F4E37]"
    }
  ];

  const pillars = [
    {
      title: "Top-Performing Instruments",
      desc: "Tested diagnostic machines sourced directly from leading medical technology brands.",
      icon: <Microscope className="w-6 h-6 text-[#8B5A2B]" />
    },
    {
      title: "Fast Technical Assistance",
      desc: "On-call engineers ready to visit your clinic and fix machine issues without delay.",
      icon: <Wrench className="w-6 h-6 text-[#8B5A2B]" />
    },
    {
      title: "Safe Reagent Storage",
      desc: "Cold-chain distribution so chemical reagents stay fresh, active, and accurate.",
      icon: <HeartPulse className="w-6 h-6 text-[#8B5A2B]" />
    },
    {
      title: "Verified Calibration",
      desc: "Certified testing methods ensuring exact blood and chemical test readings every single day.",
      icon: <Award className="w-6 h-6 text-[#8B5A2B]" />
    }
  ];

  const certifications = [
    { title: "ISO 9001:2015", subtitle: "Quality Standard Certified" },
    { title: "CE Compliant", subtitle: "Meets Global Safety Rules" },
    { title: "NABL Traceable", subtitle: "Accurate Testing Standards" },
    { title: "OEM Authorized", subtitle: "Official Brand Distributor" }
  ];

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="About Global Biomedical"
        subtitle="Helping hospitals, clinics, and laboratories run smoothly with top-quality equipment, reagents, and round-the-clock technical support."
      />

      {/* Stats Counter Section */}
      <section className="relative z-20 -mt-10 mb-10 container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-[#FFFDF9] rounded-[32px] p-6 md:p-8 border border-[#E6D8C8] shadow-[0_20px_50px_rgba(111,78,55,0.12)]">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-[#F8F5F0] transition-colors">
              <div className="mb-3 p-3 rounded-2xl bg-[#F5EBDD]/60 border border-[#E6D8C8]">
                {stat.icon}
              </div>
              <span className="text-3xl md:text-4xl font-extrabold text-[#6F4E37]">
                {stat.value}
              </span>
              <span className="text-xs md:text-sm font-medium text-[#6B5F55] mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Story & Image Section */}
      <section className="section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Brand Emblem Showcase */}
          <div className="relative">
            <div className="relative rounded-[40px] border border-[#E6D8C8] bg-[#FFFDF9] shadow-[0_20px_60px_rgba(111,78,55,0.12)] p-8 h-[440px] md:h-[520px] flex flex-col items-center justify-center overflow-hidden text-center">
              <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-[#C49A6C]/15 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-[#6F4E37]/15 blur-3xl" />
              
              <div className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 mb-5 rounded-3xl bg-white p-5 shadow-xl border border-[#E6D8C8] flex items-center justify-center transition-transform duration-500 hover:scale-105">
                <img
                  src="/global-logo.png"
                  alt="Global Biomedicals Inc Logo"
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-extrabold text-[#2F241E] z-10 tracking-tight">
                Global<span className="text-[#8B5A2B]"> Biomedicals</span>
              </h3>
              <p className="text-xs text-[#8B5A2B] font-bold tracking-widest uppercase mt-1 z-10">
                Right Here, You Have An Option
              </p>
            </div>

            <div className="absolute -bottom-6 -left-4 sm:left-6 rounded-[28px] border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-[0_20px_45px_rgba(111,78,55,0.18)] max-w-[260px] z-20">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6F4E37] text-white font-bold text-lg">
                  10+
                </div>
                <div>
                  <h4 className="font-bold text-[#2F241E] text-base">Years of Trust</h4>
                  <p className="text-xs text-[#6B5F55]">Supporting Healthcare Staff</p>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 rounded-2xl bg-[#2F241E] text-white px-4 py-2.5 text-xs font-semibold shadow-lg border border-[#C49A6C]/30 z-20">
              <CheckCircle2 size={16} className="text-[#C49A6C]" /> Certified Service Partner
            </div>
          </div>

          {/* Right Content */}
          <div>
            <SectionTitle
              badge="Who We Are"
              title="Your Partner for Simple & Dependable Medical Gear"
              description="Global Biomedical is dedicated to supplying reliable lab instruments, maintenance services, and setup guidance."
            />

            <p className="mt-6 leading-8 text-[#6B5F55] text-base md:text-lg">
              Global Biomedical was created to make diagnostic technology simple, transparent, and reliable. We supply blood counters, biochemistry analyzers, and lab tools to healthcare providers across the region.
            </p>

            <p className="mt-4 leading-8 text-[#6B5F55] text-base md:text-lg">
              Our goal is not just selling machines—we partner with you for the long term. From initial delivery and room setup to annual maintenance contracts (AMC/CMC), we ensure your instruments never stop working when patients need them most.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Direct partner for major medical device brands",
                "Complete lab planning and machine layout guidance",
                "Friendly, certified field engineers ready 24/7",
                "Safe cold-chain delivery for reagents and controls"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8B5A2B]/15 text-[#8B5A2B]">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-[#2F241E]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/services">
                <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  Explore Services <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-8 py-4 font-semibold text-[#6F4E37] shadow-sm transition-all duration-300 hover:bg-[#F5EBDD]">
                  Contact Us
                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Mission, Vision, Core Values Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            badge="Our Foundation"
            title="Guided by High Standards & Genuine Care"
            description="Our core values guide every installation, service visit, and client recommendation."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {coreValues.map((value, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-[0_15px_45px_rgba(111,78,55,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_25px_60px_rgba(111,78,55,0.16)]"
              >
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} shadow-md transition-transform duration-500 group-hover:scale-110`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#2F241E] group-hover:text-[#8B5A2B] transition-colors">
                  {value.title}
                </h3>
                <p className="mt-4 leading-7 text-[#6B5F55] text-base">
                  {value.desc}
                </p>
                <div className="mt-8 h-1 w-16 rounded-full bg-[#E6D8C8] group-hover:bg-[#8B5A2B] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars of Excellence */}
      <section className="section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">
        <div className="container-custom">
          <SectionTitle
            badge="Why Healthcare Staff Choose Us"
            title="Four Pillars of Our Service"
            description="We promise clean execution, zero hassle, and reliable equipment performance."
            center
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#C49A6C]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EBDD]">
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-bold text-[#2F241E]">
                  {pillar.title}
                </h4>
                <p className="mt-3 leading-6 text-sm text-[#6B5F55]">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards & Certifications */}
      <section className="py-16 bg-[#2F241E] text-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-[#C49A6C] bg-[#3D3028] border border-[#6F4E37] px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
              Safety & Verification
            </span>
            <h3 className="text-3xl font-extrabold text-white">
              Approved Safety Standards & Audits
            </h3>
            <p className="text-[#A08875] text-sm mt-2">
              Every instrument we deliver follows international safety guidelines and accurate testing norms.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="rounded-2xl bg-[#3D3028]/80 border border-[#6F4E37] p-6 text-center hover:border-[#C49A6C] transition-colors">
                <ShieldCheck className="w-10 h-10 text-[#C49A6C] mx-auto mb-3" />
                <h4 className="font-bold text-lg text-white">{cert.title}</h4>
                <p className="text-xs text-[#A08875] mt-1">{cert.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
