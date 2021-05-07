import { render } from '@testing-library/react';
import React from 'react';
import PostAuthor from './post-author';
import { IAuthor } from '@tintup/tint-sdk/lib';

describe('Test <PostAuthor /> Component', () => {
  const author: IAuthor = { image_url: '', username: 'username', name: 'name', url: 'url' };

  it('should render snapshot', () => {
    const wrapper = render(<PostAuthor author={author} showName={true} showUsername={true} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should render author name without username', () => {
    const wrapper = render(<PostAuthor author={author} showName={true} showUsername={false} />);
    const authorName = wrapper.queryByTestId('author-name');
    const authorUserName = wrapper.queryByTestId('author-username');

    expect(authorName).toBeInTheDocument();
    expect(authorUserName).not.toBeInTheDocument();
  });

  it('should render user name without author', () => {
    const wrapper = render(<PostAuthor author={author} showName={false} showUsername={true} />);
    const authorName = wrapper.queryByTestId('author-name');
    const authorUserName = wrapper.queryByTestId('author-username');

    expect(authorName).not.toBeInTheDocument();
    expect(authorUserName).toBeInTheDocument();
  });
});
