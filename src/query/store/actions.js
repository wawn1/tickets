import {
  SET_FROM,
  SET_TO,
  SET_DEPARTDATE,
  SET_HIGHSPEED,
  SET_TRAINLIST,
  SET_ORDERTYPE,
  SET_ONLYTICKETS,
  SET_TICKETTYPES,
  SET_CHECKEDTICKETTYPES,
  SET_TRAINTYPES,
  SET_CHECKEDTRAINTYPES,
  SET_DEPARTSTATIONS,
  SET_CHECKEDDEPARTSTATIONS,
  SET_ARRIVESTATIONS,
  SET_CHECKEDARRIVESTATIONS,
  SET_DEPARTTIMESTART,
  SET_DEPARTTIMEEND,
  SET_ARRIVETIMESTART,
  SET_ARRIVETIMEEND,
  SET_SHOWFILTERS,
  SET_SEARCHPARSED,
  ORDER_DURATION,
  ORDER_DEPART,
} from "./constants";
import {h0} from "../../common/utils";

export function setFrom(from) {
  return {
    type: SET_FROM,
    payload: from,
  };
}

export function setTo(to) {
  return {
    type: SET_TO,
    payload: to,
  };
}

export function setDepartDate(departDate) {
  return {
    type: SET_DEPARTDATE,
    payload: departDate,
  };
}

export function setHighSpeed(highSpeed) {
  return {
    type: SET_HIGHSPEED,
    payload: highSpeed,
  };
}

export function setQueries({from, to, date: departDate, highSpeed}) {
  return dispatch => {
    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDepartDate(+departDate));
    dispatch(setHighSpeed(highSpeed === "true"));
    dispatch(setSearchParsed(true));
  };
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const {highSpeed, checkedTrainTypes} = getState();
    const newHighSpeed = !highSpeed;
    const newCheckedTrainTypes = {...checkedTrainTypes};
    if (newHighSpeed) {
      newCheckedTrainTypes[1] = true;
      newCheckedTrainTypes[5] = true;
    } else {
      delete newCheckedTrainTypes[1];
      delete newCheckedTrainTypes[5];
    }
    dispatch(setHighSpeed(newHighSpeed));
    dispatch(_setCheckedTrainTypes(newCheckedTrainTypes));
  };
}

export function setTrainList(trainList) {
  return {
    type: SET_TRAINLIST,
    payload: trainList,
  };
}

export function toggleOrderType() {
  return (dispatch, getState) => {
    const {orderType} = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        type: SET_ORDERTYPE,
        payload: ORDER_DURATION,
      });
    } else {
      dispatch({
        type: SET_ORDERTYPE,
        payload: ORDER_DEPART,
      });
    }
  };
}

export function toggleOnlyTickets() {
  return (dispatch, getState) => {
    const {onlyTickets} = getState();
    dispatch({
      type: SET_ONLYTICKETS,
      payload: !onlyTickets,
    });
  };
}

export function setTicketTypes(ticketTypes) {
  return {
    type: SET_TICKETTYPES,
    payload: ticketTypes,
  };
}

export function setCheckedTicketTypes(checkedTicketTypes) {
  return {
    type: SET_CHECKEDTICKETTYPES,
    payload: checkedTicketTypes,
  };
}

export function setTrainTypes(trainTypes) {
  return {
    type: SET_TRAINTYPES,
    payload: trainTypes,
  };
}

export function _setCheckedTrainTypes(checkedTrainTypes) {
  return {
    type: SET_CHECKEDTRAINTYPES,
    payload: checkedTrainTypes,
  };
}

export function setCheckedTrainTypes(checkedTrainTypes) {
  return dispatch => {
    dispatch(setHighSpeed(checkedTrainTypes[1] && checkedTrainTypes[5]));
    dispatch(_setCheckedTrainTypes(checkedTrainTypes));
  };
}

export function setDepartStations(departStations) {
  return {
    type: SET_DEPARTSTATIONS,
    payload: departStations,
  };
}

export function setCheckedDepartStations(checkedDepartStations) {
  return {
    type: SET_CHECKEDDEPARTSTATIONS,
    payload: checkedDepartStations,
  };
}

export function setArriveStations(arriveStations) {
  return {
    type: SET_ARRIVESTATIONS,
    payload: arriveStations,
  };
}

export function setCheckedArriveStations(checkedArriveStations) {
  return {
    type: SET_CHECKEDARRIVESTATIONS,
    payload: checkedArriveStations,
  };
}

export function setDepartTimeStart(departTimeStart) {
  return {
    type: SET_DEPARTTIMESTART,
    payload: departTimeStart,
  };
}

export function setDepartTimeEnd(departTimeEnd) {
  return {
    type: SET_DEPARTTIMEEND,
    payload: departTimeEnd,
  };
}

export function setArriveTimeStart(arriveTimeStart) {
  return {
    type: SET_ARRIVETIMESTART,
    payload: arriveTimeStart,
  };
}

export function setArriveTimeEnd(arriveTimeEnd) {
  return {
    type: SET_ARRIVETIMEEND,
    payload: arriveTimeEnd,
  };
}

export function toggleShowFilters() {
  return (dispatch, getState) => {
    const {showFilters} = getState();
    dispatch({
      type: SET_SHOWFILTERS,
      payload: !showFilters,
    });
  };
}

export function setSearchParsed(searchParsed) {
  return {
    type: SET_SEARCHPARSED,
    payload: searchParsed,
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

export function updateTrainInfo({trains, ticketType, trainType, depStation, arrStation}) {
  return dispatch => {
    dispatch(setTrainList(trains));
    dispatch(setTicketTypes(ticketType));
    dispatch(setTrainTypes(trainType));
    dispatch(setDepartStations(depStation));
    dispatch(setArriveStations(arrStation));
  };
}

export function decideInfo({
  checkedTicketTypes,
  checkedTrainTypes,
  checkedDepartStations,
  checkedArriveStations,
  departTimeStart,
  departTimeEnd,
  arriveTimeStart,
  arriveTimeEnd,
}) {
  return dispatch => {
    dispatch(setCheckedTicketTypes(checkedTicketTypes));
    dispatch(setCheckedTrainTypes(checkedTrainTypes));
    dispatch(setCheckedDepartStations(checkedDepartStations));
    dispatch(setCheckedArriveStations(checkedArriveStations));
    dispatch(setDepartTimeStart(departTimeStart));
    dispatch(setDepartTimeEnd(departTimeEnd));
    dispatch(setArriveTimeStart(arriveTimeStart));
    dispatch(setArriveTimeEnd(arriveTimeEnd));
  };
}
