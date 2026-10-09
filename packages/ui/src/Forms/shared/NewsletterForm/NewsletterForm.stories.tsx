import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterForm } from './NewsletterForm';
import { mockFormAction } from '#lib/data';
import { expect } from 'storybook/test';

const meta: Meta<typeof NewsletterForm> = {
  title: 'Forms/Shared/NewslettersSubscriptionForm',
  component: NewsletterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      component: {
        descripiton: 'Newsletter Subscription Form for the users',
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
  play: async ({ canvas, userEvent, args }) => {
    const email = canvas.getByLabelText(/emai/i);
    const submit = canvas.getByRole('button', {
      name: /subscribe/i,
    });

    await expect(email).toBeInTheDocument();
    await expect(submit).toBeInTheDocument();

    await userEvent.type(email, 'johndoe@mail.com');
    await userEvent.click(submit);

    await expect(args.action).toHaveBeenCalledWith({
      email: 'johndoe@mail.com',
    });
  },
};
