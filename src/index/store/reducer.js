import { SET_FROM, SET_TO, SHOW_CITY_SELECTOR, SIDE } from './constants'

const defaultState = {
  from: '北京',
  to: '上海',
  showCitySelector: false,
  side: 'left',
  set(key, value) {
    return { ...this, [key]: value }
  }
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_FROM:
      return state.set('from', payload)
    case SET_TO:
      return state.set('to', payload)
    case SHOW_CITY_SELECTOR:
      return state.set('showCitySelector', payload)
    case SIDE:
      return state.set('side', payload)
    default:
      return state
  }
}
