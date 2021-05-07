import React, { FC } from 'react';
import './no-post-card.sass';

export interface INoPostCardProps {
  text?: string;
}

export const NoPostCard: FC<INoPostCardProps> = ({ text = 'There are no posts here to view yet.' }) => {
  return <div className='no-post-card'>{text}</div>;
};

export default NoPostCard;
