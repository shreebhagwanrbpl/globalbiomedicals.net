import { db } from "./firebase.js";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { getCompanyAndWebsiteConfig, isItemVisibleOnWebsite, normalizeDomain } from "./companyConfig.js";

// Fast in-memory cache for static documents
const docCache = {};

export const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

/**
 * Fetch a single document and cache its data.
 */
export async function fetchDocCached(path) {
  if (docCache[path]) {
    return docCache[path];
  }
  if (!docCache[path + "_promise"]) {
    docCache[path + "_promise"] = (async () => {
      try {
        const parts = path.split("/");
        const docRef = doc(db, ...parts);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          docCache[path] = data;
          return data;
        }
        return null;
      } catch (err) {
        console.error(`Error fetching doc at ${path}:`, err);
        delete docCache[path + "_promise"];
        throw err;
      }
    })();
  }
  return docCache[path + "_promise"];
}

/**
 * Fetch master catalog directly from Firestore `companies/{companyId}/categories/...`
 * with strict cascading visibility and instant hide logic.
 */
export async function fetchFullCatalogFromFirestore() {
  const { companyId, normalizedWebsiteId } = getCompanyAndWebsiteConfig();
  const allProducts = [];

  try {
    // 1. Fetch categories for company
    const categoriesRef = collection(db, "companies", companyId, "categories");
    const categoriesSnap = await getDocs(categoriesRef);

    // Process all categories in parallel
    await Promise.all(
      categoriesSnap.docs.map(async (catDoc) => {
        const catData = catDoc.data();
        const categoryObj = { id: catDoc.id, ...catData };

        // 1. Category Visibility check
        if (!isItemVisibleOnWebsite(categoryObj, normalizedWebsiteId)) {
          return; // Category is hidden -> all nested items hidden
        }

        const categoryName = catData.name || catData.category || catDoc.id;

        try {
          const subcategoriesRef = collection(
            db,
            "companies",
            companyId,
            "categories",
            catDoc.id,
            "subcategories"
          );
          const subSnap = await getDocs(subcategoriesRef);

          subSnap.docs.forEach((subDoc) => {
            const subData = subDoc.data();
            const subcategoryObj = { id: subDoc.id, ...subData };

            // 2. Subcategory Visibility check
            if (!isItemVisibleOnWebsite(subcategoryObj, normalizedWebsiteId)) {
              return; // Subcategory is hidden -> all products hidden
            }

            const subCategoryName = subData.name || subData.subCategory || subDoc.id;
            const rawProducts = subData.products || [];

            rawProducts.forEach((item, index) => {
              // 3. Product Visibility check
              if (!isItemVisibleOnWebsite(item, normalizedWebsiteId)) {
                return; // Product is hidden
              }

              const title = item.title || item.name || "Untitled Product";
              const slug = item.slug || makeSlug(title);

              allProducts.push({
                ...item,
                uid: item.id || `${catDoc.id}-${subDoc.id}-${index}`,
                categoryId: catDoc.id,
                subcategoryId: subDoc.id,
                category: categoryName,
                subCategory: subCategoryName,
                slug,
                title,
                name: title,
                description: item.description || item.desc || "",
                desc: item.desc || item.description || "",
                images: Array.isArray(item.images)
                  ? item.images
                  : item.image
                  ? [item.image]
                  : [],
                video: item.video || "",
                pdf: item.pdf || "",
                isPublished: item.isPublished !== false,
                websiteIds: item.websiteIds || [],
                companyId: item.companyId || companyId,
              });
            });
          });
        } catch (subErr) {
          console.error(`Error fetching subcategories for category ${catDoc.id}:`, subErr);
        }
      })
    );
  } catch (catErr) {
    console.error(`Error fetching Master Catalog for ${companyId}:`, catErr);
  }

  // 2. Legacy fallback only if Master Catalog has 0 items
  if (allProducts.length === 0) {
    try {
      const fallbackSnap = await getDocs(
        collection(
          db,
          "websites",
          normalizedWebsiteId,
          "pages",
          "categoryproducts",
          "categories"
        )
      );

      await Promise.all(
        fallbackSnap.docs.map(async (categoryDoc) => {
          const data = categoryDoc.data();
          if (data.isPublished === false) return;
          const categoryName = data.category || categoryDoc.id;

          try {
            const subcategoriesCol = collection(
              db,
              "websites",
              normalizedWebsiteId,
              "pages",
              "categoryproducts",
              "categories",
              categoryDoc.id,
              "subcategories"
            );

            const subcategoriesSnap = await getDocs(subcategoriesCol);

            subcategoriesSnap.forEach((subDoc) => {
              const subData = subDoc.data();
              if (subData.isPublished === false) return;
              const subCategoryName = subData.subCategory || subDoc.id;

              const categoryProducts = (subData.products || [])
                .filter((p) => p.isPublished !== false)
                .map((item, index) => ({
                  ...item,
                  uid: `legacy-${categoryDoc.id}-${subDoc.id}-${index}`,
                  category: categoryName,
                  subCategory: subCategoryName,
                  slug: item.slug || makeSlug(item.title || item.name),
                  title: item.title || item.name,
                  name: item.title || item.name,
                  images: Array.isArray(item.images)
                    ? item.images
                    : item.image
                    ? [item.image]
                    : [],
                }));

              allProducts.push(...categoryProducts);
            });
          } catch (subErr) {
            console.error(`Error fetching fallback subcategories:`, subErr);
          }
        })
      );
    } catch (fallbackErr) {
      // Ignore fallback errors
    }
  }

  return allProducts;
}

/**
 * Fetch and process the entire products catalog.
 * In browser: can query /api/catalog directly (with fallback to Firestore).
 * On server: queries Firestore directly with no stale cache.
 */
export async function fetchFullCatalog() {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/catalog", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.products)) {
          return json.products;
        }
      }
    } catch (apiErr) {
      console.warn("API /api/catalog client fetch failed, falling back to direct Firestore:", apiErr);
    }
  }

  return await fetchFullCatalogFromFirestore();
}

/**
 * Helpers for cached document retrieval across pages
 */
export async function fetchHomeData() {
  const { normalizedWebsiteId } = getCompanyAndWebsiteConfig();
  return fetchDocCached(`websites/${normalizedWebsiteId}/pages/home`);
}

export async function fetchContactData() {
  const { normalizedWebsiteId } = getCompanyAndWebsiteConfig();
  return fetchDocCached(`websites/${normalizedWebsiteId}/pages/contact`);
}

export async function fetchServicesData() {
  const { normalizedWebsiteId } = getCompanyAndWebsiteConfig();
  return fetchDocCached(`websites/${normalizedWebsiteId}/pages/services`);
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  const { normalizedWebsiteId } = getCompanyAndWebsiteConfig();
  return fetchDocCached(`websites/${normalizedWebsiteId}/districts/${district}`);
}
