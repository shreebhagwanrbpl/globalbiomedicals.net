import { fetchFullCatalogFromFirestore, makeSlug } from "./data-fetcher.js";
import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { getCompanyAndWebsiteConfig } from "./companyConfig.js";

export { makeSlug };

/**
 * Server-side catalog fetcher with zero stale caching.
 * Resolves directly from Firestore Master Catalog on every request.
 */
export async function fetchFullCatalog() {
  return await fetchFullCatalogFromFirestore();
}

/**
 * Fetch districts for the website
 */
export async function fetchDistricts() {
  const { normalizedWebsiteId } = getCompanyAndWebsiteConfig();
  try {
    const snap = await getDocs(
      collection(db, "websites", normalizedWebsiteId, "districts")
    );
    const districts = snap.docs.map((docSnap) => {
      const d = docSnap.data();
      const slug = d.slug || docSnap.id;
      const districtName =
        d.district || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        id: docSnap.id,
        slug,
        district: districtName,
        state: d.state || "Rajasthan",
        nearby: d.nearby || [],
        description: d.description || "",
      };
    });

    if (districts.length > 0) return districts;
  } catch (err) {
    console.error("Error fetching districts server side:", err);
  }

  return [
    { id: "jaipur", slug: "jaipur", district: "Jaipur", state: "Rajasthan" },
    { id: "jodhpur", slug: "jodhpur", district: "Jodhpur", state: "Rajasthan" },
    { id: "udaipur", slug: "udaipur", district: "Udaipur", state: "Rajasthan" },
    { id: "kota", slug: "kota", district: "Kota", state: "Rajasthan" },
    { id: "ajmer", slug: "ajmer", district: "Ajmer", state: "Rajasthan" },
    { id: "bikaner", slug: "bikaner", district: "Bikaner", state: "Rajasthan" },
    { id: "alwar", slug: "alwar", district: "Alwar", state: "Rajasthan" },
    { id: "bhilwara", slug: "bhilwara", district: "Bhilwara", state: "Rajasthan" },
  ];
}

/**
 * Summarizes categories and their subcategories from visible Master Catalog items.
 */
export async function fetchCategoriesSummary() {
  const catalog = await fetchFullCatalog();
  const catMap = {};

  catalog.forEach((item) => {
    const name = item.category || "Other Products";
    const slug = makeSlug(name);

    if (!catMap[slug]) {
      catMap[slug] = {
        name,
        slug,
        count: 0,
        subcategories: new Set(),
      };
    }
    catMap[slug].count++;
    if (item.subCategory) {
      catMap[slug].subcategories.add(item.subCategory);
    }
  });

  return Object.values(catMap).map((cat) => ({
    ...cat,
    subcategories: Array.from(cat.subcategories),
  }));
}

/**
 * Summarizes brands from visible Master Catalog items.
 */
export async function fetchBrandsSummary() {
  const catalog = await fetchFullCatalog();
  const brandMap = {};

  catalog.forEach((item) => {
    if (!item.brand || item.brand === "N/A") return;
    const name = item.brand;
    const slug = makeSlug(name);

    if (!brandMap[slug]) {
      brandMap[slug] = {
        name,
        slug,
        count: 0,
      };
    }
    brandMap[slug].count++;
  });

  return Object.values(brandMap);
}

/**
 * Fetch visible products under a category slug.
 */
export async function fetchProductsByCategorySlug(categorySlug) {
  const catalog = await fetchFullCatalog();
  return catalog.filter((item) => {
    const catSlug = makeSlug(item.category || "Other Products");
    return catSlug === categorySlug;
  });
}

/**
 * Fetch visible products under a brand slug.
 */
export async function fetchProductsByBrandSlug(brandSlug) {
  const catalog = await fetchFullCatalog();
  return catalog.filter((item) => {
    if (!item.brand) return false;
    return makeSlug(item.brand) === brandSlug;
  });
}

/**
 * Fetch a single product by slug from the visible master catalog.
 */
export async function fetchProductBySlug(slug) {
  const catalog = await fetchFullCatalog();
  return (
    catalog.find(
      (item) => item.slug === slug || makeSlug(item.title || item.name) === slug
    ) || null
  );
}
