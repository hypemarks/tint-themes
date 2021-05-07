import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Popup, { ICarouselProps } from './popup';
import { buildPost } from '../../../../test/generate';

export default {
  title: 'Common/Popup/Popup',
  name: 'Carousel',
  component: Popup,
} as Meta;

const Template: Story<ICarouselProps> = args => <Popup {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  isMounted: true,
  imageBackgroundColor: 'grey',
  backgroundColor: '#e6b6b6',
  showName: true,
  showUsername: true,
  popupFontColor: 'white',
  usernameFontColor: 'white',
  popupFontFamily: 'Arial',
  timeLanguage: 'pl',
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
};
