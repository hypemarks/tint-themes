import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Slide, { ISlideProps } from './slide';
import { buildPost, buildSliderConfig } from '../../../../test/generate';

export default {
  title: 'Slider/Slide',
  name: 'Slide',
  component: Slide,
} as Meta;

const Template: Story<ISlideProps> = args => (
  <div style={{ height: 700 }}>
    <Slide {...args} />
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

const onSlideContentClick = () => ({});
const onImagaClick = () => ({});
const onCtaClick = () => ({});
const openPostOnEnter = () => ({});

Basic.args = {
  flexBasis: 100,
  id: 'id123',
  transX: 0,
  marginLeft: 0,
  post,
  onSlideContentClick,
  onImagaClick,
  onCtaClick,
  openPostOnEnter,
  config: buildSliderConfig(),
};
