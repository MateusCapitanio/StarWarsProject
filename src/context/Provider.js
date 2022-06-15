import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import requestPlanets from '../apis/requestPlanets';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [filterByNumericValues, setFilterNumerics] = useState([]);

  const returnRequest = async () => {
    const response = await requestPlanets();
    const { results } = response;
    setData(results);
    const arrayKeys = Object.keys(results[0]);
    setKeys(arrayKeys.filter((e) => e !== 'residents'));
  };

  useEffect(() => {
    returnRequest();
  }, []);

  const value = {
    data,
    keys,
    filterByNumericValues,
    setFilterNumerics,
  };

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string.isRequired,
};
