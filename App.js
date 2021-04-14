import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { searchRecipe } from './api';
const App = () => {
  const [text, onChangeText] = useState('write here');
  const [recipes, setRecipes] = useState([]);
  const onPress = () => {
    //console.log('pressed!');
    searchRecipe(text).then((receivedRecipes) => {
      console.log(receivedRecipes);
      setRecipes(receivedRecipes);
      //console.log(recipes);
    });
  };
  return (
    <View style={styles.container}>
      <Text>Welcooooome</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
      />
      <TouchableHighlight onPress={onPress}>
        <View style={styles.button}>
          <Text>Press Here</Text>
        </View>
      </TouchableHighlight>
      {/* {recipes ? (
        recipes.forEach((recipe) => {
          <Text>{recipe.title}</Text>;
        })
      ) : (
        <Text>Search for recipes</Text>
      )} */}
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
export default App;
