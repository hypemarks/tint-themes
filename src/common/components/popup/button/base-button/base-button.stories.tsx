import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import BaseButton, { IBaseButtonProps } from './base-button';

export default {
  title: 'Common/Popup/BaseButton',
  name: 'BaseButton',
  component: BaseButton,
} as Meta;

const Template: Story<IBaseButtonProps> = args => <BaseButton {...args}>Button </BaseButton>;

export const Basic = Template.bind({});
Basic.args = {
  disabled: false,
  primary: true,
};
