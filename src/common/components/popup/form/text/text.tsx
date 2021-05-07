import React, { ChangeEvent, FC, FocusEvent } from 'react';

interface ITextProps {
  value: string;
  placeholder?: string;
  name: string;
  id: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

const Text: FC<ITextProps> = ({ value, placeholder = 'Type here...', name, id, type, onChange, onBlur, className }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className={`${className} text`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
    />
  );
};

export default Text;
