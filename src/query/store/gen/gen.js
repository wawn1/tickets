const fs = require("fs");

const defaultState = {
  from: "",
  to: "",
  departDate: "h0(Date.now())",
  highSpeed: false,
  trainList: [],
  orderType: "ORDER_DURATION",
  onlyTickets: false,
  ticketTypes: [],
  checkedTicketTypes: {},
  trainTypes: [],
  checkedTrainTypes: {},
  departStations: [],
  checkedDepartStations: {},
  arriveStations: [],
  checkedArriveStations: {},
  departTimeStart: 0,
  deparTimeEnd: 24,
  arriveTimeStart: 0,
  arriveTimeEnd: 24,
  showFilters: false,
  searchParsed: false,
};

const keys = Object.keys(defaultState);
const constants = keys.map(key => "SET_" + key.toUpperCase());

const constantsContent = constants.map(consts => `export const ${consts} = "${consts}";`).join("\n");
console.log(constantsContent);
fs.writeFile("./constanst.js", constantsContent, function(error) {
  if (error) {
    console.log(error);
    return false;
  }
  console.log("写入成功");
});

const action_import = `import {${constants.join(",")}} from "./constants";\n\n`;
const action_func = (key, consts) => {
  const keyCap = key.substring(0, 1).toUpperCase() + key.substring(1);
  if (defaultState[key] === false || defaultState[key] === true) {
    return `export function toggle${keyCap}() {
      return (dispatch, getState) => {
        const {${key}} = getState();
        dispatch({
          type: ${consts},
          payload: !${key},
        });
      };
    }`;
  }
  return `export function set${keyCap}(${key}) {
    return {
      type: ${consts},
      payload: ${key},
    };
  }`;
};
const actions_content = keys.map((key, idx) => action_func(key, constants[idx])).join("\n\n");
fs.writeFile("./actions.js", action_import + actions_content, function(error) {
  if (error) {
    console.log(error);
    return false;
  }
  console.log("写入成功");
});
console.log(actions_content);

const case_func = (key, consts) => {
  return `    case ${consts}:
  return state.set("${key}", payload);`;
};
const case_content = keys.map((key, idx) => case_func(key, constants[idx])).join("\n");

const reducer_content = `export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
${case_content}
    default:
      return state;
  }
};`;
fs.writeFile("./reducer.js", action_import + reducer_content, function(error) {
  if (error) {
    console.log(error);
    return false;
  }
  console.log("写入成功");
});
console.log(reducer_content);
