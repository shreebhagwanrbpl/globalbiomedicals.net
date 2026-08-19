import { SITE_URL, SITE_NAME } from "@/lib/constants";
import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Biomedical & Lab Equipment Maintenance, AMC & Services | Global Biomedical",
  description: "Comprehensive biomedical services, Annual Maintenance Contracts (AMC/CMC), NABL calibration, laboratory setup consulting, and diagnostic equipment sales across India.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Biomedical & Lab Equipment Maintenance, AMC & Services | Global Biomedical",
    description: "Annual Maintenance Contracts (AMC/CMC), NABL calibration, laboratory setup consulting, and diagnostic equipment sales across India.",
    url: `${SITE_URL}/services`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}