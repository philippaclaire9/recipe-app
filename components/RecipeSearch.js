import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import { searchRecipe } from '../api';

const RecipeSearch = ({ navigation }) => {
  const [text, onChangeText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isVegetarian, setVegetarian] = useState(false);

  const onPress = () => {
    searchRecipe(text).then((receivedRecipes) => {
      setRecipes(receivedRecipes);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Find yourself something to cook tonight</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
        placeholder="Type ingredient"
      />

      <TouchableHighlight onPress={onPress}>
        <View style={styles.button}>
          <Text>Press Here</Text>
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
  },
});

export default RecipeSearch;
