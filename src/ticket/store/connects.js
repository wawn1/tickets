import {connect} from "react-redux";
import {setQueries, prevDate, nextDate, updateDetailInfo, toggleShowSchedule} from "./actions";
// connect(({})=>({}),{})
export const appConnect = connect(({departDate, trainNumber, searchParsed}) => ({departDate, trainNumber, searchParsed}), {
  setQueries,
  prevDate,
  nextDate,
  updateDetailInfo,
});

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
  {toggleShowSchedule}
);
