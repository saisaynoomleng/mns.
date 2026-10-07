import { clsx, twMerge } from 'cn';
import type { ComponentPropsWithoutRef } from 'react';
import type React from 'react';

type BoundedProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'className'>;

export const Bounded = <T extends React.ElementType>({
  as,
  className,
}: BoundedProps<T>): React.JSX.Element => {
  const Comp = as ?? 'section';

  return <Comp className={twMerge(clsx('', className))}></Comp>;
};
