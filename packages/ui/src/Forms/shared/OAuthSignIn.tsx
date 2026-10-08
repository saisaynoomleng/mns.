import { Button } from '#components/ui/button';
import type { OAuthProviders } from '@mns/utils';
import { clsx, twMerge } from 'cn';
import { FaFacebook, FaGoogle, FaLinkedin, FaTiktok } from 'react-icons/fa';

type OAuthSignInProps = {
  action: (provider: OAuthProviders) => Promise<void>;
  className?: string;
};

export const OAuthSignIn = ({ action, className }: OAuthSignInProps) => {
  return (
    <div
      className={twMerge(
        clsx('flex items-center justify-center gap-x-3', className),
      )}
    >
      <Button type="button" onClick={() => action('facebook')}>
        <span>
          <FaFacebook />
        </span>
        <span className="sr-only">Sign in with facebook</span>
      </Button>

      <Button type="button" onClick={() => action('google')}>
        <span>
          <FaGoogle />
        </span>
        <span className="sr-only">Sign in with google</span>
      </Button>

      <Button type="button" onClick={() => action('tiktok')}>
        <span>
          <FaTiktok />
        </span>
        <span className="sr-only">Sign in with tik tok</span>
      </Button>

      <Button type="button" onClick={() => action('linkedin')}>
        <span>
          <FaLinkedin />
        </span>
        <span className="sr-only">Sign in with linkedin</span>
      </Button>
    </div>
  );
};
