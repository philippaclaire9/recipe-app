const axios = require('axios');
const { config } = require('./config');
exports.searchRecipe = (searchTerm) => {
  const options = {
    method: 'GET',
    url:
      'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
    params: { query: searchTerm },
    headers: config,
  };
  return axios
    .request(options)
    .then(({ data: { results } }) => {
      //console.log(results);
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
};
