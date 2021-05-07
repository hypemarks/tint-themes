import { render } from '@testing-library/react';
import React from 'react';
import Error from './error';

describe('Test <Error /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<Error show={true} message={'ERROR'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
