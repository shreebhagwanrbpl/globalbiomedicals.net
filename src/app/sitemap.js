import {
    fetchFullCatalog,
    fetchCategoriesSummary,
    fetchBrandsSummary,
    fetchDistricts
} from "@/lib/data-fetcher-server";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 86400; // Revalidate sitemap daily

export default async function sitemap() {
    const urls = [];

    // 1. Static Core Pages
    const staticPages = [
        "",
        "/about",
        "/services",
        "/contact",
        "/items"
    ];

    staticPages.forEach((path) => {
        urls.push({
            url: `${SITE_URL}${path}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: path === "" ? 1.0 : 0.8,
        });
    });

    try {
        // 2. Category Hubs
        const categories = await fetchCategoriesSummary();
        categories.forEach((cat) => {
            urls.push({
                url: `${SITE_URL}/category/${cat.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.85,
            });
        });

        // 3. Brand Hubs
        const brands = await fetchBrandsSummary();
        brands.forEach((brand) => {
            urls.push({
                url: `${SITE_URL}/brand/${brand.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.8,
            });
        });

        // 4. Primary Authoritative Product Pages
        const products = await fetchFullCatalog();
        products.forEach((product) => {
            if (!product.slug) return;

            urls.push({
                url: `${SITE_URL}/items/${product.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.9,
            });
        });

        // 5. Legitimate District Landing Hubs
        const districts = await fetchDistricts();
        districts.forEach((d) => {
            if (!d.slug) return;

            urls.push(
                {
                    url: `${SITE_URL}/${d.slug}`,
                    lastModified: new Date(),
                    changeFrequency: "monthly",
                    priority: 0.75,
                },
                {
                    url: `${SITE_URL}/${d.slug}/about`,
                    lastModified: new Date(),
                    changeFrequency: "monthly",
                    priority: 0.6,
                },
                {
                    url: `${SITE_URL}/${d.slug}/services`,
                    lastModified: new Date(),
                    changeFrequency: "monthly",
                    priority: 0.6,
                },
                {
                    url: `${SITE_URL}/${d.slug}/contact`,
                    lastModified: new Date(),
                    changeFrequency: "monthly",
                    priority: 0.6,
                },
                {
                    url: `${SITE_URL}/${d.slug}/items`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.7,
                }
            );
        });

    } catch (error) {
        console.error("Sitemap Generation Error:", error);
    }

    return urls;
}