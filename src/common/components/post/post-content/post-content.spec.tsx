import React from 'react';
import { render } from '@testing-library/react';
import PostContent from './post-content';

describe('Test <PostContent /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<PostContent text={'text'} url={'url'} onClick={jest.fn} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
