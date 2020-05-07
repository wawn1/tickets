import {connect} from "react-redux";
import {setQueries, prevDate, nextDate, updateDetailInfo, toggleShowSchedule} from "./actions";
// connect(({})=>({}),{})
export const appConnect = connect(
  ({departDate, trainNumber, searchParsed, showSchedule}) => ({departDate, trainNumber, searchParsed, showSchedule}),
  {
    setQueries,
    prevDate,
    nextDate,
    updateDetailInfo,
    toggleShowSchedule,
  }
);

export const navConnect = connect(({departDate}) => ({date: departDate}), {prev: prevDate, next: nextDate});

export const detailConnect = connect(
  ({departDate, arriveDate, departTimeStr, arriveTimeStr, departStation, arriveStation, trainNumber, durationStr}) => ({
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
  }),
  {}
);

export const scheduleConnect = connect(
  ({departDate, trainNumber, departStation, arriveStation}) => ({
    date: departDate,
    trainNumber: trainNumber,
    departStation: departStation,
    arriveStation: arriveStation,
  }),
  {}
);
