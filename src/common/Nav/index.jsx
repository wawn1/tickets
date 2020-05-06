import React, {useMemo} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import "./index.scss";
import {h0} from "../utils";

const Nav = ({date, prev, next}) => {
  const isPrevDisabled = useMemo(() => h0(date) <= h0(), [date]);
  const isNextDisabled = useMemo(() => h0(date) - h0() > 20 * 24 * 60 * 60 * 1000, [date]);
  const currentString = useMemo(() => {
    const d = dayjs(date);
    return d.format("M月D日 ") + d.locale("zh-cn").format("ddd");
  }, [date]);

  return (
    <div className="nav">
      <span
        className={classnames("nav-prev", {"nav-disabled": isPrevDisabled})}
        onClick={() => {
          if (!isPrevDisabled) prev();
        }}
      >
        前一天
      </span>
      <span className="nav-current">{currentString}</span>
      <span
        className={classnames("nav-next", {"nav-disabled": isNextDisabled})}
        onClick={() => {
          if (!isNextDisabled) next();
        }}
      >
        后一天
      </span>
    </div>
  );
};

Nav.propTypes = {
  date: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default Nav;
