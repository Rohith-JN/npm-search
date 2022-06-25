import './App.css';
import Main from './components/MainPage/Main';
import Home from './components/HomePage/Home';
import SideBar from './components/SideBar/SideBar';
import { useState, useEffect } from 'react';
import FAQ from './components/FAQ/FAQ';

function App() {
  const [input, setInput] = useState(
    sessionStorage.getItem('input') ? sessionStorage.getItem('input') : ''
  );

  useEffect(() => {
    if (sessionStorage.getItem('input')) {
      setInput(sessionStorage.getItem('input'));
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('input', input);
  }, [input]);

  return (
    <div className="App">
      <SideBar />
      <div className="sections">
        {input ? (
          <Main input={input} />
        ) : (
          <Home setInput={setInput} />
        )}
      </div>
    </div>
  );
}

export default App;
