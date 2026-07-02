import { QueryClient } from "@tanstack/react-query";

/**
 * Single, app-wide React Query client.
 * Keep all default query/mutation behavior configured here.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 min before data is considered stale
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
