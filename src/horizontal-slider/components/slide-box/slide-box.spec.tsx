import { render } from '@testing-library/react';
import React from 'react';
import SlideBox from './slide-box';

describe('Test <SlideBox /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <SlideBox isVerticalOrientation={true}>
        <div>content goes here</div>
      </SlideBox>
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
