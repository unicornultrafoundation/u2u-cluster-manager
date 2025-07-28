import {create} from "zustand";
import {devtools} from "zustand/middleware";

import {PaymentFilterActions, PaymentFilterState} from "./types";

const DEFAULT_STATE: PaymentFilterState = {
  filters: {
    page: 1,
    limit: 10,
    orderBy: "all",
  },
};

export const usePaymentFilterStore = create(
  devtools<PaymentFilterState & PaymentFilterActions>(
    (set) => ({
      ...DEFAULT_STATE,
      setFilters: (filters) => set(() => ({ filters })),
      updateFilters: (filters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        })),
      resetFilters: () =>
        set(() => ({
          ...DEFAULT_STATE,
        })),
    }),
    { name: "payment-filter" },
  ),
);
