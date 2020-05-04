import React, {memo, useState, useEffect, useCallback} from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import "./index.scss";

const Suggest = memo(({searchKey, onSelect}) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    fetch("/rest/search?key=" + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const {result, searchKey: skey} = data;
        if (skey === searchKey) {
          if (!result.length) {
            result = [{dispaly: searchKey}];
          }
          setResult(result);
        }
      });
  }, [searchKey]);
  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {result.map(({display: name}) => (
          <li key={name} className="city-suggest-li" onClick={() => onSelect(name)}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
});

Suggest.propTypes = {
  searchKey: PropTypes.string.isRequired,
};

const AlphaIndex = memo(({alpha, onClick}) => {
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});
AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
const alphabet = new Array(26).fill(65).map((val, idx) => String.fromCharCode(val + idx));

const CityList = memo(({sections = [], onSelect}) => {
  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-section='${alpha}']`).scrollIntoView();
  });
  console.log("render CityList");
  return (
    <div className="city-list">
      {sections.map(({title, citys: cities = []}) => {
        return (
          <ul className="city-ul" key={title} data-section={title}>
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
      <div className="city-index">
        {alphabet.map(alpha => {
          return <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha} />;
        })}
      </div>
    </div>
  );
});

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

  const clear = useCallback(() => {
    setSearchKey("");
  });

  useEffect(() => {
    if (!show) {
      clear();
    }
  }, [show]);
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
          onClick={clear}
          className={classnames("search-clean", {
            hidden: searchKey.trim().length === 0,
          })}
        >
          &#xf063;
        </i>
      </div>
      {getCityList()}
      {Boolean(searchKey) && <Suggest searchKey={searchKey} onSelect={setSelectedCity} />}
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
