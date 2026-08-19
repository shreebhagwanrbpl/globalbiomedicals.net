import { fetchFullCatalog as fetchFullCatalogRaw } from "./data-fetcher";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { cache } from "react";

// Global in-memory cache for the server process
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
const CACHE_TTL = 3600 * 1000; // 1 hour

let cachedDistricts = null;
let cachedDistrictsTimestamp = 0;

export const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

async function getCachedCatalog() {
  const now = Date.now();
  if (cachedCatalog && (now - cachedCatalogTimestamp) < CACHE_TTL) {
    return cachedCatalog;
  }

  const data = await fetchFullCatalogRaw();
  cachedCatalog = data;
  cachedCatalogTimestamp = now;
  return data;
}

export const fetchFullCatalog = cache(async () => {
  return await getCachedCatalog();
});

export const fetchDistricts = cache(async () => {
  const now = Date.now();
  if (cachedDistricts && (now - cachedDistrictsTimestamp) < CACHE_TTL) {
    return cachedDistricts;
  }

  try {
    const snap = await getDocs(
      collection(db, "websites", "globalbiomedicalsnet", "districts")
    );
    const districts = snap.docs.map((docSnap) => {
      const d = docSnap.data();
      const slug = d.slug || docSnap.id;
      const districtName = d.district || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        id: docSnap.id,
        slug,
        district: districtName,
        state: d.state || "Rajasthan",
        nearby: d.nearby || [],
        description: d.description || "",
      };
    });

    cachedDistricts = districts;
    cachedDistrictsTimestamp = now;
    return districts;
  } catch (err) {
    console.error("Error fetching districts server side:", err);
    return [
      { id: "jaipur", slug: "jaipur", district: "Jaipur", state: "Rajasthan" },
      { id: "jodhpur", slug: "jodhpur", district: "Jodhpur", state: "Rajasthan" },
      { id: "udaipur", slug: "udaipur", district: "Udaipur", state: "Rajasthan" },
      { id: "kota", slug: "kota", district: "Kota", state: "Rajasthan" },
      { id: "ajmer", slug: "ajmer", district: "Ajmer", state: "Rajasthan text" },
      { id: "bikaner", slug: "bikaner", district: "Bikaner", state: "Rajasthan" },
      { id: "alwar", slug: "alwar", district: "Alwar", state: "Rajasthan" },
      { id: "bhilwara", slug: "bhilwara", district: "Bhilwara", state: "Rajasthan" },
    ];
  }
});

export const fetchCategoriesSummary = cache(async () => {
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
});

export const fetchBrandsSummary = cache(async () => {
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
});

export const fetchProductsByCategorySlug = cache(async (categorySlug) => {
  const catalog = await fetchFullCatalog();
  return catalog.filter((item) => {
    const catSlug = makeSlug(item.category || "Other Products");
    return catSlug === categorySlug;
  });
});

export const fetchProductsByBrandSlug = cache(async (brandSlug) => {
  const catalog = await fetchFullCatalog();
  return catalog.filter((item) => {
    if (!item.brand) return false;
    return makeSlug(item.brand) === brandSlug;
  });
});

export const fetchProductBySlug = cache(async (slug) => {
  const catalog = await fetchFullCatalog();
  return catalog.find((item) => item.slug === slug || makeSlug(item.title) === slug) || null;
});
