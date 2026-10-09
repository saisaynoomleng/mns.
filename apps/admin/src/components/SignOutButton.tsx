'use client';

import { authClient } from '@/lib/authClient';
import { Button, useSidebar } from '@mns/ui';
import { useRouter } from 'next/navigation';
import { LiaSignOutAltSolid } from 'react-icons/lia';

export const SignOutButton = () => {
  const { open } = useSidebar();
  const router = useRouter();

  const onSignOut = () => {
    authClient.signOut({
      fetchOptions: { onSuccess: () => router.push('/sign-in') },
    });
  };

  return (
    <Button variant="destructive" onClick={onSignOut}>
      {open ? (
        <>
          <span>
            <LiaSignOutAltSolid />
          </span>
          <span>Sign Out</span>
        </>
      ) : (
        <span>
          <LiaSignOutAltSolid />
        </span>
      )}
    </Button>
  );
};
