'use client';

import { Card, CardContent, CardHeader, CardTitle } from '#components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SendNewsletterEmailFormSchema,
  type ActionResponse,
  type SendNewsletterEmailFormInput,
} from '@mns/utils';
import { clsx, twMerge } from 'cn';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { FormTextField } from '../../shared/FormTextField';
import { FormTextareaField } from '../../shared/FormTextareaField';
import { Field } from '#components/ui/field';
import { SubmitButton } from '#components/shared/SubmitButton/SubmitButton';
import { LoadingSpinner } from '#components/shared/LoadingSpinner';

type SendNewsletterEmailFormProps = {
  className?: string;
  action: (
    data: SendNewsletterEmailFormInput,
  ) => Promise<ActionResponse<SendNewsletterEmailFormInput>>;
};

export const SendNewsletterEmailForm = ({
  className,
  action,
}: SendNewsletterEmailFormProps) => {
  const form = useForm<SendNewsletterEmailFormInput>({
    resolver: zodResolver(SendNewsletterEmailFormSchema),
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit: SubmitHandler<SendNewsletterEmailFormInput> = async (
    data,
  ) => {
    const result = await action(data);

    if (!result.success) {
      toast.error(result.message);
      return form.setError(result.field as keyof SendNewsletterEmailFormInput, {
        message: result.message,
      });
    }

    toast.success(result.message);
    form.reset();
  };

  return (
    <Card className={twMerge(clsx('min-w-100', className))}>
      <CardHeader>
        <CardTitle className="font-semibold text-primary">
          Send email to the subscribers
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          noValidate
          className="generic-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormTextField
            name="subject"
            control={form.control}
            type="text"
            placeholder="New product launch..."
            label="Subject"
          />

          <FormTextareaField
            name="message"
            control={form.control}
            label="Message"
            placeholder={`We've launched a new app...`}
          />

          <Field orientation="horizontal">
            <SubmitButton
              disabled={isSubmitting}
              label={isSubmitting ? <LoadingSpinner /> : 'Send'}
            />
          </Field>
        </form>
      </CardContent>
    </Card>
  );
};
