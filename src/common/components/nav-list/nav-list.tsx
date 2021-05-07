import React, { FC } from 'react';
import { SocialFeedsTypesMap, ISocialFeedsGroupedItem, IQueryParam } from '@tintup/tint-sdk/lib/';
import NavItem from '../nav-item/nav-item';

export interface INavListProps {
  socialFeeds: SocialFeedsTypesMap<readonly ISocialFeedsGroupedItem[]>;
  handleOnNavItemClick: (payload: IQueryParam) => void;
  navItemColor: string;
}

export const NavList: FC<INavListProps> = ({ socialFeeds, handleOnNavItemClick, navItemColor }) => {
  return (
    <>
      {Object.entries({ home: [], ...socialFeeds }).map(([key, value]) => {
        return (
          <NavItem key={key} navItemColor={navItemColor} name={key} items={value} onClick={handleOnNavItemClick} />
        );
      })}
    </>
  );
};

export default NavList;
