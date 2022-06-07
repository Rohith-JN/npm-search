import React, { FC } from 'react';
import styles from '../styles/PackageInfo.module.css';

interface PackageInfoProps {
  stars: number;
  forks: number;
  issues: number;
  contributors: number;
  maintainers: number;
}

const PackageInfo: FC<PackageInfoProps> = ({ stars, forks, issues, contributors, maintainers }) => {

  return (
    <div className={styles.PackageInfo} id="PackageInfo">
      <div className={styles.header}><h1>Package</h1></div>
      <div className={styles.main_row}>
        <p>Stars:</p>
        <p className={styles.info}>{stars}</p>
      </div>
      <div className={styles.main_row}>
        <p>Forks:</p>
        <p className={styles.info}>{forks}</p>
      </div>
      <div className={styles.main_row}>
        <p>Issues:</p>
        <p className={styles.info}>{issues}</p>
      </div>
      <div className={styles.main_row}>
        <p>Contributors:</p>
        <p className={styles.info} >{contributors}</p>
      </div>
      <div className={styles.last_row}>
        <p>Maintainers:</p>
        <p className={styles.info}>{maintainers}</p>
      </div>
    </div>
  );
}

export default PackageInfo;
