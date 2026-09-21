import { SITE_URL, SITE_NAME } from "./constants.js";

/**
 * Strips protocol, paths, dots, hyphens, underscores and non-alphanumeric chars
 * to ensure 100% resilient domain matching across formats (.com, .net, .org, .co.in, etc.)
 */
export function normalizeDomain(domain = "") {
  return String(domain || "")
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Dynamically detects the current Company ID (global, human, rajbiosis)
 * and Website Identifier based on environment, constants, or domain.
 */
export function getCompanyAndWebsiteConfig() {
  // 1. Environment variable override (if configured)
  const envCompany =
    typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_COMPANY_ID || process.env?.COMPANY_ID
      : null;
  const envWebsite =
    typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_WEBSITE_ID || process.env?.WEBSITE_ID
      : null;

  // 2. Base domain from constants or window (if available in browser)
  let domain = "";
  if (typeof window !== "undefined" && window.location?.hostname) {
    domain = window.location.hostname;
  } else if (SITE_URL) {
    domain = SITE_URL.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  } else {
    domain = "globalbiomedicals.net";
  }

  const normalizedDomain = normalizeDomain(domain);

  // 3. Detect Company ID
  let companyId = envCompany;
  if (!companyId) {
    if (normalizedDomain.includes("human")) {
      companyId = "human";
    } else if (normalizedDomain.includes("rajbiosis") || normalizedDomain.includes("raj-biosis")) {
      companyId = "rajbiosis";
    } else {
      companyId = "global";
    }
  }

  // 4. Detect Website ID
  const websiteId = envWebsite || domain || "globalbiomedicals.net";
  const normalizedWebsiteId = normalizeDomain(websiteId);

  return {
    companyId: companyId.toLowerCase().trim(),
    websiteId,
    normalizedWebsiteId,
    domain,
  };
}

/**
 * Bulletproof Visibility & Instant Hide Evaluation:
 * - item.isPublished === false -> Hide (false)
 * - item.websiteIds is [] (0 websites selected) -> Hide (false)
 * - item.websiteIds.includes("all") -> Show (true)
 * - Domain Normalized match between item.websiteIds and current site -> Show (true)
 */
export function isItemVisibleOnWebsite(item, currentNormalizedSiteId) {
  if (!item) return false;

  // 1. Check publish status
  if (item.isPublished === false) {
    return false;
  }

  // 2. Check websiteIds array
  const websiteIds = item.websiteIds;
  if (!Array.isArray(websiteIds) || websiteIds.length === 0) {
    return false; // 0 websites assigned = HIDDEN
  }

  const targetSite = currentNormalizedSiteId || getCompanyAndWebsiteConfig().normalizedWebsiteId;

  // 3. Check for "all" wildcard
  const hasAll = websiteIds.some((w) => String(w).toLowerCase().trim() === "all");
  if (hasAll) {
    return true;
  }

  // 4. Check normalized domain match
  const isMatch = websiteIds.some((w) => {
    const norm = normalizeDomain(w);
    return norm === targetSite || targetSite.includes(norm) || norm.includes(targetSite);
  });

  return isMatch;
}
