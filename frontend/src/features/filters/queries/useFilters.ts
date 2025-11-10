import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";

export function useFiltersQuery() {
    return useQuery({
        queryKey: ['fiters'],
        // queryFn: async () => (await api.get('api/filters/')).data,
        queryFn: async () => (await api.get('/filters/')).data,
        staleTime: 24 * 60 * 60 * 1000, // filters rarely change
        gcTime: 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}