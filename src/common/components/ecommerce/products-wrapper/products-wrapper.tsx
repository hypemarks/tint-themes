import React from 'react';
import './products-wrapper.sass';
import ProductList, { IProductListConfig } from '../product-list/product-list';
import { IProductItem } from '@tintup/tint-sdk/lib';

interface IProductsWrapper {
  productList: ReadonlyArray<IProductItem>;
  config: IProductListConfig;
}

const ProductsWrapper: React.FC<IProductsWrapper> = ({ productList, config }) => {
  return (
    <>
      <header className='products-wrapper-header'>
        <span style={{ fontSize: `${config.productListHeaderFontSize}px`, color: `${config.productListHeaderColor}` }}>
          {config.productListHeaderText}
        </span>
        <span style={{ fontSize: `${config.productListHeaderFontSize}px`, color: `${config.productListHeaderColor}` }}>
          ({productList.length} items)
        </span>
      </header>
      <div className='popup-product-list'>
        <div className='products-wrapper'>
          {productList.length !== 0 && <ProductList config={config} productList={productList} />}
        </div>
      </div>
    </>
  );
};

export default ProductsWrapper;
