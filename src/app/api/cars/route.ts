import { getFeaturedCars, getUsedCars } from "@/helpers/data";
import { Car } from "@/types/cars";
import { NextRequest, NextResponse } from "next/server";
import {
  paginateArray,
  createPaginationMeta,
  parsePaginationParams,
  createPaginationResponse,
} from "@/lib/pagination";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get only used cars
    const usedCars = getUsedCars();
    const featuredCars = getFeaturedCars();

    if (usedCars.length === 0) {
      return NextResponse.json(
        createPaginationResponse(
          [],
          {
            page: 1,
            limit: 12,
            total: 0,
            totalPages: 0,
            hasNextPage: false,
            hasPrevPage: false,
            nextPage: null,
            prevPage: null,
            startIndex: 0,
            endIndex: 0,
          },
          { message: "No cars found in database" }
        )
      );
    }

    // Parse pagination parameters
    const { page, limit } = parsePaginationParams(searchParams);

    // Extract query parameters for filtering (excluding search)
    const sortBy = searchParams.get("sortBy") || "updated";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const featured = searchParams.get("featured") === "true";

    let filteredCars = usedCars;

    // Apply filters (same as before)
    if (featured) {
      filteredCars = featuredCars;
    }

    // Sort cars (same as before)
    filteredCars.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case "price":
          aValue = a.price || 0;
          bValue = b.price || 0;
          break;
        case "year":
          aValue = a.year || 0;
          bValue = b.year || 0;
          break;
        case "km_driven":
          aValue = a.km_driven || 0;
          bValue = b.km_driven || 0;
          break;
        case "updated":
          aValue = a.updated || 0;
          bValue = b.updated || 0;
          break;
        default:
          aValue = a[sortBy as keyof Car] || 0;
          bValue = b[sortBy as keyof Car] || 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "desc") {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    // Use pagination helper
    const paginatedResult = paginateArray(filteredCars, { page, limit });

    // Create pagination metadata
    const paginationMeta = createPaginationMeta({
      page,
      limit,
      total: filteredCars.length,
    });

    // Return paginated response
    return NextResponse.json(
      createPaginationResponse(paginatedResult.data, paginationMeta, {
        filters: {
          sortBy,
          sortOrder,
          featured,
        },
        meta: {
          filtersApplied: [featured].filter(Boolean).length,
          sortApplied: sortBy !== "updated" || sortOrder !== "desc",
        },
      })
    );
  } catch (error) {
    console.error("Error in GET /api/used-cars:", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Failed to fetch used cars",
        error: error instanceof Error ? error.message : "Unknown error",
        data: null,
      },
      { status: 500 }
    );
  }
}
