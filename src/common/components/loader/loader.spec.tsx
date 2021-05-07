import { render } from '@testing-library/react';
import React from 'react';
import Loader from './loader';

describe('Test <Loader /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<Loader />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
