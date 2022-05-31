import React from 'react';
import './main.scss';

function Main() {
  return (
    <div className="Main" id="Main">
      <div className="row">
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
            <a href="#">
              <p>NPM</p>
            </a>
            <div className="line"></div>
            <a href="#">
              <p>Github</p>
            </a>
          </div>
          <p className="downloads">Weekly downloads: 14,935,912</p>
          <div className="codeBlock">
            <pre>
              <code class="lang-json">npm install react</code>
            </pre>
          </div>
          <p className="keywords">Keywords: react</p>
        </div>
        <div className="package">
          <h1 className="heading">Package</h1>
          <div className="col-1">
            <div className="row0">
              <p className="word">Versions</p>
              <p>918</p>
            </div>
            <div className="row1">
              <p className="word">Dist-tags</p>
              <p>5</p>
            </div>
            <div className="row2">
              <p className="word">Maintainers</p>
              <p>6</p>
            </div>
          </div>
          <div className="col-2">
            <div className="row3">
              <p className="word">Stars</p>
              <p>188,524</p>
            </div>
            <div className="row4">
              <p className="word">Forks</p>
              <p>38,856</p>
            </div>
            <div className="row5">
              <p className="word">Contributors</p>
              <p>430</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
