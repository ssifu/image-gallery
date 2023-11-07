import React, { useState } from "react";
import "./App.css";
import SortableList from "./SortableList";

const initialBlocks = [
  {
    bgColor: "#00a8ff",
    text: "lorem",
  },
  {
    bgColor: "#9c88ff",
    text: "ipsum",
  },
  {
    bgColor: "#fbc531",
    text: "dolor",
  },
  {
    bgColor: "#4cd137",
    text: "sit",
  },
  {
    bgColor: "#487eb0",
    text: "amet",
  },
];

function App() {
  const [blocks, setBlocks] = useState(initialBlocks);

  const handleSwap = (oldIndex, newIndex) => {
    [blocks[oldIndex], blocks[newIndex]] = [blocks[newIndex], blocks[oldIndex]];
    setBlocks([...blocks]);
  };

  return (
    <div className="container">
      <ul className="horizontal-menu sortable">
        <SortableList
          draggableSelector=".dragItem"
          indexAttribute="data-index"
          onSort={handleSwap}
        />
        {({ initSortable }) => (
          <div ref={initSortable}>
            {console.log("running initSortable")}
            {blocks.map(({ bgColor, text }, index) => {
              <li
                className="dragItem"
                data-index={index}
                key={text}
                style={{ backgroundColor: bgColor }}
              >
                {`${text} ${i + 1}`}
              </li>;
            })}
          </div>
        )}
      </ul>
    </div>
  );
}

export default App;
