import React from 'react';
import './product-marker.sass';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITaggedProduct } from '../../../../types/Product';

interface IProductMarker {
  taggedProduct: ITaggedProduct;
}

const ProductMarker: React.FC<IProductMarker> = ({ taggedProduct }) => {
  return (
    <a
      className='product-marker'
      data-testid='product-marker'
      style={{
        left: `${taggedProduct.x}%`,
        top: `${taggedProduct.y}%`,
        width: `${taggedProduct.width}%`,
        height: `${taggedProduct.height}%`,
      }}
      href={taggedProduct.productUrl ? taggedProduct.productUrl : undefined}
      target='_blank'
      rel='noopener noreferrer'>
      <span className='product-marker__icon'>
        <FontAwesomeIcon icon={faTag} color={'#3b99fc'} size={'2x'} />
      </span>
    </a>
  );
};

export default ProductMarker;
