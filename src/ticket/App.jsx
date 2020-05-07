import React, {useCallback, useEffect, lazy, Suspense} from "react";
import {appConnect, navConnect, detailConnect, scheduleConnect} from "./store/connects";
import URI from "urijs";
import dayjs from "dayjs";

import "./App.scss";
import _Detail from "../common/Detail";
import Header from "../common/Header";
import _Nav from "../common/Nav";
import Candidate from "./Candidate";

const Nav = navConnect(_Nav);
const Detail = detailConnect(_Detail);

const _Schedule = lazy(() => import("./Schedule"));
const Schedule = scheduleConnect(_Schedule);

const App = ({searchParsed, departDate, trainNumber, showSchedule, setQueries, updateDetailInfo, toggleShowSchedule}) => {
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
        <Detail>
          <span className="left"></span>
          <span className="schedule" onClick={toggleShowSchedule}>
            时刻表
          </span>
          <span className="right"></span>
        </Detail>
      </div>
      {showSchedule && (
        <div className="mask" onClick={toggleShowSchedule}>
          <Suspense fallback={<div>loading</div>}>
            <Schedule />
          </Suspense>
        </div>
      )}
    </div>
  );
};
export default appConnect(App);
