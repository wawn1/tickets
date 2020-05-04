import {SET_FROM, SET_TO, CITYDATA, IS_LOADING_CITY, SHOW_CITY_SELECTOR, SIDE, SHOW_DATE_SELECTOR, SET_DEPART_DATE} from "./constants";

const defaultState = {
  from: "北京",
  to: "上海",
  cityData: null,
  isLoadingCity: false,
  showCitySelector: false,
  departDate: Date.now(),
  showDateSelector: false,
  side: "left",
  set(key, value) {
    return {...this, [key]: value};
  },
};

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_FROM:
      return state.set("from", payload);
    case SET_TO:
      return state.set("to", payload);
    case CITYDATA:
      return state.set("cityData", payload);
    case IS_LOADING_CITY:
      return state.set("isLoadingCity", payload);
    case SHOW_CITY_SELECTOR:
      return state.set("showCitySelector", payload);
    case SET_DEPART_DATE:
      return state.set("departDate", payload);
    case SHOW_DATE_SELECTOR:
      return state.set("showDateSelector", payload);
    case SIDE:
      return state.set("side", payload);
    default:
      return state;
  }
};
