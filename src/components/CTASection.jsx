"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PhoneCall,
} from "lucide-react";

export default function CTASection({ city }) {

  const pathname = usePathname();

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
    "enquiry",
  ];

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const urlDistrict =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : urlDistrict;

  const makeLink = (path) => {
    if (!districtSlug) return path;

    if (path === "/") {
      return `/${districtSlug}`;
    }

    return `/${districtSlug}${path}`;
  };

  return (
    <section className="section-padding bg-[#F8F5F0]">
      <div className="container-custom">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
          }}
          className="relative overflow-hidden rounded-[42px] border border-[#E6D8C8] bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] p-10 text-white shadow-2xl lg:p-20"
        >

          {/* Background Glow */}
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#C49A6C]/20 blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}
            <div>

              <span className="inline-flex items-center rounded-full border border-[#C49A6C] bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
                Get In Touch
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight lg:text-6xl">
                Need Premium Biomedical Solutions?
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#F8EEDF]">
                Discover innovative diagnostic systems and trusted biomedical
                technologies tailored for modern healthcare excellence.
              </p>

            </div>

            {/* Right Card */}
            <div className="flex justify-center lg:justify-end">

              <div className="w-full max-w-md rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EBDD]">
                  <PhoneCall
                    size={30}
                    className="text-[#8B5A2B]"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[#2F241E]">
                  Let's Talk
                </h3>

                <p className="mt-3 leading-7 text-[#6B5F55]">
                  Contact our biomedical experts for consultation, equipment,
                  and healthcare support.
                </p>

                <div className="mt-6 space-y-2 border-t border-[#E6D8C8] pt-4 text-sm font-semibold text-[#6F4E37]">
                  <p className="text-xs text-[#8B5A2B] font-bold uppercase tracking-wider">Direct Hotline:</p>
                  <div className="flex flex-wrap gap-2">
                    <a href="tel:+919257984336" className="hover:text-[#8B5A2B] underline">+91 9257984336</a>
                    <span>•</span>
                    <a href="tel:+918529833535" className="hover:text-[#8B5A2B] underline">+91 8529833535</a>
                    <span>•</span>
                    <a href="tel:+919983301657" className="hover:text-[#8B5A2B] underline">+91 9983301657</a>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">

                  <Link
                    href={makeLink("/contact")}
                    className="flex-1"
                  >
                    <button className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                      Contact Us

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />

                    </button>
                  </Link>

                  <a
                    href="tel:+919257984336"
                    className="rounded-2xl border border-[#D7C2AE] bg-white px-6 py-4 text-center font-semibold text-[#6F4E37] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8F5F0] hover:border-[#8B5A2B]"
                  >
                    Call Now
                  </a>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}