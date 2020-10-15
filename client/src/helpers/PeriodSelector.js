import React, { useEffect, useState } from 'react';
import { PERIODS } from './periods';
import M from 'materialize-css';
import css from '../app.module.css'

export default function periodSelector({ selectedPeriod, onChangePeriod }) {
  //M.AutoInit();
  function makeSelect(currentPeriod) {
    if (currentPeriod !== []) {
      return (<div className='container' id='.selectDiv'>
        <select onChange={handleSelectChange} className="browser-default" >
          {PERIODS.map((period) => {
            if (period === selectedPeriod) {
              return <option value={period} key={period} selected>{period}</option>
            } else
              return <option value={period} key={period}>{period}</option>
          })}
        </select>
      </div>);
    } else return;
  }

  const handleSelectChange = (event) => {
    onChangePeriod(event.target.value);
  };

  return (<div>{makeSelect()}</div>)
}
const styles = {
  select: {
    minWidth: "auto",
    maxWidth: "300px",
    height: "35px",
    marginRight: "15px",
    marginLeft: "15px",
  }
}