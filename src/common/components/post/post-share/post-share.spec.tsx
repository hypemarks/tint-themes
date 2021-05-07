import React from 'react';
import { render } from '@testing-library/react';
import PostShare from './post-share';

describe('Test <PostShare /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<PostShare url={'url'} text={'text'} imageUrl={'image_url'} id={'id'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
