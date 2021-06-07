import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
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
import { firebaseConfig } from './config';
import UserContext from './context/userContext';
//import SearchByKeyword from './components/RecipeSearch';
firebase.initializeApp(firebaseConfig);
const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            initialParams={{ setUser }}
          />
          <Tab.Screen
            name="Search by ingredients"
            component={SearchByIngredients}
          />
          <Tab.Screen
            name="Search by keyword"
            component={SBKeywordStackScreen}
          />
        </Tab.Navigator>
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
