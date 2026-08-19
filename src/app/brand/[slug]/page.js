import { notFound } from "next/navigation";
import Link from "next/link";
import {
  fetchBrandsSummary,
  fetchProductsByBrandSlug,
  fetchDistricts,
  makeSlug
} from "@/lib/data-fetcher-server";
import { BRAND_DESCRIPTIONS, SITE_URL, SITE_NAME } from "@/lib/constants";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const brands = await fetchBrandsSummary();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brands = await fetchBrandsSummary();
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    return {
      title: "Brand Not Found | Global Biomedical",
    };
  }

  const brandName = brand.name;
  const staticInfo = BRAND_DESCRIPTIONS[slug] || {};

  const title = `${brandName} Biomedical & Diagnostic Equipment | Supplier & Service India`;
  const description = staticInfo.description
    ? staticInfo.description.slice(0, 160)
    : `Authorized supplier and service center for ${brandName} biomedical equipment, hematology analyzers, biochemistry analyzers, and reagents across India.`;

  const url = `${SITE_URL}/brand/${slug}`;

  return {
    title,
    description,
    keywords: [
      brandName,
      `${brandName} Supplier`,
      `${brandName} Dealer India`,
      `${brandName} Distributor`,
      `${brandName} Equipment Price`,
      "Biomedical Equipment",
      "Laboratory Machinery",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brands = await fetchBrandsSummary();
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    notFound();
  }

  const products = await fetchProductsByBrandSlug(slug);
  const districts = await fetchDistricts();
  const info = BRAND_DESCRIPTIONS[slug] || {
    name: brand.name,
    description: `${brand.name} diagnostic equipment and clinical machinery supplied and serviced by Global Biomedical. High precision, robust build, and genuine OEM support.`,
    advantages: [
      "OEM Certified Build Quality",
      "Robust Engineering & Accuracy",
      "Widespread Technical Service Support",
      "Competitive Cost of Ownership"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/items`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brand.name,
        item: `${SITE_URL}/brand/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageBanner
        title={`${brand.name} Equipment`}
        subtitle={`Explore ${brand.name} diagnostic machinery, analyzers, and reagents supplied across India.`}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-[#F8F5F0] border-b border-[#E6D8C8] py-3 text-sm">
        <div className="container-custom flex items-center gap-2 text-[#6B5F55]">
          <Link href="/" className="hover:text-[#8B5A2B] transition-colors font-medium">Home</Link>
          <span>/</span>
          <Link href="/items" className="hover:text-[#8B5A2B] transition-colors font-medium">Products</Link>
          <span>/</span>
          <span className="text-[#2F241E] font-bold">{brand.name}</span>
        </div>
      </nav>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="inline-block text-[#8B5A2B] bg-[#FFF8F1] border border-[#D9C7B5] px-4 py-1.5 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
                  Brand Overview
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2F241E]">
                  {brand.name} Diagnostic & Biomedical Equipment
                </h1>
                <p className="mt-4 text-base sm:text-lg leading-8 text-[#6B5F55]">
                  {info.description}
                </p>
              </div>

              <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#2F241E] mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-[#8B5A2B]" size={22} /> Key Advantages of {brand.name}
                </h2>
                <div className="space-y-3">
                  {info.advantages.map((adv, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#8B5A2B] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-[#2F241E]">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-[#2F241E] mb-4 border-b border-[#E6D8C8] pb-3">
                  All Brands
                </h3>
                <div className="space-y-2">
                  {brands.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/brand/${b.slug}`}
                      className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                        b.slug === slug
                          ? "bg-[#6F4E37] text-white shadow-md"
                          : "text-[#6B5F55] hover:bg-[#F5EBDD] hover:text-[#8B5A2B]"
                      }`}
                    >
                      <span>{b.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${b.slug === slug ? "bg-white/20 text-white" : "bg-[#F3E7D9] text-[#8B5A2B]"}`}>
                        {b.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Brand Products */}
      <section className="section-padding bg-[#F8F5F0] border-t border-[#E6D8C8]">
        <div className="container-custom">
          <SectionTitle
            badge={`${brand.name} Catalog`}
            title={`Products Manufactured by ${brand.name}`}
            description={`Explore verified ${brand.name} models supplied with full warranty and AMC support.`}
            center
          />

          <div className="mt-12 space-y-8">
            {products.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-[#E6D8C8]">
                <p className="text-[#6B5F55]">Products for this brand are currently being loaded.</p>
                <Link href="/items" className="mt-4 inline-block px-6 py-2.5 rounded-xl bg-[#6F4E37] text-white font-bold">
                  Browse All Catalog
                </Link>
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.uid} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
