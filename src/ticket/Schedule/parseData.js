export const parseData = (data, departStation, arriveStation) => {
  let n = data.length;
  let departIdx, arriveIdx;
  for (let i = 0; i < n; i++) {
    let item = data[i];
    if (item.station === departStation) departIdx = i;
    if (item.station === arriveStation) arriveIdx = i;
    Object.assign(item, {
      isStartStation: false,
      isEndStation: false,
      beforeDepartStation: false,
      isDepartStation: false,
      afterArriveStation: false,
      isArriveStation: false,
    });
  }
  for (let i = 0; i < n; i++) {
    let item = data[i];
    if (i === 0) item.isStartStation = true;
    if (i === n - 1) item.isEndStation = true;
    if (i === departIdx) item.isDepartStation = true;
    if (i === arriveIdx) item.isArriveStation = true;
    if (i < departIdx) item.beforeDepartStation = true;
    if (i > arriveIdx) item.afterArriveStation = true;
  }
  return data;
};
