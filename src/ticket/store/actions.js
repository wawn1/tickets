import {
  SET_DEPARTDATE,
  SET_ARRIVEDATE,
  SET_DEPARTTIMESTR,
  SET_ARRIVETIMESTR,
  SET_DEPARTSTATION,
  SET_ARRIVESTATION,
  SET_TRAINNUMBER,
  SET_DURATIONSTR,
  SET_TICKETS,
  SET_SHOWSCHEDULE,
  SET_SEARCHPARSED,
} from "./constants";
import dayjs from "dayjs";
import {h0} from "../../common/utils";

export function setDepartDate(departDate) {
  return {
    type: SET_DEPARTDATE,
    payload: departDate,
  };
}

export function setArriveDate(arriveDate) {
  return {
    type: SET_ARRIVEDATE,
    payload: arriveDate,
  };
}

export function setDepartTimeStr(departTimeStr) {
  return {
    type: SET_DEPARTTIMESTR,
    payload: departTimeStr,
  };
}

export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: SET_ARRIVETIMESTR,
    payload: arriveTimeStr,
  };
}

export function setDepartStation(departStation) {
  return {
    type: SET_DEPARTSTATION,
    payload: departStation,
  };
}

export function setArriveStation(arriveStation) {
  return {
    type: SET_ARRIVESTATION,
    payload: arriveStation,
  };
}

export function setTrainNumber(trainNumber) {
  return {
    type: SET_TRAINNUMBER,
    payload: trainNumber,
  };
}

export function setDurationStr(durationStr) {
  return {
    type: SET_DURATIONSTR,
    payload: durationStr,
  };
}

export function setTickets(tickets) {
  return {
    type: SET_TICKETS,
    payload: tickets,
  };
}

export function toggleShowSchedule() {
  return (dispatch, getState) => {
    const {showSchedule} = getState();
    dispatch({
      type: SET_SHOWSCHEDULE,
      payload: !showSchedule,
    });
  };
}

export function setSearchParsed(searchParsed) {
  return {
    type: SET_SEARCHPARSED,
    payload: searchParsed,
  };
}

export function setQueries({aStation, dStation, date, trainNumber}) {
  return dispatch => {
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));

    dispatch(setSearchParsed(true));
  };
}

export function nextDate() {
  return (dispatch, getState) => {
    const {departDate} = getState();
    dispatch(setDepartDate(h0(departDate) + 24 * 60 * 60 * 1000));
  };
}
export function prevDate() {
  return (dispatch, getState) => {
    const {departDate} = getState();
    dispatch(setDepartDate(h0(departDate) - 24 * 60 * 60 * 1000));
  };
}

export function updateDetailInfo({departTimeStr, arriveTimeStr, arriveDate, durationStr, candidates}) {
  return dispatch => {
    dispatch(setDepartTimeStr(departTimeStr));
    dispatch(setArriveTimeStr(arriveTimeStr));
    dispatch(setArriveDate(arriveDate));
    dispatch(setDurationStr(durationStr));
    dispatch(setTickets(candidates));
  };
}
