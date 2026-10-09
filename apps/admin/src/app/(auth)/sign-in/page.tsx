'use client';

import RenderCallToAction from '@/components/RenderCallToAction';
import { authClient } from '@/lib/authClient';
import { env } from '@/lib/env/client';
import { Bounded, SignInForm, toast } from '@mns/ui';
import { OAuthProviders, SignInEmailType } from '@mns/utils';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignInPage = (): React.JSX.Element => {
  const router = useRouter();

  const handleSignIn = async (data: SignInEmailType) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}`,
      },
      {
        onSuccess: () => {
          router.push('/');
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
    <Bounded
      size="sm"
      isCentered
      className="flex flex-col justify-center items-center"
    >
      <SignInForm
        action={handleSignIn}
        oAuthAction={handleOAuthSignIn}
        callToAction={{ label: 'Not a member yet? Sign Up', href: '/sign-up' }}
        forgetAction={{ label: 'Forget password?', href: '/reset-password' }}
        renderCallToAction={(props) => RenderCallToAction(props)}
        renderForgetAction={(props) => RenderCallToAction(props)}
      />
    </Bounded>
  );
};

export default SignInPage;
