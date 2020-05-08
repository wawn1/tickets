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
import dayjs from "dayjs";
import uuid from "uuid-v4";

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

export function setQueries({trainNumber, dStation, aStation, type, date}) {
  return dispatch => {
    dispatch(setTrainNumber(trainNumber));
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setSeatType(type));
    dispatch(setDepartDate(dayjs(date).valueOf()));

    dispatch(setSearchParsed(true));
  };
}

export function fetchInitial(url) {
  return dispatch => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {departTimeStr, arriveTimeStr, arriveDate, durationStr, price} = result;
        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      });
  };
}

const checkComplete = passengers => {
  for (let passenger of passengers) {
    for (let key in passenger) {
      if (!passenger[key]) return false;
    }
  }
  return true;
};

export function createAdult() {
  return (dispatch, getState) => {
    const {passengers} = getState();

    if (!checkComplete(passengers)) return;

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: uuid(),
          name: "",
          ticketType: "adult",
          licenseNo: "",
          seat: "Z",
        },
      ])
    );
  };
}
export function createChild() {
  return (dispatch, getState) => {
    const {passengers} = getState();

    if (!checkComplete(passengers)) return;

    const adult = passengers.find(passenger => passenger.ticketType === "adult");
    if (!adult) return;

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: uuid(),
          name: "",
          gender: "none",
          birthday: "",
          followAdult: adult.id,
          ticketType: "child",
          seat: "Z",
        },
      ])
    );
  };
}

export function removePassenger(id) {
  return (dispatch, getState) => {
    const {passengers} = getState();

    const newPassengers = passengers.filter(passenger => passenger.id !== id && passenger.followAdult !== id);

    dispatch(setPassengers(newPassengers));
  };
}

export function updatePassenger(id, data, removekeys = []) {
  return (dispatch, getState) => {
    const {passengers} = getState();

    const index = passengers.findIndex(passenger => passenger.id === id);
    if (index === -1) return;

    let passenger = Object.assign({}, passengers[index], data);
    for (let key of removekeys) {
      delete passenger[key];
    }
    passengers[index] = passenger;

    dispatch(setPassengers([...passengers]));
  };
}

export function openMenu(menu) {
  return dispatch => {
    dispatch(setMenu(menu));
    dispatch(setShowMenu(true));
  };
}
export function closeMenu() {
  return setShowMenu(false);
}

export function openGenderMenu(id) {
  return (dispatch, getState) => {
    const {passengers} = getState();

    const passenger = passengers.find(passenger => passenger.id === id);
    if (!passenger) return;

    dispatch(
      openMenu({
        onPress(gender) {
          dispatch(updatePassenger(id, {gender}));
          dispatch(closeMenu());
        },
        options: [
          {
            title: "男",
            value: "male",
            active: "male" === passenger.gender,
          },
          {
            title: "女",
            value: "female",
            active: "female" === passenger.gender,
          },
        ],
      })
    );
  };
}

export function openFollowAdultMenu(id) {
  return (dispatch, getState) => {
    const {passengers} = getState();

    const passenger = passengers.find(passenger => passenger.id === id);
    if (!passenger) return;

    dispatch(
      openMenu({
        onPress(followAdult) {
          dispatch(updatePassenger(id, {followAdult}));
          dispatch(closeMenu());
        },
        options: passengers
          .filter(passenger => passenger.ticketType === "adult")
          .map(adult => {
            return {
              title: adult.name,
              value: adult.id,
              active: adult.id === passenger.followAdult,
            };
          }),
      })
    );
  };
}

export function openTicketTypeMenu(id) {
  return (dispatch, getState) => {
    const {passengers} = getState();

    const passenger = passengers.find(passenger => passenger.id === id);
    if (!passenger) return;

    dispatch(
      openMenu({
        onPress(ticketType) {
          if ("adult" === ticketType) {
            dispatch(
              updatePassenger(
                id,
                {
                  ticketType,
                  licenseNo: "",
                },
                ["gender", "followAdult", "birthday"]
              )
            );
          } else {
            const adult = passengers.find(passenger => passenger.ticketType === "adult");

            if (adult) {
              dispatch(
                updatePassenger(
                  id,
                  {
                    ticketType,
                    gender: "",
                    followAdult: adult.id,
                    birthday: "",
                  },
                  ["licenseNo"]
                )
              );
            } else {
              alert("没有其他成人乘客");
            }
          }
          dispatch(closeMenu());
        },
        options: [
          {
            title: "成人票",
            value: "adult",
            active: "adult" === passenger.ticketType,
          },
          {
            title: "儿童票",
            value: "child",
            active: "child" === passenger.ticketType,
          },
        ],
      })
    );
  };
}

export function getFollowAdultName(followAdult) {
  return (dispatch, getState) => {
    if (!followAdult) return;
    const {passengers} = getState();

    const adult = passengers.find(passenger => passenger.id === followAdult);
    if (!adult) return;
    return adult.name;
  };
}
