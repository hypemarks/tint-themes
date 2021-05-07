import { render } from '@testing-library/react';
import React from 'react';
import Share from './share';

describe('Test <Share /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<Share image={''} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
