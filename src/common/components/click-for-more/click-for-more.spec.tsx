import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ClickForMore from './click-for-more';

const onNewContent = jest.fn();
const fetchNextPage = jest.fn();

describe('Test <ClickForMore /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<ClickForMore onNewContent={onNewContent} fetchNextPage={fetchNextPage} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('should render ClickForMore component', () => {
    const wrapper = render(<ClickForMore onNewContent={onNewContent} fetchNextPage={fetchNextPage} />);
    const clickForMore = wrapper.queryByTestId('click-for-more');
    expect(clickForMore).toBeInTheDocument();
    expect(clickForMore).toHaveTextContent('click for more');
  });

  it('should fire handleOnClick', () => {
    const wrapper = render(<ClickForMore onNewContent={onNewContent} fetchNextPage={fetchNextPage} />);
    const clickForMore = wrapper.getByText('click for more');
    fireEvent.click(clickForMore);
    expect(onNewContent).toBeCalled();
  });
});
