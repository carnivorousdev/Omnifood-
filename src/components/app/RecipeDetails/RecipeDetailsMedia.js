import React, { memo } from 'react';
import { Badge, Image } from 'react-bootstrap';
import Slider from 'react-slick';

const sliderSettings = {
  slidesToShow: 1,
  lazyLoad: 'ondemand',
};

const RecipeDetailsMedia = ({ CreatedRecipe: {
  strRecipesImages,
  mealType
} }) => {

  return (
    <div className="position-relative h-sm-100 overflow-hidden">
      {strRecipesImages.length === 1 && (
        <Image
          className="fit-cover w-100 rounded"
          src={strRecipesImages[0].preview}
          alt={strRecipesImages[0].path}
          height={350}
        />
      )}
      {strRecipesImages.length > 1 && (
        <>
          <div className="image-carousel">
            <Slider
              {...sliderSettings}
              className="slick-slider-arrow-inner h-100 full-height-slider"
            >
              {strRecipesImages.map(img => (
                <Image
                  className="fit-cover w-sm-100 rounded"
                  src={img.preview}
                  alt={img.path}
                  key={img.path}
                  height={350}
                />
              ))}
            </Slider>
          </div>
        </>
      )}
      <Badge
        pill
        bg={mealType == 'Veg' ? "success" : "danger"}
        className="position-absolute top-0 end-0 me-2 mt-3 fs--2 z-index-2"
      >
        {mealType}
      </Badge>
    </div>
  );
};



export default memo(RecipeDetailsMedia);
