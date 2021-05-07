import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { buildPost } from '../../test/generate';
import SquarePhotoLayout, { ISquarePhotoLayoutProps, ISquarePhotoPostsConfig } from './square-photo-layout';
import { IPostWithCTA } from '..';

export default {
  title: 'Square Photo/Layout',
  name: 'Square Photo Layout',
  component: SquarePhotoLayout,
} as Meta;

const config = {
  colorNameBarButtons: 'yellow',
  columns: undefined,
  ctaConfig: undefined,
  appendUtmToCta: null,
  ctaButtonColor: '#9eff00',
  ctaButtonShow: 'both',
  ctaButtonTextColor: '#ffffff',
  fontColor: '#00c2ff',
  fontFamily: 'Lato',
  fontSize: 20,
  imageEffect: 'none',
  isPopupLoaded: true,
  noPopup: undefined,
  postPadding: '10',
  postWidth: '400',
  shareButtonOptions: [],
  shareButtons: 1,
  textOnHover: true,
};

const Template: Story<ISquarePhotoLayoutProps> = args => <SquarePhotoLayout {...args} />;
const post = buildPost({
  cta: [],
  attributes: {
    author: {
      image_url: 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png',
      name: '⏳Elizabeth Mueller⌛️',
      url: 'http://twitter.com/LizActivate',
      username: 'LizActivate',
    },
    external_id: '1352539479110770689',
    highlighted: false,
    image_url: 'https://cdn.filestackcontent.com/ND0rImSYQV57u8lZ77JM',
    metadata: { sentiment: 'negative', language: 'en' },
    pinned: false,
    published_at: '2021-01-22T08:51:55.000Z',
    tags: ['tag1'],
    text:
      "@dinofettuccine #ImpeachBidenNow ↵#EndFusionCenters↵#EndMassSurveillance↵#BLM #MAGA have more in common than most realize...↵CONGRESS, IS STEALING &amp; LYING TO EVERYONE!↵#NoTPP #StopTPP #NoCPTPP #StopCPTPP ↵WHERE's OUR STIMULUS CHECKS???↵#EndQualifiedImmunity!↵↵twitter.com/LizActivate/st…",
    title: 'Title',
    type: 'twitter',
    url: 'http://twitter.com/LizActivate/status/1352539479110770689',
    video_url: null,
  },
  type: 'post',
});

const postWithNoImage = buildPost({
  cta: [],
  attributes: {
    author: {
      image_url: 'https://cdn.hypemarks.com/assets/analytics/EmptyProfile.png',
      name: '⏳Elizabeth Mueller⌛️',
      url: 'http://twitter.com/LizActivate',
      username: 'LizActivate',
    },
    external_id: '1352539479110770689',
    highlighted: false,
    image_url: 'https://cdn.filestackcontent.com/ND0rImSYQV57u8lZ77JMaaa',
    metadata: { sentiment: 'negative', language: 'en' },
    pinned: false,
    published_at: '2021-01-22T08:51:55.000Z',
    tags: ['tag1'],
    text:
      "@dinofettuccine #ImpeachBidenNow ↵#EndFusionCenters↵#EndMassSurveillance↵#BLM #MAGA have more in common than most realize...↵CONGRESS, IS STEALING &amp; LYING TO EVERYONE!↵#NoTPP #StopTPP #NoCPTPP #StopCPTPP ↵WHERE's OUR STIMULUS CHECKS???↵#EndQualifiedImmunity!↵↵twitter.com/LizActivate/st…",
    title: 'Title',
    type: 'twitter',
    url: 'http://twitter.com/LizActivate/status/1352539479110770689',
    video_url: null,
  },
  type: 'post',
});

const posts = [post, postWithNoImage, post];
export const Basic = Template.bind({});
Basic.args = {
  posts,
  postsConfig: config,
  isAutoScroll: false,
};
