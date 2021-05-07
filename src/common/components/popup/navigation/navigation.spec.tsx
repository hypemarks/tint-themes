import { render } from '@testing-library/react';
import React from 'react';
import Navigation from './navigation';

describe('Test <Navigation /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<Navigation onClick={jest.fn} navigationType={'close'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
