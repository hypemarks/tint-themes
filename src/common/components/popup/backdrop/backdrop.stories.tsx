import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Backdrop, { IBackdropProps } from './backdrop';

export default {
  title: 'Common/Popup/Backdrop',
  name: 'Backdrop',
  component: Backdrop,
} as Meta;

const Template: Story<IBackdropProps> = args => <Backdrop {...args} />;

export const Basic = Template.bind({});
Basic.args = {};
