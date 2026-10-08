'use client';

import {
  SignUpEmailFormSchema,
  type CallToActionProps,
  type OAuthProviders,
  type SignUpEmailType,
} from '@mns/utils';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx, twMerge } from 'cn';
import type React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#components/ui/card';
import { FormTextField } from '../FormTextField';
import { Field, FieldSeparator } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { OAuthSignIn } from '../OAuthSignIn';
import { PasswordChecker } from '../PasswordChecker';
import { Button } from '#components/ui/button';
import { LoadingSpinner } from '#components/shared/LoadingSpinner';

type SignUpFormProps = {
  className?: string;
  action: (data: SignUpEmailType) => Promise<void>;
  oAuthAction: (provider: OAuthProviders) => Promise<void>;
  callToAction: CallToActionProps;
  renderCallToAction: (props: CallToActionProps) => React.ReactElement;
};

export const SignUpForm = ({
  className,
  action,
  oAuthAction,
  callToAction,
  renderCallToAction,
}: SignUpFormProps): React.JSX.Element => {
  const form = useForm<SignUpEmailType>({
    resolver: zodResolver(SignUpEmailFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const password = useWatch({ control: form.control, name: 'password' });

  const onSubmit: SubmitHandler<SignUpEmailType> = async (data) => {
    await action(data);
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <Card className="md:min-w-100">
      <CardHeader className="text-center">
        <CardTitle className="font-semibold">Sign Up</CardTitle>
        <CardDescription>Welcome to mns.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          className={twMerge(clsx('generic-form', className))}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <OAuthSignIn action={oAuthAction} />

          <FieldSeparator>Or Sign up with</FieldSeparator>

          <FormTextField
            name="name"
            control={form.control}
            type="text"
            autoComplete="name"
            label="Full Name"
          />

          <FormTextField
            name="email"
            control={form.control}
            type="email"
            autoCapitalize="email"
            label="Email"
          />

          <FormTextField
            name="password"
            control={form.control}
            type="password"
            autoComplete="new-password"
            label="Password"
          />

          <PasswordChecker password={password} />

          <Field orientation="horizontal">
            <SubmitButton
              disabled={isSubmitting}
              label={isSubmitting ? <LoadingSpinner /> : 'Sign Up'}
            />
          </Field>
        </form>
      </CardContent>

      <CardFooter>
        <Button type="button" asChild variant={'link'} className="ml-auto">
          {renderCallToAction({
            label: callToAction.label,
            href: callToAction.href,
          })}
        </Button>
      </CardFooter>
    </Card>
  );
};
