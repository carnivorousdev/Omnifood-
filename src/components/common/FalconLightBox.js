import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const FalconLightBox = ({ image, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        {children}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={image}
          onCloseRequest={() => setIsOpen(false)}
          reactModalStyle={{ overlay: { zIndex: 999999 } }}
        />
      )}
    </>
  );
};

export default FalconLightBox;
