import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/userContext';

import { createStackNavigator } from '@react-navigation/stack';

const UserRecipes = () => {
  const { db, user } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    db.collection('user-recipes')
      .doc(user.userId)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.length > 0) {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setRecipes((currRecipes) => {
              return [...currRecipes, doc.data()];
            });
          });
        }
      });
  }, [recipes]);
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
