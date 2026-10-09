'use client';

import { DashedTitle } from '#components/shared/DashedTitle/DashedTitle';
import { SectionTitle } from '#components/shared/SectionTitle/SectionTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  NewsletterFormSchema,
  type ActionResponse,
  type NewsletterFormInputType,
} from '@mns/utils';
import { clsx, twMerge } from 'cn';
import type React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FormTextField } from '../FormTextField';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner';
import { toast } from 'sonner';

type NewsletterFormProps = {
  action: (
    data: NewsletterFormInputType,
  ) => Promise<ActionResponse<NewsletterFormInputType>>;
  className?: string;
};

export const NewsletterForm = ({
  action,
  className,
}: NewsletterFormProps): React.JSX.Element => {
  const form = useForm<NewsletterFormInputType>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<NewsletterFormInputType> = async (data) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);
      return form.setError(result.field as keyof NewsletterFormInputType, {
        message: result.message,
      });
    }

    form.reset();
    toast.success(result.message);
  };

  return (
    <form
      noValidate
      className={twMerge(clsx('generic-form', className))}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-y-2 md:gap-y-4">
        <DashedTitle label="Newsletter Subscription" />
        <SectionTitle>
          Stay in the <span className="text-primary">loop</span>
        </SectionTitle>
        <p>
          Occasional updates on new features, apps, and what we're building
          next.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-x-2 md:items-end gap-y-4">
        <FormTextField
          name="email"
          control={form.control}
          type="email"
          autoComplete="email"
          label="Email"
        />

        <SubmitButton
          disabled={isSubmitting}
          label={isSubmitting ? <LoadingSpinner /> : 'Subscribe'}
          className="max-md:self-end"
        />
      </div>
    </form>
  );
};
