import React, { useCallback } from 'react'
import { appConnect } from './store/connects'

import './App.scss'
import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'

const App = () => {
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
        <Journey />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>
    </div>
  )
}
export default appConnect(App)
