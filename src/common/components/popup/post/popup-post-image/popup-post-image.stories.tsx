import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PopupPostImage, { IPopupPostImageProps } from './popup-post-image';
import { buildPost } from '../../../../../../test/generate';

export default {
  title: 'Common/Popup/PopupPostImage',
  name: 'Popup Post Image',
  component: PopupPostImage,
} as Meta;

const Template: Story<IPopupPostImageProps> = args => <PopupPostImage {...args} />;

export const Basic = Template.bind({});
Basic.args = {
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
  imageBackgroundColor: 'grey',
  imageBackgroundColorDisabled: false,
  noImages: false,
  noImagesScaling: false,
  isMounted: true,
  waterfallToggle: false,
};
