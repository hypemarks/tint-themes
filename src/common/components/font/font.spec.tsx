import { render } from '@testing-library/react';
import React from 'react';
import Font from './font';

describe('Test <Font /> Component', () => {
  it('should render snapshot', () => {
    const fontConfig = {
      fontFamily: 'fontFamily',
    };
    const wrapper = render(<Font fontConfig={fontConfig} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('should render link html tag', () => {
    const fontConfig = {
      fontFamily: 'fontFamily',
    };
    const wrapper = render(<Font fontConfig={fontConfig} />);
    const link = wrapper.queryByTestId('font-link-tag');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      `https://fonts.googleapis.com/css2?family=${fontConfig.fontFamily}:wght@300;400;700&display=swap" rel="stylesheet"`
    );
  });
});
