import React, { useRef, FC } from 'react';
import './navbar.scss';
import logo from '../../assets/logo.png';
import search from '../../assets/search.svg';
import { BsGithub } from 'react-icons/bs';

interface NavbarProps {
  setInput: any
}

const Navbar: FC<NavbarProps> = ({ setInput }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputRef.current!.value) {
      setInput(inputRef.current!.value);
      inputRef.current!.value = '';
    }
  };

  return (
    <div className="Navbar" id="Navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="line"></div>
      <form onSubmit={submitHandler}>
        <div className="search">
          <img src={search} alt="search" onClick={submitHandler} />
          <input
            placeholder={'Search for a NPM package'}
            name="name"
            type="text"
            ref={inputRef}
            autoComplete="off"
            id="name"
            spellCheck="false"
          ></input>
        </div>
      </form>
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
