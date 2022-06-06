import React, { FC } from 'react';
import './error.scss';

interface ErrorProps {
  errorCode: number;
  errorMessage: string;
}

const Error:FC<ErrorProps> = ({errorCode, errorMessage}) => {
  return (
    <main className="container">
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">4</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <span className="particle">0</span>
      <article className="content">
        <p>
          <strong>Error ({errorCode})</strong>
        </p>
        <p>{errorMessage}</p>
      </article>
    </main>
  );
}

export default Error;
