import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import '../styles/home-style.css';

export default function Table() {
  const { data, keys, setFilterNumerics, filterByNumericValues } = useContext(Context);
  const [filter, setFilter] = useState({ filterName: { name: '' } });
  const [arrayCategorys, setArrayCategorys] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [arrFilter, setArrfilter] = useState([]);
  const [arrFilterNumeric, setArrayNumeric] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const changeFilter = ({ target }) => {
    setFilter({ filterName: { name: target.value } });
    const arrayFilter = data.filter((obj) => (
      ((obj.name).toLowerCase()).includes(target.value)
    ));
    setArrfilter(arrayFilter);
  };

  const changeFilterNumeric = ({ target }) => {
    switch (target.id) {
    case 'column':
      setColumn(target.value);
      break;
    case 'comparison':
      setComparison(target.value);
      break;
    case 'value':
      setValue(target.value);
      break;
    default:
      break;
    }
  };

  const checkFilters = (array) => {
    const arrayFilterNumeric = array.filter((obj) => {
      if (comparison === 'maior que') {
        return parseFloat(obj[column]) > parseFloat(value);
      } if (comparison === 'menor que') {
        return parseFloat(obj[column]) < parseFloat(value);
      }
      return parseFloat(obj[column]) === parseFloat(value);
    });
    setArrfilter(arrayFilterNumeric);
    setArrayNumeric(arrayFilterNumeric);
  };

  const saveFilter = () => {
    const inputValue = document.querySelector('#value');
    setFilterNumerics((prevState) => (
      [...prevState, {
        column,
        comparison,
        value }]
    ));

    if (arrFilterNumeric.length === 0) {
      checkFilters(data);
    } else {
      checkFilters(arrFilterNumeric);
    }
    setColumn(arrayCategorys[1]);
    setArrayCategorys((prevState) => prevState.filter((e) => e !== column));
    inputValue.value = '';
  };

  const renderPlanets = (array) => (
    array.map((e, i) => (
      <tr key={ i }>
        <td>{ e.name }</td>
        <td>{ e.rotation_period }</td>
        <td>{ e.orbital_period }</td>
        <td>{ e.diameter }</td>
        <td>{ e.climate }</td>
        <td>{ e.gravity }</td>
        <td>{ e.terrain }</td>
        <td>{ e.surface_water }</td>
        <td>{ e.population }</td>
        <td>{ e.films }</td>
        <td>{ e.created }</td>
        <td>{ e.edited }</td>
        <td>{ e.url }</td>
      </tr>
    ))
  );

  return (
    <main>
      <span hidden>{ filter.filterName.name }</span>
      <section className="filter-section">
        <h3>Filtrar</h3>
        <input data-testid="name-filter" type="text" onChange={ changeFilter } />

        <select id="column" onChange={ changeFilterNumeric } data-testid="column-filter">
          {arrayCategorys.map((option, i) => <option key={ i }>{option}</option>)}
        </select>

        <select
          id="comparison"
          onChange={ changeFilterNumeric }
          data-testid="comparison-filter"
        >
          <option selected>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          defaultValue={ 0 }
          id="value"
          onChange={ changeFilterNumeric }
          type="number"
          data-testid="value-filter"
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ saveFilter }
        >
          Filtrar
        </button>

      </section>
      <section className="filter-selected">
        {filterByNumericValues.map((filters, i) => (
          <span
            key={ i }
          >
            {`${filters.column} | ${filters.comparison} | ${filters.value}`}

          </span>))}
      </section>
      <section className="table-section">
        <table>
          <thead>
            <tr>
              { keys.map((key, i) => <th key={ i }>{key}</th>) }
            </tr>
          </thead>
          <tbody>
            { arrFilter.length !== 0
              ? renderPlanets(arrFilter)
              : renderPlanets(data)}
          </tbody>
        </table>
      </section>
    </main>
  );
}
