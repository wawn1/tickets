export function h0(timestamp = Date.now()) {
  const target = new Date(timestamp);

  target.setHours(0);
  target.setMinutes(0);
  target.setSeconds(0);
  target.setMilliseconds(0);

  return target.getTime();
}

const daysOfMonth = startDay => {
  const currentDay = new Date(startDay.getTime());

  let days = [];

  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime());
    currentDay.setDate(currentDay.getDate() + 1);
  }
  return days;
};

// 输入对象为某月第一天日期对象的 time序列化
export function month(startDayTime) {
  const startDay = new Date(startDayTime);
  let days = daysOfMonth(startDay);
  const leftPadding = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null);

  const fills = leftPadding.length + days.length;
  const whites = Math.ceil(fills / 7) * 7 - fills;
  const rightPadding = new Array(whites).fill(null);

  days = [...leftPadding, ...days, ...rightPadding];

  const weeks = [];

  for (let row = 0; row < days.length / 7; row++) {
    const week = days.slice(row * 7, (row + 1) * 7);
    weeks.push(week);
  }

  return {weeks, startDay: startDayTime};
}

export function threeMonth() {
  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);
  const currentMonth = now.getMonth();
  let months = [];
  for (let i = 0; i < 3; i++) {
    now.setMonth(currentMonth + i);
    const startDayTime = now.getTime();
    months.push(month(startDayTime));
  }
  return months;
}
