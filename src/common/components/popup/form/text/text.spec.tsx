import { render } from '@testing-library/react';
import React from 'react';
import Text from './text';

describe('Test <Text /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <Text value={'value'} name={'name'} onChange={jest.fn} id={'id'} onBlur={jest.fn} type={'type'} />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
