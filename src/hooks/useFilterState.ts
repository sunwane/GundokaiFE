import { useState, useEffect } from 'react';
import { StockStatus } from '@/types/Product';

export interface FilterState {
  stockFilter: StockStatus[];
  priceRange: { min: number; max: number };
  categories: string[];
}

export interface UseFilterStateReturn {
  // Current applied filters
  currentFilters: FilterState;
  
  // Pending filters (for delayed apply)
  pendingFilters: FilterState;
  
  // Update pending filters
  setPendingStockFilter: (statuses: StockStatus[]) => void;
  setPendingPriceRange: (range: { min: number; max: number }) => void;
  setPendingCategories: (categories: string[]) => void;
  
  // Apply/Reset functions
  applyFilters: () => void;
  resetFilters: () => void;
  
  // Utility functions
  hasChanges: () => boolean;
  resetToDefault: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  stockFilter: ['Tất cả'],
  priceRange: { min: 0, max: 50000000 },
  categories: [],
};

export function useFilterState(
  initialFilters: Partial<FilterState> = {},
  onFiltersChange?: (filters: FilterState) => void
): UseFilterStateReturn {
  
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const [pendingFilters, setPendingFilters] = useState<FilterState>(currentFilters);

  // Sync pending with current when current changes
  useEffect(() => {
    setPendingFilters(currentFilters);
  }, [currentFilters]);

  const setPendingStockFilter = (statuses: StockStatus[]) => {
    setPendingFilters(prev => ({ ...prev, stockFilter: statuses }));
  };

  const setPendingPriceRange = (range: { min: number; max: number }) => {
    setPendingFilters(prev => ({ ...prev, priceRange: range }));
  };

  const setPendingCategories = (categories: string[]) => {
    setPendingFilters(prev => ({ ...prev, categories }));
  };

  const applyFilters = () => {
    setCurrentFilters(pendingFilters);
    if (onFiltersChange) {
      onFiltersChange(pendingFilters);
    }
  };

  const resetFilters = () => {
    const defaultFilters = { ...DEFAULT_FILTERS };
    setCurrentFilters(defaultFilters);
    setPendingFilters(defaultFilters);
    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    }
  };

  const resetToDefault = () => {
    setPendingFilters({ ...DEFAULT_FILTERS });
  };

  const hasChanges = (): boolean => {
    return JSON.stringify(currentFilters) !== JSON.stringify(pendingFilters);
  };

  return {
    currentFilters,
    pendingFilters,
    setPendingStockFilter,
    setPendingPriceRange,
    setPendingCategories,
    applyFilters,
    resetFilters,
    hasChanges,
    resetToDefault,
  };
}