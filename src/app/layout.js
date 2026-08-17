import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://globalbiomedicals.net"),

  title: {
    default: "Global Biomedical Inc | Medical & Laboratory Equipment Supplier India",
    template: "%s | Global Biomedical Inc",
  },

  description:
    "Leading supplier & distributor of biomedical machinery, CBC machines, Hematology Analyzers, Biochemistry Analyzers, Electrolyte Analyzers, Urine Analyzers, ICU Monitors, and diagnostic reagents across India.",

  keywords: [
    "Biomedical Equipment Supplier",
    "Global Biomedical",
    "Global Biomedicals Inc",
    "Laboratory Equipment Supplier India",
    "CBC Machine Supplier",
    "Hematology Analyzer Supplier",
    "Biochemistry Analyzer Supplier",
    "Electrolyte Analyzer Supplier",
    "Diagnostic Machinery Supplier",
    "Medical Equipment Supplier India",
    "Blood Analyzer Machine",
    "HD Consortium Abbott Blood Analyzer",
    "Diagnostic Reagents Distributor",
    "Biomedical Equipment Maintenance AMC CMC",
    "Hospital Laboratory Turnkey Setup",
    "Rajasthan Medical Equipment Supplier",
  ],

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/global-logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/global-logo.png", type: "image/png" },
    ],
    shortcut: ["/global-logo.png"],
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

  openGraph: {
    title: "Global Biomedical Inc | Top Medical & Laboratory Equipment Supplier in India",
    description:
      "Authorized supplier & service provider for high-precision diagnostic machinery, hematology analyzers, biochemistry analyzers, ICU equipment, and clinical laboratory reagents.",
    url: "https://globalbiomedicals.net",
    siteName: "Global Biomedical Inc",
    images: [
      {
        url: "/global-logo.png",
        width: 1200,
        height: 630,
        alt: "Global Biomedical Inc Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Global Biomedical Inc | Top Medical & Laboratory Equipment Supplier in India",
    description:
      "Authorized supplier & service provider for high-precision diagnostic machinery, hematology analyzers, biochemistry analyzers, ICU equipment, and clinical laboratory reagents.",
    images: ["/global-logo.png"],
  },

  alternates: {
    canonical: "https://globalbiomedicals.net",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://globalbiomedicals.net/#organization",
      "name": "Global Biomedical Inc",
      "url": "https://globalbiomedicals.net",
      "logo": "https://globalbiomedicals.net/global-logo.png",
      "image": "https://globalbiomedicals.net/global-logo.png",
      "description": "Leading supplier & distributor of biomedical machinery, CBC machines, Hematology Analyzers, Biochemistry Analyzers, and diagnostic reagents across India.",
      "telephone": ["+919257984336", "+918529833535", "+919983301657"],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "Rajasthan"
      },
      "sameAs": [
        "https://www.instagram.com/globalbiomedicals/",
        "https://www.facebook.com/people/Global-Biomedicals-Inc/100090524869295/"
      ],
      "priceRange": "₹₹"
    },
    {
      "@type": "WebSite",
      "@id": "https://globalbiomedicals.net/#website",
      "url": "https://globalbiomedicals.net",
      "name": "Global Biomedical Inc",
      "publisher": {
        "@id": "https://globalbiomedicals.net/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://globalbiomedicals.net/items?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/global-logo.png" />
        <link rel="apple-touch-icon" href="/global-logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />

        <main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}