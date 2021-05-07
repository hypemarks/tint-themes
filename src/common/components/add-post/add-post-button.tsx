import React, { FC } from 'react';
import './add-post-button.sass';
import Button from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';

export interface IAddPostButtonProps {
  text: string;
  style?: { [key: string]: string };
  onClick: () => void;
  handleEnterKey?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const AddPostButton: FC<IAddPostButtonProps> = ({ text, style, onClick, handleEnterKey }) => {
  return (
    <Button onClick={onClick} onKeyPress={handleEnterKey} style={style} className='add-post' data-testid='add-post'>
      <FontAwesomeIcon icon={faPlusSquare} size={'sm'} />
      {text}
    </Button>
  );
};

export default AddPostButton;
