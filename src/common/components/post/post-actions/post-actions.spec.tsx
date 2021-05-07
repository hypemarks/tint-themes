import { render } from '@testing-library/react';
import React from 'react';
import PostActions from './post-actions';
import { buildPost } from '../../../../../test/generate';

describe('Test <PostActions /> Component', () => {
  it('should render snapshot', () => {
    const post = buildPost();
    const wrapper = render(<PostActions externalId={post.attributes.external_id} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
