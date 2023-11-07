import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./styles/ImageSlider.css";

const ImageSlider = ({ imageList, sliderImage }) => {
  console.log(imageList);
  const [currentIndex, setCurrentIndex] = useState(sliderImage);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? imageList.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastImage = currentIndex === imageList.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill
        onClick={goToPrevious}
        className="arrow arrow-left"
      />
      {imageList &&
        imageList.map(({ id, name, url }, index) => {
          return (
            <img
              src={`${url}`}
              key={index}
              alt={name}
              className={
                currentIndex === index ? "slide" : "slide slide-hidden"
              }
            />
          );
        })}
      <BsArrowRightCircleFill
        onClick={goToNext}
        className="arrow arrow-right"
      />
    </div>
  );
};

export default ImageSlider;
