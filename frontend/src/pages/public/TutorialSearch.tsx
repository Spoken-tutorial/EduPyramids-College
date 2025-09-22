
// src/pages/TutorialSearchPage.tsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFiltersStore } from "../../features/filters/store/filters";
import api from "../../api/axios";
// import api from "@/api/axios";

export default function TutorialSearch() {
  const [params] = useSearchParams();
  const fromSearchParams = useFiltersStore((s) => s.fromSearchParams);
  const filters = useFiltersStore((s) => s.filters);

  // When URL changes, sync it into the store
  useEffect(() => {
    fromSearchParams(params);

  }, [params, fromSearchParams]);

  // Example: call your results API based on the URL/store
  useEffect(() => {
    const qs = new URLSearchParams();
    if (filters.foss) qs.set("search_foss", filters.foss!);
    if (filters.language) qs.set("search_language", filters.language!);
    if (filters.domain) qs.set("search_domain", filters.domain!);
    api.get(`/api/tutorials?${qs.toString()}`)
    .then(
        (res) => console.log(res.data)
    )
    .catch((err) => console.log(err))
    ;
  }, [filters]);

  return (
    <div>
      <h1>Search Results</h1>
      <p>FOSS: {filters.foss || "—"}</p>
      <p>Language: {filters.language || "—"}</p>
      <p>Domain: {filters.domain || "—"}</p>
      {/* render results here */}
    </div>
  );
}
