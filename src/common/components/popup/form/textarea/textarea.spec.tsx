import { render } from '@testing-library/react';
import React from 'react';
import TextArea from './textarea';

describe('Test <TextArea /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(<TextArea value={'value'} name={'name'} onChange={jest.fn} id={'id'} onBlur={jest.fn} />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
