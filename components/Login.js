import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { UserContext } from '../contexts/userContext';

const Login = ({ setUser }) => {
  const { firebase } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user: { uid } }) => {
        console.log(uid);
        setUser((currUser) => {
          return { userId: uid, email };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <Text>Login</Text>
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableHighlight style={styles.button} onPress={handleSubmit}>
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
export default Login;
