'use client';

import RenderCallToAction from '@/components/RenderCallToAction';
import { authClient } from '@/lib/authClient';
import { env } from '@/lib/env/client';
import { Bounded, SignUpForm, toast } from '@mns/ui';
import { OAuthProviders, SignUpEmailType } from '@mns/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignUpPage = (): React.JSX.Element => {
  const router = useRouter();

  const handleSignUp = async (data: SignUpEmailType) => {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/user`,
      },
      {
        onSuccess: () => {
          router.push('/user');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleOAuthSignIn = async (provider: OAuthProviders) => {
    await authClient.signIn.social(
      {
        provider,
      },
      {
        onSuccess: () => {
          router.push('/user');
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Bounded as="main" size="sm" isCentered>
      <SignUpForm
        action={handleSignUp}
        oAuthAction={handleOAuthSignIn}
        callToAction={{ label: 'Alread a member? Sign Up', href: '/sign-in' }}
        renderCallToAction={(props) => RenderCallToAction(props)}
      />
    </Bounded>
  );
};

export default SignUpPage;
