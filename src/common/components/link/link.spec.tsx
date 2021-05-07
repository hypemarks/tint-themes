import { render } from '@testing-library/react';
import React from 'react';
import Link from './link';

describe('Test <Link /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<Link href={'fake-href'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should create link with passed params', () => {
    const className = 'className';
    const style = { color: 'red' };
    const wrapper = render(<Link className={className} initialColor={style.color} href={'fake-href'} />);
    const link = wrapper.queryByTestId('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveStyle(style);
    expect(link).toHaveClass(className);
  });
});
