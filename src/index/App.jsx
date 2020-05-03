import React, { useCallback } from 'react'
import { appConnect } from './store/connects'

import './App.scss'
import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

const App = props => {
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <Journey />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  )
}
export default appConnect(App)
