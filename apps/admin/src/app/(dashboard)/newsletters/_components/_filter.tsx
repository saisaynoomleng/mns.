import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@mns/ui';
import Link from 'next/link';
import { FaSortAmountDown } from 'react-icons/fa';

const FILTERS = [
  { name: 'Latest', value: 'desc' },
  { name: 'Oldest', value: 'asc' },
];

export const NewsletterFilter = ({ page }: { page: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>
            <FaSortAmountDown />
          </span>
          <span>Sort By</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {FILTERS.map((f) => (
          <DropdownMenuItem asChild key={f.name}>
            <Link
              href={{
                pathname: '/newsletters',
                query: {
                  ...(page && { page }),
                  sort: f.value,
                },
              }}
            >
              {f.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
