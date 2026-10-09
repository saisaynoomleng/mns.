import { Bounded, Skeleton } from '@mns/ui';

export const NewsletterSkeleton = () => {
  return (
    <Bounded spacing="md">
      <div className="grid grid-cols-2 gap-x-4">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>

      <div className="space-y-2">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    </Bounded>
  );
};
