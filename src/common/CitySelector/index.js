import React, {useState, useEffect} from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

const CityList = ({sections = [], onSelect}) => {
  return (
    <div className="city-list">
      {sections.map(({title, citys: cities = []}) => {
        return (
          <ul className="city-ul" key={title}>
            <li className="city-li" key="title">
              {title}
            </li>
            {cities.map(({name}) => {
              return (
                <li key={name} className="city-li" onClick={() => onSelect(name)}>
                  {name}
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const CitySelector = ({show, isLoading, cityData, onBack, fetchCityData, setSelectedCity}) => {
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }

    fetchCityData();
  }, [show, cityData, isLoading]);

  const getCityList = () => {
    if (isLoading) {
      return <div>loading</div>;
    }
    if (cityData) {
      console.log(cityData, "sadsd");
      return <CityList sections={cityData.cityList} onSelect={setSelectedCity} />;
    }
    return <div>error</div>;
  };

  return (
    <div className={classnames("city-selector", {hidden: !show})}>
      <div className="city-search">
        <div className="search-back" onClick={onBack}>
          <svg width="42" height="42">
            <polyline points="25,13 16,21 25,29" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          onClick={() => {
            setSearchKey("");
          }}
          className={classnames("search-clean", {
            hidden: searchKey.trim().length === 0,
          })}
        >
          &#xf063;
        </i>
      </div>
      {getCityList()}
    </div>
  );
};
CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  setSelectedCity: PropTypes.func.isRequired,
};
export default CitySelector;
