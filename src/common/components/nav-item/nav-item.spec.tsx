import { render, screen } from '@testing-library/react';
import React from 'react';
import NavItem from './nav-item';
import userEvent from '@testing-library/user-event';
import { ISocialFeedsGroupedItem } from '@tintup/tint-sdk/lib/';

describe('Test <Nav-item /> Component', () => {
  const config = {
    name: 'home',
    items: [] as ISocialFeedsGroupedItem[],
    navItemColor: 'red',
  };

  it('should match snapshot', () => {
    const wrapper = render(
      <NavItem onClick={jest.fn} name={config.name} items={config.items} navItemColor={config.navItemColor} />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should create nav-item with passed params', () => {
    const wrapper = render(
      <NavItem onClick={jest.fn} name={config.name} items={config.items} navItemColor={config.navItemColor} />
    );
    const navItem = wrapper.queryByTestId('nav-item-item');
    expect(navItem).toBeInTheDocument();
    expect(navItem).toHaveStyle({ background: config.navItemColor });
  });

  it('should called onClick callback after user click on nav item', () => {
    const onclick = jest.fn();
    render(<NavItem onClick={onclick} name={config.name} items={config.items} navItemColor={config.navItemColor} />);
    userEvent.click(screen.getByTestId('nav-item'));
    expect(onclick).toHaveBeenCalledTimes(1);
  });

  it('should called onClick callback after user press enter on nav-item element', () => {
    const onclick = jest.fn();
    render(<NavItem onClick={onclick} name={config.name} items={config.items} navItemColor={config.navItemColor} />);
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(screen.getByTestId('nav-item')).toHaveFocus();
    userEvent.type(screen.getByTestId('nav-item'), '{enter}');

    expect(onclick).toHaveBeenCalled();
  });

  it('should called onClick callback with social feed after user click on social feed element', () => {
    const onclick = jest.fn();
    config.items = [{ name: 'twitter', id: 1, options: {} }, { name: 'tumblr', id: 2, options: {} }];
    render(<NavItem onClick={onclick} name={config.name} items={config.items} navItemColor={config.navItemColor} />);

    expect(screen.getByText('twitter')).toBeInTheDocument();
    userEvent.click(screen.getByText('twitter'));
    expect(onclick).toHaveBeenCalledTimes(1);
  });
});
