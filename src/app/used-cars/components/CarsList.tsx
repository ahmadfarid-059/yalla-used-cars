"use client";
import CarCard from "@/components/CarCard";
import { LoadingSkeleton } from "@/components/ui/Skeleton";
import { useCars } from "@/hooks/useCars";
import React from "react";

const CarsList = ({ featured = false }: { featured?: boolean }) => {
  const { cars, loading, totalCars, pagination } = useCars({ featured });
  console.log("333333333", cars, loading, totalCars);
  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <div>
      <h4 className="my-2">
        Showing {pagination?.startIndex} - {pagination?.endIndex} of {totalCars}{" "}
        Used Cars
      </h4>
      {cars.map((car, index) => (
        <div key={car.id} className="mb-4">
          <CarCard car={car} index={index} />
        </div>
      ))}
    </div>
  );
};

export default CarsList;
