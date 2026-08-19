import { SITE_URL } from "@/lib/constants";

export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/*?search=*",
                    "/*?*search_term_string*",
                    "/api/*",
                    "/admin/*",
                    "/_next/*",
                ],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: [
                    "/*?search=*",
                    "/*?*search_term_string*",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}