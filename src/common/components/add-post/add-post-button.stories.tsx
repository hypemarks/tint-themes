import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AddPostButton, { IAddPostButtonProps } from './add-post-button';

export default {
  title: 'Common/AddPostButton',
  name: 'AddPostButton',
  component: AddPostButton,
} as Meta;

const Template: Story<IAddPostButtonProps> = args => <AddPostButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  text: 'Add Post',
};

export const Styled = Template.bind({});
Styled.args = {
  ...Basic.args,
  style: {
    color: 'white',
    background: 'red',
  },
};
