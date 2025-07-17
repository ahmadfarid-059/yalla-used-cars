"use client";

import { Car } from "@/types/cars";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

function ImageGallery({ car }: { car: Car }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.pictures.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.pictures.length) % car.pictures.length
    );
  };

  // Function to get the 5 visible thumbnails
  const getVisibleThumbnails = useCallback(() => {
    if (car.pictures.length <= 5) {
      // If we have 5 or fewer images, show all of them
      return car.pictures.map((image, index) => ({
        image,
        originalIndex: index,
      }));
    }

    const thumbnails = [];

    // Add one image before current (if possible)
    const prevIndex =
      currentImageIndex === 0 ? car.pictures.length - 1 : currentImageIndex - 1;

    thumbnails.push({
      image: car.pictures[prevIndex],
      originalIndex: prevIndex,
    });

    // Add current image
    thumbnails.push({
      image: car.pictures[currentImageIndex],
      originalIndex: currentImageIndex,
    });

    // Add three images after current
    for (let i = 1; i <= 4; i++) {
      const nextIndex = (currentImageIndex + i) % car.pictures.length;
      thumbnails.push({
        image: car.pictures[nextIndex],
        originalIndex: nextIndex,
      });
    }

    return thumbnails;
  }, [car.pictures, currentImageIndex]);

  const visibleThumbnails = getVisibleThumbnails();

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={car.pictures[currentImageIndex]}
          alt={`${car.year} ${car.make_title} ${car.model_title} - Image ${
            currentImageIndex + 1
          }`}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover cursor-pointer"
          priority
          onClick={() => setIsModalOpen(true)}
        />

        {/* Navigation arrows */}
        {car.pictures.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {car.pictures.length}
        </div>
      </div>

      {/* Thumbnails */}
      {car.pictures.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {visibleThumbnails.map((item, index) => (
            <button
              key={item.image}
              onClick={() => setCurrentImageIndex(item.originalIndex)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                item.originalIndex === currentImageIndex
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={item?.image}
                alt={`${car.year} ${car.make_title} ${
                  car.model_title
                } - Thumbnail ${item.originalIndex + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Optional: Show dots indicator for remaining images */}
      {car.pictures.length > 5 && (
        <div className="flex justify-center space-x-1 mt-2">
          {Array.from({ length: Math.ceil(car.pictures.length / 5) }).map(
            (_, groupIndex) => {
              const groupStart = groupIndex * 5;
              const groupEnd = Math.min(groupStart + 5, car.pictures.length);
              const isCurrentGroup =
                currentImageIndex >= groupStart && currentImageIndex < groupEnd;

              return (
                <div
                  key={groupIndex}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isCurrentGroup ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
