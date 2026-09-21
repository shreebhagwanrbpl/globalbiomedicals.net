import { fetchFullCatalog, fetchCategoriesSummary } from "@/lib/data-fetcher-server";
import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL } from "@/lib/constants";
import { getCompanyAndWebsiteConfig } from "@/lib/companyConfig";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const config = getCompanyAndWebsiteConfig();
    const products = await fetchFullCatalog();
    const categories = await fetchCategoriesSummary();

    let content = `# ${SITE_NAME}
> Official Biomedical & Laboratory Equipment Catalog

Website: ${SITE_URL}
Contact Phone: ${SITE_PHONE}
Contact Email: ${SITE_EMAIL}
Company ID: ${config.companyId}
Catalog Sync: Active (Real-Time Master Catalog)

## Overview
${SITE_NAME} is an authorized supplier, distributor, and service provider of advanced biomedical equipment, clinical laboratory analyzers, hematology counters, biochemistry instruments, and diagnostic reagents across India.

## Product Categories (${categories.length})
`;

    categories.forEach((cat) => {
      content += `- [${cat.name}](${SITE_URL}/category/${cat.slug}): ${cat.count} product(s)\n`;
      if (cat.subcategories && cat.subcategories.length > 0) {
        cat.subcategories.forEach((sub) => {
          content += `  - ${sub}\n`;
        });
      }
    });

    content += `\n## Products Catalog (${products.length} Products)\n\n`;

    products.forEach((p) => {
      const title = p.title || p.name || "Product";
      const productUrl = `${SITE_URL}/items/${p.slug}`;
      content += `### [${title}](${productUrl})\n`;
      content += `- Category: ${p.category || "Biomedical Equipment"}\n`;
      if (p.subCategory) content += `- Subcategory: ${p.subCategory}\n`;
      if (p.brand) content += `- Brand: ${p.brand}\n`;
      if (p.model) content += `- Model: ${p.model}\n`;
      if (p.capacity) content += `- Capacity: ${p.capacity}\n`;
      if (p.throughput) content += `- Throughput: ${p.throughput}\n`;
      if (p.instrument) content += `- Instrument Type: ${p.instrument}\n`;
      if (p.parameters) content += `- Parameters: ${p.parameters}\n`;
      if (p.automation) content += `- Automation: ${p.automation}\n`;
      if (p.desc || p.description) {
        content += `- Description: ${p.desc || p.description}\n`;
      }
      content += `\n`;
    });

    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    console.error("Error generating llms.txt:", err);
    return new Response(`# ${SITE_NAME}\nFailed to load product catalog.`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
