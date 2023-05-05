import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Slider from 'react-slick';
const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  fade: true,
  slidesToScroll: 1,
};

const RecipeDetailsMedia = ({ CreatedRecipe: {
  strRecipesImages,
  mealType
} }) => {
  let slider1;
  let slider2;
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  return (
    <div className="position-relative h-sm-100 overflow-hidden">
      {strRecipesImages.length === 1 && (
        <img
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
              asNavFor={nav2}
              ref={slider => (slider1 = slider)}
              className="slick-slider-arrow-inner h-100 full-height-slider"
            >
              {strRecipesImages.map(img => (
                <img
                  className="fit-cover w-sm-100 rounded"
                  src={img.preview}
                  alt={img.path}
                  key={img.path}
                  height={350}
                />
              ))}
            </Slider>
            <Slider
              slidesToShow={strRecipesImages.length > 4 ? 5 : strRecipesImages.length}
              asNavFor={nav1}
              ref={slider => (slider2 = slider)}
              swipeToSlide={true}
              focusOnSelect={true}
              centerMode={true}
              arrows={false}
              className="slick-slider-arrow-inner mt-3"
            >
              {strRecipesImages.map(img => (
                <div className="px-1 outline-none" key={img.path}>
                  <img
                    className="cursor-pointer fit-cover w-100 rounded"
                    src={img.preview}
                    alt={img.path}
                    height={60}
                  />
                </div>
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



export default RecipeDetailsMedia;
