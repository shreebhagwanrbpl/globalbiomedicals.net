import { notFound } from "next/navigation";
import Link from "next/link";
import {
  fetchCategoriesSummary,
  fetchProductsByCategorySlug,
  fetchDistricts,
  makeSlug
} from "@/lib/data-fetcher-server";
import { CATEGORY_DESCRIPTIONS, SITE_URL, SITE_NAME } from "@/lib/constants";
import PageBanner from "@/components/PageBanner";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";
import { ShieldCheck, CheckCircle2, FileText, ArrowRight, HelpCircle } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await fetchCategoriesSummary();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await fetchCategoriesSummary();
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    return {
      title: "Category Not Found | Global Biomedical",
    };
  }

  const categoryName = cat.name;
  const staticInfo = CATEGORY_DESCRIPTIONS[slug] || {};

  const title = `${categoryName} Supplier in India | Price, Specs & Models | Global Biomedical`;
  const description = staticInfo.description
    ? staticInfo.description.slice(0, 160)
    : `Buy top quality ${categoryName} from Global Biomedical. Authorized supplier of 3-part & 5-part hematology counters, biochemistry analyzers, electrolyte readers, and diagnostic machinery across India.`;

  const url = `${SITE_URL}/category/${slug}`;

  return {
    title,
    description,
    keywords: [
      categoryName,
      `${categoryName} Supplier`,
      `${categoryName} Price`,
      `${categoryName} India`,
      `${categoryName} Supplier in India`,
      `Buy ${categoryName}`,
      "Laboratory Equipment",
      "Diagnostic Equipment",
      "Biomedical Machinery",
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categories = await fetchCategoriesSummary();
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    notFound();
  }

  const products = await fetchProductsByCategorySlug(slug);
  const districts = await fetchDistricts();
  const info = CATEGORY_DESCRIPTIONS[slug] || {
    name: cat.name,
    tagline: `High-Precision ${cat.name} Solutions for Laboratories & Hospitals`,
    description: `${cat.name} diagnostic equipment supplied and serviced across India by Global Biomedical. Engineered for accurate testing, high uptime, and long service life.`,
    uses: `Used across pathology laboratories, hospital diagnostic suites, ICUs, and research institutes for routine and specialized testing.`,
    targetAudience: "Pathology Labs, Diagnostic Centers, Hospitals, Polyclinics, and Research Institutes.",
    specifications: [
      "OEM Compliant Quality Standards",
      "High Operational Throughput",
      "Low Reagent Consumption Per Test",
      "Comprehensive Annual Maintenance Support (AMC/CMC)"
    ],
    buyingGuide: `Consider daily test volume, reagent cost per sample, warranty terms, and local service turnaround when selecting ${cat.name}.`
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
        name: "Products Catalog",
        item: `${SITE_URL}/items`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cat.name,
        item: `${SITE_URL}/category/${slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is a ${cat.name} used for?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: info.uses,
        },
      },
      {
        "@type": "Question",
        name: `Do you supply ${cat.name} across India?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, Global Biomedical supplies, installs, and services ${cat.name} units across multiple districts in Rajasthan and nationwide.`,
        },
      },
      {
        "@type": "Question",
        name: `Do you provide AMC and installation support for ${cat.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, we provide full on-site installation, commissioning, user training, and AMC/CMC technical maintenance services for ${cat.name}.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Banner */}
      <PageBanner
        title={`${cat.name} Equipment`}
        subtitle={info.tagline}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-[#F8F5F0] border-b border-[#E6D8C8] py-3 text-sm">
        <div className="container-custom flex items-center gap-2 text-[#6B5F55]">
          <Link href="/" className="hover:text-[#8B5A2B] transition-colors font-medium">Home</Link>
          <span>/</span>
          <Link href="/items" className="hover:text-[#8B5A2B] transition-colors font-medium">Products</Link>
          <span>/</span>
          <span className="text-[#2F241E] font-bold">{cat.name}</span>
        </div>
      </nav>

      {/* Category Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="inline-block text-[#8B5A2B] bg-[#FFF8F1] border border-[#D9C7B5] px-4 py-1.5 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
                  Topical Category Hub
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2F241E] leading-tight">
                  {cat.name} Supplier & Distributor
                </h1>
                <p className="mt-4 text-base sm:text-lg leading-8 text-[#6B5F55]">
                  {info.description}
                </p>
              </div>

              {/* Uses & Applications */}
              <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#2F241E] mb-3 flex items-center gap-2">
                  <ShieldCheck className="text-[#8B5A2B]" size={22} /> Clinical Applications & Uses
                </h2>
                <p className="text-[#6B5F55] leading-7 text-base">
                  {info.uses}
                </p>
                <div className="mt-4 pt-4 border-t border-[#E6D8C8]">
                  <p className="text-xs font-bold text-[#8B5A2B] uppercase tracking-wider">Target Facilities:</p>
                  <p className="text-sm font-semibold text-[#2F241E] mt-1">{info.targetAudience}</p>
                </div>
              </div>

              {/* Specifications */}
              <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#2F241E] mb-4 flex items-center gap-2">
                  <FileText className="text-[#8B5A2B]" size={22} /> Technical Specifications Overview
                </h2>
                <div className="space-y-3">
                  {info.specifications.map((spec, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#8B5A2B] shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-[#2F241E]">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buying Considerations */}
              {info.buyingGuide && (
                <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFF8F1] p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[#2F241E] mb-2">
                    💡 Equipment Buying Guide
                  </h2>
                  <p className="text-sm leading-7 text-[#6B5F55]">
                    {info.buyingGuide}
                  </p>
                </div>
              )}
            </div>

            {/* Right Sidebar: Categories & District Links */}
            <aside className="space-y-6">
              {/* Category Links */}
              <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-[#2F241E] mb-4 border-b border-[#E6D8C8] pb-3">
                  All Equipment Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-all ${
                        c.slug === slug
                          ? "bg-[#6F4E37] text-white shadow-md"
                          : "text-[#6B5F55] hover:bg-[#F5EBDD] hover:text-[#8B5A2B]"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.slug === slug ? "bg-white/20 text-white" : "bg-[#F3E7D9] text-[#8B5A2B]"}`}>
                        {c.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* District Service Links */}
              <div className="rounded-3xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-sm">
                <h3 className="text-lg font-extrabold text-[#2F241E] mb-3 border-b border-[#E6D8C8] pb-3">
                  Regional District Coverage
                </h3>
                <p className="text-xs text-[#6B5F55] mb-3">
                  Looking for {cat.name} installation or AMC service in a specific district?
                </p>
                <div className="flex flex-wrap gap-2">
                  {districts.slice(0, 8).map((d) => (
                    <Link
                      key={d.slug}
                      href={`/${d.slug}`}
                      className="text-xs font-semibold text-[#8B5A2B] bg-[#FFF8F1] border border-[#D9C7B5] px-3 py-1.5 rounded-xl hover:bg-[#8B5A2B] hover:text-white transition-colors"
                    >
                      {d.district}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Available Products Grid */}
      <section className="section-padding bg-[#F8F5F0] border-t border-[#E6D8C8]">
        <div className="container-custom">
          <SectionTitle
            badge={`${cat.name} Models`}
            title={`Available ${cat.name} Products`}
            description={`Explore high-performance ${cat.name} models available for sale, installation, and AMC contract in India.`}
            center
          />

          <div className="mt-12 space-y-8">
            {products.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-[#E6D8C8]">
                <p className="text-[#6B5F55]">Products for this category are currently being updated.</p>
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

      {/* Frequently Asked Questions */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            badge="Category FAQs"
            title={`Frequently Asked Questions on ${cat.name}`}
            center
          />

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2F241E] flex items-center gap-2">
                <HelpCircle size={20} className="text-[#8B5A2B]" /> What is a {cat.name} used for?
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#6B5F55]">
                {info.uses}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2F241E] flex items-center gap-2">
                <HelpCircle size={20} className="text-[#8B5A2B]" /> Do you provide installation and AMC service for {cat.name}?
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#6B5F55]">
                Yes, Global Biomedical provides complete on-site installation, commissioning, staff operation training, and Annual Maintenance Contracts (AMC/CMC) with guaranteed uptime across India.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E6D8C8] bg-[#FFFDF9] p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#2F241E] flex items-center gap-2">
                <HelpCircle size={20} className="text-[#8B5A2B]" /> How can I get a quotation for a {cat.name}?
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#6B5F55]">
                You can submit an inquiry form on any product page or contact our team directly at {SITE_NAME} to get the latest pricing, model specifications, and delivery options.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
