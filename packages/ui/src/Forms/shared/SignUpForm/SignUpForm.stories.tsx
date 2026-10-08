import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignUpForm } from './SignUpForm';

const meta: Meta<typeof SignUpForm> = {
  title: 'Forms/Shared/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      component: {
        description: 'Sign Up Form',
      },
    },
  },

  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SignUpForm
      {...args}
      callToAction={{ label: 'Already a member?', href: '#' }}
      renderCallToAction={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
};
