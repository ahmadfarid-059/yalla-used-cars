import { getFeaturedCars, getUsedCars } from "@/helpers/data";
import { Car } from "@/types/cars";
import { NextRequest, NextResponse } from "next/server";

// Helper function to find related cars
function findRelatedCars(car: Car, allCars: Car[], limit: number = 4): Car[] {
  return allCars
    .filter((relatedCar) => {
      // Exclude the current car
      if (relatedCar.id === car.id) {
        return false;
      }

      // Find cars with same make or similar criteria
      const sameMake =
        relatedCar.make === car.make ||
        relatedCar.make_title === car.make_title;
      const sameModel =
        relatedCar.model === car.model ||
        relatedCar.model_title === car.model_title;
      const similarPrice =
        Math.abs(relatedCar.price - car.price) <= car.price * 0.3; // Within 30% price range
      const sameBodyStyle = relatedCar.body_style === car.body_style;
      const sameCity =
        relatedCar.city === car.city || relatedCar.city_name === car.city_name;

      // Score based on similarity
      let score = 0;
      if (sameModel) score += 10; // Highest priority for same model
      if (sameMake) score += 5;
      if (sameBodyStyle) score += 3;
      if (similarPrice) score += 2;
      if (sameCity) score += 1;

      // Return cars with a minimum similarity score
      return score >= 5;
    })
    .sort((a, b) => {
      // Sort by relevance (same model first, then make, etc.)
      let aScore = 0;
      let bScore = 0;

      if (a.model === car.model || a.model_title === car.model_title)
        aScore += 10;
      if (b.model === car.model || b.model_title === car.model_title)
        bScore += 10;

      if (a.make === car.make || a.make_title === car.make_title) aScore += 5;
      if (b.make === car.make || b.make_title === car.make_title) bScore += 5;

      return bScore - aScore;
    })
    .slice(0, limit);
}

// GET /api/used-cars/[id] - Get single car by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const carId = parseInt(id);

    // Validate ID
    if (isNaN(carId)) {
      return NextResponse.json(
        {
          status: 400,
          message: "Invalid car ID. Must be a number.",
          data: null,
          error: "INVALID_ID",
        },
        { status: 400 }
      );
    }

    // Get all cars
    const usedCars = getUsedCars();
    const featuredCars = getFeaturedCars();
    const allCars = [...usedCars, ...featuredCars];

    if (allCars.length === 0) {
      return NextResponse.json(
        {
          status: 404,
          message: "No cars found in database",
          data: null,
          error: "NO_CARS_FOUND",
        },
        { status: 404 }
      );
    }

    // Find the specific car
    const car = allCars.find((c) => c.id === carId);

    if (!car) {
      return NextResponse.json(
        {
          status: 404,
          message: `Car with ID ${carId} not found`,
          data: null,
          error: "CAR_NOT_FOUND",
        },
        { status: 404 }
      );
    }

    // Find related cars
    const relatedCars = findRelatedCars(car, allCars, 4);

    // Get cars from same dealer
    const sameDealerCars = allCars
      .filter(
        (dealerCar) =>
          dealerCar.id !== carId &&
          (dealerCar.seller_name === car.seller_name ||
            dealerCar.auto_company_name === car.auto_company_name)
      )
      .slice(0, 6);

    // Calculate some stats for the car details page
    const similarCars = allCars.filter(
      (similarCar) =>
        similarCar.make === car.make &&
        similarCar.model === car.model &&
        similarCar.id !== carId
    );

    const averagePrice =
      similarCars.length > 0
        ? Math.round(
            similarCars.reduce((sum, c) => sum + c.price, 0) /
              similarCars.length
          )
        : car.price;

    const averageMileage =
      similarCars.length > 0
        ? Math.round(
            similarCars.reduce((sum, c) => sum + c.km_driven, 0) /
              similarCars.length
          )
        : car.km_driven;

    // Prepare response
    return NextResponse.json({
      status: 200,
      message: null,
      data: {
        car,
        relatedCars,
        sameDealerCars,
        stats: {
          similarCarsCount: similarCars.length,
          averagePrice,
          averageMileage,
          priceComparison:
            car.price < averagePrice
              ? "below_average"
              : car.price > averagePrice
              ? "above_average"
              : "average",
          mileageComparison:
            car.km_driven < averageMileage
              ? "below_average"
              : car.km_driven > averageMileage
              ? "above_average"
              : "average",
        },
        meta: {
          retrieved_at: new Date().toISOString(),
          related_cars_count: relatedCars.length,
          same_dealer_cars_count: sameDealerCars.length,
          has_similar_cars: similarCars.length > 0,
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching car:`, error);
    return NextResponse.json(
      {
        status: 500,
        message: "Failed to fetch car details",
        error: error instanceof Error ? error.message : "Unknown error",
        data: null,
      },
      { status: 500 }
    );
  }
}
