import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ClassicLayout, { IClassicLayoutProps } from './classic-layout';
import { buildPost } from '../../test/generate';

export default {
  title: 'Classic/Layout',
  name: 'Classic Layout',
  component: ClassicLayout,
} as Meta;

const Template: Story<IClassicLayoutProps> = args => <ClassicLayout {...args} />;
const post = buildPost({
  cta: [],
  attributes: {
    ...buildPost().attributes,
    type: 'twitter',
    author: {
      name: 'Author',
      username: 'username',
      image_url: 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png',
    },
    image_url: 'https://cdn.filestackcontent.com/ND0rImSYQV57u8lZ77JM',
  },
});
const posts = [post, post, post];

export const Basic = Template.bind({});
Basic.args = {
  posts,
  postsConfig: { colorNameBarButtons: 'red' },
};
