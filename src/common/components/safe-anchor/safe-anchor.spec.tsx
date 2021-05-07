import { render } from '@testing-library/react';
import React from 'react';
import SafeAnchor from './safe-anchor';

describe('Test <SafeAnchor /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<SafeAnchor className={'className'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
