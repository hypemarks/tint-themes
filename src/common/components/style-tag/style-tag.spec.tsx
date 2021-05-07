import { render } from '@testing-library/react';
import React from 'react';
import Style from './style-tag';

describe('Test <Style /> Component', () => {
  it('should render snapshot', () => {
    const customCss = '.post{background:red;}';
    const wrapper = render(<Style customCSS={customCss} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
  it('should render style html tag', () => {
    const customCss = '.post{background:red;}';
    const wrapper = render(<Style customCSS={customCss} />);
    const style = wrapper.queryByTestId('style-tag');
    expect(style).toBeInTheDocument();
    expect(style).toHaveTextContent(customCss);
  });

  it('should not render style html tag', () => {
    const wrapper = render(<Style />);
    const style = wrapper.queryByTestId('style-tag');
    expect(style).not.toBeInTheDocument();
  });
});
