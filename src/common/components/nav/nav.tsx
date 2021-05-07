import React, { FC, ReactNode } from 'react';
import { SocialFeedsTypesMap, ISocialFeedsGroupedItem, IQueryParam, Nullable } from '@tintup/tint-sdk';
import './nav.sass';
import { INavSearchProps } from '../nav-search/nav-search';
import { INavListProps } from '../nav-list/nav-list';
import { IAddPostButtonProps } from '../add-post/add-post-button';

interface INavConfig {
  publicPost: boolean;
  waterfallToggle?: Nullable<boolean>;
  bannerHeight?: number;
  handleOnNavItemClick: (payload: IQueryParam) => void;
  navItemColor: string;
  handleOnNavSearch: (payload: IQueryParam) => void;
  navSearchColor: string;
}

interface INavProps {
  navConfig: INavConfig;
  addPostConfig: IAddPostButtonProps;
  socialFeeds: SocialFeedsTypesMap<readonly ISocialFeedsGroupedItem[]>;
  renderAddPost?: (props: IAddPostButtonProps) => ReactNode;
  renderNavSearch?: (props: INavSearchProps) => ReactNode;
  renderNavList?: (props: INavListProps) => ReactNode;
}

const Nav: FC<INavProps> = ({
  navConfig,
  addPostConfig,
  socialFeeds,
  renderAddPost,
  renderNavSearch,
  renderNavList,
}) => {
  const { bannerHeight = 5, handleOnNavItemClick, navItemColor, handleOnNavSearch, navSearchColor } = navConfig;

  const shouldRenderNav = renderAddPost || renderNavSearch || renderNavList;

  return shouldRenderNav ? (
    <div className='nav' style={{ marginTop: bannerHeight }}>
      {renderAddPost && <div className='nav__add-post'>{renderAddPost(addPostConfig)}</div>}
      <div className='nav__list'>
        {renderNavList &&
          renderNavList({
            socialFeeds,
            handleOnNavItemClick,
            navItemColor,
          })}
        {renderNavSearch &&
          renderNavSearch({
            navSearchColor,
            handleOnNavSearch,
          })}
      </div>
    </div>
  ) : null;
};

export default Nav;
