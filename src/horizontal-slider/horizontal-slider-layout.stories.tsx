import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import HorizontalSliderLayout, { IHorizontalSliderLayoutProps } from './horizontal-slider-layout';
import { buildPost, buildSliderConfig } from '../../test/generate';

export default {
  title: 'Slider/HorizontalSliderLayout',
  name: 'HorizontalSliderLayout',
  component: HorizontalSliderLayout,
} as Meta;

const Template: Story<IHorizontalSliderLayoutProps> = args => (
  <div style={{ height: 700 }}>
    <HorizontalSliderLayout {...args} />
  </div>
);

export const Basic = Template.bind({});

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

const openPopup = () => ({});
const openPostOnEnter = () => ({});
const onCtaClick = () => ({});

Basic.args = {
  isAutoScroll: false,
  openPopup,
  openPostOnEnter,
  onCtaClick,
  posts,
  config: buildSliderConfig({ postBackgroundColor: '#a4aaee', postWidth: '250', themeLayout: 'text_on_hover' }),
};
