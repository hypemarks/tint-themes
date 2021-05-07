import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PostTitle, { IPostTitleProps } from './post-title';

export default {
  title: 'Common/Post/PostTitle',
  name: 'Post Title',
  component: PostTitle,
} as Meta;

const Template: Story<IPostTitleProps> = args => <PostTitle {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'title',
  style: { color: 'red' },
  lineClamp: 2,
};
