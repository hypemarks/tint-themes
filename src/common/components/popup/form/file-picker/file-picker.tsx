import React, { ChangeEvent, FC, useCallback, useMemo } from 'react';
import './file-picker.sass';
interface IFilePickerProps {
  values: readonly string[];
  name: string;
  id: string;
  className?: string;
  onClick: (name: string) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const FilePicker: FC<IFilePickerProps> = ({ children, onClick, values, label, name, id, onChange, className }) => {
  const memoizedOnClick = useCallback(() => {
    onClick(name);
  }, [onClick, name]);

  const memoizedCustomStyles = useMemo(() => {
    const computeCustomStyles = () => {
      return values.length > 0 && values[0] !== ''
        ? {
            background: `center / cover no-repeat url(${values[0]})`,
            color: 'transparent',
          }
        : {};
    };

    return computeCustomStyles();
  }, [values]);

  return (
    <>
      <input type='text' id={id} name={name} onChange={onChange} value={values} style={{ display: 'none' }} />
      <button onClick={memoizedOnClick} type='button' style={memoizedCustomStyles} className={className}>
        {children}
        <span className='file-picker__text-label'>{label}</span>
      </button>
    </>
  );
};

export default FilePicker;
