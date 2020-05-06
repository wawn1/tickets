import React, {useEffect} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./index.scss";
import useData from "./hooks/useData";
import {useMeasureRange} from "./hooks/useMeasure";
import useMove from "./hooks/useMove";

const Slider = props => {
  const {title} = props;
  const {startPercent, endPercent, startText, endText, setStartPercent, setEndPercent} = useData(props);
  const [rangeRef, rangeWidth] = useMeasureRange();
  const [startHandleRef, endHandleRef] = useMove({rangeWidth, setStartPercent, setEndPercent});

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={rangeRef}>
          <div
            className="slider-range"
            style={{
              left: startPercent + "%",
              width: endPercent - startPercent + "%",
            }}
          ></div>
          <i
            ref={startHandleRef}
            className="slider-handle"
            style={{
              left: startPercent + "%",
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandleRef}
            className="slider-handle"
            style={{
              left: endPercent + "%",
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  startHours: PropTypes.number.isRequired,
  endHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired,
};

export default Slider;
