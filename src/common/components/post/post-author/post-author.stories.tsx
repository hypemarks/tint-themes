import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PostAuthor, { IPostAuthorProps } from './post-author';

export default {
  title: 'Common/Post/PostAuthor',
  name: 'Post Author',
  component: PostAuthor,
} as Meta;

const Template: Story<IPostAuthorProps> = args => <PostAuthor {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  showName: true,
  showUsername: true,
  authorFontColorDisabled: false,
  authorFontColor: 'Grey',
  usernameFontColorDisabled: false,
  usernameFontColor: 'red',
  author: {
    name: 'Author',
    username: 'username',
    image_url: 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png',
  },
};
