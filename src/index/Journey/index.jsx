import React from 'react'

import './index.scss'
import switchSvg from './imgs/switch.svg'
import { journeyConnect } from '../store/connects'

const Journey = ({ from, to, exchangeFromTo, showCitySelector }) => {
  return (
    <div className="journey">
      <div className="journey__station" onClick={() => showCitySelector('left')}>
        <input typf="text" readOnly name="from" value={from} className="journey__station--from" />
      </div>
      <div className="journey__switch" onClick={exchangeFromTo}>
        <img src={switchSvg} width="70" height="40" alt="switchSvg" />
      </div>
      <div className="journey__station" onClick={() => showCitySelector('right')}>
        <input typf="text" readOnly name="to" value={to} className="journey__station--to" />
      </div>
    </div>
  )
}
export default journeyConnect(Journey)
