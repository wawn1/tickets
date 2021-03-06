import React, {useCallback} from "react";
import {appConnect, journeyConnect, cityConnect, departDateConnect, dateSelectConnect, highSpeedConnect} from "./store/connects";

import "./App.scss";
import Header from "../common/Header";
import _CitySelector from "../common/CitySelector";
import _DateSelector from "../common/DateSelector";
import _DepartDate from "./DepartDate";
import _HighSpeed from "./HighSpeed";
import _Journey from "./Journey";
import Submit from "./Submit";

const Journey = journeyConnect(_Journey);
const CitySelector = cityConnect(_CitySelector);
const DepartDate = departDateConnect(_DepartDate);
const DateSelector = dateSelectConnect(_DateSelector);
const HighSpeed = highSpeedConnect(_HighSpeed);

const App = () => {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
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
      <CitySelector />
      <DateSelector />
    </div>
  );
};
export default appConnect(App);
