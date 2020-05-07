import {connect} from "react-redux";
import {setQueries, prevDate, nextDate, updateDetailInfo} from "./actions";
// connect(({})=>({}),{})
export const appConnect = connect(({departDate, trainNumber, searchParsed}) => ({departDate, trainNumber, searchParsed}), {
  setQueries,
  prevDate,
  nextDate,
  updateDetailInfo,
});

export const navConnect = connect(({departDate}) => ({date: departDate}), {prev: prevDate, next: nextDate});
