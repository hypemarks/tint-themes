import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from './button';
import userEvent from '@testing-library/user-event';

describe('Test <Button /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<Button href={'tintup.com'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should create button with passed params', () => {
    const className = 'className';
    const style = { color: 'red' };
    const wrapper = render(<Button className={className} style={style} disabled={false} type={'reset'} />);
    const button = wrapper.queryByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle(style);
    expect(button).toHaveClass(className);
  });

  it('should called onClick callback', () => {
    const onclick = jest.fn();
    render(
      <Button onClick={onclick} type={'button'}>
        Fire me
      </Button>
    );
    userEvent.click(screen.getByText('Fire me'));
    expect(onclick).toHaveBeenCalledTimes(1);
  });
});
