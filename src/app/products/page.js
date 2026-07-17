"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export default function ProductsPage() {

  const products = [

    {
      category: "Electrolyte Reagents",
      title: "Roche 9180 Electrolyte Reagent",
      image: "/images/product-1.jpg",
      description:
        "High precision electrolyte reagent for Roche analyzers.",
      brand: "Roche",
      model: "9180",
      slug: "roche-9180-electrolyte-reagent",
    },

    {
      category: "Electrolyte Reagents",
      title: "ERBA EC 90 Reagent",
      image: "/images/product-2.jpg",
      description:
        "Premium quality electrolyte reagent.",
      brand: "ERBA",
      model: "EC90",
      slug: "erba-ec90",
    },

    {
      category: "Rapid Test Kits",
      title: "COVID Rapid Test Kit",
      image: "/images/product-3.jpg",
      description:
        "Fast and reliable rapid testing solution.",
      brand: "Bio",
      model: "RT-100",
      slug: "covid-kit",
    },

    {
      category: "Rapid Test Kits",
      title: "Dengue Rapid Kit",
      image: "/images/product-4.jpg",
      description:
        "High sensitivity dengue rapid test.",
      brand: "Bio",
      model: "DG200",
      slug: "dengue-kit",
    },

    {
      category: "Hematology",
      title: "Hematology Reagent",
      image: "/images/product-5.jpg",
      description:
        "Premium hematology solution.",
      brand: "Mindray",
      model: "BC5300",
      slug: "hematology",
    },

  ];

  const [search, setSearch] =
    useState("");

  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const filteredProducts =
    useMemo(() => {

      return products.filter((item) => {

        const text = `
        ${item.title}
        ${item.brand}
        ${item.category}
        `.toLowerCase();

        return text.includes(
          search.toLowerCase()
        );

      });

    }, [search]);

  const groupedProducts =
    useMemo(() => {

      const obj = {};

      filteredProducts.forEach((item) => {

        if (!obj[item.category]) {

          obj[item.category] = [];

        }

        obj[item.category].push(item);

      });

      return obj;

    }, [filteredProducts]);

  const categories =
    Object.keys(groupedProducts);

  const toggleCategory = (category) => {

    if (openedCategory === category) {

      setOpenedCategory("");

      return;

    }

    setOpenedCategory(category);

  };

  const scrollToProduct = (
    slug,
    category
  ) => {

    setOpenedCategory(category);

    setActiveCategory(category);

    setTimeout(() => {

      const el =
        document.getElementById(slug);

      if (el) {

        el.scrollIntoView({

          behavior: "smooth",

          block: "start",

        });

      }

    }, 250);

  };

  return (
    <>
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      <section className="py-24 bg-slate-50">

        <div className="max-w-7xl mx-auto px-5">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover premium diagnostic products for hospitals and laboratories."
            center
          />

          <div className="grid lg:grid-cols-[320px_1fr] gap-10 mt-16">

            {/* ======================
                LEFT SIDEBAR
          ====================== */}

            <aside className="sticky top-28 h-fit rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-[0_20px_50px_rgba(111,78,55,0.12)]">

              {/* Heading */}
              <h2 className="text-2xl font-extrabold text-[#2F241E]">
                Categories
              </h2>

              <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

              {/* Search */}
              <input
                type="text"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-6 h-12 w-full rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] px-4 text-[#2F241E] placeholder:text-[#8A7B70] outline-none transition-all duration-300 focus:border-[#8B5A2B] focus:ring-4 focus:ring-[#C49A6C]/20"
              />

              {/* Categories */}
              <div className="mt-6 space-y-3">

                {categories.map((category) => (

                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-[#E6D8C8] bg-[#FFFDF9]"
                  >

                    <button
                      onClick={() => toggleCategory(category)}
                      className={`flex w-full items-center justify-between px-5 py-4 transition-all duration-300

          ${activeCategory === category
                          ? "bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] text-white"
                          : "bg-[#FFFDF9] text-[#2F241E] hover:bg-[#F8F5F0]"
                        }`}
                    >

                      <span className="flex items-center gap-3 font-semibold">

                        {openedCategory === category ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}

                        {category}

                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold

            ${activeCategory === category
                            ? "bg-white/20 text-white"
                            : "bg-[#F3E7D9] text-[#8B5A2B]"
                          }`}
                      >
                        {groupedProducts[category].length}
                      </span>

                    </button>

                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight:
                          openedCategory === category
                            ? groupedProducts[category].length * 46 + "px"
                            : "0px",
                      }}
                    >

                      {groupedProducts[category].map((item) => (

                        <button
                          key={item.slug}
                          onClick={() =>
                            scrollToProduct(item.slug, category)
                          }
                          className="block w-full border-t border-[#EFE4D7] px-6 py-3 text-left text-sm text-[#6B5F55] transition-all duration-300 hover:bg-[#F8F5F0] hover:text-[#8B5A2B]"
                        >
                          {item.title}
                        </button>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </aside>

            {/* ======================
                RIGHT SIDE
          ====================== */}

            <div>

              <div className="space-y-12">

                {Object.entries(groupedProducts).map(
                  ([category, list]) => (

                    <section
                      key={category}
                      id={category
                        .replace(/\s+/g, "-")
                        .toLowerCase()}
                    >

                      {/* CATEGORY TITLE */}

                      <div className="mb-8 flex flex-col gap-4 border-b border-[#E6D8C8] pb-6 sm:flex-row sm:items-center sm:justify-between">

                        {/* Left */}
                        <div>

                          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2F241E]">
                            {category}
                          </h2>

                          <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

                        </div>

                        {/* Right */}
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#D9C7B5] bg-[#FFF8F1] px-5 py-2 text-sm font-bold text-[#8B5A2B] shadow-sm">

                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#6F4E37] to-[#8B5A2B] text-xs font-bold text-white">
                            {list.length}
                          </span>

                          Products

                        </span>

                      </div>

                      <div className="space-y-6">

                        {list.map((product) => (

                          <div
                            key={product.slug}
                            id={product.slug}
                            className="bg-white rounded-[28px] border border-slate-200 shadow-lg p-7 hover:shadow-xl transition"
                          >

                            <div className="grid items-center gap-8 lg:grid-cols-[250px_1fr_190px]">

                              {/* IMAGE */}

                              <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-3xl border border-[#E6D8C8] bg-gradient-to-br from-[#FFFDF9] to-[#F8F5F0]">

                                <Image
                                  src={product.image}
                                  alt={product.title}
                                  width={220}
                                  height={220}
                                  className="max-h-[180px] object-contain transition-transform duration-500 hover:scale-105"
                                />

                              </div>

                              {/* CONTENT */}

                              <div>

                                <h3 className="text-2xl font-extrabold text-[#2F241E]">
                                  {product.title}
                                </h3>

                                <p className="mt-4 leading-8 text-[#6B5F55]">
                                  {product.description}
                                </p>

                                <div className="mt-6 grid grid-cols-2 gap-4">

                                  <div className="rounded-2xl border border-[#E6D8C8] bg-[#FDF9F4] p-4 transition-all duration-300 hover:border-[#C49A6C]">

                                    <p className="text-xs uppercase tracking-wider text-[#8A7B70]">
                                      Brand
                                    </p>

                                    <p className="mt-2 font-bold text-[#2F241E]">
                                      {product.brand}
                                    </p>

                                  </div>

                                  <div className="rounded-2xl border border-[#E6D8C8] bg-[#FDF9F4] p-4 transition-all duration-300 hover:border-[#C49A6C]">

                                    <p className="text-xs uppercase tracking-wider text-[#8A7B70]">
                                      Model
                                    </p>

                                    <p className="mt-2 font-bold text-[#2F241E]">
                                      {product.model}
                                    </p>

                                  </div>

                                </div>

                              </div>

                              {/* BUTTON */}

                              <div className="flex justify-center lg:justify-end">

                                <Link
                                  href={`/products/${product.slug}`}
                                  className="w-full lg:w-auto"
                                >

                                  <button className="w-full rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-8 py-4 font-semibold text-white shadow-[0_12px_30px_rgba(111,78,55,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(111,78,55,0.35)]">

                                    View Details

                                  </button>

                                </Link>

                              </div>

                            </div>

                          </div>

                        ))}

                      </div>

                    </section>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===========================
            WHY CHOOSE US
      =========================== */}

      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C49A6C]/15 blur-[130px]" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#8B5A2B]/10 blur-[130px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5">

          <SectionTitle
            badge="Why Choose Our Products"
            title="Trusted Quality & Innovation"
            description="Every product is manufactured to meet international quality standards with reliable support."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: <ShieldCheck size={32} />,
                title: "Certified Quality",
                desc: "Premium products tested under strict quality standards.",
              },
              {
                icon: <Truck size={32} />,
                title: "Fast Delivery",
                desc: "Quick dispatch across India with secure packaging.",
              },
              {
                icon: <BadgeCheck size={32} />,
                title: "Trusted Support",
                desc: "Professional customer assistance whenever required.",
              },
              {
                icon: <PackageCheck size={32} />,
                title: "Premium Equipment",
                desc: "High-performance biomedical equipment for laboratories.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 text-center shadow-[0_15px_45px_rgba(111,78,55,0.10)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_25px_60px_rgba(111,78,55,0.18)]"
              >

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-[#8B5A2B] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">

                  {item.icon}

                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#2F241E] transition-colors duration-300 group-hover:text-[#8B5A2B]">

                  {item.title}

                </h3>

                {/* Description */}
                <p className="mt-4 leading-7 text-[#6B5F55]">

                  {item.desc}

                </p>

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