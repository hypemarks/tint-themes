import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Pagination from './pagination';

const onNewContent = jest.fn();

describe('Test <Pagination /> Component', () => {
  it('should render snapshot', () => {
    const fetchPrevPage = jest.fn();
    const fetchNextPage = jest.fn();

    const wrapper = render(
      <Pagination onNewContent={onNewContent} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should call prev page', () => {
    const fetchPrevPage = jest.fn();
    const fetchNextPage = jest.fn();
    const wrapper = render(
      <Pagination onNewContent={onNewContent} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
    );
    const paginationFirstButton = wrapper.getByText('Prev');
    fireEvent.click(paginationFirstButton);
    expect(fetchPrevPage).toBeCalled();
  });

  it('should call next page', () => {
    const fetchPrevPage = jest.fn();
    const fetchNextPage = jest.fn();
    const wrapper = render(
      <Pagination onNewContent={onNewContent} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
    );
    const paginationNextButton = wrapper.getByText('Next');
    fireEvent.click(paginationNextButton);
    expect(fetchNextPage).toBeCalled();
  });
});
