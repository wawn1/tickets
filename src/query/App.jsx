import React, {useCallback, useEffect} from "react";
import {appConnect, navConnect, listConnect, bottomConnect} from "./store/connects";
import {useDeepCompareEffect} from "react-use";
import URI from "urijs";
import dayjs from "dayjs";

import "./App.scss";
import _Nav from "../common/Nav";
import _List from "./List";
import _Bottom from "./Bottom";
import Header from "../common/Header";

const Nav = navConnect(_Nav);
const List = listConnect(_List);
const Bottom = bottomConnect(_Bottom);

const App = ({queries, searchParsed, constrains, setQueries, updateTrainInfo}) => {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    setQueries(queries);
  }, []);
  useDeepCompareEffect(() => {
    console.log("xhr...");
    if (!searchParsed) {
      return;
    }
    const processQueries = {...queries, date: dayjs(queries.departDate).format("YYYY-MM-DD")};
    const processConstrains = {...constrains};
    Object.keys(constrains).forEach(key => {
      processConstrains[key] = typeof constrains[key] === "object" ? Object.keys(constrains[key]).join() : constrains[key];
    });
    const searchParams = {...processQueries, ...processConstrains};
    const paramstr = URI.buildQuery(searchParams);
    const url = `/rest/query?${paramstr}`;
    fetch(url)
      .then(response => response.json())
      .then(result => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {ticketType, trainType, depStation, arrStation},
            },
          },
        } = result;
        updateTrainInfo({trains, ticketType, trainType, depStation, arrStation});
      });
  }, [searchParsed, queries, constrains]);
  // 错误处理
  if (!searchParsed) {
    return null;
  }
  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${queries.from}-${queries.to}`} onBack={onBack} />
      </div>
      <Nav />
      <List />
      <Bottom />
    </div>
  );
};
export default appConnect(App);
