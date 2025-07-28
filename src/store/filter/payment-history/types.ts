import {PaymentFilter} from "@/types/payment.ts";

export interface PaymentFilterState {
  filters: PaymentFilter;
}

export interface PaymentFilterActions {
  setFilters: (filters: PaymentFilter) => void;
  updateFilters: (filters: Partial<PaymentFilter>) => void;
  resetFilters: () => void;
}
