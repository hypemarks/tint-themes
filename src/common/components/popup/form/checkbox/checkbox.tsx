import React, { ChangeEvent, FC, FocusEvent } from 'react';

interface ICheckboxProps {
  value: boolean;
  placeholder: string;
  name: string;
  id: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: FC<ICheckboxProps> = ({ value, placeholder, name, id, type, onChange, onBlur, className }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      checked={value}
      onBlur={onBlur}
    />
  );
};

export default Checkbox;
