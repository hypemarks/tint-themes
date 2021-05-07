import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PopupPostTime, { IPopupPostTimeProps } from './popup-post-time';

export default {
  title: 'Common/Popup/PopupPostTime',
  name: 'Popup Post Time',
  component: PopupPostTime,
} as Meta;

const Template: Story<IPopupPostTimeProps> = args => <PopupPostTime {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  timeLanguage: 'en',
  showTimestamp: true,
  colorNameBarButtons: 'red',
  publishedAt: new Date().toString(),
  url: 'https://www.tintup.com/',
};
