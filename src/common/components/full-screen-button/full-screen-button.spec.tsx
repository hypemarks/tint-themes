import { render } from '@testing-library/react';
import React from 'react';
import { FullScreenButton } from './full-screen-button';

describe('Test <FullScreenButton /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<FullScreenButton />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
