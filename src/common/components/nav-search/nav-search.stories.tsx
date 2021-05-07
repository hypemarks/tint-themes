import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import NavSearch, { INavSearchProps } from './nav-search';

export default {
  title: 'Common/NavSearch',
  name: 'Nav Search',
  component: NavSearch,
} as Meta;

const Template: Story<INavSearchProps> = args => (
  <div style={{ display: 'flex', 'justify-content': 'center' } as any}>
    <NavSearch {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  navSearchColor: 'red',
};
