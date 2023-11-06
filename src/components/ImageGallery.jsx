import React, { useState } from "react";
import ImageSlider from "./ImageSlider";
import { BsFillImageFill } from "react-icons/bs";

import "./styles/ImageGallery.css";

const ImageGallery = ({
  selectedImage,
  setSelectedImage,
  imageList,
  setImageList,
}) => {
  console.log(selectedImage);
  console.log(imageList);
  const [openSlider, setOpenSlider] = useState(false);
  const [sliderImage, setSliderImage] = useState(null);

  const handleImageClick = (event, selectedImageId) => {
    if (selectedImage.includes(selectedImageId)) {
      setSelectedImage(selectedImage.filter((id) => id != selectedImageId));
    } else {
      setSelectedImage((prevSelect) => {
        return [...prevSelect, selectedImageId];
      });
    }
  };

  const sliderStyle = {
    display: openSlider ? "none" : "",
  };

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
      <div className="gallery">
        {imageList.map(({ id, name, url }, index) => {
          // const fileName = image.img.split("/")[-1];
          return (
            <div
              className="img-container"
              key={index}
              onClick={(event) => {
                if (!event.target.classList.contains("selectImage")) {
                  setSliderImage(index);
                  setOpenSlider(true);
                }
              }}
            >
              <img src={`${url}`} alt={name} />
              <div
                className={`overlay ${
                  selectedImage.includes(id)
                    ? "img-selected__overlay-opacity"
                    : null
                }`}
              >
                <input
                  type="checkbox"
                  className={`selectImage ${
                    selectedImage.includes(id)
                      ? "img-selected__input-visibility"
                      : null
                  }`}
                  name="selectedFiles"
                  onChange={(event) => handleImageClick(event, id)}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                />
              </div>
            </div>
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
    </>
  );
};

export default ImageGallery;
