import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignInForm } from './SignInForm';

const meta: Meta<typeof SignInForm> = {
  title: 'Forms/Shared/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      component: {
        description: 'Sign In Form',
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
    <SignInForm
      {...args}
      callToAction={{ label: 'Already a member?', href: '#' }}
      renderCallToAction={(props) => <a href={props.href}>{props.label}</a>}
      forgetAction={{ label: 'Forget password?', href: '#' }}
      renderForgetAction={(props) => <a href={props.href}>{props.label}</a>}
    />
  ),
};
