"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchHomeData } from "@/lib/data-fetcher";
import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  Activity,
  HeartPulse,
  PhoneCall,
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
    let active = true;

    const loadHeroData = async () => {
      try {
        const homeData = await fetchHomeData();
        if (active && homeData) setHeroData(homeData);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadHeroData();
    return () => {
      active = false;
    };
  }, []);

  const districtSlug = city ? city.toLowerCase().trim().replace(/\s+/g, "-") : "";
  const makeLink = (path) => (districtSlug ? `/${districtSlug}${path}` : path);

  const capabilities = [
    {
      icon: <Activity size={20} />,
      title: "Lab & Testing Equipment",
      desc: "CBC, biochemistry and hematology systems.",
    },
    {
      icon: <Microscope size={20} />,
      title: "Essential Reagents",
      desc: "Diagnostic reagents for laboratory workflows.",
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Setup & Calibration",
      desc: "Installation, calibration and staff guidance.",
    },
    {
      icon: <HeartPulse size={20} />,
      title: "Service & Maintenance",
      desc: "Support for hospitals and diagnostic labs.",
    },
  ];

  const titleText =
    heroData?.title || heroData?.headline || heroData?.heading || "";
  const descText =
    heroData?.description || heroData?.desc || heroData?.subheading || "";
  const btn1Text =
    heroData?.button1Text ||
    heroData?.buttonText ||
    heroData?.btn1Text ||
    heroData?.btnText ||
    heroData?.btn1 ||
    heroData?.button1 ||
    "Explore Products";
  const btn2Text =
    heroData?.button2Text ||
    heroData?.btn2Text ||
    heroData?.btn2 ||
    heroData?.button2 ||
    "Get in Touch";

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FDFBF7] to-[#F8F5F0] py-7 sm:py-9 lg:py-11">
      {/* Subtle decorative glows */}
      <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#E6D8C8]/30 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-[#8B5A2B]/10 blur-3xl sm:h-72 sm:w-72" />

      <div className="container-custom relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-7 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8">
        {/* Left content */}
        <motion.div
          className="min-w-0 lg:col-span-7"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E6D8C8] bg-white/85 px-3.5 py-2 text-[11px] font-semibold text-[#6F4E37] shadow-sm sm:mb-5 sm:text-xs">
            <Sparkles size={14} className="shrink-0 text-[#8B5A2B]" />
            Trusted Partner for Biomedical Equipment
          </div>

          <h1 className="max-w-3xl text-[2rem] font-extrabold leading-[1.12] tracking-tight text-[#2F241E] sm:text-4xl lg:text-[2.8rem] xl:text-5xl">
            {loading ? (
              <span className="block animate-pulse">
                <span className="mb-2 block h-8 w-[88%] rounded-lg bg-[#ECE4DA] sm:h-10" />
                <span className="block h-8 w-[65%] rounded-lg bg-[#ECE4DA] sm:h-10" />
              </span>
            ) : (
              <>
                {titleText || "Advanced Biomedical Equipment for Modern Healthcare"}
                {city && (
                  <>
                    {" "}
                    <span className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-transparent">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {!loading && descText ? (
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5E5146] sm:mt-5 sm:text-base sm:leading-7">
              {descText}
              {city && (
                <>
                  {" "}
                  Supporting healthcare facilities across{" "}
                  <strong className="text-[#2F241E]">{city}</strong>.
                </>
              )}
            </p>
          ) : loading ? (
            <div className="mt-4 max-w-xl animate-pulse space-y-2">
              <div className="h-3.5 w-full rounded bg-[#ECE4DA]" />
              <div className="h-3.5 w-4/5 rounded bg-[#ECE4DA]" />
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#6F4E37] sm:mt-5 sm:gap-3 sm:text-sm">
            <span className="flex items-center gap-1.5 font-bold text-[#8B5A2B]">
              <PhoneCall size={14} /> Call:
            </span>
            <a
              href="tel:+919257984336"
              className="rounded-md bg-[#F5EBDD] px-2.5 py-1.5 transition hover:bg-[#EDE0CF]"
            >
              +91 9257984336
            </a>
            <a
              href="tel:+918529833535"
              className="rounded-md bg-[#F5EBDD] px-2.5 py-1.5 transition hover:bg-[#EDE0CF]"
            >
              +91 8529833535
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={makeLink("/items")}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {loading ? "Explore Products" : btn1Text}
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href={makeLink("/contact")}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#D9C7B5] bg-white px-5 py-3 text-sm font-semibold text-[#6F4E37] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8B5A2B] hover:bg-[#F8F5F0]"
            >
              <PhoneCall size={16} className="text-[#8B5A2B]" />
              {loading ? "Get in Touch" : btn2Text}
            </Link>
          </div>

          {/* Compact statistics */}
          <div className="mt-6 grid max-w-xl grid-cols-3 gap-3 border-t border-[#E6D8C8] pt-4 sm:mt-7 sm:gap-5 sm:pt-5">
            {[
              { value: "10+", label: "Years of Service" },
              { value: "500+", label: "Healthcare Clients" },
              { value: "24/7", label: "Service Support" },
            ].map((stat) => (
              <div key={stat.label} className="min-w-0">
                <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-2xl font-black leading-tight text-transparent sm:text-3xl">
                  {stat.value}
                </h3>
                <p className="mt-1 text-[10px] leading-4 text-[#6B5F55] sm:text-xs sm:leading-5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right showcase: compact height */}
        <motion.div
          className="min-w-0 lg:col-span-5"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-3xl border border-[#E6D8C8] bg-white/70 p-4 shadow-lg backdrop-blur-sm sm:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-[#E6D8C8] pb-3">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5A2B]">
                  Solutions Overview
                </span>
                <h2 className="mt-0.5 text-lg font-extrabold text-[#2F241E] sm:text-xl">
                  Global Biomedical Inc.
                </h2>
              </div>
              <div className="shrink-0 rounded-xl bg-[#F5EBDD] p-2.5">
                <Microscope className="text-[#8B5A2B]" size={23} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {capabilities.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-xl border border-[#E6D8C8] bg-white p-3 transition hover:-translate-y-0.5 hover:border-[#C49A6C] hover:shadow-sm"
                >
                  <div className="w-fit rounded-lg bg-[#F5EBDD] p-2 text-[#8B5A2B] transition group-hover:bg-[#6F4E37] group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-[#2F241E]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#6B5F55]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#2F241E] p-3.5 text-white sm:p-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#C49A6C]">
                    Quick Inquiry
                  </p>
                  <a
                    href="tel:+919257984336"
                    className="text-xs font-semibold hover:underline sm:text-sm"
                  >
                    +91 9257984336
                  </a>
                </div>
              </div>
              <Link
                href={makeLink("/contact")}
                className="shrink-0 rounded-lg bg-gradient-to-r from-[#8B5A2B] to-[#C49A6C] px-3 py-2 text-xs font-bold text-white transition hover:opacity-90"
              >
                Inquire Now
              </Link>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#E6D8C8] bg-white px-3 py-2.5 text-[11px] text-[#5E5146]">
              <span className="font-semibold">Follow Official Handles</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/globalbiomedicals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-medium text-[#E1306C] hover:underline"
                >
                  <FaInstagram size={13} /> Instagram
                </a>
                <a
                  href="https://www.facebook.com/people/Global-Biomedicals-Inc/100090524869295/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-medium text-[#1877F2] hover:underline"
                >
                  <FaFacebook size={13} /> Facebook
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
