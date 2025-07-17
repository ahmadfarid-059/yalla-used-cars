"use client";

import { Car } from "@/types/cars";
import Image from "next/image";
import Link from "next/link";
import {
  AntennaIcon,
  CalendarDays,
  FuelIcon,
  Gauge,
  Images,
  MapPin,
  MessageCircle,
  Phone,
  Settings,
} from "lucide-react";
import Button from "./ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CarCardProps {
  car: Car;
  index: number;
  priority?: boolean;
}
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function truncateHtmlDescription(
  html: string,
  maxLength: number = 150
): string {
  const plainText = stripHtmlTags(html);
  if (plainText.length <= maxLength) {
    return html;
  }

  // If we need to truncate, just return the plain text version truncated
  return plainText.slice(0, maxLength) + "...";
}

export default function CarCard({ car, index, priority }: CarCardProps) {
  const { push } = useRouter();
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const processedDescription = car.description
    ? truncateHtmlDescription(car.description)
    : "No description available";
  const shouldPrioritize = priority || index < 3;

  return (
    <article className="lg:max-w-[800px] w-full border border-gray-50 rounded-lg shadow-md p-4 flex flex-col lg:flex-row gap-4 bg-white">
      {/* Image */}
      <div>
        <div className="relative w-full lg:w-64 h-48 rounded overflow-hidden">
          <Image
            src={car.mobile_listing_main || car.pictures[0]}
            alt={`${car.make_title} ${car.model_title} ${car.year} - ${car.title}`}
            fill
            className="cursor-pointer "
            priority={shouldPrioritize}
            loading={shouldPrioritize ? "eager" : "lazy"}
            onClick={() => push(`/used-cars/${car.id}`)}
            blurDataURL={car.thumb_picture}
          />
          {car.is_featured && (
            <span className="absolute top-2 left-2 bg-megneta text-white text-xs px-2 py-1 rounded">
              FEATURED
            </span>
          )}
        </div>
        <div className="bg bg-gray-500 p-1 flex gap-2 items-center w-14 text-sm mt-1 rounded-lg text-white">
          {" "}
          <Images className="w-4 h-4" /> {car.pictures.length}{" "}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-black font-bold text-lg">
          <span className="text-sm font-medium">{car.currency}</span>{" "}
          {car.price.toLocaleString()}
        </p>
        <p className="text-yello-text font-normal text-sm">
          {car.currency}
          <span className="text-sm font-bold text-md">
            {" "}
            {car.price.toLocaleString()}
          </span>{" "}
          per month
        </p>
        <Link
          href={"/used-cars/" + car.id}
          className="text-lg font-semibold hover:text-primary hover:cursor-pointer"
        >
          {car.title}
        </Link>
        {car.description && car.description.includes("<") ? (
          <div
            className="text-sm text-gray-600 mb-3 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: truncateHtmlDescription(car.description),
            }}
          />
        ) : (
          <p className="text-sm text-gray-600 mb-3">{processedDescription}</p>
        )}
        <div className="flex flex-wrap gap-2 text-sm text-gray-700 mb-3">
          <div className="flex gap-1">
            <Gauge className="w-4 h-4" /> {car.km_driven.toLocaleString()}{" "}
          </div>
          <div className="flex gap-1">
            <CalendarDays className="w-4 h-4" /> {car.year}{" "}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-700 mb-3">
          <div className="flex gap-1">
            <MapPin className="w-4 h-4" /> {car.city}{" "}
          </div>
          <div className="flex gap-1">
            <FuelIcon className="w-4 h-4" /> {car.fuel_type}{" "}
          </div>
          <div className="flex gap-1">
            <Settings className="w-4 h-4" /> {car.transmission_type}{" "}
          </div>
          <div className="flex gap-1">{car.engine_cc} </div>
        </div>

        <p className="text-sm text-gray-500 mb-3">Seller: {car.seller_name}</p>
      </div>

      <div className="flex-col gap-4">
        <div className=" flex flex-col sm:flex-row lg:flex-col sm:items-center my-4 lg:my-0 lg:items-stretch gap-2">
          <Button
            title={
              showPhoneNumber ? String(car.whatsapp_number) : "Phone Number"
            }
            Icon={!showPhoneNumber ? Phone : undefined}
            onClick={() => setShowPhoneNumber((prev) => !prev)}
            className="w-full"
          />
          {car.whatsapp_access && (
            <Button
              title={"Whats app"}
              Icon={MessageCircle}
              onClick={() =>
                window.open(`https://wa.me/${car.whatsapp_number}`, "_blank")
              }
              variant="green"
              className="w-full"
            />
          )}
          <Link
            href={"/used-cars/" + car.id}
            className="ml-auto text-primary text-sm underline"
          >
            View Details
          </Link>
        </div>
        <div className="relative w-full sm:w-48 h-36 rounded overflow-hidden">
          <Image
            src={car.auto_company_logo}
            alt={car.title}
            fill
            // className="object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
