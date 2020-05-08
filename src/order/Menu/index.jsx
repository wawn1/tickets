import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./index.scss";

const MenuItem = ({onPress, title, value, active}) => {
  return (
    <li
      className={classnames({active})}
      onClick={() => {
        onPress(value);
      }}
    >
      {title}
    </li>
  );
};

MenuItem.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  active: PropTypes.bool.isRequired,
};

const Menu = function Menu({show, options, onPress, closeMenu}) {
  return (
    <div>
      {show && <div className="menu-mask" onClick={() => closeMenu()}></div>}
      <div className={classnames("menu", {show})}>
        <div className="menu-title"></div>
        <ul>
          {options &&
            options.map(option => {
              return <MenuItem key={option.value} {...option} onPress={onPress}></MenuItem>;
            })}
        </ul>
      </div>
    </div>
  );
};

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  options: PropTypes.array,
  onPress: PropTypes.func,
  closeMenu: PropTypes.func.isRequired,
};

export default Menu;
