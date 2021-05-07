import { render } from '@testing-library/react';
import React from 'react';
import { SlideNavigation } from './slide-navigation';

describe('Test <SlideNavigation /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<SlideNavigation onClick={() => {}} isNext={false} />);

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
