'use client';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#components/ui/field';
import { Input } from '#components/ui/input';
import { clsx } from 'cn';
import { useId, type ComponentPropsWithoutRef } from 'react';
import type React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type FormTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  type: React.HTMLInputTypeAttribute;
  description?: string;
} & Omit<
  ComponentPropsWithoutRef<'input'>,
  | 'name'
  | 'autoComplete'
  | 'label'
  | 'type'
  | 'onBlur'
  | 'onChange'
  | 'aria-invalid'
  | 'ref'
  | 'id'
  | 'value'
  | 'defaultValue'
>;

export const FormTextField = <T extends FieldValues>({
  name,
  label,
  control,
  autoComplete,
  description,
  type,
  ...props
}: FormTextFieldProps<T>): React.JSX.Element => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {description && <FieldDescription>{description}</FieldDescription>}

          <Input
            {...props}
            {...field}
            id={id}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
