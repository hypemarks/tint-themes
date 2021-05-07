import { useCallback, useEffect } from 'react';
import { Nullable } from '@tintup/tint-sdk';

interface IKeyAction {
  keyName: string;
  keyAction: () => void;
}

const useListenKeys = (keyActionList: readonly IKeyAction[], isWaterfall?: Nullable<boolean>): void => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const handleKeys = (keyboardEvent: KeyboardEvent): void => {
        const pressedKeys = keyActionList.find(e => e.keyName === keyboardEvent.code);
        if (pressedKeys) {
          pressedKeys.keyAction();
        }
      };
      handleKeys(event);
    },
    [keyActionList]
  );

  useEffect(() => {
    if (!isWaterfall) {
      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }
    return;
  }, [onKeyDown, isWaterfall]);
};

export default useListenKeys;
