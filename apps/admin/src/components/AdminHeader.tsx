'use client';

import { authClient } from '@/lib/authClient';
import { SidebarTrigger } from '@mns/ui';
import Image from 'next/image';

export const AdminHeader = () => {
  const { data: session } = authClient.useSession();

  if (!session) return null;

  const { user } = session;

  const userProfile = user.image
    ? user.image
    : `https://placehold.co/50?text=${user.name.charAt(0).toUpperCase()}`;

  const isPlaceholdImage = userProfile.includes('placehold.co');

  return (
    <header className="shadow p-2 rounded-lg flex items-center justify-between">
      <SidebarTrigger />

      <div className="flex gap-x-2">
        {/* search bar */}

        <div>
          <Image
            src={userProfile}
            alt={`${user.name}'s profile picture`}
            width={40}
            height={40}
            priority
            unoptimized={isPlaceholdImage}
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
};
