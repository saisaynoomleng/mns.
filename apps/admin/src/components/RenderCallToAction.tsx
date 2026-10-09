import { Button } from '@mns/ui';
import { CallToActionProps } from '@mns/utils';
import Link from 'next/link';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type RenderCallToActionProps = CallToActionProps & {
  className?: string;
};

const RenderCallToAction = ({
  label,
  href,
  className,
}: RenderCallToActionProps) => {
  return (
    <Button asChild className={twMerge(clsx('', className))} variant="link">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default RenderCallToAction;
