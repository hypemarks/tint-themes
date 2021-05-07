import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import NavItem, { INavItemProps } from './nav-item';

export default {
  title: 'Common/NavItem',
  name: 'Nav Item',
  component: NavItem,
} as Meta;

const Template: Story<INavItemProps> = args => (
  <div style={{ width: 48 }}>
    <NavItem {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  name: 'home',
  navItemColor: 'red',
  items: [{ label: 'instagram', id: 21 }],
};
