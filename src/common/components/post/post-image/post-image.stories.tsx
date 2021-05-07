import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PostImage, { IPostImageProps } from './post-image';
import { buildPost } from '../../../../../test/generate';

export default {
  title: 'Common/Post/PostImage',
  name: 'Post Image',
  component: PostImage,
} as Meta;

const Template: Story<IPostImageProps> = args => <PostImage {...args} />;

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
  displayType: 'normal',
  noImages: false,
  noImagesScaling: false,
};
