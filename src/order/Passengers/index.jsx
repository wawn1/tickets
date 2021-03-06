import React from "react";
import PropTypes from "prop-types";

import "./index.scss";
import {passengerConnect, passengersConnect, chooseConnect} from "../store/connects";
import _Choose from "../Choose";

const _Passenger = props => {
  const {id, name, followAdult, ticketType, licenseNo, gender, birthday} = props;
  const {removePassenger, updatePassenger, openGenderMenu, openFollowAdultMenu, openTicketTypeMenu, getFollowAdultName} = props;

  const isAdult = ticketType === "adult";

  let followAdultName = getFollowAdultName(followAdult);

  return (
    <li className="passenger">
      <i className="delete" onClick={() => removePassenger(id)}>
        —
      </i>
      <ol className="items">
        <li className="item">
          <label className="label name">姓名</label>
          <input
            type="text"
            className="input name"
            placeholder="乘客姓名"
            value={name}
            onChange={e => updatePassenger(id, {name: e.target.value})}
          />
          <label className="ticket-type" onClick={() => openTicketTypeMenu(id)}>
            {isAdult ? "成人票" : "儿童票"}
          </label>
        </li>
        {isAdult && (
          <li className="item">
            <label className="label licenseNo">身份证</label>
            <input
              type="text"
              className="input licenseNo"
              placeholder="证件号码"
              value={licenseNo}
              onChange={e => updatePassenger(id, {licenseNo: e.target.value})}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item arrow">
            <label className="label gender">性别</label>
            <input
              type="text"
              className="input gender"
              placeholder="请选择"
              onClick={() => openGenderMenu(id)}
              value={gender === "male" ? "男" : gender === "female" ? "女" : ""}
              readOnly
            />
          </li>
        )}
        {!isAdult && (
          <li className="item">
            <label className="label birthday">出生日期</label>
            <input
              type="text"
              className="input birthday"
              placeholder="如 19951015"
              value={birthday}
              onChange={e => updatePassenger(id, {birthday: e.target.value})}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item arrow">
            <label className="label followAdult">同行成人</label>
            <input
              type="text"
              className="input followAdult"
              placeholder="请选择"
              value={followAdultName}
              onClick={() => openFollowAdultMenu(id)}
              readOnly
            />
          </li>
        )}
      </ol>
    </li>
  );
};

_Passenger.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  followAdult: PropTypes.string,
  followAdultName: PropTypes.string,
  ticketType: PropTypes.string.isRequired,
  licenseNo: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  removePassenger: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  openGenderMenu: PropTypes.func.isRequired,
  openFollowAdultMenu: PropTypes.func.isRequired,
  openTicketTypeMenu: PropTypes.func.isRequired,
};

const Passenger = passengerConnect(_Passenger);
const Choose = chooseConnect(_Choose);

const Passengers = ({passengers, createAdult, createChild}) => {
  return (
    <div className="passengers">
      <ul>
        {passengers.map(passenger => {
          return <Passenger {...passenger} key={passenger.id} />;
        })}
      </ul>
      <section className="add">
        <div className="adult" onClick={() => createAdult()}>
          添加成人
        </div>
        <div className="child" onClick={() => createChild()}>
          添加儿童
        </div>
      </section>
      {passengers.length > 0 && <Choose />}
    </div>
  );
};

Passengers.propTypes = {
  passengers: PropTypes.array.isRequired,
  createAdult: PropTypes.func.isRequired,
  createChild: PropTypes.func.isRequired,
};

export default passengersConnect(Passengers);
