import React, { useRef, FC } from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import search from '../assets/search.svg';
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
    <div className={styles.Navbar} id="Navbar">
      <form onSubmit={submitHandler}>
        <div className={styles.search}>
          <input
            placeholder={'Search for a NPM package'}
            name="name"
            type="text"
            ref={inputRef}
            autoComplete="off"
            id="name"
            spellCheck="false"
          ></input>
          <Image src={search} alt="search" onClick={submitHandler} width={30} height={30} style={{
            filter: "invert(36%) sepia(2%) saturate(1097%) hue-rotate(173deg) brightness(100%) contrast(85%)",
            marginLeft: "10px",
            cursor: "pointer",
          }} />
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
