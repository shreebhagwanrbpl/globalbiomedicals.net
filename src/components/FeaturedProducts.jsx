"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchFullCatalog } from "@/lib/data-fetcher";
import { ArrowRight, Sparkles, CheckCircle2, Download } from "lucide-react";

export default function FeaturedProducts({ city = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const catalog = await fetchFullCatalog();
        // Pick first 6 published products for featured list
        const featured = (catalog || []).slice(0, 6);
        setProducts(featured);
      } catch (err) {
        console.error("Error loading featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  const districtSlug = city
    ? city.toLowerCase().replace(/\s+/g, "-")
    : "";

  const makeProductLink = (slug) => {
    return districtSlug ? `/${districtSlug}/items/${slug}` : `/items/${slug}`;
  };

  return (
    <section className="py-20 bg-[#FFFDF9] border-t border-[#E6D8C8]">
      <div className="container-custom">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D9C7B5] bg-[#FFF8F1] px-5 py-2 text-sm font-semibold text-[#8B5A2B] shadow-sm mb-4">
              <Sparkles size={16} /> Top Choice Diagnostics
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2F241E] leading-tight">
              Featured Biomedical Equipment
              {city && <span className="text-[#8B5A2B]"> in {city}</span>}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#6B5F55] max-w-2xl">
              Explore our most trusted diagnostic systems, hematology analyzers, and hospital laboratory instruments.
            </p>
          </div>

          <Link href="/items">
            <button className="group inline-flex items-center gap-2 rounded-2xl bg-[#F5EBDD] px-6 py-3.5 font-bold text-[#6F4E37] transition hover:bg-[#8B5A2B] hover:text-white">
              View Full Catalog
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item, index) => (
              <motion.div
                key={item.uid || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col justify-between rounded-[32px] border border-[#E6D8C8] bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#8B5A2B] hover:shadow-2xl"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-[#F8F5F0] p-4">
                    <img
                      src={item.images?.[0] || item.image || "/placeholder.jpg"}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg";
                      }}
                    />
                    {item.category && (
                      <span className="absolute top-3 left-3 rounded-xl bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-[#6F4E37] shadow-sm">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Title & Brand */}
                  <div className="mt-5">
                    <h3 className="text-xl font-bold text-[#2F241E] group-hover:text-[#8B5A2B] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[#6B5F55]">
                      {item.brand && (
                        <span className="rounded-lg bg-[#F5EBDD] px-2.5 py-1 text-[#6F4E37]">
                          Brand: {item.brand}
                        </span>
                      )}
                      {item.model && (
                        <span className="rounded-lg bg-[#F8F5F0] border border-[#E6D8C8] px-2.5 py-1">
                          Model: {item.model}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-sm text-[#6B5F55] line-clamp-2 leading-relaxed">
                      {item.description || item.desc || "Precision biomedical diagnostic instrument for hospitals & pathology labs."}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-[#E6D8C8] flex items-center justify-between gap-3">
                  <Link href={makeProductLink(item.slug)} className="flex-1">
                    <button className="w-full rounded-xl bg-gradient-to-r from-[#6F4E37] via-[#8B5A2B] to-[#A06A3B] py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95">
                      Get Quote
                    </button>
                  </Link>

                  <a
                    href="/Global-Biomedicals-Brochure.pdf"
                    download="Global-Biomedicals-Brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-[#D9C7B5] bg-[#FFF8F1] p-3 text-[#8B5A2B] transition hover:bg-[#F5EBDD]"
                    title="Download Brochure PDF"
                  >
                    <Download size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
