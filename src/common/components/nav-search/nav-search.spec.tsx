import { render, screen } from '@testing-library/react';
import React from 'react';
import NavSearch from './nav-search';
import userEvent from '@testing-library/user-event';

jest.useFakeTimers();

describe('Test <Nav-item /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<NavSearch handleOnNavSearch={jest.fn} navSearchColor={'red'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should call search method after input content changed', () => {
    const search = jest.fn();
    render(<NavSearch handleOnNavSearch={search} navSearchColor={'red'} />);
    userEvent.type(screen.getByTestId('search-input'), 'Best Dog');
    jest.runAllTimers();
    expect(search).toHaveBeenCalledTimes(1);
  });
});
