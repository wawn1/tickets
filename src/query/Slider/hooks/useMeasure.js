import {useWindowSize} from "react-use";
import {useEffect, useRef} from "react";

// 测量某个元素的width
export const useMeasureRange = () => {
  const rangeRef = useRef();
  const rangeWidth = useRef();

  const {windowWidth} = useWindowSize();

  useEffect(() => {
    rangeWidth.current = parseFloat(window.getComputedStyle(rangeRef.current).width);
  }, [windowWidth]);

  return [rangeRef, rangeWidth];
};
