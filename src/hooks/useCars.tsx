// src/hooks/useCars.ts
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Car,
  CarsListResponse,
  CarDetailResponse,
  SearchResponse,
  CarsFilters,
} from "@/types/cars";
import CarsService, { SearchFilters } from "@/services/CarsService";

// Base hook state interface
interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook for getting all cars with filters
export function useCars(initialFilters: CarsFilters = {}) {
  const [state, setState] = useState<UseAsyncState<CarsListResponse>>({
    data: null,
    loading: true,
    error: null,
  });

  const [filters, setFilters] = useState<CarsFilters>(initialFilters);

  const fetchCars = useCallback(
    async (newFilters?: CarsFilters) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const filtersToUse = newFilters || filters;
        const response = await CarsService.getAllCars(filtersToUse);

        setState({
          data: response,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error ? error.message : "Failed to fetch cars",
        });
      }
    },
    [filters]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<CarsFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      fetchCars(updatedFilters);
    },
    [filters, fetchCars]
  );

  const resetFilters = useCallback(() => {
    const resetFilters = { page: 1, limit: 12 };
    setFilters(resetFilters);
    fetchCars(resetFilters);
  }, [fetchCars]);

  const goToPage = useCallback(
    (page: number) => {
      updateFilters({ page });
    },
    [updateFilters]
  );

  const refresh = useCallback(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    fetchCars();
  }, []);

  // Computed values
  const cars = useMemo(() => state.data?.data.used_cars || [], [state.data]);
  const pagination = useMemo(() => state.data?.data.pagination, [state.data]);
  const filterStats = useMemo(() => state.data?.data.filterStats, [state.data]);
  const totalCars = useMemo(
    () => state.data?.data.total_entries || 0,
    [state.data]
  );

  return {
    // Data
    cars,
    pagination,
    filterStats,
    totalCars,

    // State
    loading: state.loading,
    error: state.error,

    // Current filters
    filters,

    // Actions
    updateFilters,
    resetFilters,
    goToPage,
    refresh,

    // Raw response (if needed)
    response: state.data,
  };
}

// Hook for getting a single car by ID
export function useCarDetail(carId: number | null) {
  const [state, setState] = useState<UseAsyncState<CarDetailResponse>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchCar = useCallback(async (id: number) => {
    try {
      setState({ data: null, loading: true, error: null });

      const response = await CarsService.getCarById(id);

      setState({
        data: response,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch car details",
      });
    }
  }, []);

  const refresh = useCallback(() => {
    if (carId) {
      fetchCar(carId);
    }
  }, [carId, fetchCar]);

  useEffect(() => {
    if (carId) {
      fetchCar(carId);
    } else {
      setState({ data: null, loading: false, error: null });
    }
  }, [carId, fetchCar]);

  // Computed values
  const car = useMemo(() => state.data?.data.car, [state.data]);
  const relatedCars = useMemo(
    () => state.data?.data.relatedCars || [],
    [state.data]
  );
  const sameDealerCars = useMemo(
    () => state.data?.data.sameDealerCars || [],
    [state.data]
  );
  const stats = useMemo(() => state.data?.data.stats, [state.data]);

  return {
    // Data
    car,
    relatedCars,
    sameDealerCars,
    stats,

    // State
    loading: state.loading,
    error: state.error,

    // Actions
    refresh,

    // Raw response
    response: state.data,
  };
}

// Hook for pagination
export function usePagination(totalPages: number, currentPage: number = 1) {
  const [page, setPage] = useState(currentPage);

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  const goToNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const goToFirstPage = useCallback(() => {
    setPage(1);
  }, []);

  const goToLastPage = useCallback(() => {
    setPage(totalPages);
  }, [totalPages]);

  // Generate page numbers for pagination UI
  const pageNumbers = useMemo(() => {
    const maxVisible = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end
    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(2, page - halfVisible);
    let end = Math.min(totalPages - 1, page + halfVisible);

    // Add ellipsis if needed
    if (start > 2) pages.push("...");

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) pages.push("...");

    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }, [page, totalPages]);

  return {
    currentPage: page,
    totalPages,
    pageNumbers,
    canGoNext: page < totalPages,
    canGoPrev: page > 1,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  };
}

// Hook for filter management
export function useCarFilters(initialFilters: CarsFilters = {}) {
  const [filters, setFilters] = useState<CarsFilters>(initialFilters);

  const updateFilter = useCallback((key: keyof CarsFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // Reset page when filtering
    }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<CarsFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset page when filtering
    }));
  }, []);

  const clearFilter = useCallback((key: keyof CarsFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return { ...newFilters, page: 1 };
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({ page: 1, limit: 12 });
  }, []);

  const hasActiveFilters = useMemo(() => {
    const filterKeys = Object.keys(filters).filter(
      (key) => key !== "page" && key !== "limit"
    );
    return filterKeys.length > 0;
  }, [filters]);

  const activeFiltersCount = useMemo(() => {
    return Object.keys(filters).filter(
      (key) =>
        key !== "page" && key !== "limit" && filters[key as keyof CarsFilters]
    ).length;
  }, [filters]);

  return {
    filters,
    updateFilter,
    updateFilters,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFiltersCount,
  };
}

// Export all hooks
export {
  CarsService,
  type Car,
  type CarsFilters,
  type SearchFilters,
  type CarsListResponse,
  type CarDetailResponse,
  type SearchResponse,
};
