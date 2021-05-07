import { render } from '@testing-library/react';
import React from 'react';
import NoPostCard from './no-post-card';

describe('Test <NoPostCard /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<NoPostCard />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
