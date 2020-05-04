import {connect} from "react-redux";
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  selectDay,
} from "./actions";

export const appConnect = connect(state => ({}), {});

export const journeyConnect = connect(state => ({from: state.from, to: state.to}), {
  exchangeFromTo,
  showCitySelector,
});

export const cityConnect = connect(state => ({show: state.showCitySelector, isLoading: state.isLoadingCity, cityData: state.cityData}), {
  onBack: hideCitySelector,
  fetchCityData,
  setSelectedCity,
});

export const departDateConnect = connect(state => ({time: state.departDate}), {onClick: showDateSelector});
export const dateSelectConnect = connect(state => ({show: state.showDateSelector}), {onBack: hideDateSelector, onSelect: selectDay});
