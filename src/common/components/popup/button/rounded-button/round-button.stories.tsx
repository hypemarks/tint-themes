import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { IRoundedButtonProps, RoundedButton } from './rounded-button';

export default {
  title: 'Common/Popup/RoundedButton',
  name: 'RoundedButton',
  component: RoundedButton,
} as Meta;

const Template: Story<IRoundedButtonProps> = args => <RoundedButton {...args}>Button </RoundedButton>;

export const Basic = Template.bind({});
Basic.args = {
  radius: 100,
  primary: true,
};
