import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import Nav from './nav';

describe('Test <Nav /> Component', () => {
  const socialFeeds = { twitter: [] };
  const navConfig = {
    publicPost: true,
    waterfallToggle: false,
    handleOnNavItemClick: jest.fn(),
    navItemColor: 'red',
    handleOnNavSearch: jest.fn(),
    navSearchColor: 'blue',
  };
  const addPostConfig = {
    text: 'text',
    style: {},
    onClick: jest.fn(),
    handleEnterKey: jest.fn(),
  };

  const ReactElement = (): ReactElement => {
    return <></>;
  };
  it('should match snapshot', () => {
    const wrapper = render(
      <Nav
        socialFeeds={socialFeeds}
        navConfig={navConfig}
        addPostConfig={addPostConfig}
        renderAddPost={ReactElement}
        renderNavSearch={ReactElement}
        renderNavList={ReactElement}
      />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
