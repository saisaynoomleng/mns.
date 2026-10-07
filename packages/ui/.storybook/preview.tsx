import type { Preview } from '@storybook/react-vite';

import '@fontsource/fraunces';
import '@fontsource/nothing-you-could-do';
import '@fontsource/sora';

import '../src/globals.css';
import './fonts.css';

import { Toaster } from '../src/components';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />

        <Toaster richColors closeButton position="bottom-center" />
      </>
    ),
  ],
};

export default preview;
