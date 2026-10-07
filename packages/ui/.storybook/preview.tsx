import type { Preview } from '@storybook/react-vite';

import '../src/globals.css';
import './fonts.css';

import '@fontsource/fraunces';
import '@fontsource/nothing-you-could-do';
import '@fontsource/sora';

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
      </>
    ),
  ],
};

export default preview;
