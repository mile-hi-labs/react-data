// import { storeProvider, withStore } from './contexts/store.jsx';

// export {
// 	storeProvider,
// 	withStore
// }

import React from "react";

const MyBoxComponent = (props) => {
  const { width, height, bgColor, content } = props;

  // Render
  return (
    <div style={{
      width: width || 200,
      height: height || 200,
      backgroundColor: bgColor || "green",
			color: color || "black"
    }}>
      {content}
    </div>
  );
};

export default MyBoxComponent;