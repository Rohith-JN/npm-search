import React, { FC } from 'react';
import '../Styles/PackageInfo.scss';

interface PackageInfoProps {
  stars: number;
  forks: number;
  issues: number;
  contributors: number;
  maintainers: number;
}

const PackageInfo: FC<PackageInfoProps> = ({ stars, forks, issues, contributors, maintainers }) => {

  return (
    <div className="PackageInfo" id="PackageInfo">
      <div className="header"><h1>Package</h1></div>
      <div className="main-row">
        <p>Stars:</p>
        <p className='info'>{stars}</p>
      </div>
      <div className="main-row">
        <p>Forks:</p>
        <p className='info'>{forks}</p>
      </div>
      <div className="main-row">
        <p>Issues:</p>
        <p className='info'>{issues}</p>
      </div>
      <div className="main-row">
        <p>Contributors:</p>
        <p className='info' >{contributors}</p>
      </div>
      <div className="last-row">
        <p>Maintainers:</p>
        <p className='info'>{maintainers}</p>
      </div>
    </div>
  );
}

export default PackageInfo;
