import React from 'react';
import styles from '../styles/Loader.module.css';

function Loader() {
  return (
    <div className={styles.container}>
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="transparent"
            />
          </filter>
        </defs>
        <circle
          className={styles.spinner}
          style={{
            fill: 'transparent',
            stroke: 'white',
            strokeWidth: '7px',
            strokeLinecap: 'round',
            filter: 'url(#shadow)',
          }}
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  );
}

export default Loader;
