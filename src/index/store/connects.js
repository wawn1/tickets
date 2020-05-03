import { connect } from 'react-redux'
import { exchangeFromTo, showCitySelector } from './actions'

export const appConnect = connect(state => ({}), {})

export const journeyConnect = connect(state => ({ from: state.from, to: state.to }), {
  exchangeFromTo,
  showCitySelector
})
