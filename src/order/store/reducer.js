import {
  SET_TRAINNUMBER,
  SET_DEPARTSTATION,
  SET_ARRIVESTATION,
  SET_SEATTYPE,
  SET_DEPARTDATE,
  SET_ARRIVEDATE,
  SET_DEPARTTIMESTR,
  SET_ARRIVETIMESTR,
  SET_DURATIONSTR,
  SET_PRICE,
  SET_PASSENGERS,
  SET_MENU,
  SET_SHOWMENU,
  SET_SEARCHPARSED,
} from "./constants";

const defaultState = {
  trainNumber: null,
  departStation: null,
  arriveStation: null,
  seatType: null,
  departDate: Date.now(),
  arriveDate: Date.now(),
  departTimeStr: null,
  arriveTimeStr: null,
  durationStr: null,
  price: null,
  passengers: [],
  menu: {},
  showMenu: false,
  searchParsed: false,
  set(key, value) {
    return {...this, [key]: value};
  },
};

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_TRAINNUMBER:
      return state.set("trainNumber", payload);
    case SET_DEPARTSTATION:
      return state.set("departStation", payload);
    case SET_ARRIVESTATION:
      return state.set("arriveStation", payload);
    case SET_SEATTYPE:
      return state.set("seatType", payload);
    case SET_DEPARTDATE:
      return state.set("departDate", payload);
    case SET_ARRIVEDATE:
      return state.set("arriveDate", payload);
    case SET_DEPARTTIMESTR:
      return state.set("departTimeStr", payload);
    case SET_ARRIVETIMESTR:
      return state.set("arriveTimeStr", payload);
    case SET_DURATIONSTR:
      return state.set("durationStr", payload);
    case SET_PRICE:
      return state.set("price", payload);
    case SET_PASSENGERS:
      return state.set("passengers", payload);
    case SET_MENU:
      return state.set("menu", payload);
    case SET_SHOWMENU:
      return state.set("showMenu", payload);
    case SET_SEARCHPARSED:
      return state.set("searchParsed", payload);
    default:
      return state;
  }
};
