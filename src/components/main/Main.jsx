import React from 'react';
import './main.scss';
import Summary from '../summary/Summary';
import Package from '../Package_info/Package';

function Main() {
  return (
    <div className="Main" id="Main">
      <div className="row">
        <Summary />
        <Package />
      </div>
    </div>
  );
}

export default Main;
