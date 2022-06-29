import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import styles from '../styles/Loader.module.css';

const Loader = () => {
  const { theme, setTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(theme === 'light' ? true : false);
  return (
    <div className='h-screen w-full dark:bg-gray-900 bg-white'>
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
              stroke: darkMode ? 'black' : 'white',
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
    </div>
  );
}

export default Loader;
