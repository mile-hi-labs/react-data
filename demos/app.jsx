import React from 'react';
import MyBoxComponent from '../lib/index';

const App = (props) => {

  // Render
  return (
  	<MyBoxComponent width={100} height={100} backgroundColor={'black'}>
  		<h1>It's working!</h1>
		</MyBoxComponent>
  );
};

export default App;