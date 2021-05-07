import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import useListenKeys from '../use-listen-keys';

const TestComponent = ({ fire, isWaterfall }: any) => {
  useListenKeys(
    [
      {
        keyName: 'Enter',
        keyAction: fire,
      },
    ],
    isWaterfall
  );
  return <div data-testid='useKeyDiv' />;
};

describe('Test useListenKeys Hook', () => {
  let container: any = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('Should call the function on keyDown', () => {
    const mockKeyAction = jest.fn();
    const wrapper = render(<TestComponent fire={mockKeyAction} isWaterfall={false} />, container);
    const keysComponent = wrapper.queryByTestId('useKeyDiv');
    keysComponent && fireEvent.keyDown(keysComponent, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
    expect(keysComponent).toBeInTheDocument();
    expect(mockKeyAction).toHaveBeenCalledTimes(1);
  });

  it('Should now call the function on keyDown and waterfall flag on', () => {
    const mockKeyAction = jest.fn();
    const wrapper = render(<TestComponent fire={mockKeyAction} isWaterfall={true} />, container);
    const keysComponent = wrapper.queryByTestId('useKeyDiv');
    keysComponent && fireEvent.keyDown(keysComponent, { key: 'Enter', code: 'Enter', keyCode: 13, charCode: 13 });
    expect(keysComponent).toBeInTheDocument();
    expect(mockKeyAction).toHaveBeenCalledTimes(0);
  });
});
