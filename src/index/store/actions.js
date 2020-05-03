import { SET_FROM, SET_TO, SHOW_CITY_SELECTOR, SIDE } from './constants'

export function setFrom(from) {
  return {
    type: SET_FROM,
    payload: from
  }
}

export function setTo(to) {
  return {
    type: SET_TO,
    payload: to
  }
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState()
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
}

export function showCitySelector(side) {
  return dispatch => {
    dispatch({
      type: SHOW_CITY_SELECTOR,
      payload: true
    })

    dispatch({
      type: SIDE,
      payload: side
    })
  }
}
