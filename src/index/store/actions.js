import {SET_FROM, SET_TO, CITYDATA, IS_LOADING_CITY, SHOW_CITY_SELECTOR, SIDE, SHOW_DATE_SELECTOR, SET_DEPART_DATE} from "./constants";

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

export function setIsLoadingCity(isLoadingCity) {
  return {
    type: IS_LOADING_CITY,
    payload: isLoadingCity,
  };
}

export function setCityData(cityData) {
  return {
    type: CITYDATA,
    payload: cityData,
  };
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const {from, to} = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
}

export function showCitySelector(side) {
  return dispatch => {
    dispatch({
      type: SHOW_CITY_SELECTOR,
      payload: true,
    });

    dispatch({
      type: SIDE,
      payload: side,
    });
  };
}

export function hideCitySelector() {
  return {
    type: SHOW_CITY_SELECTOR,
    payload: false,
  };
}

export function fetchCityData() {
  return (dispatch, getState) => {
    const {isLoadingCity} = getState();

    if (isLoadingCity) return;

    const cache = JSON.parse(localStorage.getItem("city_data_cache") || "{}");

    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data));
      return;
    }

    dispatch(setIsLoadingCity(true));
    fetch("/rest/cities?_" + Date.now())
      .then(res => res.json())
      .then(cityData => {
        localStorage.setItem("city_data_cache", JSON.stringify({data: cityData, expires: Date.now() + 60 * 1000}));
        dispatch(setCityData(cityData));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsLoadingCity(false));
      });
  };
}

export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const {side} = getState();
    if (side === "left") {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city));
    }
    dispatch(hideCitySelector());
  };
}

export function showDateSelector() {
  return {
    type: SHOW_DATE_SELECTOR,
    payload: true,
  };
}

export function setDepartDate(departDate) {
  return {
    type: SET_DEPART_DATE,
    payload: departDate,
  };
}

export function hideDateSelector() {
  return {
    type: SHOW_DATE_SELECTOR,
    payload: false,
  };
}
