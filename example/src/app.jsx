import React, { useEffect } from 'react';
import logo from 'logo.svg';
import { AppAdapter } from 'react-data';

const App = (props) => {
  const {} = props;

  useEffect(() => {
    console.log('adapter: ', AppAdapter.baseUrl);
  }, []);


  // Render
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Hello, there.</h1>
      </header>
    </div>
  );
}

export default App;
