import React, {useCallback, useState, useMemo} from "react";
import PropTypes from "prop-types";
import URI from "urijs";
import dayjs from "dayjs";

import "./index.scss";
import {channelConnect} from "../store/connects";

const _Channel = ({name, desc, type, trainNumber, departStation, arriveStation, departDate}) => {
  const src = useMemo(() => {
    return new URI("order.html")
      .setSearch("trainNumber", trainNumber)
      .setSearch("dStation", departStation)
      .setSearch("aStation", arriveStation)
      .setSearch("type", type)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .toString();
  }, [type, trainNumber, departStation, arriveStation, departDate]);

  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <a href={src} className="buy-wrapper">
        <div className="buy">买票</div>
      </a>
    </div>
  );
};

const Channel = channelConnect(_Channel);

const Seat = ({type, priceMsg, ticketsLeft, channels, unfold, onToggle}) => {
  return (
    <li>
      <div className="bar" onClick={onToggle}>
        <span className="seat">{type}</span>
        <span className="price">
          <i>￥</i>
          {priceMsg}
        </span>
        <span className="btn">{unfold ? "收起" : "预订"}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div className="channels" style={{height: unfold ? channels.length * 55 + "px" : 0}}>
        {channels.map(channel => {
          return <Channel key={channel.name} {...channel} type={type} />;
        })}
      </div>
    </li>
  );
};

const Candidate = ({tickets}) => {
  const [unfoldIdx, setUnfoldIdx] = useState();

  const onToggle = useCallback(
    idx => {
      setUnfoldIdx(idx === unfoldIdx ? -1 : idx);
    },
    [unfoldIdx]
  );

  return (
    <div className="candidate">
      <ul>
        {tickets.map((ticket, idx) => {
          return <Seat onToggle={() => onToggle(idx)} unfold={unfoldIdx === idx} {...ticket} key={ticket.type} />;
        })}
      </ul>
    </div>
  );
};

Candidate.propTypes = {
  tickets: PropTypes.array.isRequired,
};

export default Candidate;
