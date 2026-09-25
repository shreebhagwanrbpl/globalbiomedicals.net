import {
  fetchAdminCatalog,
  fetchAdminSiteData,
  fetchAdminDistrict,
  fetchAdminDistricts,
} from "./admin-api.js";

export const makeSlug = (text = "") =>
  String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Fetch and process the entire products catalog from SQLite Admin API.
 * In browser: queries /api/catalog (with zero cache).
 * On server: queries SQLite Admin API directly.
 * NO static hardcoded fallback products!
 */
export async function fetchFullCatalog(options = {}) {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/catalog?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && Array.isArray(json.products)) {
          return json.products;
        }
      }
    } catch (apiErr) {
      console.warn(
        "[data-fetcher] API /api/catalog client fetch failed, falling back to Admin API:",
        apiErr
      );
    }
  }

  return await fetchAdminCatalog(options);
}

/**
 * Client-safe helper to fetch site data via internal /api/site-data route on browser,
 * avoiding direct cross-origin / CORS fetch issues.
 */
async function fetchSiteDataClient(type, customParams = {}) {
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams({ type, t: String(Date.now()), ...customParams });
      const res = await fetch(`/api/site-data?${params.toString()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success) {
          return json.data !== undefined ? json.data : json;
        }
      }
    } catch (apiErr) {
      console.warn(`[data-fetcher] /api/site-data client fetch failed (${type}):`, apiErr);
    }
  }

  return await fetchAdminSiteData(type, customParams);
}

/**
 * Helpers for dynamic document retrieval across pages
 * NO hardcoded fallback data.
 */
export async function fetchHomeData() {
  return await fetchSiteDataClient("home");
}

export async function fetchContactData() {
  return await fetchSiteDataClient("contact");
}

export async function fetchServicesData() {
  return await fetchSiteDataClient("services");
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(
        `/api/site-data?type=district&district=${encodeURIComponent(district)}&t=${Date.now()}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        }
      );
      if (res.ok) {
        const json = await res.json();
        if (json && json.success) {
          return json.data;
        }
      }
    } catch (apiErr) {
      console.warn(`[data-fetcher] district client fetch failed (${district}):`, apiErr);
    }
  }
  return await fetchAdminDistrict(district);
}

export async function fetchDistricts() {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/site-data?type=districts&t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch (apiErr) {
      console.warn("[data-fetcher] districts client fetch failed:", apiErr);
    }
  }
  return await fetchAdminDistricts();
}
