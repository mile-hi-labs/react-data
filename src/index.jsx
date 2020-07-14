// import { storeProvider, withStore } from './contexts/store.jsx';

// export {
// 	storeProvider,
// 	withStore
// }

import React from "react";

const MyBoxComponent = (props) => {
  const { width, height, bgColor, color, children } = props;

  // Render
  return (
    <div style={{
      width: width || 200,
      height: height || 200,
      backgroundColor: bgColor || "green",
			color: color || "black"
    }}>
      {children}
    </div>
  );
};

export default MyBoxComponent;