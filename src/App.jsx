import './App.css';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');

  return (
    <div className="App">
      <Navbar setInput={setInput} />
      <div className="sections">
        {input ? (
          <Main input={input} />
        ) : (
          <h1
            style={{
              color: 'black',
              position: 'absolute',
              top: '46%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Search for a NPM package
          </h1>
        )}
      </div>
    </div>
  );
}

export default App;
