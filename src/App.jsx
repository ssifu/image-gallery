import { useState } from "react";
import Container from "./components/Container";
import ImageSlider from "./components/ImageSlider";

import images from "./data.js";

function App() {
  const [imageList, setImageList] = useState(images);
  return (
    <>
      <Container />
    </>
  );
}

export default App;
