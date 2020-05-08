import {SET_TRAINNUMBER,SET_DEPARTSTATION,SET_ARRIVESTATION,SET_SEATTYPE,SET_DEPARTDATE,SET_ARRIVEDATE,SET_DEPARTTIMESTR,SET_ARRIVETIMESTR,SET_DURATIONSTR,SET_PRICE,SET_PASSENGERS,SET_MENU,SET_SHOWMENU,SET_SEARCHPARSED} from "./constants";

export function setTrainNumber(trainNumber) {
    return {
      type: SET_TRAINNUMBER,
      payload: trainNumber,
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

export function setSeatType(seatType) {
    return {
      type: SET_SEATTYPE,
      payload: seatType,
    };
  }

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

export function setDurationStr(durationStr) {
    return {
      type: SET_DURATIONSTR,
      payload: durationStr,
    };
  }

export function setPrice(price) {
    return {
      type: SET_PRICE,
      payload: price,
    };
  }

export function setPassengers(passengers) {
    return {
      type: SET_PASSENGERS,
      payload: passengers,
    };
  }

export function setMenu(menu) {
    return {
      type: SET_MENU,
      payload: menu,
    };
  }

export function toggleShowMenu() {
      return (dispatch, getState) => {
        const {showMenu} = getState();
        dispatch({
          type: SET_SHOWMENU,
          payload: !showMenu,
        });
      };
    }

export function setShowMenu(showMenu) {
      return {
        type: SET_SHOWMENU,
        payload: showMenu,
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

export function setSearchParsed(searchParsed) {
      return {
        type: SET_SEARCHPARSED,
        payload: searchParsed,
      };
    }