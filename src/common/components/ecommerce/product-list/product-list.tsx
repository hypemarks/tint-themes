import React from 'react';
import './product-list.sass';
import { IProductItem } from '@tintup/tint-sdk/lib/';

export interface IProductListConfig {
  productFontSize: number;
  productColor: string;
  productPriceFontSize: number;
  productPriceColor: string;
  productImageBorderColor: string;
  productImageBackground: string;
  productListHeaderText: string;
  productListHeaderFontSize: string;
  productListHeaderColor: string;
}

interface IProductList {
  productList: ReadonlyArray<IProductItem>;
  config: IProductListConfig;
}

const ProductList: React.FC<IProductList> = ({ productList, config }) => {
  const onProductClick = (url: string) => {
    window.open(url, '_blank', 'rel=noopener,rel=noreferrer');
  };

  return (
    <ul className='product-list' data-testid='product-list'>
      {productList.map((product, index) => (
        <li className='product-list__item' key={index}>
          <div className='product-item' onClick={() => product.productUrl && onProductClick(product.productUrl)}>
            <div
              className='product-item__thumb'
              style={{
                borderColor: config.productImageBorderColor,
                backgroundColor: config.productImageBackground,
                backgroundImage: product.productImage ? `url(${product.productImage})` : undefined,
              }}
            />
            <h5
              style={{ fontSize: `${config.productFontSize}px`, color: config.productColor }}
              className='product-item__name'>
              {product.name}
            </h5>
            <span
              className='product-item__price'
              style={{ fontSize: `${config.productPriceFontSize}px`, color: config.productPriceColor }}>
              ${product.price} {product.currency}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
