import type { Meta, StoryObj } from '@storybook/react';
import FadingLoadingScreen from '../components/LoadingScreenAnimation';

const meta: Meta<typeof FadingLoadingScreen> = {
  title: 'Components/FadingLoadingScreen',
  component: FadingLoadingScreen,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof FadingLoadingScreen>;

export const Default: Story = {};