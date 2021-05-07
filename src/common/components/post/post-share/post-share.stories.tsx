import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PostShare, { IPostShareProps } from './post-share';

export default {
  title: 'Common/Post/PostShare',
  name: 'Post Share',
  component: PostShare,
} as Meta;

const Template: Story<IPostShareProps> = args => (
  <div
    style={
      {
        display: 'flex',
        'justify-content': 'center',
        height: '100vh',
        'align-items': 'center',
      } as any
    }>
    <PostShare {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  url: 'https://www.tintup.com/',
  imageUrl: 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png',
  id: '123',
  buttons: 2,
  options: [],
  colorNameBarButtons: 'red',
  iconStyle: {
    fontSize: '24px',
    color: 'red',
  },
};
