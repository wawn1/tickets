import {SET_DEPARTDATE,SET_ARRIVEDATE,SET_DEPARTTIMESTR,SET_ARRIVETIMESTR,SET_DEPARTSTATION,SET_ARRIVESTATION,SET_TRAINNUMBER,SET_DURATIONSTR,SET_TICKETS,SET_SHOWSCHEDULE,SET_SEARCHPARSED} from "./constants";

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

export function toggleSearchParsed() {
      return (dispatch, getState) => {
        const {searchParsed} = getState();
        dispatch({
          type: SET_SEARCHPARSED,
          payload: !searchParsed,
        });
      };
    }