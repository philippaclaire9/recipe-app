import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import { searchRecipeByIngredients } from '../api';
import SingleRecipe from './SingleRecipe';
import { RecipeSearch } from './RecipeSearch';

const SBIStack = createStackNavigator();

const SBIStackScreen = () => {
  return (
    <SBIStack.Navigator>
      <SBIStack.Screen
        name="Search by ingredients"
        component={SearchByIngredients}
      />
      <SBIStack.Screen name="Recipe" component={SingleRecipe} />
    </SBIStack.Navigator>
  );
};

const SearchByIngredients = ({ navigation }) => {
  const [text, setChangeText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isVegetarian, setVegetarian] = useState(false);
  const { user } = useContext(UserContext);

  const addIngredient = () => {
    setIngredients((currIngredients) => {
      const newIngredients = [...currIngredients];
      newIngredients.push(text);
      return newIngredients;
    });
    setChangeText('');
  };

  const searchRecipes = () => {
    const stringifiedIngredients = ingredients.join();
    searchRecipeByIngredients(stringifiedIngredients).then(
      (receivedRecipes) => {
        setRecipes(receivedRecipes);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text>Logged in as {user.username}</Text>
      <Text>Find yourself something to cook tonight</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setChangeText}
        placeholder="Type ingredient"
        required
      />
      <TouchableHighlight onPress={addIngredient}>
        <View style={styles.button}>
          <Text>Add ingredient</Text>
        </View>
      </TouchableHighlight>
      <View>
        {ingredients.map((ingredient, index) => {
          return <Text key={index}>{ingredient}</Text>;
        })}
      </View>
      <TouchableHighlight onPress={searchRecipes}>
        <View style={styles.button}>
          <Text>Search Recipes</Text>
        </View>
      </TouchableHighlight>

      {recipes ? (
        recipes.map((recipe) => {
          return (
            <TouchableHighlight
              style={styles.listItem}
              onPress={() => navigation.navigate('Recipe', { recipe })}
              key={recipe.id}
            >
              <View>
                <Text>{recipe.title}</Text>
              </View>
            </TouchableHighlight>
          );
        })
      ) : (
        <Text>Search for recipes</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default SearchByIngredients;
