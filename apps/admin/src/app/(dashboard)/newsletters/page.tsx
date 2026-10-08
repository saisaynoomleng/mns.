'use client';

import { useTRPC } from '@/components/QueryProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const NewsletterPage = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const subscribers = useQuery(trpc.newsletter.getAllNewsletter.queryOptions());

  return <div>NewsletterPage</div>;
};

export default NewsletterPage;
