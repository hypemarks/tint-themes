import { render } from '@testing-library/react';
import React from 'react';
import Label from './label';

describe('Test <Label /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<Label id={'id'} label={'label'} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
