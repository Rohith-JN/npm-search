import React, { FC } from 'react';
import styles from '../styles/Error.module.scss';

interface ErrorProps {
  errorCode: number;
  errorMessage: string;
}

const Error: FC<ErrorProps> = ({ errorCode, errorMessage }) => {
  return (
    <main className="container">
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>4</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <span className={styles.particle}>0</span>
      <article className={styles.content}>
        <p>
          <strong>Error ({errorCode})</strong>
        </p>
        <p>{errorMessage}</p>
      </article>
    </main>
  );
}

export default Error;
