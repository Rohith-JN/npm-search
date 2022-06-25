import './App.css';
import Main from './components/MainPage/Main';
import Home from './components/HomePage/Home';
import SideBar from './components/SideBar/SideBar';
import FAQ from './components/FAQ/FAQ';
import Error from './components/ErrorPage/Error';
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path={`/:input`} element={<Main />} />
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Error/:errorCode/:errorMessage" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
