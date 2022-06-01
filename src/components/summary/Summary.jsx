import React from 'react';
import './summary.scss';

function Summary({
  heading,
  version,
  description,
  license,
  npm,
  github,
  downloads,
  keywords,
}) {
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
        <h1>{heading}</h1>
        <p>v{version}</p>
      </div>
      <p className="description">{description}</p>
      <div className="row-2">
        <p>{license}</p>
        <div className="line"></div>
        <a href={npm}>
          <p>NPM</p>
        </a>
        <div className="line"></div>
        <a href={github}>
          <p>Github</p>
        </a>
      </div>
      <p className="downloads">Total downloads: {downloads}</p>
      <div className="codeBlock">
        <pre>
          <code className="lang-json" id="text">
            npm install {heading}
          </code>
        </pre>
        <button className="copy" onClick={changeColor}>
          Copy
        </button>
      </div>
      <p className="keywords">Keywords: {keywords}</p>
    </div>
  );
}

export default Summary;
