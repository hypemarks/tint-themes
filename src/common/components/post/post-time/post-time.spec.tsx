import { render } from '@testing-library/react';
import React from 'react';
import PostTime from './post-time';
import { buildPost } from '../../../../../test/generate';

describe('Test <PostTime /> Component', () => {
  it('should render time html', () => {
    const date = Date().toString();
    const post = buildPost({
      attributes: {
        published_at: date,
      },
    });

    const wrapper = render(<PostTime publishedAt={post.attributes.published_at} url={post.attributes.url} />);
    const time = wrapper.queryByTitle(date);
    expect(time).toHaveTextContent('less than a minute ago');
  });

  it('should render time html tag with DE language', () => {
    const date = Date().toString();
    const timeLanguage = 'de';
    const post = buildPost({
      attributes: {
        published_at: date,
      },
    });

    const wrapper = render(
      <PostTime publishedAt={post.attributes.published_at} url={post.attributes.url} timeLanguage={timeLanguage} />
    );
    const time = wrapper.queryByTitle(date);
    expect(time).toHaveTextContent('vor wenigen Sekunden');
  });
});
