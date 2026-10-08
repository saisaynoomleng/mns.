'use client';

import { authClient } from '@/lib/authClient';
import { Button } from '@mns/ui';
import { useRouter } from 'next/navigation';

export const SignOutButton = () => {
  const router = useRouter();

  const onSignOut = () => {
    authClient.signOut({
      fetchOptions: { onSuccess: () => router.push('/sign-in') },
    });
  };

  return (
    <Button variant="destructive" onClick={onSignOut}>
      <span>Sign Out</span>
    </Button>
  );
};
