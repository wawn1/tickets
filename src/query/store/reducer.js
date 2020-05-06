import {
  ORDER_DURATION,
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
} from "./constants";
import {h0} from "../../common/utils";

const defaultState = {
  from: "",
  to: "",
  departDate: h0(Date.now()),
  highSpeed: false,
  trainList: [],
  orderType: ORDER_DURATION,
  onlyTickets: false,
  ticketTypes: [],
  checkedTicketTypes: {},
  trainTypes: [],
  checkedTrainTypes: {},
  departStations: [],
  checkedDepartStations: {},
  arriveStations: [],
  checkedArriveStations: {},
  departTimeStart: 0,
  departTimeEnd: 24,
  arriveTimeStart: 0,
  arriveTimeEnd: 24,
  showFilters: false,
  searchParsed: false,
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
    case SET_DEPARTDATE:
      return state.set("departDate", payload);
    case SET_HIGHSPEED:
      return state.set("highSpeed", payload);
    case SET_TRAINLIST:
      return state.set("trainList", payload);
    case SET_ORDERTYPE:
      return state.set("orderType", payload);
    case SET_ONLYTICKETS:
      return state.set("onlyTickets", payload);
    case SET_TICKETTYPES:
      return state.set("ticketTypes", payload);
    case SET_CHECKEDTICKETTYPES:
      return state.set("checkedTicketTypes", payload);
    case SET_TRAINTYPES:
      return state.set("trainTypes", payload);
    case SET_CHECKEDTRAINTYPES:
      return state.set("checkedTrainTypes", payload);
    case SET_DEPARTSTATIONS:
      return state.set("departStations", payload);
    case SET_CHECKEDDEPARTSTATIONS:
      return state.set("checkedDepartStations", payload);
    case SET_ARRIVESTATIONS:
      return state.set("arriveStations", payload);
    case SET_CHECKEDARRIVESTATIONS:
      return state.set("checkedArriveStations", payload);
    case SET_DEPARTTIMESTART:
      return state.set("departTimeStart", payload);
    case SET_DEPARTTIMEEND:
      return state.set("departTimeEnd", payload);
    case SET_ARRIVETIMESTART:
      return state.set("arriveTimeStart", payload);
    case SET_ARRIVETIMEEND:
      return state.set("arriveTimeEnd", payload);
    case SET_SHOWFILTERS:
      return state.set("showFilters", payload);
    case SET_SEARCHPARSED:
      return state.set("searchParsed", payload);
    default:
      return state;
  }
};
