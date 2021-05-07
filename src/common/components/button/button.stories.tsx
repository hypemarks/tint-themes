import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button, { IButtonProps } from './button';

export default {
  title: 'Common/Button',
  name: 'Button',
  component: Button,
} as Meta;

const Template: Story<IButtonProps> = args => <Button {...args}>Button</Button>;

export const Basic = Template.bind({});
Basic.args = {};
