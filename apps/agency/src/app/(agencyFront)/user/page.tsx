'use client';

import { SignOutButton } from '@/components/SignOutButton';
import { authClient } from '@/lib/authClient';
import { Bounded } from '@mns/ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/sign-in');
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <div>Loading...</div>;
  }

  return (
    <Bounded>
      <SignOutButton />
    </Bounded>
  );
};

export default UserPage;
