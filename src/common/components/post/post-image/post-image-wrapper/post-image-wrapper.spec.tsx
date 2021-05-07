import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import PostImageWrapper from './post-image-wrapper';

const onClick = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Test <PostImageWrapper /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<PostImageWrapper onClick={onClick} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should render anchor tag with specific href', () => {
    const wrapper = render(<PostImageWrapper href={'somesortofstring'} />);
    const postContentLinkAnchor = wrapper.getByTestId('post-image-wrapper-anchor');
    expect(postContentLinkAnchor).toBeInTheDocument();
    expect(postContentLinkAnchor).toHaveAttribute('href', 'somesortofstring');
  });

  it('should render anchor tag with specific href and not fire onClick', () => {
    const wrapper = render(<PostImageWrapper onClick={onClick} />);
    const postContentLinkAnchor = wrapper.getByTestId('post-image-wrapper-anchor');
    fireEvent.click(postContentLinkAnchor);
    expect(onClick).not.toBeCalled();
  });

  it('should render div as button with specific text content', () => {
    const someSortOfText = 'textttt';
    const wrapper = render(
      <PostImageWrapper onClick={onClick} src={'http://www.tintup.com'}>
        {someSortOfText}
      </PostImageWrapper>
    );
    const postImageWrapperButton = wrapper.getByTestId('post-source-icon-image-wrapper-button');
    expect(postImageWrapperButton).toHaveTextContent(someSortOfText);
  });
});
