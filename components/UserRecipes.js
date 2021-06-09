import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/userContext';

const UserRecipes = () => {
  const { db } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  console.log(recipes);
  useEffect(() => {
    db.collection('user-recipes')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setRecipes((currRecipes) => {
            return [...currRecipes, doc.data()];
          });
        });
      });
  }, []);
  return (
    <View>
      {recipes.map((recipe, index) => {
        if (recipe.title) {
          return <Text key={index}>{recipe.title}</Text>;
        }
      })}
    </View>
  );
};

export default UserRecipes;
