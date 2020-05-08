import React, {useCallback, useEffect, useState} from "react";
import {appConnect, detailConnect, ticketConnect, menuConnect} from "./store/connects";
import URI from "urijs";
import dayjs from "dayjs";
import {useDeepCompareEffect} from "react-use";

import "./App.scss";
import _Detail from "../common/Detail";
import Header from "../common/Header";
import Account from "./Account";
import Choose from "./Choose";
import Passengers from "./Passengers";
import _Ticket from "./Ticket";
import _Menu from "./Menu";

const Detail = detailConnect(_Detail);
const Ticket = ticketConnect(_Ticket);
const Menu = menuConnect(_Menu);

const App = ({params, searchParsed, setQueries, fetchInitial}) => {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    setQueries(queries);
  }, []);

  useDeepCompareEffect(() => {
    if (!searchParsed) return;
    const {departStation, arriveStation, seatType, departDate} = params;
    const searchParams = {dStation: departStation, aStation: arriveStation, type: seatType, date: dayjs(departDate).format("YYYY-MM-DD")};
    const paramstr = URI.buildQuery(searchParams);
    const url = `/rest/order?${paramstr}`;
    fetchInitial(url);
  }, [searchParsed, params]);

  if (!searchParsed) {
    return null;
  }
  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title="订单填写" onBack={onBack} />
      </div>
      <div className="app-content">
        <Detail>
          <span style={{display: "block"}} className="train-icon"></span>
        </Detail>
        <Ticket />
        <Passengers />
        <Account />
        <Menu />
      </div>
    </div>
  );
};
export default appConnect(App);
