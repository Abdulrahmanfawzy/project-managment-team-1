import { QueryClient } from "@tanstack/react-query";

/**
 * Single app-wide React Query client.
 * Imported by AppProviders so every hook shares one cache.
 * Single, app-wide React Query client.
 * Keep all default query/mutation behavior configured here.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 min: avoid refetching on every mount
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
