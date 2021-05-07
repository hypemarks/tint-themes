import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PostTime, { IPostTimeProps } from './post-time';

export default {
  title: 'Common/Post/PostTime',
  name: 'Post Time',
  component: PostTime,
} as Meta;

const Template: Story<IPostTimeProps> = args => <PostTime {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  timeLanguage: 'en',
  showTimestamp: true,
  colorNameBarButtons: 'red',
  publishedAt: new Date().toString(),
  url: 'https://www.tintup.com/',
};
