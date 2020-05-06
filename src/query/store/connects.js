import {connect} from "react-redux";
import {
  setQueries,
  updateTrainInfo,
  prevDate,
  nextDate,
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleShowFilters,
  decideInfo,
} from "./actions";
// connect(({})=>({}),{})
export const appConnect = connect(
  ({
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  }) => ({
    queries: {from, to, departDate, highSpeed},
    searchParsed,
    constrains: {
      orderType,
      onlyTickets,
      checkedTicketTypes,
      checkedTrainTypes,
      checkedDepartStations,
      checkedArriveStations,
      departTimeStart,
      departTimeEnd,
      arriveTimeStart,
      arriveTimeEnd,
    },
  }),
  {setQueries, updateTrainInfo}
);

export const navConnect = connect(({departDate}) => ({date: departDate}), {prev: prevDate, next: nextDate});
export const listConnect = connect(({trainList}) => ({list: trainList}), {});
export const bottomConnect = connect(
  ({orderType, highSpeed, onlyTickets, showFilters}) => ({orderType, highSpeed, onlyTickets, showFilters}),
  {toggleOrderType, toggleHighSpeed, toggleOnlyTickets, toggleShowFilters}
);

export const bottomModalConnect = connect(
  ({
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  }) => ({
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  }),
  {decideInfo, toggleShowFilters}
);
