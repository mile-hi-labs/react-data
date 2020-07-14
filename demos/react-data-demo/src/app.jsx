import React from 'react';
import logo from 'logo.svg';
import ReactData from 'react-data';

const App = (props) => {
  const {} = props;

  // Render
  return (
    <div className='App'>
      <header className='App-header'>
        <ReactData
          width={200}
          height={200}
          bgColor='#f4f5f7'>
          <h1>Testing</h1>
        </ReactData>
      </header>
    </div>
  );
}

export default App;
