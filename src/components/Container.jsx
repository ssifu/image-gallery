import React, { useState } from "react";

import ImageGallery from "./ImageGallery";
import "./styles/Container.css";
import images from "../data.js";

const Container = () => {
  const [imageList, setImageList] = useState(images);
  const [selectedImage, setSelectedImage] = useState([]);

  const handleImageDelete = () => {
    if (selectedImage.length > 0) {
      setImageList((prevList) => {
        return prevList.filter((image) => {
          if (!selectedImage.includes(image.id)) {
            return image;
          }
        });
      });
    }
  };

  const makeImageFeatured = () => {
    setImageList((prevList) => {
      const element = prevList.find((image) => image.id === selectedImage[0]);
      prevList.splice(element.id - 1, 1);
      prevList.unshift(element);
      return [...prevList];
    });
    setSelectedImage((prev) => {
      return [];
    });
  };

  return (
    <div className="container">
      <div className="upper">
        <div className="file-numbers">
          {selectedImage.length > 0 ? (
            <>
              <input type="checkbox" name="fileNumbers" defaultChecked />
              <label>{selectedImage.length} Files Selected</label>
            </>
          ) : null}
        </div>
        {selectedImage.length === 1 && (
          <button className="button make-feature" onClick={makeImageFeatured}>
            Make image featured
          </button>
        )}
        <button
          className={`button delete-button`}
          style={{
            visibility: selectedImage.length > 0 ? "visible" : "hidden",
          }}
          onClick={handleImageDelete}
        >
          Delete Files
        </button>
      </div>
      <hr />
      <ImageGallery
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        imageList={imageList}
        setImageList={setImageList}
      />
    </div>
  );
};

export default Container;
