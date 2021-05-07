import { render } from '@testing-library/react';
import React from 'react';
import Image from './image';

describe('Test <Image /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<Image src={'fake-src'} displayType={'normal'} alt={'image'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should contain passed className', () => {
    const className = 'className';
    const wrapper = render(<Image className={className} displayType={'normal'} src={'fake-src'} alt={'image'} />);
    const image = wrapper.queryByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass(className);
  });
});
