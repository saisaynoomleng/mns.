'use client';

import { authClient } from '@/lib/authClient';
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

  return <div>UserPage</div>;
};

export default UserPage;
