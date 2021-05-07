import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Image, { IImageProps } from './image';

export default {
  title: 'Common/Image',
  name: 'Image',
  component: Image,
} as Meta;

const Template: Story<IImageProps> = args => <Image {...args}></Image>;

export const Basic = Template.bind({});
Basic.args = {
  src: 'https://cdn.filestackcontent.com/ND0rImSYQV57u8lZ77JM',
  alt: 'alt-text',
  displayType: 'cover',
};
