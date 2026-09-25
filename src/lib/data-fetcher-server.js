import {
  fetchAdminCatalog,
  fetchAdminDistricts,
  fetchAdminDistrict,
} from "./admin-api.js";
import { makeSlug } from "./data-fetcher.js";

export { makeSlug };

/**
 * Server-side catalog fetcher with zero stale caching.
 * Resolves directly from SQLite Admin API on every request.
 */
export async function fetchFullCatalog(options = {}) {
  return await fetchAdminCatalog(options);
}

/**
 * Fetch districts for the website from SQLite Admin API
 * NO hardcoded fallback array.
 */
export async function fetchDistricts() {
  return await fetchAdminDistricts();
}

/**
 * Fetch single district data
 */
export async function fetchDistrictData(districtSlug) {
  if (!districtSlug) return null;
  return await fetchAdminDistrict(districtSlug);
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
