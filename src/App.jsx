import './App.css';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('react');

  return (
    <div className="App">
      <Navbar setInput={setInput} />
      <div className="sections">
        <Main input={input} />
      </div>
    </div>
  );
}

export default App;
