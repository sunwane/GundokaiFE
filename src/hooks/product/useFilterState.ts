'use client';
import { useState, useMemo } from 'react';
import { StockStatus } from '@/types/Product';

export interface FilterState {
  stockFilter: StockStatus[];
  priceRange: { min: number; max: number };
  categories: string[];
}

export interface UseFilterStateReturn {
  filters: FilterState;
  pendingFilters: FilterState;
  updatePendingStockFilter: (stockFilter: StockStatus[]) => void;
  updatePendingPriceRange: (priceRange: { min: number; max: number }) => void;
  updatePendingCategories: (categories: string[]) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  hasChanges: boolean;
}

const defaultFilters: FilterState = {
  stockFilter: ['Tất cả'],
  priceRange: { min: 0, max: 5000000 },
  categories: [],
};

export function useFilterState(): UseFilterStateReturn {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [pendingFilters, setPendingFilters] = useState<FilterState>(defaultFilters);

  const updatePendingStockFilter = (stockFilter: StockStatus[]) => {
    setPendingFilters(prev => ({ ...prev, stockFilter }));
  };

  const updatePendingPriceRange = (priceRange: { min: number; max: number }) => {
    setPendingFilters(prev => ({ ...prev, priceRange }));
  };

  const updatePendingCategories = (categories: string[]) => {
    setPendingFilters(prev => ({ ...prev, categories }));
  };

  const applyFilters = () => {
    setFilters({ ...pendingFilters });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setPendingFilters(defaultFilters);
  };

  const hasChanges = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(pendingFilters);
  }, [filters, pendingFilters]);

  return {
    filters,
    pendingFilters,
    updatePendingStockFilter,
    updatePendingPriceRange,
    updatePendingCategories,
    applyFilters,
    resetFilters,
    hasChanges,
  };
}