"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CBG from "../components/img/CBG.png";

import {
  ArrowRight,
  ShieldCheck,
  Microscope,
  BadgeCheck,
} from "lucide-react";

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
          doc(db, "websites", "centralbiomedicals", "pages", "home")
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

  return (
    <section className="gradient-bg overflow-hidden">
      <div className="container-custom min-h-[85vh] py-20 lg:py-0 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D8C8] bg-gradient-to-r from-[#F8F5F0] via-white to-[#FFF8F1] px-5 py-2.5 text-sm font-semibold text-[#6F4E37] shadow-md mb-8">
            <ShieldCheck size={18} className="text-[#8B5A2B]" />
            Trusted Biomedical Systems
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-[#2F241E]">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-12 rounded-xl bg-[#ECE4DA] w-[85%]" />
                <div className="h-12 rounded-xl bg-[#ECE4DA] w-[65%]" />
                <div className="h-12 rounded-xl bg-[#ECE4DA] w-[75%]" />
              </div>
            ) : (
              <>
                {heroData.title}

                {city && (
                  <>
                    <br />

                    <span className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-transparent text-2xl lg:text-4xl font-bold">
                      in {city}
                    </span>
                  </>
                )}
              </>
            )}
          </h1>

          {/* Description */}
          {loading ? (
            <div className="animate-pulse mt-8 space-y-3">
              <div className="h-4 rounded bg-[#ECE4DA] w-full" />
              <div className="h-4 rounded bg-[#ECE4DA] w-[90%]" />
              <div className="h-4 rounded bg-[#ECE4DA] w-[70%]" />
            </div>
          ) : (
            <p className="mt-8 max-w-2xl text-lg lg:text-xl leading-9 text-[#5E5146]">
              {heroData.description}

              {city && (
                <>
                  {" "}
                  across <strong className="text-[#2F241E]">{city}</strong>
                </>
              )}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-5 sm:flex-row">
            {loading ? (
              <>
                <div className="h-14 w-48 animate-pulse rounded-2xl bg-[#ECE4DA]" />
                <div className="h-14 w-40 animate-pulse rounded-2xl bg-[#ECE4DA]" />
              </>
            ) : (
              <>
                <Link href={makeLink("/services")}>
                  <button className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    {heroData.button1Text || "Explore Services"}

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </Link>

                <Link href={makeLink("/contact")}>
                  <button className="rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-8 py-4 font-semibold text-[#6F4E37] shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#8B5A2B] hover:bg-[#F8F5F0] hover:shadow-lg">
                    {heroData.button2Text || "Contact Us"}
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Premium Stats */}
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#C49A6C] hover:shadow-xl">
              <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-4xl font-extrabold text-transparent">
                10+
              </h3>

              <p className="mt-2 font-medium text-[#6B5F55]">
                Years Experience
              </p>
            </div>

            <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#C49A6C] hover:shadow-xl">
              <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-4xl font-extrabold text-transparent">
                500+
              </h3>

              <p className="mt-2 font-medium text-[#6B5F55]">
                Products Delivered
              </p>
            </div>

            <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#C49A6C] hover:shadow-xl">
              <h3 className="bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C] bg-clip-text text-4xl font-extrabold text-transparent">
                100%
              </h3>

              <p className="mt-2 font-medium text-[#6B5F55]">
                Quality Assurance
              </p>
            </div>
          </div>
        </motion.div>
        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >

          {/* Main Image Card */}
          <div className="rounded-[40px] border border-[#E6D8C8] bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4] p-6 shadow-2xl">

            <Image
              src={CBG}
              alt="Central Biomedical"
              width={1200}
              height={900}
              className="h-[350px] w-full rounded-[28px] object-cover object-[20%_center] sm:h-[450px] lg:h-[550px]"
            />

          </div>

          {/* Floating Card 1 */}
          <div
            className="absolute -left-10 top-10 hidden items-center gap-4 rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-5 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(111,78,55,0.18)] lg:flex"
            style={{ marginTop: "-27px" }}
          >

            <div className="rounded-2xl bg-[#F5EBDD] p-3">
              <Microscope className="text-[#8B5A2B]" size={26} />
            </div>

            <div>
              <h4 className="font-bold text-[#2F241E]">
                Modern Labs
              </h4>

              <p className="text-sm text-[#6B5F55]">
                Precision Equipment
              </p>
            </div>

          </div>

          {/* Floating Card 2 */}
          <div className="absolute -right-8 bottom-10 hidden items-center gap-4 rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-5 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(111,78,55,0.18)] lg:flex">

            <div className="rounded-2xl bg-[#F5EBDD] p-3">
              <BadgeCheck className="text-[#8B5A2B]" size={26} />
            </div>

            <div>
              <h4 className="font-bold text-[#2F241E]">
                Trusted Quality
              </h4>

              <p className="text-sm text-[#6B5F55]">
                Certified Solutions
              </p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}