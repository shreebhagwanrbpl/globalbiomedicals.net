"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  PackageCheck,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categorySearch, setCategorySearch] =
    useState("");

  const [productSearch, setProductSearch] =
    useState("");
  const [loading, setLoading] = useState(true);



  const [openedCategory, setOpenedCategory] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [pendingScroll, setPendingScroll] =
    useState(null);

  const [loadedImages, setLoadedImages] =
    useState({});

  const [showTopButton, setShowTopButton] =
    useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const district =
    pathParts[0] === "items"
      ? null
      : pathParts[0];

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const categorySnap = await getDocs(
          collection(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "categoryproducts",
            "categories"
          )
        );

        const allProducts = [];

        categorySnap.forEach((categoryDoc) => {

          const data = categoryDoc.data();

          const categoryProducts =
            (data.products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `${categoryDoc.id}-${index}`,
                category:
                  data.category ||
                  categoryDoc.id,
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...categoryProducts
          );

        });

        const oldSnap = await getDoc(
          doc(
            db,
            "websites",
            "centralbiomedicals",
            "pages",
            "products"
          )
        );

        if (oldSnap.exists()) {

          const oldProducts =
            (oldSnap.data().products || [])
              .filter(
                (p) => p.isPublished !== false
              )
              .map((item, index) => ({
                ...item,
                uid: `other-${index}`,
                category:
                  "Other Products",
                slug:
                  item.slug ||
                  makeSlug(item.title),
              }));

          allProducts.push(
            ...oldProducts
          );

        }
        console.log("ALL PRODUCTS", allProducts);
        setProducts(allProducts);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const text = `
      ${item.title}
      ${item.brand}
      ${item.model}
      ${item.category}
      `
        .toLowerCase();

      return text.includes(
        productSearch.toLowerCase()
      );
    });
  }, [products, productSearch]);

  const groupedProducts = useMemo(() => {
    const obj = {};

    filteredProducts.forEach((item) => {
      if (!obj[item.category]) {
        obj[item.category] = [];
      }

      obj[item.category].push(item);
    });

    return obj;
  }, [filteredProducts]);

  const sortedGroupedProducts =
    useMemo(() => {

      const entries =
        Object.entries(
          groupedProducts
        );

      entries.sort(([a], [b]) => {

        if (
          a === "Other Products"
        )
          return 1;

        if (
          b === "Other Products"
        )
          return -1;

        return a.localeCompare(b);

      });

      return Object.fromEntries(
        entries
      );

    }, [groupedProducts]);
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
    setPendingScroll(slug);
  };

  useEffect(() => {
    if (!pendingScroll) return;

    const timer = setTimeout(() => {
      const el =
        document.getElementById(
          pendingScroll
        );

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setPendingScroll(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [openedCategory, pendingScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(
        window.scrollY > 500
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[420px] rounded-[32px] bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Banner */}
      <PageBanner
        title="Our Products"
        subtitle="Explore advanced biomedical and diagnostic equipment designed for modern healthcare excellence."
      />

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">

          <SectionTitle
            badge="Featured Products"
            title="Premium Biomedical Equipment"
            description="Discover high-quality diagnostic and biomedical technologies tailored for laboratories, healthcare institutions, and modern diagnostics."
            center
          />
        </div>

        {/* Search */}
        <div className="relative mx-auto mt-6 max-w-2xl px-4 lg:mt-10 lg:px-0">

          {/* Search Icon */}
          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#8B5A2B]"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="h-16 w-full rounded-2xl border border-[#D9C7B5] bg-[#FFFDF9] pl-14 pr-5 text-[#2F241E] placeholder:text-[#8A7B70] shadow-md outline-none transition-all duration-300 focus:border-[#8B5A2B] focus:ring-4 focus:ring-[#C49A6C]/20"
          />

        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-10 mt-8 lg:mt-16 items-start px-4 lg:px-0">
          <aside
            className="
    self-start
    rounded-3xl
    border
    border-[#E6D8C8]
    bg-[#FFFDF9]
    p-4
    shadow-[0_20px_50px_rgba(111,78,55,0.12)]
    lg:sticky
    lg:top-24
    lg:p-6
  "
          >

            {/* Heading */}
            <h3 className="mb-6 text-2xl font-extrabold text-[#2F241E]">
              Categories
            </h3>

            <div className="mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

            <div className="space-y-3">

              {Object.keys(sortedGroupedProducts)
                .filter((category) =>
                  category
                    .toLowerCase()
                    .includes(categorySearch.toLowerCase())
                )
                .map((category) => (

                  <div
                    key={category}
                    className="overflow-hidden rounded-2xl border border-[#E6D8C8] bg-[#FFFDF9]"
                  >

                    <button
                      onClick={() => toggleCategory(category)}
                      className={`w-full flex items-center justify-between px-5 py-4 transition-all duration-300

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
                      className={`custom-scrollbar overflow-y-auto transition-all duration-300

            ${openedCategory === category
                          ? "max-h-72"
                          : "max-h-0 overflow-hidden"
                        }`}
                    >

                      {groupedProducts[category].map((item) => (

                        <button
                          key={item.uid}
                          onClick={() =>
                            scrollToProduct(item.slug, category)
                          }
                          className="block w-full border-t border-[#EFE4D7] px-6 py-3 text-left text-[#6B5F55] transition-all duration-300 hover:bg-[#F8F5F0] hover:text-[#8B5A2B]"
                        >
                          {item.title}
                        </button>

                      ))}

                    </div>

                  </div>

                ))}

            </div>

          </aside>



          {/* ==========================
                RIGHT SIDE START
            ========================== */}

          <div className="space-y-16">
            {filteredProducts.length === 0 ? (

              <div className="rounded-[32px] border border-[#E6D8C8] bg-[#FFFDF9] p-10 text-center shadow-[0_20px_60px_rgba(111,78,55,0.12)] lg:p-16">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-5xl shadow-md">
                  🔍
                </div>

                {/* Title */}
                <h2 className="text-2xl font-extrabold text-[#2F241E] lg:text-4xl">
                  Product Not Found
                </h2>

                {/* Decorative Line */}
                <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

                {/* Description */}
                <p className="mx-auto mt-6 max-w-xl leading-8 text-[#6B5F55]">

                  We couldn't find any products matching

                  <span className="font-bold text-[#8B5A2B]">
                    {" "}
                    "{productSearch}"
                    {" "}
                  </span>

                  Please try another keyword or browse different categories.

                </p>

                {/* Button */}
                <button
                  onClick={() => setProductSearch("")}
                  className="mt-8 rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(111,78,55,0.30)]"
                >
                  View All Products
                </button>

              </div>

            ) : (

              Object.entries(groupedProducts).map(
                ([category, list]) => (

                  <section
                    key={category}
                    id={category
                      .replace(/\s+/g, "-")
                      .toLowerCase()}
                  >

                    {/* Category Header */}

                    <div className="mb-8 flex flex-col gap-4 border-b border-[#E6D8C8] pb-6 sm:flex-row sm:items-center sm:justify-between">

                      {/* Left */}
                      <div>

                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#2F241E]">
                          {category}
                        </h2>

                        <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#C49A6C]" />

                      </div>

                      {/* Right */}
                      <span className="inline-flex items-center justify-center rounded-full border border-[#D9C7B5] bg-[#FFF8F1] px-5 py-2 text-sm font-bold text-[#8B5A2B] shadow-sm">
                        {list.length} Products
                      </span>

                    </div>

                    {/* Product List */}

                    <div className="space-y-8">

                      {list.map((product) => (

                        <div
                          key={product.uid}
                          id={product.slug}
                          className="bg-white rounded-[30px] border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-8"
                        >

                          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[240px_1fr_190px] lg:gap-8">

                            {/* Image */}
                            <div className="relative h-[190px] sm:h-[230px] overflow-hidden rounded-3xl border border-[#E6D8C8] bg-gradient-to-br from-[#FFFDF9] to-[#F8F5F0]">

                              {!loadedImages[product.uid] && (
                                <div className="absolute inset-0 animate-pulse bg-[#ECE4DA]" />
                              )}

                              <img
                                src={
                                  product.images?.[0] ||
                                  product.image ||
                                  "/placeholder.jpg"
                                }
                                alt={product.title}
                                onLoad={() =>
                                  setLoadedImages((prev) => ({
                                    ...prev,
                                    [product.uid]: true,
                                  }))
                                }
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.jpg";
                                }}
                                className={`h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-105 ${loadedImages[product.uid]
                                  ? "opacity-100"
                                  : "opacity-0"
                                  }`}
                              />

                            </div>

                            {/* Content */}
                            <div>

                              <h3 className="text-2xl font-extrabold text-[#2F241E] transition-colors duration-300 group-hover:text-[#8B5A2B]">
                                {product.title}
                              </h3>

                              <p className="mt-4 leading-8 text-[#6B5F55]">
                                {product.description ||
                                  product.desc ||
                                  "Premium biomedical equipment designed for laboratories, hospitals and diagnostic centres."}
                              </p>

                              {/* Product Info */}
                              <div className="mt-6 grid gap-4 md:grid-cols-2">

                                <div className="rounded-2xl border border-[#E6D8C8] bg-[#FDF9F4] p-4 transition-all duration-300 hover:border-[#C49A6C]">
                                  <p className="text-xs uppercase tracking-wider text-[#8A7B70]">
                                    Brand
                                  </p>

                                  <p className="mt-2 font-bold text-[#2F241E]">
                                    {product.brand || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl border border-[#E6D8C8] bg-[#FDF9F4] p-4 transition-all duration-300 hover:border-[#C49A6C]">
                                  <p className="text-xs uppercase tracking-wider text-[#8A7B70]">
                                    Model
                                  </p>

                                  <p className="mt-2 font-bold text-[#2F241E]">
                                    {product.model || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl border border-[#E6D8C8] bg-[#FDF9F4] p-4 transition-all duration-300 hover:border-[#C49A6C]">
                                  <p className="text-xs uppercase tracking-wider text-[#8A7B70]">
                                    Instrument
                                  </p>

                                  <p className="mt-2 font-bold text-[#2F241E]">
                                    {product.instrument || "N/A"}
                                  </p>
                                </div>

                                <div className="rounded-2xl border border-[#E6D8C8] bg-[#FDF9F4] p-4 transition-all duration-300 hover:border-[#C49A6C]">
                                  <p className="text-xs uppercase tracking-wider text-[#8A7B70]">
                                    Category
                                  </p>

                                  <p className="mt-2 font-bold text-[#2F241E]">
                                    {product.category}
                                  </p>
                                </div>

                              </div>

                            </div>

                            {/* Button */}
                            <div className="flex justify-center lg:justify-end">

                              <Link
                                href={
                                  district
                                    ? `/${district}/items/${product.slug}`
                                    : `/items/${product.slug}`
                                }
                                className="rounded-2xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(111,78,55,0.30)]"
                              >
                                Get Quote
                              </Link>

                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </section>

                ))
            )}

          </div>

        </div>

      </section>

      {/* Why Choose Products */}
      <section className="relative overflow-hidden section-padding bg-gradient-to-br from-[#FFFDF9] via-[#F8F5F0] to-[#F3ECE4]">

        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#C49A6C]/15 blur-[130px]" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#8B5A2B]/10 blur-[130px]" />

        <div className="container-custom relative z-10">

          <SectionTitle
            badge="Why Our Products"
            title="Trusted Quality & Innovation"
            description="We provide biomedical products designed for performance, reliability, and healthcare excellence."
            center
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: <ShieldCheck size={30} />,
                title: "Certified Quality",
              },
              {
                icon: <Truck size={30} />,
                title: "Fast Delivery",
              },
              {
                icon: <BadgeCheck size={30} />,
                title: "Trusted Support",
              },
              {
                icon: <PackageCheck size={30} />,
                title: "Premium Equipment",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="group rounded-[30px] border border-[#E6D8C8] bg-[#FFFDF9] p-8 text-center shadow-[0_15px_45px_rgba(111,78,55,0.12)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C49A6C] hover:shadow-[0_25px_60px_rgba(111,78,55,0.18)]"
              >

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-[#F8F5F0] to-[#F3E7D9] text-[#8B5A2B] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:from-[#6F4E37] group-hover:to-[#A06A3B] group-hover:text-white">

                  {item.icon}

                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#2F241E] transition-colors duration-300 group-hover:text-[#8B5A2B]">

                  {item.title}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <CTASection />

      {/* Back To Top */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#C49A6C] bg-gradient-to-br from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] text-white shadow-[0_12px_30px_rgba(111,78,55,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_18px_40px_rgba(111,78,55,0.45)]"
          aria-label="Scroll to top"
        >

          <ChevronUp
            size={24}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />

        </button>

      )}

    </>

  );

}