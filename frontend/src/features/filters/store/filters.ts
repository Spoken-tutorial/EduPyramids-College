// src/store/filters.ts
import create from "zustand";                   // v3: default import
import { persist } from "zustand/middleware";   // v3: whitelist/blacklist (no partialize)

export type Filters = {
  domain?: string | null;
  foss?: string | null;
  language?: string | null;
};

type FiltersState = {
  filters: Filters;
  setFilters: (f: Filters) => void;
  setPartial: (f: Partial<Filters>) => void;
  reset: () => void;

  // URL <-> state helpers
  toSearchParams: () => URLSearchParams;
  fromSearchParams: (params: URLSearchParams) => void;
};

export const useFiltersStore = create(
  persist<FiltersState>(
    (set, get) => ({
      filters: {},

      setFilters: (f) => set({ filters: f }),

      setPartial: (f) => set({ filters: { ...get().filters, ...f } }),

      reset: () => set({ filters: {} }),

      toSearchParams: () => {
        const { filters } = get();
        const qs = new URLSearchParams();
        if (filters.foss) qs.set("search_foss", filters.foss);
        if (filters.language) qs.set("search_language", filters.language);
        if (filters.domain) qs.set("search_domain", filters.domain);
        return qs;
      },

      fromSearchParams: (params) => {
        console.log("search_foss: ", params.get("search_foss"));
        console.log("search_language: ", params.get("search_language"));
        console.log("search_domain: ", params.get("search_domain"));
        set({
          filters: {
            foss: params.get("search_foss"),
            language: params.get("search_language"),
            domain: params.get("search_domain"),
          },
        });
      },
    }),
    {
      name: "filters",            // localStorage key
      whitelist: ["filters"],     // v3: persist only this slice
      // storage: defaults to localStorage in the browser
    }
  )
);
