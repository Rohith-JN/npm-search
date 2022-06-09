import React, { useRef, FC } from 'react';
import '../Styles/Home.scss';
import search from '../../assets/search.svg';
import copy from "copy-to-clipboard";

interface HomeProps {
  setInput: any;
}

const Home: FC<HomeProps> = ({ setInput }) => {
  const button = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLDivElement>(null);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputRef.current.value) {
      setInput(inputRef.current.value);
      inputRef.current.value = '';
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
    <div className="Home" id="Home">
      <div className="left">
        <h1 className="heading">NPM package statistics</h1>
        <p>
          Search and view package stats to find the right one for your project
        </p>
        <form onSubmit={submitHandler}>
          <div className="search">
            <input
              placeholder={'Search for a NPM package'}
              name="name"
              type="text"
              ref={inputRef}
              autoComplete="off"
              id="name"
              spellCheck="false"
            ></input>
            <img src={search} alt="search" onClick={submitHandler} />
          </div>
        </form>
        <p className="Examples">
          Examples: react, angular, vue, nodemon
        </p>
        <p className='disclaimer'>The npm package download data comes from npm's download counts api and package details come from npms.io.</p>
      </div>
      <div className="right">
        <div className="summary" id="summary">
          <div className="row-1">
            <h1>react</h1>
            <p>v18.1.0</p>
          </div>
          <p className="description">
            React is a JavaScript library for building user interfaces.{' '}
          </p>
          <div className="row-2">
            <p>MIT</p>
            <div className="line"></div>
            <a href="https://www.npmjs.com/package/react">
              <p>NPM</p>
            </a>
            <div className="line"></div>
            <a href="https://github.com/facebook/react">
              <p>Github</p>
            </a>
          </div>
          <p className="downloads">Total downloads: 671,939,803</p>
          <div className="codeBlock">
            <pre>
              <code className="lang-json" id="text" ref={text}>
                npm install react
              </code>
            </pre>
            <button className="copy" onClick={handleCopyText} ref={button}>
              Copy
            </button>
          </div>
          <p className="keywords">Keywords: react</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
