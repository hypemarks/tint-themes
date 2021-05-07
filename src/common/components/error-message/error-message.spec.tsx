import { render } from '@testing-library/react';
import React from 'react';
import ErrorMessage from './error-message';

describe('Test <ErrorMessage /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<ErrorMessage />);
    const errorMessage = wrapper.queryByTestId('error-message');
    expect(errorMessage).toHaveTextContent('Something went wrong. Please contact support.');
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
