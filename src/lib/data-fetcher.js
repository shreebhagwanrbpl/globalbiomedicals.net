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
 * Fetch and process the entire products catalog from MongoDB Admin API.
 * In browser: queries /api/catalog (with zero cache).
 * On server: queries MongoDB Admin API directly.
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

/**
 * Normalizes contact data from MongoDB Admin API into a structured format
 */
export function normalizeContactData(rawContact) {
  let contactInfo = [];
  if (rawContact) {
    if (Array.isArray(rawContact.contactInfo)) {
      contactInfo = rawContact.contactInfo;
    } else if (Array.isArray(rawContact.data?.contactInfo)) {
      contactInfo = rawContact.data.contactInfo;
    } else if (Array.isArray(rawContact.data)) {
      contactInfo = rawContact.data;
    } else if (Array.isArray(rawContact)) {
      contactInfo = rawContact;
    }
  }

  let phones = [];
  let email = "";
  let address = "";
  let workingHours = "";

  for (const item of contactInfo) {
    if (!item) continue;
    const label = String(item.label || "").trim().toLowerCase();
    const val = item.value;

    if (
      label.includes("phone") ||
      label.includes("mobile") ||
      label.includes("tel") ||
      label.includes("call") ||
      label.includes("contact")
    ) {
      if (Array.isArray(val)) {
        val.forEach((v) => {
          if (typeof v === "string" && v.trim()) {
            phones.push(v.trim());
          }
        });
      } else if (typeof val === "string" && val.trim()) {
        const parts = val.split(/[,|\n\r]+/).map((s) => s.trim()).filter(Boolean);
        phones.push(...parts);
      }
    } else if (label.includes("email") || label.includes("mail")) {
      if (Array.isArray(val)) {
        email = String(val[0] || "").trim();
      } else if (typeof val === "string") {
        email = val.trim();
      }
    } else if (
      label.includes("address") ||
      label.includes("location") ||
      label.includes("office") ||
      label.includes("head")
    ) {
      if (Array.isArray(val)) {
        address = val.filter(Boolean).join(", ").trim();
      } else if (typeof val === "string") {
        address = val.trim();
      }
    } else if (
      label.includes("hour") ||
      label.includes("time") ||
      label.includes("timing") ||
      label.includes("schedule")
    ) {
      if (Array.isArray(val)) {
        workingHours = val.filter(Boolean).join(", ").trim();
      } else if (typeof val === "string") {
        workingHours = val.trim();
      }
    }
  }

  // Fallbacks if not configured in admin
  if (phones.length === 0) {
    phones = ["+91 9257984336", "+91 8529833535", "+91 9983301657", "+91 8318368383"];
  }
  if (!email) {
    email = "info@globalbiomedical.org";
  }
  if (!address) {
    address = "Amrapali , Vaishali Nagar , Jaipur Jaipur, India, 302021";
  }
  if (!workingHours) {
    workingHours = "Mon - Sat: 9:30 AM - 6:30 PM";
  }

  return {
    raw: contactInfo,
    contactInfo,
    phones,
    phone: phones[0] || "+91 9257984336",
    email,
    address,
    workingHours,
  };
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
