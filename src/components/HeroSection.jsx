"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  Activity,
  HeartPulse,
  PhoneCall,
  Download,
  Sparkles,
} from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function HeroSection({ city }) {
  const [loading, setLoading] = useState(true);

  const [heroData, setHeroData] = useState({
    title: "",
    description: "",
    button1Text: "",
    button2Text: "",
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const snap = await getDoc(
          doc(db, "websites", "globalbiomedicalsnet", "pages", "home")
        );

        if (snap.exists()) {
          setHeroData(snap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // District Routing
  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeLink = (path) => {
    return districtSlug ? `/${districtSlug}${path}` : path;
  };

  const capabilities = [
    {
      icon: <Activity className="text-[#8B5A2B]" size={24} />,
      title: "Diagnostic Equipment",
      desc: "Hematology, CBC & Biochemistry Analyzers",
    },
    {
      icon: <Microscope className="text-[#8B5A2B]" size={24} />,
      title: "Lab Instruments",
      desc: "ELISA Readers, Centrifuges & Reagents",
    },
    {
      icon: <ShieldCheck className="text-[#8B5A2B]" size={24} />,
      title: "Certified Support",
      desc: "Installation, Calibration & Warranty",
    },
    {
      icon: <HeartPulse className="text-[#8B5A2B]" size={24} />,
      title: "Healthcare Solutions",
      desc: "Reliable Systems for Hospitals & Clinics",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FDFBF7] to-[#F8F5F0] py-16 lg:py-24">
      {/* Background Decorative Glows */}
      <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-[#E6D8C8]/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#8B5A2B]/10 blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Content (Cols 1-7) */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D8C8] bg-white/80 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#6F4E37] shadow-md mb-8">
            <Sparkles size={16} className="text-[#8B5A2B] animate-pulse" />
            Leading Biomedical & Diagnostic Solutions
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-[#2F241E]">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 rounded-xl bg-[#ECE4DA] w-[85%]" />
                <div className="h-12 rounded-xl bg-[#ECE4DA] w-[65%]" />
                <div className="h-12 rounded-xl bg-[#ECE4DA] w-[75%]" />
              </div>
            ) : (
              <>
                {heroData.title || "Advanced Diagnostic & Biomedical Equipment"}

                {city ? (
                  <>
                    <br />
                    <span className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-transparent text-3xl lg:text-5xl font-bold">
                      in {city}
                    </span>
                  </>
                ) : (
                  <span className="block mt-2 bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-transparent">
                    For Modern Healthcare
                  </span>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-6 space-y-3">
              <div className="h-4 rounded bg-[#ECE4DA] w-full" />
              <div className="h-4 rounded bg-[#ECE4DA] w-[90%]" />
            </div>
          ) : (
            <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-[#5E5146]">
              {heroData.description ||
                "Supplying high-precision CBC machines, hematology & biochemistry analyzers, and laboratory equipment across India with complete installation and expert technical support."}

              {city && (
                <>
                  {" "}
                  across <strong className="text-[#2F241E]">{city}</strong>.
                </>
              )}
            </p>
          )}

          {/* Quick Call Hotlines */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-[#6F4E37]">
            <span className="flex items-center gap-1.5 text-[#8B5A2B] font-bold">
              <PhoneCall size={16} /> Hotlines:
            </span>
            <a href="tel:+919257984336" className="hover:text-[#8B5A2B] underline bg-[#F5EBDD] px-3 py-1 rounded-lg transition">+91 9257984336</a>
            <a href="tel:+918529833535" className="hover:text-[#8B5A2B] underline bg-[#F5EBDD] px-3 py-1 rounded-lg transition">+91 8529833535</a>
            <a href="tel:+919983301657" className="hover:text-[#8B5A2B] underline bg-[#F5EBDD] px-3 py-1 rounded-lg transition">+91 9983301657</a>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {loading ? (
              <>
                <div className="h-14 w-48 animate-pulse rounded-2xl bg-[#ECE4DA]" />
                <div className="h-14 w-40 animate-pulse rounded-2xl bg-[#ECE4DA]" />
              </>
            ) : (
              <>
                <Link href={makeLink("/items")}>
                  <button className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    Explore Products
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <a
                  href="/Global-Biomedicals-Brochure.pdf"
                  download="Global-Biomedicals-Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-2xl border border-[#D9C7B5] bg-white px-6 py-4 font-semibold text-[#6F4E37] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#8B5A2B] hover:bg-[#F8F5F0] hover:shadow-lg"
                >
                  <Download size={18} className="text-[#8B5A2B]" />
                  Download Brochure PDF
                </a>
              </>
            )}
          </div>

          {/* Quick Stats Badges */}
          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 border-t border-[#E6D8C8] pt-8">
            <div>
              <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-3xl sm:text-4xl font-black text-transparent">
                10+
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-[#6B5F55]">
                Years Expertise
              </p>
            </div>

            <div>
              <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-3xl sm:text-4xl font-black text-transparent">
                500+
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-[#6B5F55]">
                Labs Served
              </p>
            </div>

            <div>
              <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-3xl sm:text-4xl font-black text-transparent">
                100%
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-[#6B5F55]">
                Quality Assured
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Content: Modern Interactive Showcase Grid (Cols 8-12) */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-[36px] border border-[#E6D8C8] bg-gradient-to-br from-[#FFFDF9] via-[#FDFBF7] to-[#F5ECE0] p-6 sm:p-8 shadow-2xl">
            
            {/* Top Showcase Header */}
            <div className="flex items-center justify-between border-b border-[#E6D8C8] pb-5">
              <div>
                <span className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider">Solutions Overview</span>
                <h3 className="text-xl font-extrabold text-[#2F241E] mt-0.5">Global Biomedical Inc.</h3>
              </div>
              <div className="rounded-2xl bg-[#F5EBDD] p-3">
                <Microscope className="text-[#8B5A2B]" size={28} />
              </div>
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-[#E6D8C8] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8B5A2B] hover:shadow-md"
                >
                  <div className="rounded-xl bg-[#F5EBDD] p-2.5 w-fit group-hover:bg-[#6F4E37] transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#2F241E] group-hover:text-[#8B5A2B] transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#6B5F55] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Live Interactive Info Banner */}
            <div className="mt-6 rounded-2xl bg-[#2F241E] p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                  <div>
                    <h5 className="text-xs font-bold text-[#C49A6C] uppercase tracking-wider">Fast Inquiry Response</h5>
                    <p className="text-sm font-semibold text-white">Call: +91 9257984336</p>
                  </div>
                </div>
                <Link href={makeLink("/contact")}>
                  <button className="rounded-xl bg-gradient-to-r from-[#8B5A2B] to-[#C49A6C] px-3.5 py-2 text-xs font-bold text-white shadow hover:opacity-90 transition">
                    Inquire Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Social Connect Footer Card */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-[#E6D8C8] bg-white px-4 py-3 text-xs text-[#5E5146]">
              <span className="font-semibold">Follow Official Handles:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/globalbiomedicals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#E1306C] hover:underline font-medium"
                >
                  <FaInstagram size={14} /> Instagram
                </a>
                <a
                  href="https://www.facebook.com/people/Global-Biomedicals-Inc/100090524869295/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#1877F2] hover:underline font-medium"
                >
                  <FaFacebook size={14} /> Facebook
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}