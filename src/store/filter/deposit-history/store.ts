import {create} from "zustand";
import {devtools} from "zustand/middleware";

import {DepositFilterActions, DepositFilterState} from "./types";

const DEFAULT_STATE: DepositFilterState = {
  filters: {
    page: 1,
    limit: 10,
    orderBy: "all",
  },
};

export const useDepositFilterStore = create(
  devtools<DepositFilterState & DepositFilterActions>(
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
    { name: "deposit-filter" },
  ),
);
