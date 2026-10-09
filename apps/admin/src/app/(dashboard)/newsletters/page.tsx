'use client';

import { useGetAllNewsletter } from '@/hooks/useNewsletter';
import {
  Bounded,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@mns/ui';
import { formatDateUS } from '@mns/utils';
import React from 'react';
import { NewsletterSkeleton } from './_components/_skeleton';
import { NewsletterFilter } from './_components/_filter';
import { useSearchParams } from 'next/navigation';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const NewsletterPage = (): React.JSX.Element => {
  const { data: newsletters, isError, isPending } = useGetAllNewsletter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const sort = searchParams.get('sort');

  if (isPending) {
    return <NewsletterSkeleton />;
  }

  if (isError) {
    return <Bounded as="main">Failed to load newsletters</Bounded>;
  }

  if (!newsletters?.length) {
    return <Bounded as="main">No Newsletter Found</Bounded>;
  }

  return (
    <Bounded as="main" spacing="md">
      <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-x-6 items-start">
        <div className="flex flex-col gap-y-2 p-4 border rounded-lg">
          <p className="font-semibold">Total Subscribers</p>
          <p className="text-fs-500 text-primary">{newsletters.length}</p>
        </div>

        {/* forms */}
      </div>

      <div className="flex flex-col gap-y-2 md:flex-row md:justify-between">
        {/* search */}
        <div className="md:max-w-100">
          <InputGroup>
            <InputGroupInput
              type="search"
              className="border-none"
              placeholder="Search by email..."
            />
            <InputGroupAddon align="inline-start">
              <FaMagnifyingGlass />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* sort */}
        <NewsletterFilter page={page ?? '1'} />
      </div>

      <Table className="border-collapse table-fixed caption-top">
        <TableCaption className="text-primary">Active Subscribers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Subscribed On</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {newsletters.map((n, i) => (
            <TableRow key={n.id}>
              <TableCell className="text-left">{i + 1}</TableCell>
              <TableCell className="font-semibold">{n.email}</TableCell>
              <TableCell className="text-right">
                {formatDateUS(n.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* paginations */}
    </Bounded>
  );
};

export default NewsletterPage;
