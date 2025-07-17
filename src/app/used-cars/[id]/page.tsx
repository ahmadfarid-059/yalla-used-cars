import CarsService from "@/services/CarsService";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import CarDetails from "./components/CarDetails";
import { Car } from "@/types/cars";
interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetailPage(
  { params }: CarDetailPageProps,
  parent: ResolvingMetadata
) {
  // Get structured data for script tag
  const metadata = await generateMetadata({ params }, parent);
  const structuredData = metadata.other?.["structured-data"]
    ? JSON.parse(metadata.other["structured-data"] as string)
    : null;
  const { id } = await params;

  return (
    <>
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <CarDetails id={id} />
    </>
  );
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

// Helper function to format price
function formatPrice(price: number, currency: string): string {
  if (isNaN(price)) return "N/A";
  return `${currency} ${price.toLocaleString()}`;
}

// Generate dynamic metadata based on car data
export async function generateMetadata(
  { params }: CarDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const {
      data: { car },
    } = await CarsService.getCarById(Number(id));
    // const car = {} as Car;

    if (!car || Object.keys(car).length === 0) {
      return {
        title: "Car Not Found",
        description: "The requested car listing could not be found.",
        robots: { index: false, follow: false },
      };
    }

    // Build dynamic title
    const title = `${car.year} ${car.make_title} ${car.model_title} for Sale in ${car.city}`;

    // Build description from car details
    const plainDescription = car.description
      ? stripHtmlTags(car.description)
      : "";
    const description = `${car.year} ${car.make_title} ${
      car.model_title
    } for sale in ${car.city}. ${car.km_driven?.toLocaleString()} km, ${
      car.fuel_type
    }, ${car.transmission_type}. Price: ${formatPrice(
      car.price,
      car.currency
    )}. ${plainDescription.slice(0, 100)}...`;

    // Build keywords
    const keywords = [
      `${car.year} ${car.make_title} ${car.model_title}`,
      `used ${car.make_title} ${car.model_title}`,
      `${car.make_title} ${car.model_title} ${car.city}`,
      `${car.make_title} for sale`,
      `used cars ${car.city}`,
      `${car.fuel_type} cars`,
      `${car.transmission_type} cars`,
      `${car.body_style}`,
      car.regional_specs ? "GCC specs" : "imported",
      `${car.exterior_color} ${car.make_title}`,
    ].join(", ");

    const carUrl = `https://uae.yallamotor.com/used-cars/${car.id}`;
    const mainImage = car.mobile_listing_main || car.pictures?.[0];

    // Structured data for the specific car
    const structuredData = {
      "@context": "https://uae.yallamotor.com",
      "@graph": [
        {
          "@type": "Product",
          "@id": `${carUrl}#product`,
          name: `${car.year} ${car.make_title} ${car.model_title}`,
          description: description,
          sku: car.id?.toString(),
          brand: {
            "@type": "Brand",
            name: car.make_title,
          },
          category: "Automotive > Used Vehicles",
          image: car.pictures?.map((pic) => ({
            "@type": "ImageObject",
            url: pic,
            caption: `${car.year} ${car.make_title} ${car.model_title}`,
          })),
          offers: {
            "@type": "Offer",
            price: car.price,
            priceCurrency: car.currency,
            availability: "https://uae.yallamotor.com/InStock",
            seller: {
              "@type": "Organization",
              name: car.seller_name || car.auto_company_name,
            },
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0], // 30 days from now
          },
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Year",
              value: car.year?.toString(),
            },
            {
              "@type": "PropertyValue",
              name: "Mileage",
              value: `${car?.km_driven} km`,
            },
            {
              "@type": "PropertyValue",
              name: "Fuel Type",
              value: car.fuel_type,
            },
            {
              "@type": "PropertyValue",
              name: "Transmission",
              value: car.transmission_type,
            },
            {
              "@type": "PropertyValue",
              name: "Location",
              value: car.city,
            },
            {
              "@type": "PropertyValue",
              name: "Body Style",
              value: car.body_style,
            },
            {
              "@type": "PropertyValue",
              name: "Engine",
              value: `${car.engine_cc}cc`,
            },
            {
              "@type": "PropertyValue",
              name: "Color",
              value: car.exterior_color,
            },
          ],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://uae.yallamotor.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Used Cars",
              item: "https://uae.yallamotor.com/used-cars",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: car.make_title,
              item: `https://uae.yallamotor.com/used-cars?make=${car.make}`,
            },
            {
              "@type": "ListItem",
              position: 4,
              name: `${car.make_title} ${car.model_title}`,
              item: `https://uae.yallamotor.com/used-cars?make=${car.make}&model=${car.model}`,
            },
            {
              "@type": "ListItem",
              position: 5,
              name: `${car.year} ${car.make_title} ${car.model_title}`,
              item: carUrl,
            },
          ],
        },
      ],
    };

    return {
      title: title.length > 60 ? title.substring(0, 57) + "..." : title,
      description:
        description.length > 160
          ? description.substring(0, 157) + "..."
          : description,
      keywords,

      openGraph: {
        title,
        description,
        type: "website",
        url: carUrl,
        images: [
          {
            url: mainImage,
            width: 800,
            height: 600,
            alt: `${car.year} ${car.make_title} ${car.model_title} - ${car.exterior_color}`,
          },
          ...car.pictures?.slice(1, 4).map((pic) => ({
            url: pic,
            width: 800,
            height: 600,
            alt: `${car.year} ${car.make_title} ${car.model_title}`,
          })),
        ],
        siteName: "YallaMotor",
      },

      twitter: {
        card: "summary_large_image",
        title,
        description:
          description.length > 120
            ? description.substring(0, 117) + "..."
            : description,
        images: [mainImage],
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

      alternates: {
        canonical: carUrl,
      },

      other: {
        "structured-data": JSON.stringify(structuredData),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Car Not Found",
      description: "The requested car listing could not be found.",
      robots: { index: false, follow: false },
    };
  }
}
