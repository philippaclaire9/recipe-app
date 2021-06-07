const axios = require('axios');
const { config } = require('./config');
exports.searchRecipe = (searchTerm, diet) => {
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
    params: { query: searchTerm, diet },
    headers: config,
  };
  return axios
    .request(options)
    .then(({ data: { results } }) => {
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.searchRecipeByIngredients = (ingredients) => {
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
    params: {
      ingredients,
      number: '10',
      ignorePantry: 'false',
      ranking: '1',
    },
    headers: config,
  };
  return axios
    .request(options)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
