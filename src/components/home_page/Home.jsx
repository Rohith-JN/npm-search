import React, { useRef } from 'react';
import './home.scss';
import search from '../../assets/search.svg';

function Home({ setInput }) {
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      setInput(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  const changeColor = (e) => {
    const button = document.querySelector('.copy');
    button.style.backgroundColor = 'lightgreen';
    button.innerHTML = 'Copied';
    const text = document.querySelector('#text');
    navigator.clipboard.writeText(text.innerHTML);
    setTimeout(() => {
      button.style.backgroundColor = 'white';
      button.innerHTML = 'Copy';
    }, 1500);
  };

  return (
    <div className="Home" id="Home">
      <div className="left">
        <h1 className="heading">NPM package statistics</h1>
        <p>
          Search and view package stats to find the right one for your project
        </p>
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
        <p className="Examples">
          Examples: react, node, angular, vue, svelte, nodemon
        </p>
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
              <code className="lang-json" id="text">
                npm install react
              </code>
            </pre>
            <button className="copy" onClick={changeColor}>
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
