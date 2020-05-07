import React, {useCallback, useEffect} from "react";
import {appConnect, navConnect, detailConnect} from "./store/connects";
import URI from "urijs";
import dayjs from "dayjs";

import "./App.scss";
import _Detail from "../common/Detail";
import Header from "../common/Header";
import _Nav from "../common/Nav";
import Candidate from "./Candidate";
import Schedule from "./Schedule";

const Nav = navConnect(_Nav);
const Detail = detailConnect(_Detail);

const App = ({searchParsed, departDate, trainNumber, setQueries, updateDetailInfo}) => {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    setQueries(queries);
  }, []);

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  useEffect(() => {
    if (!searchParsed) return;

    const url = new URI("/rest/ticket")
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("trainNumber", trainNumber)
      .toString();

    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {
          detail: {departTimeStr, arriveTimeStr, arriveDate, durationStr},
          candidate,
        } = result;

        updateDetailInfo({departTimeStr, arriveTimeStr, arriveDate, durationStr, candidate});
      });
  }, [searchParsed, departDate, trainNumber]);

  if (!searchParsed) {
    return null;
  }

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <Nav />
        <Detail />
      </div>
    </div>
  );
};
export default appConnect(App);
