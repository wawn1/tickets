import {useState, useMemo, useCallback, useEffect, useRef} from "react";
import leftPad from "left-pad";

// 小数运算不精确，将百分比的2位*100提升为整数
const precent = val => (val * 100) / 24;

// 防止输入溢出,和滑动溢出
const preventOverFlow = val => {
  if (val > 100) return 100;
  if (val < 0) return 0;
  return val;
};

const process = val => preventOverFlow(precent(val));

const useData = props => {
  const {onStartChanged, onEndChanged} = props;
  const [startPercent, _setStartPercent] = useState(process(props.startHours));
  const [endPercent, _setEndPercent] = useState(process(props.endHours));

  const setStartPercent = useCallback(fn => {
    _setStartPercent(preventOverFlow(fn(startPercent)));
  });
  const setEndPercent = useCallback(fn => {
    _setEndPercent(preventOverFlow(fn(endPercent)));
  });

  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100);
  }, [startPercent]);

  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100);
  }, [endPercent]);

  const startText = useMemo(() => {
    return leftPad(startHours, 2, "0") + ":00";
  }, [startHours]);

  const endText = useMemo(() => {
    return leftPad(endHours, 2, "0") + ":00";
  }, [endHours]);

  useEffect(() => {
    if (props.startHours === 0) _setStartPercent(0);
  }, [props.startHours]);

  useEffect(() => {
    if (props.endHours === 24) _setEndPercent(100);
  }, [props.endHours]);

  // const submitStartHours = useRef(props.startHours);
  // const submitEndHours = useRef(props.endHours);

  // if (submitStartHours.current !== props.startHours) {
  //   _setStartPercent(process(props.startHours));
  //   submitStartHours.current = startHours;
  // }

  // if (submitEndHours.current !== props.endHours) {
  //   _setEndPercent(process(props.endHours));
  //   submitEndHours.current = endHours;
  // }

  // props.startHours会因此变化
  useEffect(() => {
    // submitStartHours.current = startHours;
    onStartChanged(startHours);
  }, [startHours]);

  useEffect(() => {
    // submitEndHours.current = endHours;
    onEndChanged(endHours);
  }, [endHours]);

  return {
    startPercent,
    endPercent,
    startHours,
    endHours,
    startText,
    endText,
    setStartPercent,
    setEndPercent,
  };
};

export default useData;
