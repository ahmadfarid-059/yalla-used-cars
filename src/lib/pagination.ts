// src/lib/pagination.ts

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
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
    itemsOnCurrentPage: number;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  startIndex: number;
  endIndex: number;
}

/**
 * Helper function to paginate an array of data
 * @param data - Array of items to paginate
 * @param options - Pagination options (page, limit, total)
 * @returns Paginated result with data and pagination metadata
 */
export function paginateArray<T>(
  data: T[],
  options: Omit<PaginationOptions, "total">
): PaginationResult<T> {
  const { page, limit } = options;
  const total = data.length;

  // Validate inputs
  const validatedPage = Math.max(1, page);
  const validatedLimit = Math.max(1, Math.min(100, limit));

  // Calculate pagination
  const totalPages = Math.ceil(total / validatedLimit);
  const currentPage = Math.min(validatedPage, totalPages || 1);

  // Calculate indices
  const startIndex = (currentPage - 1) * validatedLimit;
  const endIndex = Math.min(startIndex + validatedLimit, total);

  // Slice the data
  const paginatedData = data.slice(startIndex, endIndex);

  // Calculate navigation
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const prevPage = hasPrevPage ? currentPage - 1 : null;

  return {
    data: paginatedData,
    pagination: {
      currentPage,
      totalPages,
      totalItems: total,
      itemsPerPage: validatedLimit,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
      startIndex: startIndex + 1, // 1-based for display
      endIndex,
      itemsOnCurrentPage: paginatedData.length,
    },
  };
}

/**
 * Create pagination metadata without slicing data
 * @param options - Pagination options
 * @returns Pagination metadata only
 */
export function createPaginationMeta(
  options: PaginationOptions
): PaginationMeta {
  const { page, limit, total } = options;

  // Validate inputs
  const validatedPage = Math.max(1, page);
  const validatedLimit = Math.max(1, Math.min(100, limit));

  // Calculate pagination
  const totalPages = Math.ceil(total / validatedLimit);
  const currentPage = Math.min(validatedPage, totalPages || 1);

  // Calculate indices
  const startIndex = (currentPage - 1) * validatedLimit;
  const endIndex = Math.min(startIndex + validatedLimit, total);

  // Calculate navigation
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const prevPage = hasPrevPage ? currentPage - 1 : null;

  return {
    page: currentPage,
    limit: validatedLimit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    startIndex: startIndex + 1, // 1-based for display
    endIndex,
  };
}

/**
 * Generate page numbers for pagination UI
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param maxVisible - Maximum number of page numbers to show
 * @returns Array of page numbers to display
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | string)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  // Always show first page
  pages.push(1);

  // Calculate start and end of middle section
  let start = Math.max(2, currentPage - halfVisible);
  let end = Math.min(totalPages - 1, currentPage + halfVisible);

  // Adjust if we're near the beginning
  if (currentPage <= halfVisible + 1) {
    end = Math.min(totalPages - 1, maxVisible - 1);
  }

  // Adjust if we're near the end
  if (currentPage >= totalPages - halfVisible) {
    start = Math.max(2, totalPages - maxVisible + 2);
  }

  // Add ellipsis if needed
  if (start > 2) {
    pages.push("...");
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis if needed
  if (end < totalPages - 1) {
    pages.push("...");
  }

  // Always show last page (if not already included)
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Parse pagination parameters from URL search params
 * @param searchParams - URL search parameters
 * @returns Parsed pagination options with defaults
 */
export function parsePaginationParams(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  return {
    page: Math.max(1, page),
    limit: Math.max(1, Math.min(100, limit)), // Max 100 items per page
  };
}

/**
 * Create pagination response in API format
 * @param data - Paginated data
 * @param pagination - Pagination metadata
 * @returns Formatted API response
 */
export function createPaginationResponse<T>(
  data: T[],
  pagination: PaginationMeta,
  additionalData: Record<string, any> = {}
) {
  return {
    status: 200,
    message: null,
    data: {
      used_cars: data,
      pagination: {
        currentPage: pagination.page,
        totalPages: pagination.totalPages,
        totalItems: pagination.total,
        itemsPerPage: pagination.limit,
        hasNextPage: pagination.hasNextPage,
        hasPrevPage: pagination.hasPrevPage,
        nextPage: pagination.nextPage,
        prevPage: pagination.prevPage,
        startIndex: pagination.startIndex,
        endIndex: pagination.endIndex,
      },
      // YallaMotor-compatible fields
      page_total: pagination.totalPages,
      per_page: pagination.limit,
      total_entries: pagination.total,
      ...additionalData,
    },
  };
}
