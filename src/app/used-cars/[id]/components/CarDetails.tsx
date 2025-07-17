"use client";
import { LoadingSkeleton } from "@/components/ui/Skeleton";
import { useCarDetail } from "@/hooks/useCars";
import { Eye, MapPin } from "lucide-react";
import React from "react";
import ImageGallery from "./ImageGallary";
import CarSpecifications from "./CarSpecifications";
import { notFound } from "next/navigation";
import ContactCard from "./ContactCard";
function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

const CarDetails = ({ id }: { id: string }) => {
  const { car, loading, error, response } = useCarDetail(Number(id));
  console.log("CarDetails", loading, error, response);
  if (loading) {
    return <LoadingSkeleton />;
  }
  if (error) {
    console.error("Error fetching car details:", error);
    return <h1 className="text-center text-red-500 mt-8">{error}</h1>;
  }
  if (!car && !loading && response && response?.status !== 200) {
    notFound();
  }

  const processedDescription = car?.description
    ? stripHtmlTags(car.description)
    : "No description available";
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {car?.year} {car?.make_title} {car?.model_title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{car?.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>ID: {car?.id}</span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            {car && <ImageGallery car={car} />}

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              {car?.description && car.description.includes("<") ? (
                <div
                  className="text-sm text-gray-600 mb-3 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: stripHtmlTags(car.description),
                  }}
                />
              ) : (
                <p className="text-sm text-gray-600 mb-3">
                  {processedDescription}
                </p>
              )}
            </div>

            {/* Specifications */}
            {car && <CarSpecifications car={car} />}
          </div>

          {/* Right Column - Contact Card */}
          <div className="lg:col-span-1">
            {car && <ContactCard car={car} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
