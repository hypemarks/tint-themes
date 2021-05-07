import { render } from '@testing-library/react';
import React from 'react';
import SlideHover from './slide-hover';

describe('Test <SlideHover /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <SlideHover isMobile={false}>
        <div>content goes here</div>
      </SlideHover>
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
