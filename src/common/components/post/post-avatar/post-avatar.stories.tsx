import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PostAvatar, { IPostAvatarProps } from './post-avatar';

export default {
  title: 'Common/Post/PostAvatar',
  name: 'Post Avatar',
  component: PostAvatar,
} as Meta;

const Template: Story<IPostAvatarProps> = args => <PostAvatar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  author: {
    name: 'Author',
    username: 'username',
    image_url: 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png',
  },
  textColor: 'red',
};
