import { passwordRules } from '@mns/utils';
import clsx from 'clsx';
import { twMerge } from 'cn';
import type React from 'react';
import { IoCheckmark, IoClose } from 'react-icons/io5';

type PasswordCheckerProps = {
  className?: string;
  password: string;
};

export const PasswordChecker = ({
  className,
  password,
}: PasswordCheckerProps): React.JSX.Element => {
  return (
    <ul className="flex flex-col gap-y-2">
      {passwordRules.map((rule) => {
        const isPass = rule.test(password) === true;

        return (
          <li
            key={rule.id}
            className={twMerge(
              'flex items-center gap-x-2',
              clsx(
                isPass ? 'text-brand-success-700' : 'text-brand-error-400',
                className,
              ),
            )}
          >
            {isPass ? <IoCheckmark /> : <IoClose />}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
};
