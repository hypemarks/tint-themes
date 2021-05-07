import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SlideImage, { IPropsSlideImage } from './slide-image';
import { buildPost, buildSliderConfig } from '../../../../test/generate';

export default {
  title: 'Slider/SlideImage',
  name: 'SlideImage',
  component: SlideImage,
} as Meta;

const Template: Story<IPropsSlideImage> = args => (
  <div style={{ height: 700 }}>
    <SlideImage {...args} />
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

const nextCta = () => ({});
const prevCta = () => ({});
const onClick = () => ({});
const onCtaClick = () => ({});

Basic.args = {
  activeCTAIndex: 0,
  shouldDisplayCta: false,
  tabIndex: 1,
  isMobile: false,
  nextCta,
  prevCta,
  onCtaClick,
  onClick,
  post,
  config: {
    url: 'https://cdn.filestackcontent.com/ND0rImSYQV57u8lZ77JM',
    imageEffect: null,
    noImagesScaling: false,
  },
};
