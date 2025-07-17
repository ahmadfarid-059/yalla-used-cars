// src/services/carsService.ts
import axios, { AxiosResponse } from "axios";
import {
  Car,
  CarsFilters,
  CarDetailResponse,
  CarsListResponse,
  SearchResponse,
} from "@/types/cars";
import apiClient from "@/lib/axios";

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  startIndex: number;
  endIndex: number;
}

export interface SearchFilters extends CarsFilters {
  q?: string; // Search query
  minKm?: number;
  maxKm?: number;
  exteriorColor?: string;
}

// Cars Service Class
export class CarsService {
  /**
   * Get all used cars with optional filters and pagination
   */
  static async getAllCars(
    filters: CarsFilters = {}
  ): Promise<CarsListResponse> {
    try {
      const params = new URLSearchParams();

      // Add all filter parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });

      const response: AxiosResponse<CarsListResponse> = await apiClient.get(
        `/cars${params.toString() ? `?${params.toString()}` : ""}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw new Error("Failed to fetch cars");
    }
  }

  /**
   * Get cars by specific page
   */
  static async getCarsByPage(
    page: number = 1,
    limit: number = 12
  ): Promise<CarsListResponse> {
    return this.getAllCars({ page, limit });
  }

  /**
   * Get cars by make
   */
  static async getCarsByMake(
    make: string,
    filters: Omit<CarsFilters, "make">
  ): Promise<CarsListResponse> {
    return this.getAllCars({ ...filters, make });
  }

  /**
   * Get cars by price range
   */
  static async getCarsByPriceRange(
    minPrice: number,
    maxPrice: number,
    filters: Omit<CarsFilters, "minPrice" | "maxPrice"> = {}
  ): Promise<CarsListResponse> {
    return this.getAllCars({ ...filters, minPrice, maxPrice });
  }

  /**
   * Get cars by year range
   */
  static async getCarsByYearRange(
    minYear: number,
    maxYear: number,
    filters: Omit<CarsFilters, "minYear" | "maxYear"> = {}
  ): Promise<CarsListResponse> {
    return this.getAllCars({ ...filters, minYear, maxYear });
  }

  /**
   * Get cars by city
   */
  static async getCarsByCity(
    city: string,
    filters: Omit<CarsFilters, "city"> = {}
  ): Promise<CarsListResponse> {
    return this.getAllCars({ ...filters, city });
  }

  /**
   * Get single car by ID
   */
  static async getCarById(id: number): Promise<CarDetailResponse> {
    try {
      const response: AxiosResponse<CarDetailResponse> = await apiClient.get(
        `/cars/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching car ${id}:`, error);
      throw new Error(`Failed to fetch car with ID ${id}`);
    }
  }
}

// Helper functions for common operations
export const CarsHelpers = {
  /**
   * Format price with currency
   */
  formatPrice: (price: number, currency: string = "AED"): string => {
    return `${currency} ${price.toLocaleString()}`;
  },

  /**
   * Format mileage
   */
  formatMileage: (km: number): string => {
    return `${km.toLocaleString()} km`;
  },

  /**
   * Get car age
   */
  getCarAge: (year: number): number => {
    return new Date().getFullYear() - year;
  },

  /**
   * Generate car URL slug
   */
  generateCarSlug: (car: Car): string => {
    return `${car.make_title?.toLowerCase()}-${car.model_title?.toLowerCase()}-${
      car.year
    }-${car.id}`
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  },

  /**
   * Get primary image from pictures array
   */
  getPrimaryImage: (car: Car): string => {
    return (
      car.thumb_picture ||
      car.slideshow_picture ||
      car.mobile_listing_main ||
      car.pictures?.[0] ||
      "/placeholder-car.jpg"
    );
  },

  /**
   * Check if car has WhatsApp
   */
  hasWhatsApp: (car: Car): boolean => {
    return !!(car.whatsapp_number && car.whatsapp_access);
  },

  /**
   * Build query string from filters
   */
  buildQueryString: (filters: Record<string, any>): string => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
    return params.toString();
  },
};

export default CarsService;
