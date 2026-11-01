import { useState, useCallback } from 'react';

/**
 * Custom hook for managing pagination state and handlers
 * @param {number} initialPage - Initial page number (default: 0)
 * @param {number} initialSize - Initial page size (default: 10)
 * @returns {Object} Pagination state and handler functions
 */
export const usePagination = (initialPage = 0, initialSize = 10) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  // Go to a specific page
  const goToPage = useCallback((pageNumber) => {
    if (pageNumber >= 0) {
      setPage(pageNumber);
    }
  }, []);

  // Go to next page
  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // Go to previous page
  const previousPage = useCallback(() => {
    setPage((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  // Set page size
  const setPageSize = useCallback((newSize) => {
    if (newSize > 0) {
      setSize(newSize);
      setPage(0); // Reset to first page when changing page size
    }
  }, []);

  return {
    page,
    size,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
  };
};
