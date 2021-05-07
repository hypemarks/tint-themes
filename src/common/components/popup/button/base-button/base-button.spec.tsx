import { render, screen } from '@testing-library/react';
import React from 'react';
import BaseButton from './base-button';
import userEvent from '@testing-library/user-event';

describe('Test <BaseButton /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<BaseButton onClick={jest.fn} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should called onClick callback', () => {
    const onclick = jest.fn();
    render(<BaseButton onClick={onclick} />);
    userEvent.click(screen.getByTestId('base-button'));
    expect(onclick).toHaveBeenCalledTimes(1);
  });

  it('should render with correct class and styles', () => {
    const className = 'className';
    const styles = { left: '20' };
    const wrapper = render(
      <BaseButton onClick={jest.fn} primary={true} extended={true} className={className} customStyles={styles} />
    );
    const button = wrapper.queryByTestId('base-button');
    expect(button).toHaveClass('base-button--primary', 'base-button--extended', className);
    expect(button).toHaveStyle(styles);
  });
});
