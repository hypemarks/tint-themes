import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ClassicPost, { IClassicPostProps } from './classic-post';
import { buildPost } from '../../../../../test/generate';

export default {
  title: 'Classic/Post',
  name: 'Classic Post',
  component: ClassicPost,
} as Meta;

const Template: Story<IClassicPostProps> = args => <ClassicPost {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  post: buildPost({
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
  }),
  config: {},
};
