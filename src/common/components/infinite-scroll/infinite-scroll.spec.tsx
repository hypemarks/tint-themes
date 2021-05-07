import { render } from '@testing-library/react';
import React from 'react';
import InfiniteScroll from './infinite-scroll';

describe('Test <InfiniteScroll /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<InfiniteScroll fetchNextPage={() => new Promise(jest.fn)} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
