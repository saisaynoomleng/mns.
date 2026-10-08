'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignInEmailFormSchema,
  type CallToActionProps,
  type OAuthProviders,
  type SignInEmailType,
} from '@mns/utils';
import { clsx, twMerge } from 'cn';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { OAuthSignIn } from '../OAuthSignIn';
import { Field, FieldSeparator } from '#components/ui/field';
import { FormTextField } from '../FormTextField';
import { FormCheckboxField } from '../FormCheckboxField';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner';
import { Button } from '#components/ui/button';

type SignInFormProps = {
  className?: string;
  action: (data: SignInEmailType) => Promise<void>;
  oAuthAction: (provider: OAuthProviders) => Promise<void>;
  callToAction: CallToActionProps;
  renderCallToAction: (props: CallToActionProps) => React.ReactElement;
  forgetAction: CallToActionProps;
  renderForgetAction: (props: CallToActionProps) => React.ReactElement;
};

export const SignInForm = ({
  className,
  action,
  oAuthAction,
  callToAction,
  renderCallToAction,
  forgetAction,
  renderForgetAction,
}: SignInFormProps): React.JSX.Element => {
  const form = useForm<SignInEmailType>({
    resolver: zodResolver(SignInEmailFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<SignInEmailType> = async (data) => {
    await action(data);
    form.reset();
  };

  return (
    <Card className={twMerge(clsx('md:min-w-100', className))}>
      <CardHeader className="text-center">
        <CardTitle className="font-semibold">Sign In</CardTitle>
        <CardDescription>Welcome back</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="generic-form"
        >
          <OAuthSignIn action={oAuthAction} />

          <FieldSeparator>Or Sign In With</FieldSeparator>

          <FormTextField
            name="email"
            control={form.control}
            type="email"
            autoComplete="email"
            label="Email"
          />

          <FormTextField
            name="password"
            control={form.control}
            type="password"
            autoComplete="current-password"
            label="Password"
          />

          <div className="flex justify-between items-center">
            <FormCheckboxField
              name="rememberMe"
              control={form.control}
              label="Remember Me"
            />

            <Button type="button" asChild variant="link">
              {renderForgetAction({
                label: forgetAction.label,
                href: forgetAction.href,
              })}
            </Button>
          </div>

          <Field orientation="horizontal">
            <SubmitButton
              disabled={isSubmitting}
              label={isSubmitting ? <LoadingSpinner /> : 'Sign In'}
            />
          </Field>
        </form>
      </CardContent>

      <CardFooter>
        <Button type="button" className="ml-auto" asChild variant="link">
          {renderCallToAction({
            label: callToAction.label,
            href: callToAction.href,
          })}
        </Button>
      </CardFooter>
    </Card>
  );
};
