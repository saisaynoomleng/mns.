'use client';

import { useGetAllNewsletter } from '@/hooks/useNewsletter';
import { Bounded, Spinner } from '@mns/ui';
import { formatDateUS } from '@mns/utils';
import React from 'react';

const NewsletterPage = (): React.JSX.Element => {
  const { data: newsletters, isError, isPending } = useGetAllNewsletter();
  console.log(newsletters);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Bounded as="main">Failed to load newsletters</Bounded>;
  }

  if (!newsletters?.length) {
    return <Bounded as="main">No Newsletter Found</Bounded>;
  }

  return (
    <Bounded as="main">
      {newsletters.map((n) => (
        <div key={n.id}>
          {n.email} <p>{formatDateUS(n.createdAt)}</p>
        </div>
      ))}
    </Bounded>
  );
};

export default NewsletterPage;
