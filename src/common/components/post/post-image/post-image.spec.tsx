import React from 'react';
import { render } from '@testing-library/react';
import { buildPost } from '../../../../../test/generate';
import '../../../../../test/intersectionObserverMock';
import { IPostWithCTA } from '../../../../types/Post';
import PostImage from './post-image';

describe('Test <PostImage /> Component', () => {
  const post = buildPost({
    cta: [],
    attributes: {
      imageUrl: 'image_url',
    },
  });

  it('should match snapshot', () => {
    const wrapper = render(<PostImage post={post as IPostWithCTA} onClick={jest.fn} onCtaClick={jest.fn} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
