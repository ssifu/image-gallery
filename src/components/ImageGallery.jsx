import React, { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import Image from "./Image";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BsFillImageFill } from "react-icons/bs";

import "./styles/ImageGallery.css";

const ImageGallery = ({
  selectedImage,
  setSelectedImage,
  imageList,
  setImageList,
}) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [sliderImage, setSliderImage] = useState(null);

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const imageName = image.name;
    const imageURL = URL.createObjectURL(image);

    const newImage = {
      id: imageList.length + 1,
      name: imageName,
      url: imageURL,
    };

    setImageList((prevList) => {
      return [...prevList, newImage];
    });
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImageList = [...imageList];
    const [movedImage] = updatedImageList.splice(fromIndex, 1);
    updatedImageList.splice(toIndex, 0, movedImage);
    setImageList((prevList) => {
      return updatedImageList;
    });
  };

  return (
    <>
      {openSlider && (
        <div className={`slider`}>
          <div
            className="slider-overlay"
            onClick={() => {
              setOpenSlider(false);
            }}
          ></div>
          <ImageSlider imageList={imageList} sliderImage={sliderImage} />
        </div>
      )}
      <DndProvider backend={HTML5Backend}>
        <div className="gallery">
          {imageList.map(({ id, name, url }, index) => {
            return (
              <Image
                key={index}
                id={id}
                name={name}
                url={url}
                index={index}
                moveImage={moveImage}
                setSliderImage={setSliderImage}
                setOpenSlider={setOpenSlider}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            );
          })}
          <div className="img-container add-image">
            <input
              id="addImage"
              type="file"
              name="imageFile"
              className="add-image-input"
              accept="image/*"
              onChange={(event) => {
                event.stopPropagation();
                handleImageUpload(event);
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
            <label className="add-image-label" htmlFor="addImage">
              <BsFillImageFill style={{ width: "2rem" }} />
              Add Image
            </label>
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default ImageGallery;
