import FalconLightBox from 'components/common/FalconLightBox';
import React from 'react';
import { Image } from 'react-bootstrap';

const ProductSingleImage = ({ id, image, name }) => {
  return (
    <FalconLightBox image={image} key={id}>
      <Image
        rounded
        src={image}
        className='w-100 fit-cover'
        height={200}
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
