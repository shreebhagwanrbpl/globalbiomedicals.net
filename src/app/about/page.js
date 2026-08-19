import { SITE_URL, SITE_NAME } from "@/lib/constants";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Global Biomedical | Leading Medical & Lab Equipment Supplier India",
  description: "Learn about Global Biomedical Inc - leading distributor & supplier of CBC machines, hematology analyzers, biochemistry analyzers, and laboratory equipment across India.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Global Biomedical | Leading Medical & Lab Equipment Supplier India",
    description: "Leading distributor & supplier of CBC machines, hematology analyzers, biochemistry analyzers, and laboratory equipment across India.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}