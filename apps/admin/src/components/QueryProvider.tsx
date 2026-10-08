'use client';

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { useState } from 'react';

import {
  createTRPCClient as createTRPCReact,
  httpBatchLink,
} from '@trpc/client';
import type { AppRouter } from '@mns/api';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { env } from '@/lib/env/client';

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 1000,
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
  const [trpcClient] = useState(() =>
    createTRPCReact<AppRouter>({
      links: [
        httpBatchLink({
          url: `${env.NEXT_PUBLIC_API_URL}/trpc`,
          fetch(url, options) {
            return fetch(url, { ...options, credentials: 'include' });
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};
