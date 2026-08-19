import { fetchProductBySlug } from "@/lib/data-fetcher-server";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import ProductDetails from "./ProductDetails";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const product = await fetchProductBySlug(slug);

    const productName = product?.title || slug
        ?.replace(/-/g, " ")
        ?.replace(/\b\w/g, (c) => c.toUpperCase());

    const brandName = product?.brand && product.brand !== "N/A" ? product.brand : "";
    const categoryName = product?.category || "Biomedical Equipment";

    const title = brandName
        ? `${productName} (${brandName}) Supplier in India | Price, Specs & Quotation | ${SITE_NAME}`
        : `${productName} Supplier in India | Price, Dealer & Specs | ${SITE_NAME}`;

    const rawDesc = product?.description || product?.desc;
    const description = rawDesc
        ? `${rawDesc.slice(0, 150)}... Contact Global Biomedical for best quotation, AMC maintenance & nationwide delivery.`
        : `Buy ${productName} at best price in India. Authorised supplier, dealer and distributor of ${productName} for hospitals, laboratories, diagnostic centers and pathology labs. Contact Global Biomedical for price quote and specifications.`;

    const url = `${SITE_URL}/items/${slug}`;
    const imageUrl = product?.images?.[0] || product?.image || `${SITE_URL}/global-logo.png`;

    return {
        title,
        description,

        keywords: [
            productName,
            `${productName} Supplier`,
            `${productName} Dealer`,
            `${productName} Distributor`,
            `${productName} Manufacturer`,
            `${productName} Price`,
            `${productName} Price in India`,
            `${productName} Supplier in India`,
            `${productName} Quotation`,
            `${productName} Specifications`,
            `Buy ${productName}`,
            `${productName} for Laboratory`,
            `${productName} for Hospital`,
            `${productName} for Diagnostic Center`,
            categoryName,
            "Biomedical Equipment Supplier India",
            SITE_NAME,
        ],

        alternates: {
            canonical: url,
        },

        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            type: "website",
            locale: "en_IN",
            images: [
                {
                    url: imageUrl,
                    alt: productName,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },

        metadataBase: new URL(SITE_URL),
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    return <ProductDetails slug={slug} />;
}