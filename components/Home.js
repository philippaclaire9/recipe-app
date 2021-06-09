import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import firebase from 'firebase';
// import 'firebase/auth';
import { UserContext } from '../contexts/userContext';
const HomeStack = createStackNavigator();

export const HomeStackScreen = () => {
  //   return (
  //     <HomeStack.Navigator>
  //       <HomeStack.Screen name="Home" component={Home} />
  //     </HomeStack.Navigator>
  //   );
};
export const Home = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { firebase } = useContext(UserContext);

  const onPress = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        route.params.setUser((currUser) => {
          return { userId, username };
        });
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  return (
    <View>
      <Text>Create an account</Text>
      <Text>Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder={'Username'}
        onChangeText={setUsername}
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        placeholder={'Email'}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        placeholder={'Password'}
        onChangeText={setPassword}
      />

      <TouchableHighlight style={styles.button} onPress={onPress}>
        <View>
          <Text>Submit</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
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
//export default Home;
