import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Pagination, { IPaginationProps } from './pagination';

export default {
  title: 'Common/Pagination',
  name: 'Pagination',
  component: Pagination,
} as Meta;

const Template: Story<IPaginationProps> = args => <Pagination {...args} />;

export const Basic = Template.bind({});
