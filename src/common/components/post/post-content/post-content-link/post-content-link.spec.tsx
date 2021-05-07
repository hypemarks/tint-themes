import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import PostContentLink from './post-content-link';

const onClick = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test <PostContentLink /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<PostContentLink isButton={true} onClick={onClick} href='somesortofstring' />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should render div with role button then fire onClick', () => {
    const wrapper = render(<PostContentLink isButton={true} onClick={onClick} href='somesortofstring' />);
    const postContentLink = wrapper.getByTestId('post-content-link-button');
    const postContentLinkByRole = wrapper.getByRole('button');
    fireEvent.click(postContentLink);
    expect(postContentLinkByRole).toBeInTheDocument();
    expect(onClick).toBeCalled();
  });

  it('should render anchor tag with specific href', () => {
    const wrapper = render(<PostContentLink isButton={false} onClick={onClick} href='somesortofstring' />);
    const postContentLinkAnchor = wrapper.getByTestId('post-content-link-anchor');
    expect(postContentLinkAnchor).toBeInTheDocument();
    expect(postContentLinkAnchor).toHaveAttribute('href', 'somesortofstring');
  });

  it('should render anchor tag with specific href and not fire onClick', () => {
    const wrapper = render(<PostContentLink isButton={false} onClick={onClick} href='somesortofstring' />);
    const postContentLinkAnchor = wrapper.getByTestId('post-content-link-anchor');
    fireEvent.click(postContentLinkAnchor);
    expect(onClick).not.toBeCalled();
  });
});
