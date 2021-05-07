import { render } from '@testing-library/react';
import React from 'react';
import SourceIcon from './source-icon';

describe('Test <Icon /> Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(<SourceIcon type={'tiktok'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('should create source icon with correct classes', () => {
    const wrapper = render(<SourceIcon type={'tiktok'} isNavItem={true} />);
    const icon = wrapper.queryByTestId('source-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('source-icon--nav-item');
  });
});
