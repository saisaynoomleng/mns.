'use client';

import { Field, FieldError, FieldLabel } from '#components/ui/field';
import { InputGroup, InputGroupTextarea } from '#components/ui/input-group';
import { useId, type ComponentPropsWithoutRef } from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type FormTextareaFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  maxLength?: number;
  minLength?: number;
  description?: string;
  label: string;
} & Omit<
  ComponentPropsWithoutRef<'textarea'>,
  | 'name'
  | 'minLength'
  | 'maxLength'
  | 'onChange'
  | 'onBlur'
  | 'ref'
  | 'defaultValue'
  | 'value'
  | 'id'
>;

export const FormTextareaField = <T extends FieldValues>({
  name,
  control,
  minLength = 10,
  maxLength = 10000,
  description,
  label,
  ...props
}: FormTextareaFieldProps<T>) => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field aria-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id} aria-invalid={fieldState.invalid}>
            {label}
          </FieldLabel>

          <InputGroup>
            <InputGroupTextarea
              {...props}
              {...field}
              minLength={minLength}
              maxLength={maxLength}
              id={id}
            />
          </InputGroup>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
