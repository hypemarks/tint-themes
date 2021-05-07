import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Banner, { IBannerProps } from './banner';

export default {
  title: 'Common/Banner',
  name: 'Banner',
  component: Banner,
} as Meta;

const Template: Story<IBannerProps> = args => <Banner {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  banner: { url: 'https://cdn.filestackcontent.com/ND0rImSYQV57u8lZ77JM', height: '200px' },
};
