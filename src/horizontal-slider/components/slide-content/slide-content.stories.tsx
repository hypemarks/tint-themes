import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ISliderContentProps, SlideContent } from './slide-content';
import { buildPost, buildSliderConfig } from '../../../../test/generate';

export default {
  title: 'Slider/SlideContent',
  name: 'SlideContent',
  component: SlideContent,
} as Meta;

const Template: Story<ISliderContentProps> = args => (
  <div style={{ height: 700 }}>
    <SlideContent {...args} />
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
  tabIndex: 1,
  isMobile: false,
  nextCta,
  prevCta,
  onCtaClick,
  onClick,
  post,
  config: buildSliderConfig({ postBackgroundColor: '#a4aaee' }),
};
