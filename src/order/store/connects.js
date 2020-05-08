import {connect} from "react-redux";
import {
  setQueries,
  fetchInitial,
  closeMenu,
  removePassenger,
  updatePassenger,
  openGenderMenu,
  openFollowAdultMenu,
  openTicketTypeMenu,
  createAdult,
  createChild,
  getFollowAdultName,
} from "./actions";
// connect(({})=>({}),{})
export const appConnect = connect(
  ({departStation, arriveStation, seatType, departDate, searchParsed}) => ({
    params: {departStation, arriveStation, seatType, departDate},
    searchParsed,
  }),
  {setQueries, fetchInitial}
);

export const detailConnect = connect(
  ({departDate, arriveDate, departTimeStr, arriveTimeStr, departStation, arriveStation, trainNumber, durationStr}) => ({
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
  }),
  {}
);

export const ticketConnect = connect(({price, seatType}) => ({price, type: seatType}), {});

export const menuConnect = connect(({showMenu, menu}) => ({show: showMenu, options: menu.options, onPress: menu.onPress}), {closeMenu});

export const passengerConnect = connect(({}) => ({}), {
  removePassenger,
  updatePassenger,
  openGenderMenu,
  openFollowAdultMenu,
  openTicketTypeMenu,
  getFollowAdultName,
});

export const passengersConnect = connect(({passengers}) => ({passengers}), {createAdult, createChild});

export const chooseConnect = connect(({passengers}) => ({passengers}), {updatePassenger});

export const accountConnect = connect(({price, passengers}) => ({price, length: passengers.length}), {});
