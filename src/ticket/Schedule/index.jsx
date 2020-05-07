import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import URI from "urijs";
import dayjs from "dayjs";
import leftPad from "left-pad";

import "./index.scss";
import {parseData} from "./parseData";

const ScheduleRow = ({
  index,
  station,
  arriveTime,
  departTime,
  stay,

  isStartStation,
  isEndStation,
  isDepartStation,
  isArriveStation,
  beforeDepartStation,
  afterArriveStation,
}) => {
  return (
    <li>
      <div
        className={classnames("icon", {
          "icon-red": isDepartStation || isArriveStation,
        })}
      >
        {isDepartStation ? "出" : isArriveStation ? "到" : leftPad(index, 2, 0)}
      </div>
      <div
        className={classnames("row", {
          grey: beforeDepartStation || afterArriveStation,
        })}
      >
        <span
          className={classnames("station", {
            red: isArriveStation || isDepartStation,
          })}
        >
          {station}
        </span>
        <span
          className={classnames("arrtime", {
            red: isArriveStation,
          })}
        >
          {isStartStation ? "始发站" : arriveTime}
        </span>
        <span
          className={classnames("deptime", {
            red: isDepartStation,
          })}
        >
          {isEndStation ? "终到站" : departTime}
        </span>
        <span className="stoptime">{isStartStation || isEndStation ? "-" : stay + "分"}</span>
      </div>
    </li>
  );
};

const Schedule = ({date, trainNumber, departStation, arriveStation}) => {
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    const url = new URI("/rest/schedule")
      .setSearch("trainNumber", trainNumber)
      .setSearch("departStation", departStation)
      .setSearch("arriveStation", arriveStation)
      .setSearch("date", dayjs(date).format("YYYY-MM-DD"))
      .toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setScheduleList(parseData(data, departStation, arriveStation));
      });
  }, [date, trainNumber, departStation, arriveStation]);
  return (
    <div className="schedule">
      <div className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="deptime">到达</span>
          <span className="arrtime">发车</span>
          <span className="stoptime">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => {
            return <ScheduleRow key={schedule.station} index={index + 1} {...schedule} />;
          })}
        </ul>
      </div>
    </div>
  );
};

Schedule.propTypes = {
  date: PropTypes.number.isRequired,
  trainNumber: PropTypes.string.isRequired,
  departStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
};

export default Schedule;
