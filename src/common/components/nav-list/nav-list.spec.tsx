import { render } from '@testing-library/react';
import React from 'react';
import NavList from './nav-list';

describe('Test <NavList /> Component', () => {
  const socialFeeds = { twitter: [] };
  it('should match snapshot', () => {
    const wrapper = render(<NavList socialFeeds={socialFeeds} navItemColor={'red'} handleOnNavItemClick={jest.fn()} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
