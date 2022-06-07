import React, { useRef, FC } from 'react';
import Head from 'next/head'
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import copy from "copy-to-clipboard"
import search from '../assets/search.svg';

interface HomeProps {
  setInput: any;
}

const Home: FC<HomeProps> = ({ setInput }) => {
  const button = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLDivElement>(null);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputRef.current!.value) {
      setInput(inputRef.current!.value);
      inputRef.current!.value = '';
    }
  };

  const handleCopyText = () => {
    copy(text.current!.innerText);
    button.current!.innerText = 'Copied';
    button.current!.style.backgroundColor = 'lightgreen';
    navigator.clipboard.writeText(text.current!.innerText);
    setTimeout(() => {
      button.current!.style.backgroundColor = 'white';
      button.current!.innerText = 'Copy';
    }, 1500);
  }

  return (
    <div className={styles.Home} id="Home">
      <Head>
        <title>npm_search | Home</title>
      </Head>
      <div className={styles.left}>
        <h1 className={styles.heading}>NPM package statistics</h1>
        <p>
          Search and view package stats to find the right one for your project
        </p>
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
        <p className={styles.Examples}>
          Examples: react, angular, vue, svelte, nodemon
        </p>
        <p className={styles.disclaimer}>The npm package download data comes from npm&#39;s download counts api and package details come from npms.io.</p>
      </div>
      <div className={styles.right}>
        <div className={styles.summary} id="summary">
          <div className={styles.row_1}>
            <h1>react</h1>
            <p>v18.1.0</p>
          </div>
          <p className={styles.description}>
            React is a JavaScript library for building user interfaces.{' '}
          </p>
          <div className={styles.row_2}>
            <p>MIT</p>
            <div className={styles.line}></div>
            <a href="https://www.npmjs.com/package/react">
              <p>NPM</p>
            </a>
            <div className={styles.line}></div>
            <a href="https://github.com/facebook/react">
              <p>Github</p>
            </a>
          </div>
          <p className={styles.downloads}>Total downloads: 671,939,803</p>
          <div className={styles.codeBlock}>
            <pre>
              <code className={styles.lang_json} id="text" ref={text}>
                npm install react
              </code>
            </pre>
            <button className={styles.copy} onClick={handleCopyText} ref={button}>
              Copy
            </button>
          </div>
          <p className={styles.keywords}>Keywords: react</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
