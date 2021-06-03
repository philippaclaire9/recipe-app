import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
  //   return (
  //     <HomeStack.Navigator>
  //       <HomeStack.Screen name="Home" component={Home} />
  //     </HomeStack.Navigator>
  //   );
};
export const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Hello there! Choose from the nav bar where you'd like to go!</Text>
    </View>
  );
};

//export default Home;
