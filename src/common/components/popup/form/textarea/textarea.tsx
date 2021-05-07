import React, { ChangeEvent, FC, FocusEvent } from 'react';
import './textarea.sass';

interface ITextAreaProps {
  value: string;
  placeholder?: string;
  name: string;
  id: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea: FC<ITextAreaProps> = ({
  value,
  placeholder = 'Type here...',
  name,
  id,
  onChange,
  onBlur,
  className,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      className={`${className} textarea`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
    />
  );
};

export default TextArea;
