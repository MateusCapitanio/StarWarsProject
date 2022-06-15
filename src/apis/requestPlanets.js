const requestPlanets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(url);
  const data = await response.json();
  // if (response.status === 429) {
  //   return <h1>To many requests</h1>;
  // }
  return data;
};

export default requestPlanets;
