import CategoryPage, { generateMetadata as catGenerateMetadata } from "@/app/category/[slug]/page";

export async function generateMetadata({ params }) {
  return catGenerateMetadata({ params });
}

export default async function Page({ params }) {
  return <CategoryPage params={params} />;
}
