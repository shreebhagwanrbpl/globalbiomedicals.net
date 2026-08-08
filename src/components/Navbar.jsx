"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-[#E6D8C8] bg-[#FFFDF9]/90 backdrop-blur-xl shadow-sm">

      <div className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link href={makeLink("/")}>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#6F4E37]">

            Global

            <span className="text-[#2F241E]">
              {" "}Biomedical
            </span>

          </h1>
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

        {/* Desktop Button */}
        <div className="hidden lg:block">

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
        className={`overflow-hidden transition-all duration-300 lg:hidden ${menuOpen ? "max-h-[500px]" : "max-h-0"
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

            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
            >

              <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl">

                Get Quote

              </button>

            </Link>

          </nav>

        </div>

      </div>

    </header>
  );
}