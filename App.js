import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import SingleRecipe from './components/SingleRecipe';
import { RecipeSearch, SBKeywordStackScreen } from './components/RecipeSearch';
import SearchByIngredients from './components/SearchByIngredients';
import { Home, HomeStackScreen } from './components/Home';
import Nav from './components/Nav';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from './config';
import { UserContext } from './contexts/userContext';
import UserRecipes from './components/UserRecipes';
//import SearchByKeyword from './components/RecipeSearch';
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [hasAddedRecipe, setHasAddedRecipe] = useState(false);

  console.log(user);
  //UserContext bit of a misnomer- decided later on to use context
  //to distribute firebase across the proj too but haven't changed
  //the name of the context
  return (
    <UserContext.Provider value={{ user, firebase, db }}>
      <NavigationContainer>
        {user.userId ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Search by Ingredients"
              component={SearchByIngredients}
              initialParams={{ setHasAddedRecipe, hasAddedRecipe }}
            />
            <Tab.Screen
              name="Search by Keyword"
              component={SBKeywordStackScreen}
              initialParams={{ setHasAddedRecipe }}
            />
            <Tab.Screen
              name="My Recipes"
              component={UserRecipes}
              initialParams={{ hasAddedRecipe }}
            />
          </Tab.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              initialParams={{ setUser }}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </UserContext.Provider>

    // <NavigationContainer>
    //   <Stack.Screen name="Nav" component={Nav}></Stack.Screen>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen name="Home" component={Home}></Stack.Screen>
    //     <Stack.Screen
    //       name="Search by ingredients"
    //       component={SearchByIngredients}
    //     ></Stack.Screen>
    //     <Stack.Screen
    //       name="Search by keyword"
    //       component={RecipeSearch}
    //     ></Stack.Screen>
    //     <Stack.Screen name="Recipe" component={SingleRecipe}></Stack.Screen>
    //   </Stack.Navigator>
    // </NavigationContainer>
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
  listItem: {
    padding: 10,
  },
});
export default App;
