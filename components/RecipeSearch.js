import { StatusBar } from 'expo-status-bar';

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RNPickerSelect from 'react-native-picker-select';
import { searchRecipe } from '../api';
import SingleRecipe from './SingleRecipe';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SBKeywordStack = createStackNavigator();

export const SBKeywordStackScreen = () => {
  return (
    <SBKeywordStack.Navigator>
      <SBKeywordStack.Screen
        name="Search by keyword"
        component={RecipeSearch}
      />
      <SBKeywordStack.Screen name="Recipe" component={SingleRecipe} />
    </SBKeywordStack.Navigator>
  );
};

export const RecipeSearch = ({ navigation }) => {
  const [text, setText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Pescetarian', value: 'pescetarian' },
    { label: 'Lacto Vegetarian', value: 'Lacto vegetarian' },
    { label: 'Ovo Vegetarian', value: 'ovo vegetarian' },
    { label: 'Vegan', value: 'vegan' },
  ]);

  const onPress = () => {
    searchRecipe(text, value).then((receivedRecipes) => {
      setRecipes(receivedRecipes);
      setText('');
    });
  };

  const handleSetValue = (value) => {
    setValue(value);
  };

  return (
    <View style={styles.container}>
      <Text>Find yourself something to cook tonight</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type ingredient"
      />
      {/* <View style={styles.test}> */}
      <RNPickerSelect
        items={items}
        // open={open}
        value={''}
        fixAndroidTouchableBug={true}
        placeholder={{ label: 'Select dietary requirements...', value: null }}
        onValueChange={handleSetValue}
        // setOpen={setOpen}

        // setItems={handleSetValue}
      />
      {/* </View> */}

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
    margin: 10,
  },
  test: { borderStyle: 'solid', borderColor: 'red', borderWidth: 5 },
});
