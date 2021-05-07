import { render } from '@testing-library/react';
import React from 'react';
import Banner from './banner';

describe('Test <Banner /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<Banner banner={{ url: 'banner-url', height: 100 }} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
