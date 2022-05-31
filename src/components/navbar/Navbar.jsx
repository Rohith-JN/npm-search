import React from 'react';
import './navbar.scss';
import logo from '../../assets/logo.png';
import search from '../../assets/search.svg';
import { BsGithub } from 'react-icons/bs';

function Navbar() {
  return (
    <div className="Navbar" id="Navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="line"></div>
      <div className="search">
        <img src={search} alt="search" />
        <input
          placeholder="Search for a NPM package"
          name="name"
          type="text"
          autoComplete="off"
          id="name"
          spellCheck="false"
        ></input>
      </div>
      <a
        href="https://github.com/Rohith-JN/npm_search"
        title="View project on Github"
      >
        <BsGithub
          style={{
            width: '40px',
            height: 'auto',
          }}
        />
      </a>
    </div>
  );
}

export default Navbar;
