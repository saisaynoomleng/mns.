'use client';

import { Checkbox } from '#components/ui/checkbox';
import { Field, FieldLabel, FieldError } from '#components/ui/field';
import { useId } from 'react';
import type React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type FormCheckboxFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
};

export const FormCheckboxField = <T extends FieldValues>({
  name,
  control,
  label,
}: FormCheckboxFieldProps<T>): React.JSX.Element => {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          aria-invalid={fieldState.invalid}
          className="w-fit"
        >
          <Checkbox id={id} {...field} aria-invalid={fieldState.invalid} />
          <FieldLabel htmlFor={id}>{label}</FieldLabel>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
