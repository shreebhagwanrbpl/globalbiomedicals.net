"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [districtData, setDistrictData] =
    useState(null);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "products",
    "contact",
    "items",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  useEffect(() => {
    const loadContact = async () => {
      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "globalbiomedicalsnet",
            "pages",
            "contact"
          )
        );

        if (snap.exists()) {
          setContactInfo(
            snap.data().contactInfo || []
          );
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!district) return;

      try {
        const snap = await getDoc(
          doc(
            db,
            "websites",
            "globalbiomedicalsnet",
            "districts",
            district
          )
        );

        if (snap.exists()) {
          setDistrictData(snap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadDistrict();
  }, [district]);

  const phone =
    contactInfo.find(
      (x) => x.label === "Phone Number"
    )?.value || "";

  const email =
    contactInfo.find(
      (x) => x.label === "Email Address"
    )?.value || "";

  const address =
    contactInfo.find(
      (x) => x.label === "Office Address"
    )?.value || "";

  const dynamicAddress =
    districtData
      ? `${districtData.district}, ${districtData.state}, India`
      : address;

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };
  if (loading) {
    return (
      <footer className="bg-white border-t border-slate-200">
        <div className="container-custom py-16">

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-8 w-40 bg-slate-200 rounded animate-pulse mb-6" />

                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 bg-slate-200 rounded animate-pulse mb-4"
                  />
                ))}
              </div>
            ))}

          </div>

          <div className="border-t border-slate-200 mt-12 pt-6">
            <div className="h-5 w-72 bg-slate-200 rounded animate-pulse" />
          </div>

        </div>
      </footer>
    );
  }
  return (
    <footer className="border-t border-[#E6D8C8] bg-[#F8F5F0]">
      <div className="container-custom py-16">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo & About */}
          <div>

            <h2 className="text-3xl font-extrabold text-[#6F4E37]">
              Global
              <span className="text-[#2F241E]">
                {" "}Biomedical
              </span>
            </h2>

            <p className="mt-5 leading-8 text-[#6B5F55]">
              Delivering trusted diagnostic and biomedical solutions with
              innovation, quality, and precision healthcare support.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-5 text-lg font-bold text-[#2F241E]">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                href={makeLink("/")}
                className="text-[#6B5F55] transition-all duration-300 hover:translate-x-1 hover:text-[#8B5A2B]"
              >
                Home
              </Link>

              <Link
                href={makeLink("/about")}
                className="text-[#6B5F55] transition-all duration-300 hover:translate-x-1 hover:text-[#8B5A2B]"
              >
                About
              </Link>

              <Link
                href={makeLink("/services")}
                className="text-[#6B5F55] transition-all duration-300 hover:translate-x-1 hover:text-[#8B5A2B]"
              >
                Services
              </Link>

              <Link
                href={makeLink("/items")}
                className="text-[#6B5F55] transition-all duration-300 hover:translate-x-1 hover:text-[#8B5A2B]"
              >
                Products
              </Link>

              <Link
                href={makeLink("/contact")}
                className="text-[#6B5F55] transition-all duration-300 hover:translate-x-1 hover:text-[#8B5A2B]"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="mb-5 text-lg font-bold text-[#2F241E]">
              Services
            </h3>

            <div className="space-y-3 text-[#6B5F55]">

              <p className="transition hover:text-[#8B5A2B]">
                Diagnostic Equipment
              </p>

              <p className="transition hover:text-[#8B5A2B]">
                Laboratory Solutions
              </p>

              <p className="transition hover:text-[#8B5A2B]">
                Biomedical Instruments
              </p>

              <p className="transition hover:text-[#8B5A2B]">
                Maintenance Support
              </p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-lg font-bold text-[#2F241E]">
              Contact Info
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-[#F3E7D9] p-2">
                  <MapPin
                    size={18}
                    className="text-[#8B5A2B]"
                  />
                </div>

                <p className="leading-7 text-[#6B5F55]">
                  {dynamicAddress}
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-[#F3E7D9] p-2">
                  <Phone
                    size={18}
                    className="text-[#8B5A2B]"
                  />
                </div>

                <p className="text-[#6B5F55]">
                  {phone}
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-[#F3E7D9] p-2">
                  <Mail
                    size={18}
                    className="text-[#8B5A2B]"
                  />
                </div>

                <p className="text-[#6B5F55] break-all">
                  {email}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between border-t border-[#E6D8C8] pt-6 text-sm text-[#7A6A5E] md:flex-row">

          <p>
            © 2026 <span className="font-semibold text-[#6F4E37]">Global Biomedical</span>. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed with precision for modern diagnostics.
          </p>

        </div>

      </div>
    </footer>
  );
}