import type { Meta, StoryObj } from '@storybook/react-vite';
import { SendNewsletterEmailForm } from './SendNewsletterEmailForm';
import { mockFormAction } from '#lib/data';
import { userEvent } from 'storybook/test';

const meta: Meta<typeof SendNewsletterEmailForm> = {
  title: 'Forms/Admin/SendNewsletterEmailForm',
  component: SendNewsletterEmailForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Email text form for admin to send product updates to newsletter subscribers',
      },
    },
  },

  args: {
    action: mockFormAction,
  },

  argTypes: {
    action: {
      control: false,
      description: 'Server Action to be rendered in Next.js',
    },

    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FilledForm: Story = {
  render: (args) => <SendNewsletterEmailForm {...args} />,
  play: async ({ canvas, userEvent }) => {
    // const
  },
};
