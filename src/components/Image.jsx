import React from "react";
import { useDrag, useDrop } from "react-dnd";

const Image = ({
  id,
  name,
  url,
  index,
  moveImage,
  setSliderImage,
  setOpenSlider,
  selectedImage,
  setSelectedImage,
}) => {
  const [, ref] = useDrag({
    type: "IMAGE",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const handleImageClick = (event, selectedImageId) => {
    if (selectedImage.includes(selectedImageId)) {
      setSelectedImage(selectedImage.filter((id) => id != selectedImageId));
    } else {
      setSelectedImage((prevSelect) => {
        return [...prevSelect, selectedImageId];
      });
    }
  };

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="img-container draggable"
      data-image-id={id}
      onClick={(event) => {
        if (!event.target.classList.contains("selectImage")) {
          setSliderImage(index);
          setOpenSlider(true);
        }
      }}
    >
      <img src={`${url}`} alt={name} draggable={true} />
      <div
        className={`overlay ${
          selectedImage.includes(id) ? "img-selected__overlay-opacity" : ""
        }`}
      >
        <input
          type="checkbox"
          className={`selectImage ${
            selectedImage.includes(id) ? "img-selected__input-visibility" : ""
          }`}
          name="selectedFiles"
          checked={selectedImage.includes(id)}
          onChange={(event) => handleImageClick(event, id)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </div>
    </div>
  );
};

export default Image;
