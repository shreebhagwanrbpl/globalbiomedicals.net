import ProductDetails from "../../../items/[slug]/ProductDetails";
import { fetchProductBySlug } from "@/lib/data-fetcher-server";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export async function generateMetadata({ params }) {
    const { slug, district } = await params;
    const product = await fetchProductBySlug(slug);

    const districtName = district
        ? district.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "India";

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const title = `${productName} Supplier in ${districtName} | Price & Quote | ${SITE_NAME}`;
    const description = `Buy ${productName} in ${districtName}. Authorised biomedical equipment supplier, dealer and distributor for hospitals and laboratories in ${districtName}, Rajasthan.`;

    return {
        title,
        description,
        alternates: {
            // Canonical MUST point to the primary product page to avoid duplicate/doorway content penalties
            canonical: `${SITE_URL}/items/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/${district}/items/${slug}`,
            siteName: SITE_NAME,
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function Page({ params }) {
    const { slug, district } = await params;

    return (
        <ProductDetails
            slug={slug}
            district={district}
        />
    );
}