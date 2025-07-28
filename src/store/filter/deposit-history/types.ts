import {DepositFilter} from "@/types";

export interface DepositFilterState {
  filters: DepositFilter;
}

export interface DepositFilterActions {
  setFilters: (filters: DepositFilter) => void;
  updateFilters: (filters: Partial<DepositFilter>) => void;
  resetFilters: () => void;
}
