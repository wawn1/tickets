import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Header = ({ onBack, title }) => {
  return (
    <div className="header">
      <div className="header__back" onClick={onBack}>
        <svg width="42" height="42">
          <polyline points="25,13 16,21 25,29" stroke="#fff" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <h1 className="header__title">{title}</h1>
    </div>
  )
}

Header.propTypes = {
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Header
