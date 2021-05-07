import { render } from '@testing-library/react';
import React from 'react';
import { buildPost } from '../../../../../../test/generate';
import PopupPostTime from './popup-post-time';

describe('Test <PopupPostImage /> Component', () => {
  const post = buildPost({ attributes: { published_at: null } });

  it('should render snapshot', () => {
    const wrapper = render(<PopupPostTime publishedAt={post.attributes.published_at} url={'url'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should render the component with correct time', () => {
    const date = Date().toString();
    const post = buildPost({
      attributes: {
        published_at: date,
      },
    });

    const wrapper = render(<PopupPostTime publishedAt={post.attributes.published_at} url={'url'} />);
    const time = wrapper.queryByTitle(date);
    expect(time).toBeInTheDocument();
  });
});
