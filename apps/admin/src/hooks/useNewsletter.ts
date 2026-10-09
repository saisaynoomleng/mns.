'use client';

import { getAllNewsletters } from '@/lib/dal';
import { queryKeys } from '@/lib/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetAllNewsletter = () => {
  return useQuery({
    queryKey: queryKeys.newsletters.all,
    queryFn: getAllNewsletters,
  });
};
