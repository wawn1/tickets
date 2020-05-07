import {SET_DEPARTDATE,SET_ARRIVEDATE,SET_DEPARTTIMESTR,SET_ARRIVETIMESTR,SET_DEPARTSTATION,SET_ARRIVESTATION,SET_TRAINNUMBER,SET_DURATIONSTR,SET_TICKETS,SET_SHOWSCHEDULE,SET_SEARCHPARSED} from "./constants";

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_DEPARTDATE:
  return state.set("departDate", payload);
    case SET_ARRIVEDATE:
  return state.set("arriveDate", payload);
    case SET_DEPARTTIMESTR:
  return state.set("departTimeStr", payload);
    case SET_ARRIVETIMESTR:
  return state.set("arriveTimeStr", payload);
    case SET_DEPARTSTATION:
  return state.set("departStation", payload);
    case SET_ARRIVESTATION:
  return state.set("arriveStation", payload);
    case SET_TRAINNUMBER:
  return state.set("trainNumber", payload);
    case SET_DURATIONSTR:
  return state.set("durationStr", payload);
    case SET_TICKETS:
  return state.set("tickets", payload);
    case SET_SHOWSCHEDULE:
  return state.set("showSchedule", payload);
    case SET_SEARCHPARSED:
  return state.set("searchParsed", payload);
    default:
      return state;
  }
};