import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { buildPost } from '../../../../test/generate';
import WaterfallLayout, { IWaterfallLayoutProps } from './waterfall-layout';
import { IPostWithCTA } from '../../..';
import ClassicPost from '../../../classic/components/tint/post/classic-post';

export default {
  title: 'Common/WaterfallLayout',
  name: 'WaterfallLayout',
  component: WaterfallLayout,
} as Meta;

const Template: Story<IWaterfallLayoutProps> = args => (
  <WaterfallLayout {...args}>
    {posts.map((post: IPostWithCTA) => {
      return <ClassicPost key={post.id} post={post} config={{ colorNameBarButtons: 'red' }} />;
    })}
  </WaterfallLayout>
);

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

const posts = [post, post, post, post, post, post, post, post, post];

export const Basic = Template.bind({});
Basic.args = {
  posts,
  postPadding: '20px',
  configColumns: 3,
  postWidth: '20px',
};
