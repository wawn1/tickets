import {SET_FROM,SET_TO,SET_DEPARTDATE,SET_HIGHSPEED,SET_TRAINLIST,SET_ORDERTYPE,SET_ONLYTICKETS,SET_TICKETTYPES,SET_CHECKEDTICKETTYPES,SET_TRAINTYPES,SET_CHECKEDTRAINTYPES,SET_DEPARTSTATIONS,SET_CHECKEDDEPARTSTATIONS,SET_ARRIVESTATIONS,SET_CHECKEDARRIVESTATIONS,SET_DEPARTTIMESTART,SET_DEPARTIMEEND,SET_ARRIVETIMESTART,SET_ARRIVETIMEEND,SET_SHOWFILTERS,SET_SEARCHPARSED} from "./constants";

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

export function toggleHighSpeed() {
      return (dispatch, getState) => {
        const {highSpeed} = getState();
        dispatch({
          type: SET_HIGHSPEED,
          payload: !highSpeed,
        });
      };
    }

export function setTrainList(trainList) {
    return {
      type: SET_TRAINLIST,
      payload: trainList,
    };
  }

export function setOrderType(orderType) {
    return {
      type: SET_ORDERTYPE,
      payload: orderType,
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

export function setCheckedTrainTypes(checkedTrainTypes) {
    return {
      type: SET_CHECKEDTRAINTYPES,
      payload: checkedTrainTypes,
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

export function setDeparTimeEnd(deparTimeEnd) {
    return {
      type: SET_DEPARTIMEEND,
      payload: deparTimeEnd,
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

export function toggleSearchParsed() {
      return (dispatch, getState) => {
        const {searchParsed} = getState();
        dispatch({
          type: SET_SEARCHPARSED,
          payload: !searchParsed,
        });
      };
    }