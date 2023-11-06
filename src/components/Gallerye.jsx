import React, { useState } from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

const BasicLayout = (props) => {
  const {
    className = "layout",
    items = 20,
    rowHeight = 30,
    onLayoutChange = () => {},
    cols = 12,
  } = props;

  const generateDOM = () => {
    return _.map(_.range(items), (i) => (
      <div key={i}>
        <span className="text">{i}</span>
      </div>
    ));
  };

  const generateLayout = () => {
    return _.map(new Array(items), (item, i) => {
      const y = _.result(props, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
      };
    });
  };

  const [layout, setLayout] = useState(generateLayout());

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={handleLayoutChange}
      {...props}
    >
      {generateDOM()}
    </ReactGridLayout>
  );
};

export default BasicLayout;
