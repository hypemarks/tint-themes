import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PostActions, { IPostActionsProps } from './post-actions';

export default {
  title: 'Common/Post/PostActions',
  name: 'Post Actions',
  component: PostActions,
} as Meta;

const Template: Story<IPostActionsProps> = args => <PostActions {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  externalId: 'twitter-external-id',
  buttonsColor: 'red',
};
