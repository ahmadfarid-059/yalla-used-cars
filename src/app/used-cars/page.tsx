import CarCard from "@/components/CarCard";
import { Metadata } from "next";
import React from "react";
import CarsList from "./components/CarsList";

interface UsedCarsPageProps {
  searchParams: {
    featured?: string;
  };
}
const UsedCars = ({ searchParams }: UsedCarsPageProps) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="font-bold text-2xl my-4">
        Used Cars for Sale in UAE | Buy Pre-Owned Vehicles
      </h1>
      {/* Main Content */}
      <section className="w-full">
        <CarsList featured={searchParams?.featured === "true"} />
      </section>
    </>
  );
};

export default UsedCars;

export const metadata: Metadata = {
  title: "Used Cars for Sale in UAE | Buy Pre-Owned Vehicles | YallMotors",
  description:
    "Find the best used cars for sale in UAE. Browse over 10,000+ certified pre-owned vehicles from trusted dealers in Dubai, Abu Dhabi & Sharjah. Best prices guaranteed.",
  keywords: [
    "used cars UAE",
    "pre-owned vehicles Dubai",
    "second hand cars Abu Dhabi",
    "certified used cars Sharjah",
    "car dealerships UAE",
    "luxury used cars Dubai",
    "affordable cars UAE",
    "GCC specs cars",
    "imported cars UAE",
    "used Toyota UAE",
    "used BMW Dubai",
    "used Mercedes Abu Dhabi",
    "used Honda UAE",
    "used Nissan Dubai",
    "car financing UAE",
  ].join(", "),

  // Open Graph for Social Media
  openGraph: {
    title: "Used Cars for Sale in UAE | 10,000+ Pre-Owned Vehicles",
    description:
      "Discover quality used cars in UAE. From luxury sedans to family SUVs - find your perfect pre-owned vehicle with warranty and best prices.",
    type: "website",
    url: "https://uae.yallamotor.com/used-cars",
    siteName: "YallMotors",
    locale: "en_US",
    images: [
      {
        url: "https://uae.yallamotor.com/images/used-cars-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Used Cars for Sale in UAE - Best Pre-Owned Vehicle Deals",
        type: "image/jpeg",
      },
      {
        url: "https://uae.yallamotor.com/images/used-cars-gallery.jpg",
        width: 800,
        height: 600,
        alt: "Quality Used Cars Collection in UAE",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@YallMotors",
    creator: "@YallMotors",
    title: "Used Cars UAE | 10,000+ Pre-Owned Vehicles for Sale",
    description:
      "Find quality used cars in UAE. Browse certified pre-owned vehicles from trusted dealers. Best deals on luxury & family cars.",
    images: ["https://uae.yallamotor.com/images/used-cars-hero.jpg"],
  },

  // Additional Meta Tags
  authors: [{ name: "YallMotors Team" }],
  publisher: "YallMotors",
  creator: "YallMotors",
  category: "Automotive",
  classification: "Used Cars Marketplace",

  // Robots and Indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical and Alternates
  alternates: {
    canonical: "https://uae.yallamotor.com/used-cars",
    languages: {
      "en-US": "https://uae.yallamotor.com/used-cars",
      "ar-AE": "https://uae.yallamotor.com/ar/used-cars",
    },
  },

  // Archive and References
  archives: ["https://uae.yallamotor.com/sitemap.xml"],
  bookmarks: ["https://uae.yallamotor.com/used-cars"],

  // Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// Static Structured Data (JSON-LD)
const structuredData = {
  "@context": "https://uae.yallamotor.com",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://uae.yallamotor.com/used-cars",
      url: "https://uae.yallamotor.com/used-cars",
      name: "Used Cars for Sale in UAE | Buy Pre-Owned Vehicles",
      isPartOf: {
        "@id": "https://uae.yallamotor.com/#website",
      },
      about: {
        "@id": "https://uae.yallamotor.com/#organization",
      },
      description:
        "Find the best used cars for sale in UAE. Browse over 10,000+ certified pre-owned vehicles from trusted dealers in Dubai, Abu Dhabi & Sharjah.",
      breadcrumb: {
        "@id": "https://uae.yallamotor.com/used-cars#breadcrumb",
      },
      inLanguage: "en-US",
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://uae.yallamotor.com/used-cars?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://uae.yallamotor.com/used-cars#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://uae.yallamotor.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Used Cars",
          item: "https://uae.yallamotor.com/used-cars",
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "Used Cars for Sale in UAE",
      description:
        "Collection of certified pre-owned vehicles available for sale in UAE",
      numberOfItems: "10000",
      itemListElement: [
        {
          "@type": "Product",
          name: "Used Cars",
          category: "Automotive > Used Vehicles",
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "AED",
            lowPrice: "15000",
            highPrice: "500000",
            offerCount: "10000",
          },
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://uae.yallamotor.com/#organization",
      name: "YallMotors",
      url: "https://uae.yallamotor.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://uae.yallamotor.com/images/logo.png",
        width: 300,
        height: 100,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+971-4-123-4567",
          contactType: "customer service",
          availableLanguage: ["English", "Arabic"],
          areaServed: "AE",
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sheikh Zayed Road",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      sameAs: [
        "https://facebook.com/uae.yallamotor",
        "https://twitter.com/uae.yallamotor",
        "https://instagram.com/uae.yallamotor",
        "https://linkedin.com/company/uae.yallamotor",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://uae.yallamotor.com/#website",
      url: "https://uae.yallamotor.com/",
      name: "YallMotors",
      description: "UAE's leading platform for buying and selling used cars",
      publisher: {
        "@id": "https://uae.yallamotor.com/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://uae.yallamotor.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "en-US",
    },
  ],
};
