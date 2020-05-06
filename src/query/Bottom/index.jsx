import React, {useState, useCallback} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./index.scss";
import {ORDER_DEPART} from "../store/constants";
import {bottomModalConnect} from "../store/connects";
import Slider from "../Slider";
import useCache from "./useCache";

const Option = ({title, options, checkedMap, update}) => {
  const toggle = useCallback(value => {
    const newCheckedMap = {...checkedMap};
    if (value in checkedMap) {
      delete newCheckedMap[value];
    } else {
      newCheckedMap[value] = true;
    }
    update(newCheckedMap);
  });
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map(({value, name}) => {
          const checked = value in checkedMap;
          return (
            <li key={value} className={classnames({checked})} onClick={() => toggle(value)}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const _BottomModal = props => {
  const {ticketTypes, trainTypes, departStations, arriveStations, decideInfo, toggleShowFilters} = props;

  const {states, actions} = useCache(props);

  const {
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  } = states;

  const {
    set_checkedTicketTypes,
    set_checkedTrainTypes,
    set_checkedDepartStations,
    set_checkedArriveStations,
    set_departTimeStart,
    set_departTimeEnd,
    set_arriveTimeStart,
    set_arriveTimeEnd,
  } = actions;

  const optionGroup = [
    {
      title: "坐席类型",
      options: ticketTypes,
      checkedMap: checkedTicketTypes,
      update: set_checkedTicketTypes,
    },
    {
      title: "车次类型",
      options: trainTypes,
      checkedMap: checkedTrainTypes,
      update: set_checkedTrainTypes,
    },
    {
      title: "出发车站",
      options: departStations,
      checkedMap: checkedDepartStations,
      update: set_checkedDepartStations,
    },
    {
      title: "到达车站",
      options: arriveStations,
      checkedMap: checkedArriveStations,
      update: set_checkedArriveStations,
    },
  ];
  const reset = () => {
    set_checkedTicketTypes({});
    set_checkedTrainTypes({});
    set_checkedDepartStations({});
    set_checkedArriveStations({});
    set_departTimeStart(0);
    set_departTimeEnd(24);
    set_arriveTimeStart(0);
    set_arriveTimeEnd(24);
  };
  const sure = () => {
    decideInfo({
      checkedTicketTypes,
      checkedTrainTypes,
      checkedDepartStations,
      checkedArriveStations,
      departTimeStart,
      departTimeEnd,
      arriveTimeStart,
      arriveTimeEnd,
    });
    toggleShowFilters();
  };
  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className={classnames("reset")} onClick={reset}>
              重置
            </span>
            <span className="ok" onClick={sure}>
              确定
            </span>
          </div>
          <div className="options">
            {optionGroup.map(group => (
              <Option {...group} key={group.title} />
            ))}
            <Slider
              title="出发时间"
              startHours={departTimeStart}
              endHours={departTimeEnd}
              onStartChanged={set_departTimeStart}
              onEndChanged={set_departTimeEnd}
            />
            <Slider
              title="到达时间"
              startHours={arriveTimeStart}
              endHours={arriveTimeEnd}
              onStartChanged={set_arriveTimeStart}
              onEndChanged={set_arriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
_BottomModal.propTypes = {
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  decideInfo: PropTypes.func.isRequired,
  toggleShowFilters: PropTypes.func.isRequired,
};

const BottomModal = bottomModalConnect(_BottomModal);

const Bottom = ({
  orderType,
  highSpeed,
  onlyTickets,
  showFilters,
  toggleOrderType,
  toggleHighSpeed,
  toggleOnlyTickets,
  toggleShowFilters,
}) => {
  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={toggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? "出发 早→晚" : "耗时 短→长"}
        </span>
        <span className={classnames("item", {"item-on": highSpeed})} onClick={toggleHighSpeed}>
          <i className="icon">{highSpeed ? "\uf43f" : "\uf43e"}</i>
          只看高铁动车
        </span>
        <span className={classnames("item", {"item-on": onlyTickets})} onClick={toggleOnlyTickets}>
          <i className="icon">{onlyTickets ? "\uf43d" : "\uf43c"}</i>
          只看有票
        </span>
        <span
          className={classnames("item", {
            "item-on": showFilters,
          })}
          onClick={toggleShowFilters}
        >
          <i className="icon">{"\uf0f7"} </i>
          综合筛选
        </span>
      </div>
      {showFilters && <BottomModal />}
    </div>
  );
};

Bottom.propTypes = {
  orderType: PropTypes.number.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  showFilters: PropTypes.bool.isRequired,
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleShowFilters: PropTypes.func.isRequired,
};

export default Bottom;
