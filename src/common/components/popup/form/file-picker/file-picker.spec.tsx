import { render } from '@testing-library/react';
import React from 'react';
import FilePicker from './file-picker';

describe('Test <FilePicker /> Component', () => {
  it('should render snapshot', () => {
    const wrapper = render(
      <FilePicker values={['value']} id={'id'} onChange={jest.fn} name={'name'} onClick={jest.fn} />
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
