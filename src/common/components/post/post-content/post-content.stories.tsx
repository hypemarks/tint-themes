import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PostContent, { IPostContentProps } from './post-content';

export default {
  title: 'Common/Post/PostContent',
  name: 'Post Content',
  component: PostContent,
} as Meta;

const Template: Story<IPostContentProps> = args => <PostContent {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  fontColor: 'red',
  fontFamily: 'Arial',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  url: 'https://www.tintup.com/',
};
