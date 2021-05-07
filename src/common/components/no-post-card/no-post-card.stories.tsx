import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import NoPostCard, { INoPostCardProps } from './no-post-card';

export default {
  title: 'Common/NoPostCard',
  name: 'No Post Card',
  component: NoPostCard,
} as Meta;

const Template: Story<INoPostCardProps> = args => <NoPostCard {...args} />;

export const Basic = Template.bind({});
