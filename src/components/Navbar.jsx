"use client";

import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  const phoneNumbers = [
    "+91 9257984336",
    "+91 8529833535",
    "+91 9983301657",
  ];

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Header Bar */}
      <div className="bg-[#2F241E] text-[#E6D8C8] text-xs py-2 px-4 border-b border-[#3D3028]">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Phone Numbers */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-[#C49A6C] font-semibold">
              <Phone size={13} /> Call Us:
            </span>
            {phoneNumbers.map((num, i) => (
              <a
                key={i}
                href={`tel:${num.replace(/\s+/g, "")}`}
                className="hover:text-white transition-colors duration-200"
              >
                {num}{i < phoneNumbers.length - 1 ? " |" : ""}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-[#A08875]">Follow Us:</span>
            <a
              href="https://www.instagram.com/globalbiomedicals/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition-colors p-1"
              aria-label="Instagram"
            >
              <FaInstagram size={15} />
            </a>
            <a
              href="https://www.facebook.com/people/Global-Biomedicals-Inc/100090524869295/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1877F2] transition-colors p-1"
              aria-label="Facebook"
            >
              <FaFacebook size={15} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-[#E6D8C8] bg-[#FFFDF9]/90 backdrop-blur-xl">
        <div className="container-custom flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href={makeLink("/")} className="flex items-center gap-3.5 group">
            <div className="relative flex items-center justify-center">
              <div className="h-14 w-14 rounded-2xl overflow-hidden bg-white p-1 shadow-md shadow-[#6F4E37]/15 border border-[#C49A6C]/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[#6F4E37]/30">
                <img
                  src="/global-logo.png"
                  alt="Global Biomedicals Inc Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C49A6C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#8B5A2B] border-2 border-white"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold tracking-tight text-[#6F4E37] leading-none group-hover:text-[#8B5A2B] transition-colors">
                Global<span className="text-[#2F241E]">Biomedical</span>
              </span>
              <span className="text-[10px] font-semibold text-[#8B5A2B] tracking-wider uppercase hidden sm:inline-block mt-0.5">
                Diagnostics & Medical Tech
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-8 text-[15px] font-medium lg:flex">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={makeLink(link.path)}
                className="relative text-[#5E5146] transition-all duration-300 hover:text-[#8B5A2B] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#8B5A2B] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>

            ))}

          </nav>

          {/* Desktop Right Side: Social & Button */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-3 border-r border-[#E6D8C8] pr-5">
              <a
                href="https://www.instagram.com/globalbiomedicals/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#F5EBDD] p-2.5 text-[#6F4E37] transition hover:bg-[#8B5A2B] hover:text-white"
                title="Instagram"
              >
                <FaInstagram size={17} />
              </a>
              <a
                href="https://www.facebook.com/people/Global-Biomedicals-Inc/100090524869295/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#F5EBDD] p-2.5 text-[#6F4E37] transition hover:bg-[#8B5A2B] hover:text-white"
                title="Facebook"
              >
                <FaFacebook size={17} />
              </a>
            </div>

            <Link href={makeLink("/contact")}>

              <button className="rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                Get Quote

              </button>

            </Link>

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 text-[#6F4E37] transition hover:bg-[#F5EBDD] lg:hidden"
          >

            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}

          </button>

        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[550px]" : "max-h-0"
            }`}
        >

          <div className="border-t border-[#E6D8C8] bg-[#FFFDF9] p-6">

            <nav className="flex flex-col gap-5">

              {navLinks.map((link) => (

                <Link
                  key={link.name}
                  href={makeLink(link.path)}
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-[#5E5146] transition hover:text-[#8B5A2B]"
                >
                  {link.name}
                </Link>

              ))}

              {/* Mobile Phone List */}
              <div className="pt-2 border-t border-[#E6D8C8]">
                <p className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider mb-2">Contact Us</p>
                <div className="flex flex-col gap-2 text-sm text-[#5E5146]">
                  {phoneNumbers.map((num, i) => (
                    <a
                      key={i}
                      href={`tel:${num.replace(/\s+/g, "")}`}
                      className="flex items-center gap-2 hover:text-[#8B5A2B]"
                    >
                      <Phone size={14} className="text-[#8B5A2B]" />
                      {num}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Social Links */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-sm font-medium text-[#5E5146]">Social:</span>
                <a
                  href="https://www.instagram.com/globalbiomedicals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#F5EBDD] p-2 text-[#6F4E37] hover:bg-[#8B5A2B] hover:text-white"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://www.facebook.com/people/Global-Biomedicals-Inc/100090524869295/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#F5EBDD] p-2 text-[#6F4E37] hover:bg-[#8B5A2B] hover:text-white"
                >
                  <FaFacebook size={18} />
                </a>
              </div>

              <Link
                href={makeLink("/contact")}
                onClick={() => setMenuOpen(false)}
              >

                <button className="mt-2 w-full rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl">

                  Get Quote

                </button>

              </Link>

            </nav>

          </div>

        </div>
      </div>

    </header>
  );
}