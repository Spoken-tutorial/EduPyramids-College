import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";

export function useHomepageQuery() {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: async () => (await api.get('api/homepage/')).data,
    refetchOnWindowFocus: false,
  })
}