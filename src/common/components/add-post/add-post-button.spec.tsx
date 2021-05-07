import { render } from '@testing-library/react';
import React from 'react';
import AddPostButton from './add-post-button';

const addPostConfig = {
  addPostText: 'title',
  addPostStyles: {},
  addPost: jest.fn(),
};

describe('Test <AddPost /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <AddPostButton
        text={addPostConfig.addPostText}
        style={addPostConfig.addPostStyles}
        onClick={addPostConfig.addPost}
      />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('should render add-post with text content equal title', () => {
    const wrapper = render(
      <AddPostButton
        text={addPostConfig.addPostText}
        style={addPostConfig.addPostStyles}
        onClick={addPostConfig.addPost}
      />
    );
    const addPost = wrapper.queryByTestId('add-post');
    expect(addPost).toHaveTextContent(addPostConfig.addPostText);
    expect(addPost).toBeInTheDocument();
  });

  it('should render add-post with specific inline style color', () => {
    const btnColor = '#f2f2f2';
    addPostConfig.addPostStyles = {
      color: btnColor,
    };
    const wrapper = render(
      <AddPostButton
        text={addPostConfig.addPostText}
        style={addPostConfig.addPostStyles}
        onClick={addPostConfig.addPost}
      />
    );
    const addPost = wrapper.queryByTestId('add-post');
    expect(addPost).toHaveStyle(`color: ${btnColor}`);
  });

  it('should render add-post with specific inline style background', () => {
    const btnColor = '#f2f2f2';
    addPostConfig.addPostStyles = {
      background: btnColor,
    };
    const wrapper = render(
      <AddPostButton
        text={addPostConfig.addPostText}
        style={addPostConfig.addPostStyles}
        onClick={addPostConfig.addPost}
      />
    );
    const addPost = wrapper.queryByTestId('add-post');
    expect(addPost).toHaveStyle(`background: ${btnColor}`);
  });
});
