import { render, screen } from '@testing-library/react';
import React from 'react';
import Backdrop from './backdrop';
import userEvent from '@testing-library/user-event';

describe('Test <Backdrop /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<Backdrop onClick={jest.fn} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should called onClick callback', () => {
    const onclick = jest.fn();
    render(<Backdrop onClick={onclick} />);
    userEvent.click(screen.getByTestId('backdrop'));
    expect(onclick).toHaveBeenCalledTimes(1);
  });

  it('should change style if disabled flag is not passed', () => {
    const wrapper = render(<Backdrop onClick={jest.fn} lightboxColor={'red'} />);
    const backdrop = wrapper.queryByTestId('backdrop');
    expect(backdrop).toHaveStyle({ background: 'red' });
  });
});
