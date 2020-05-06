import {useEffect, useRef} from "react";

// 监听滑动事件，修改数据，输入提供修改数据的方法和基本数据
const useMove = ({rangeWidth, setStartPercent, setEndPercent}) => {
  // ref结尾表示节点，没有表示存数据
  const startHandleRef = useRef();
  const endHandleRef = useRef();

  const lastStartX = useRef();
  const lastEndX = useRef();

  function onStartTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastStartX.current = touch.pageX;
  }

  function onEndTouchBegin(e) {
    const touch = e.targetTouches[0];
    lastEndX.current = touch.pageX;
  }

  function onStartTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastStartX.current;
    lastStartX.current = touch.pageX;

    setStartPercent(start => start + (distance / rangeWidth.current) * 100);
  }

  function onEndTouchMove(e) {
    const touch = e.targetTouches[0];
    const distance = touch.pageX - lastEndX.current;
    lastEndX.current = touch.pageX;

    setEndPercent(end => end + (distance / rangeWidth.current) * 100);
  }

  // render会导致dom节点变化，所以每次都解绑然后绑定
  useEffect(() => {
    startHandleRef.current.addEventListener("touchstart", onStartTouchBegin, false);
    startHandleRef.current.addEventListener("touchmove", onStartTouchMove, false);
    endHandleRef.current.addEventListener("touchstart", onEndTouchBegin, false);
    endHandleRef.current.addEventListener("touchmove", onEndTouchMove, false);

    return () => {
      startHandleRef.current.removeEventListener("touchstart", onStartTouchBegin, false);
      startHandleRef.current.removeEventListener("touchmove", onStartTouchMove, false);
      endHandleRef.current.removeEventListener("touchstart", onEndTouchBegin, false);
      endHandleRef.current.removeEventListener("touchmove", onEndTouchMove, false);
    };
  });

  return [startHandleRef, endHandleRef];
};

export default useMove;
