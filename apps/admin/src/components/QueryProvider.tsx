'use client';

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5,
      gcTime: 60 * 15,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  }),
});

export const QueryProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
