import React, { FC } from 'react';
import './click-for-more.sass';
import Button from '../button/button';
interface IClickForMoreProps {
  fetchNextPage: () => void;
  onNewContent?: () => void;
}

const ClickForMore: FC<IClickForMoreProps> = ({ onNewContent, fetchNextPage }) => {
  const handleOnClick = () => {
    if (onNewContent) {
      onNewContent();
    }
    fetchNextPage();
  };

  return (
    <Button onClick={handleOnClick} className='click-for-more' data-testid='click-for-more'>
      click for more
    </Button>
  );
};

export default ClickForMore;
