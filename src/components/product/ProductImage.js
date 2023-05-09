import FalconLightBox from 'components/common/FalconLightBox';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductSingleImage = ({ id, image, name }) => {
  return (
    <FalconLightBox image={image} key={id}>
      <LazyLoadImage
        src={image}
        effect='blur'
        className='w-100 fit-cover rounded fluid'
        alt={name}
      />
    </FalconLightBox>
  );
};

const ProductImage = ({ name, id, strMealThumb }) => {
  return (
    <div
      className='position-relative rounded-top overflow-hidden h-sm-100'
    >
      <ProductSingleImage
        id={id}
        image={strMealThumb}
        name={name}
      />
    </div>
  );
};


export default ProductImage;
