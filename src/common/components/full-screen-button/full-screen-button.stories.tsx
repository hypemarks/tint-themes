import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { FullScreenButton } from './full-screen-button';

export default {
  title: 'Common/FullScreenButton',
  name: 'Full Screen Button',
  component: FullScreenButton,
} as Meta;

const Template: Story = args => <FullScreenButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
