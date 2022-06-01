import React from 'react';
import './summary.scss';

function Summary() {
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
    <div className="summary" id="summary">
      <div className="row-1">
        <h1>react</h1>
        <p>v18.1.0</p>
      </div>
      <p className="description">
        React is a JavaScript library for building user interfaces.
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
      <p className="downloads">Weekly downloads: 14,935,912</p>
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
  );
}

export default Summary;
