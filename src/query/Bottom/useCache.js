import {createContext, useState, useEffect} from "react";

export const Context = createContext(null);

const useCache = props => {
  const [checkedTicketTypes, set_checkedTicketTypes] = useState(props.checkedTicketTypes);
  const [checkedTrainTypes, set_checkedTrainTypes] = useState(props.checkedTrainTypes);
  const [checkedDepartStations, set_checkedDepartStations] = useState(props.checkedDepartStations);
  const [checkedArriveStations, set_checkedArriveStations] = useState(props.checkedArriveStations);
  const [departTimeStart, set_departTimeStart] = useState(props.departTimeStart);
  const [departTimeEnd, set_departTimeEnd] = useState(props.departTimeEnd);
  const [arriveTimeStart, set_arriveTimeStart] = useState(props.arriveTimeStart);
  const [arriveTimeEnd, set_arriveTimeEnd] = useState(props.arriveTimeEnd);

  return {
    states: {
      checkedTicketTypes,
      checkedTrainTypes,
      checkedDepartStations,
      checkedArriveStations,
      departTimeStart,
      departTimeEnd,
      arriveTimeStart,
      arriveTimeEnd,
    },
    actions: {
      set_checkedTicketTypes,
      set_checkedTrainTypes,
      set_checkedDepartStations,
      set_checkedArriveStations,
      set_departTimeStart,
      set_departTimeEnd,
      set_arriveTimeStart,
      set_arriveTimeEnd,
    },
  };
};

export default useCache;
