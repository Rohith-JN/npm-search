import './App.css';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="sections">
        <Main />
      </div>
    </div>
  );
}

export default App;
