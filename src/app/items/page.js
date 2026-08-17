import { fetchFullCatalog } from "@/lib/data-fetcher-server";
import ProductsClient from "./ProductsClient";

export const revalidate = 3600; // Revalidate cache every hour

export const metadata = {
  title: "Biomedical & Laboratory Products Catalog | Global Biomedical Inc",
  description:
    "Explore our complete product catalog of CBC machines, 3-part & 5-part Hematology Analyzers, Biochemistry Analyzers, Electrolyte Analyzers, Urine Analyzers, and diagnostic reagents across India.",
  keywords: [
    "Biomedical Products Catalog",
    "CBC Machine Price",
    "Hematology Analyzer India",
    "Biochemistry Analyzer Supplier",
    "Electrolyte Analyzer",
    "Urine Analyzer",
    "Diagnostic Machinery Catalog",
    "Lab Equipment Sales India",
  ],
  openGraph: {
    title: "Biomedical & Laboratory Products Catalog | Global Biomedical Inc",
    description:
      "Explore our complete product catalog of CBC machines, Hematology Analyzers, Biochemistry Analyzers, Electrolyte Analyzers, and diagnostic reagents across India.",
    url: "https://globalbiomedicals.net/items",
    images: [{ url: "/global-logo.png" }],
  },
  alternates: {
    canonical: "https://globalbiomedicals.net/items",
  },
};

export default async function ProductsPage({ district = null, city = null }) {
  // Fetch full catalog from server cache
  const allProducts = await fetchFullCatalog();

  return (
    <ProductsClient
      initialProducts={allProducts}
      district={district}
      city={city}
    />
  );
}