import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";
import Header from "../Header";
import {threeMonth, h0} from "../utils";

const Day = ({day, onSelect}) => {
  const now = h0();
  if (!day) {
    return <td className="null"></td>;
  }
  const dateString = now === day ? "今天" : new Date(day).getDate();
  const classes = [];
  if (day < now) {
    classes.push("disabled");
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push("weekend");
  }
  return (
    <td
      className={classnames(classes)}
      onClick={() => {
        onSelect(day);
      }}
    >
      {dateString}
    </td>
  );
};
Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

const Month = ({startDay, weeks, onSelect}) => {
  startDay = new Date(startDay);
  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="data-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {weeks.map((days, idx) => {
          return (
            <tr key={idx} className="date-table-days">
              {days.map((day, idx) => {
                return <Day key={idx} day={day} onSelect={onSelect} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
Month.propTypes = {
  startDay: PropTypes.number.isRequired,
  weeks: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const DateSelector = ({show, onSelect, onBack}) => {
  const months = threeMonth();
  return (
    <div className={classnames("date-selector", {hidden: !show})}>
      <Header title="日期选择" onBack={onBack} />
      <div className="date-selector-tables">
        {months.map(({weeks, startDay}) => {
          return <Month key={startDay} weeks={weeks} startDay={startDay} onSelect={onSelect} />;
        })}
      </div>
    </div>
  );
};
DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
export default DateSelector;
